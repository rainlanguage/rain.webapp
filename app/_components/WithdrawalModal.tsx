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
import { handleDecimalSeparator } from '../_utils/handleDecimalSeparator';

const formSchema = z.object({
	withdrawalAmount: z.preprocess(
		(value) => Number(value),
		z.number().min(0, 'Amount must be a positive number')
	)
});

interface WithdrawalModalProps {
	vault: InputType | Output;
	network: string;
	onSuccess?: () => void;
}

export const WithdrawalModal = ({ vault, network, onSuccess }: WithdrawalModalProps) => {
	const [open, setOpen] = useState(false);
	const { switchChainAsync } = useSwitchChain();
	const { writeContractAsync } = useWriteContract();
	const { connectModalOpen, openConnectModal } = useConnectModal();
	const [rawAmount, setRawAmount] = useState<string>('0'); // Store the raw 18-decimal amount

	const [error, setError] = useState<string | null>(null);

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

	const withdrawalAmount = form.watch('withdrawalAmount');

	useEffect(() => {
		const parsedRawAmount = parseUnits(withdrawalAmount.toString(), Number(vault.token.decimals));
		setRawAmount(parsedRawAmount.toString());
		if (BigInt(parsedRawAmount) > BigInt(vault.balance)) {
			setError('Amount exceeds vault balance');
		} else {
			setError(null);
		}
	}, [withdrawalAmount, vault.balance]);

	const withdraw = async () => {
		if (!address && !connectModalOpen) {
			openConnectModal?.();
			return;
		}
		await switchChain();
		try {
			await writeContractAsync({
				abi: orderBookJson.abi,
				address: vault.orderbook.id as `0x${string}`,
				functionName: 'withdraw2',
				args: [vault.token.address, BigInt(vault.vaultId), BigInt(rawAmount), []]
			});
			onSuccess?.();
		} catch (error: any) {
			console.error(error.message);
		}
	};

	const handleMaxClick = () => {
		if (vault.balance === BigInt(0)) {
			return setError('Insuficient balance');
		} else if (!vault.balance) {
			return setError('No balance found');
		}
		const formattedBalance = formatUnits(BigInt(vault.balance), Number(vault.token.decimals));
		form.setValue('withdrawalAmount', formattedBalance as unknown as number);
		form.setFocus('withdrawalAmount');
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<span
					className={cn(
						buttonVariants(),
						'bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-colors cursor-pointer'
					)}
				>
					Withdraw
				</span>
			</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle>Withdraw</DialogTitle>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(async () => {
								await withdraw();
								setOpen(false);
							})}
							className="space-y-8"
						>
							<FormField
								control={form.control}
								name="withdrawalAmount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Available amount: {formatUnits(vault.balance, Number(vault.token.decimals))}
										</FormLabel>
										<FormControl>
											<Input
												data-testid={'withdrawal-input'}
												placeholder="Enter a number greater than 0"
												{...field}
												type="text"
												inputMode="decimal"
												step="0.1"
												onChange={(e) => {
													const finalValue = handleDecimalSeparator(e);
													field.onChange(finalValue);
												}}
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
							<Button
								type="submit"
								data-testid="withdraw-button"
								disabled={!!error || Number(withdrawalAmount) === 0}
							>
								Submit
							</Button>
						</form>
					</Form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
