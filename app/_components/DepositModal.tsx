'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { useWriteContract, useReadContract, useContractRead, useAccount } from 'wagmi';
import { orderBookJson } from '@/public/_abis/OrderBook';
import { parseUnits, formatUnits, erc20Abi } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { config } from '../providers';
import { readContract } from 'viem/actions';

const ERC20_ABI = [
	{
		constant: true,
		inputs: [{ name: 'owner', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ name: '', type: 'uint256' }],
		type: 'function'
	}
];

const formSchema = z.object({
	depositAmount: z.preprocess(
		(value) => Number(value),
		z.number().min(0, 'Amount must be a positive number')
	)
});

interface Vault {
	token: any;
	vaultId: any;
	orderbook: any;
}

interface DepositModalProps {
	vault: Vault;
}

export const DepositModal = ({ vault }: DepositModalProps) => {
	const { writeContractAsync } = useWriteContract();
	const [open, setOpen] = useState(false);
	const [rawAmount, setRawAmount] = useState<string>('0');

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setError(null);
	}, []);

	useEffect(() => {
		console.log('vault', vault);
	}, [vault]);

	const address = useAccount().address;

	const connectedWalletBalance = useReadContract({
		address: vault.token.address,
		abi: erc20Abi,
		functionName: 'balanceOf',
		args: [address as `0x${string}`]
	}).data;

	useEffect(() => {
		console.log('connectedWalletBalance', connectedWalletBalance);
	}, [connectedWalletBalance]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			depositAmount: 0
		}
	});

	const deposit = async (amount: string) => {
		try {
			console.log('VAULT', vault);
			const existingAllowance = await readContract(config.getClient(), {
				abi: erc20Abi,
				address: vault.token.address,
				functionName: 'allowance',
				args: [address as `0x${string}`, vault.orderbook.id]
			});

			console.log(existingAllowance, 'existingAllowance');

			console.log('amount', amount);

			// If the allowance is less than the deposit amount, approve more tokens
			if (existingAllowance < parsedAmount) {
				console.log(`Existing allowance is ${existingAllowance.toString()}, approving more...`);

				// Send the approve transaction
				const approveTx = await writeContractAsync({
					address: vault.token.address,
					abi: erc20Abi,
					functionName: 'approve',
					args: [vault.orderbook.id, amount]
				});

				console.log(`Approval transaction sent: ${approveTx.hash}`);

				// Wait for the approval transaction to be confirmed
				const receipt = await waitForTransactionReceipt(config.getClient(), {
					hash: approveTx.hash,
					confirmations: 1 // Optional: Number of confirmations to wait for
				});

				console.log(`Approval confirmed in block ${receipt.blockNumber}`);
			} else {
				console.log('Sufficient allowance, no need to approve.');
			}

			//  call the deposit2 function
			const depositTx = await writeContractAsync({
				abi: orderBookJson.abi,
				address: vault.orderbook.id,
				functionName: 'deposit2',
				args: [vault.token.address, BigInt(vault.vaultId), parsedAmount, []]
			});

			console.log(`Deposit transaction sent: ${depositTx.hash}`);

			// wait for the deposit transaction receipt
			const depositReceipt = await waitForTransactionReceipt(config.getClient(), {
				hash: depositTx.hash,
				confirmations: 1
			});

			console.log(`Deposit confirmed in block ${depositReceipt.blockNumber}`);
		} catch (error) {
			console.error('Error during deposit process:', error);
		}
	};

	const handleMaxClick = () => {
		if (connectedWalletBalance === BigInt(0)) {
			return setError('Insuficient balance');
		} else if (!connectedWalletBalance) {
			return setError('No balance found');
		}
		const userMaxBalance = connectedWalletBalance?.toString();
		const readableMaxBalance = formatUnits(BigInt(userMaxBalance), vault.token.decimals);
		form.setValue('depositAmount', parseFloat(readableMaxBalance));
		setRawAmount(userMaxBalance);
		form.setFocus('depositAmount');
	};

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const userInput = e.target.value;
		form.setValue('depositAmount', parseFloat(userInput));

		if (userInput) {
			try {
				const parsedRawAmount = parseUnits(userInput, vault.token.decimals).toString();
				setRawAmount(parsedRawAmount); // Update raw amount on every user change
			} catch (err) {
				setRawAmount('0'); // Fallback to 0 if input is invalid
			}
		} else {
			setRawAmount('0'); // Fallback to 0 if input is empty
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button>Deposit</Button>
			</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle>Deposit</DialogTitle>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(async () => {
								await deposit(rawAmount);
								setOpen(false);
							})}
							className="space-y-8">
							<FormField
								control={form.control}
								name="depositAmount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Amount</FormLabel>
										{connectedWalletBalance && (
											<div className="text-sm text-gray-500">
												Balance: {formatUnits(connectedWalletBalance, vault.token.decimals)}
											</div>
										)}
										<FormControl>
											<Input
												placeholder="0"
												{...field}
												type="number"
												step="0.1"
												onChange={handleUserChange}
											/>
										</FormControl>
										<FormMessage>{error}</FormMessage>
										<Button size="sm" type="button" onClick={handleMaxClick}>
											Max
										</Button>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" disabled={!!error}>
								Submit
							</Button>
						</form>
					</Form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
