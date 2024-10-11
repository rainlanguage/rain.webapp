'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, buttonVariants } from '@/components/ui/button';
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
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';
import { orderBookJson } from '@/public/_abis/OrderBook';
import { parseUnits, formatUnits } from 'viem';
import type { Output, Input as InputType } from '../types';
import { cn } from '@/lib/utils';
import { SupportedChains } from '../_types/chains';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const formSchema = z.object({
	withdrawalAmount: z.preprocess(
		(value) => Number(value),
		z.number().min(0, 'Amount must be a positive number')
	)
});

interface WithdrawalModalProps {
	vault: InputType | Output;
	network: string;
}

export const WithdrawalModal = ({ vault, network }: WithdrawalModalProps) => {
	const [open, setOpen] = useState(false);
	const { switchChainAsync } = useSwitchChain();
	const { writeContractAsync } = useWriteContract();
	const { connectModalOpen, openConnectModal } = useConnectModal();
	const [rawAmount, setRawAmount] = useState<string>('0'); // Store the raw 18-decimal amount

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setError(null);
		if (BigInt(rawAmount) > BigInt(vault.balance)) {
			setError('Amount exceeds vault balance');
		}
	}, [rawAmount, vault.balance]);

	const address = useAccount().address;
	const userchain = useAccount().chain;
	const chain = SupportedChains[network as keyof typeof SupportedChains];
	const switchChain = async () => {
		if (userchain && chain.id !== userchain.id) {
			await switchChainAsync({ chainId: chain.id });
		}
	};

	// Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			withdrawalAmount: 0
		}
	});

	const withdraw = async (amount: string) => {
		if (!address && !connectModalOpen) {
			openConnectModal?.();
			return;
		}
		await switchChain();
		console.log('Withdraw', amount);
		// Send raw value to the contract (no conversion needed here)
		await writeContractAsync({
			abi: orderBookJson.abi,
			address: vault.orderbook.id as `0x${string}`,
			functionName: 'withdraw2',
			args: [vault.token.address, BigInt(vault.vaultId), BigInt(amount), []]
		});
	};

	const handleMaxClick = () => {
		if (vault.balance === BigInt(0)) {
			return setError('Insuficient balance');
		} else if (!vault.balance) {
			return setError('No balance found');
		}
		const formattedBalance = formatUnits(vault.balance, Number(vault.token.decimals));
		form.setValue('withdrawalAmount', Number(formattedBalance));
		setRawAmount(vault.balance.toString());
		form.setFocus('withdrawalAmount');
	};

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const userInput = e.target.value;
		form.setValue('withdrawalAmount', parseFloat(userInput));

		// Update the raw amount based on the user input (convert back to raw value)
		if (userInput) {
			console.log(userInput);
			try {
				const parsedRawAmount = parseUnits(userInput, Number(vault.token.decimals)).toString();
				setRawAmount(parsedRawAmount); // Update raw amount on every user change
			} catch {
				setRawAmount('0'); // Fallback to 0 if input is invalid
			}
		} else {
			setRawAmount('0'); // Fallback to 0 if input is empty
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<span
					className={cn(
						buttonVariants(),
						'bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-colors cursor-pointer'
					)}>
					Withdraw
				</span>
			</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle>Withdraw</DialogTitle>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(async () => {
								// Always submit the raw amount stored in state
								await withdraw(rawAmount);
								setOpen(false);
							})}
							className="space-y-8">
							<FormField
								control={form.control}
								name="withdrawalAmount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Amount</FormLabel>
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
