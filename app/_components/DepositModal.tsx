'use client';
import { config } from '../providers';
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
import { useWriteContract, useReadContract, useAccount, useSwitchChain } from 'wagmi';
import { orderBookJson } from '@/public/_abis/OrderBook';
import { parseUnits, formatUnits, erc20Abi } from 'viem';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { readContract } from 'viem/actions';
import { waitForTransactionReceipt } from '@wagmi/core';
import { Orderbook, Token } from '../types';
import { SupportedChains } from '../_types/chains';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { handleDecimalSeparator } from '../_utils/handleDecimalSeparator';

export enum TokenDepositStatus {
	Idle,
	Pending = 'Pending',
	CheckingAllowance = 'CheckingAllowance',
	ApprovingTokens = 'ApprovingTokens',
	WaitingForApprovalConfirmation = 'WaitingForApprovalConfirmation',
	TokensApproved = 'TokensApproved',
	DepositingTokens = 'DepositingTokens',
	WaitingForDepositConfirmation = 'WaitingForDepositConfirmation',
	TokensDeposited = 'TokensDeposited',
	Error = 'Error',
	Done = 'Done'
}

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
	token: Token;
	vaultId: bigint;
	orderbook: Orderbook;
}

interface DepositModalProps {
	vault: Vault;
	network: string;
	onSuccess?: () => void;
}

export const DepositModal = ({ vault, network, onSuccess }: DepositModalProps) => {
	const { switchChainAsync } = useSwitchChain();
	const { writeContractAsync } = useWriteContract();
	const [open, setOpen] = useState(false);
	const [rawAmount, setRawAmount] = useState<string>('0');
	const { connectModalOpen, openConnectModal } = useConnectModal();
	const [depositState, setDepositState] = useState<TokenDepositStatus>(TokenDepositStatus.Idle);
	const [error, setError] = useState<string | null>(null);
	const [depositTxHash, setDepositTxHash] = useState<string | null>(null);

	const address = useAccount().address;
	const userChain = useAccount().chain;
	const chain = SupportedChains[network as keyof typeof SupportedChains];

	useEffect(() => {
		if (!open) {
			setDepositState(TokenDepositStatus.Idle);
			setError(null);
		}
	}, [open]);

	const switchChain = async () => {
		if (userChain && chain.id !== userChain.id) {
			await switchChainAsync({ chainId: chain.id });
		}
	};

	const { data: connectedWalletBalance, refetch: refetchBalance } = useReadContract({
		abi: ERC20_ABI,
		address: vault.token.address as `0x${string}`,
		functionName: 'balanceOf',
		args: [address as `0x${string}`],
		chainId: chain.id as (typeof config.chains)[number]['id']
	}) as { data: bigint | undefined; refetch: () => void };

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			depositAmount: 0
		}
	});

	const depositAmount = form.watch('depositAmount');

	useEffect(() => {
		if (!connectedWalletBalance) return;
		const parsedRawAmount = parseUnits(depositAmount.toString(), Number(vault.token.decimals));
		setRawAmount(parsedRawAmount.toString());
		if (BigInt(parsedRawAmount) > BigInt(connectedWalletBalance)) {
			setError('Amount exceeds wallet balance');
		} else {
			setError(null);
		}
	}, [depositAmount, connectedWalletBalance]);

	const deposit = async () => {
		try {
			await switchChain();

			setDepositState(TokenDepositStatus.Pending);

			const depositAmount = form.getValues('depositAmount').toString();
			setRawAmount(depositAmount);

			const parsedAmount = parseUnits(depositAmount, Number(vault.token.decimals));

			setDepositState(TokenDepositStatus.CheckingAllowance);
			const existingAllowance = await readContract(
				config.getClient({ chainId: chain.id as (typeof config.chains)[number]['id'] }),
				{
					abi: erc20Abi,
					address: vault.token.address as `0x${string}`,
					functionName: 'allowance',
					args: [address as `0x${string}`, vault.orderbook.id as `0x${string}`]
				}
			);

			if (existingAllowance !== undefined && existingAllowance < parsedAmount) {
				setDepositState(TokenDepositStatus.ApprovingTokens);
				try {
					const approveTx = await writeContractAsync({
						address: vault.token.address as `0x${string}`,
						abi: erc20Abi,
						functionName: 'approve',
						args: [vault.orderbook.id as `0x${string}`, parsedAmount],
						chainId: chain.id as (typeof config.chains)[number]['id']
					});

					setDepositState(TokenDepositStatus.WaitingForApprovalConfirmation);

					await waitForTransactionReceipt(config, {
						hash: approveTx,
						confirmations: 1
					});
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (e: any) {
					setDepositState(TokenDepositStatus.Error);
					console.error(e.message, e.details);
					setError((e.details as string) || 'An error occured while approving your deposit.');
					return;
				}

				setDepositState(TokenDepositStatus.TokensApproved);
			} else {
				setDepositState(TokenDepositStatus.TokensApproved);
			}

			setDepositState(TokenDepositStatus.DepositingTokens);
			const depositTx = await writeContractAsync({
				abi: orderBookJson.abi,
				address: vault.orderbook.id as `0x${string}`,
				functionName: 'deposit2',
				args: [vault.token.address, BigInt(vault.vaultId), parsedAmount, []],
				chainId: chain.id as (typeof config.chains)[number]['id']
			});
			setDepositTxHash(depositTx);

			setDepositState(TokenDepositStatus.WaitingForDepositConfirmation);

			await waitForTransactionReceipt(config, {
				hash: depositTx,
				confirmations: 1
			});
			setDepositState(TokenDepositStatus.Done);
			refetchBalance?.();
			onSuccess?.();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setDepositState(TokenDepositStatus.Error);
			console.error(error.message);
			setError(error.details || 'An error occured while confirming your deposit.');
			return;
		}
	};

	const handleMaxClick = () => {
		if (connectedWalletBalance === BigInt(0)) {
			return;
		} else if (!connectedWalletBalance) {
			return setError('No balance found');
		}
		const formattedBalance = formatUnits(
			BigInt(connectedWalletBalance),
			Number(vault.token.decimals)
		);
		form.setValue('depositAmount', formattedBalance as unknown as number);
		setRawAmount(formattedBalance);
		form.setFocus('depositAmount');
	};

	const connect = async (open: boolean) => {
		if (!address && !connectModalOpen) {
			openConnectModal?.();
		}
		if (address) setOpen(open);
	};

	const handleDismiss = () => {
		setOpen(false);
		setDepositTxHash(null);
		setDepositState(TokenDepositStatus.Idle);
		setError(null);
	};

	return (
		<Dialog open={open} onOpenChange={connect}>
			<DialogTrigger>
				<span
					className={cn(
						buttonVariants(),
						'bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-colors cursor-pointer'
					)}
				>
					Deposit
				</span>
			</DialogTrigger>
			<DialogContent className="bg-white">
				{depositState === TokenDepositStatus.Idle && (
					<DialogHeader>
						<DialogTitle>Deposit</DialogTitle>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(async () => {
									await deposit();
								})}
								className="space-y-8"
							>
								<FormField
									control={form.control}
									name="depositAmount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Amount</FormLabel>
											{connectedWalletBalance !== undefined && (
												<div className="text-sm text-gray-500">
													Your {vault.token.symbol} Balance:{' '}
													<strong>
														{formatUnits(
															BigInt(connectedWalletBalance),
															Number(vault.token.decimals)
														)}
													</strong>
												</div>
											)}
											<FormControl>
												<Input
													data-testid={'deposit-input'}
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
									data-testid="submit-button"
									type="submit"
									disabled={!!error || Number(depositAmount) === 0}
								>
									Submit
								</Button>
							</form>
						</Form>
					</DialogHeader>
				)}
				{depositState !== TokenDepositStatus.Idle && (
					<div>
						<DialogTitle className="w-full font-light text-2xl mb-4">
							Depositing your tokens
						</DialogTitle>
						{depositState === TokenDepositStatus.Error ? (
							<div className="flex flex-col gap-4  justify-center">
								<div className="bg-red-200  text-black p-4 rounded-lg flex flex-col gap-2">
									<p>Failed to deposit.</p>
									<p data-testid="error-message">{error}</p>
								</div>
								<Button className="w-fit" onClick={handleDismiss}>
									Dismiss
								</Button>
							</div>
						) : depositState === TokenDepositStatus.Done ? (
							<div className="flex flex-col gap-4  justify-center">
								<div className="bg-green-200 text-black p-4 rounded-lg flex flex-col gap-2">
									<p>Deposit completed successfully!</p>
								</div>
								<div className="flex gap-2">
									{chain?.blockExplorers?.default.url && depositTxHash && (
										<a
											href={(chain?.blockExplorers.default.url as string) + '/tx/' + depositTxHash}
											target="_blank"
											rel="noreferrer"
										>
											<Button className="w-fit">View Transaction</Button>
										</a>
									)}
									<Button className="w-fit" onClick={handleDismiss}>
										Dismiss
									</Button>
								</div>
							</div>
						) : (
							<div className={`transition-opacity duration-1000 flex flex-col`}>
								<div className="flex items-center my-4">
									<div
										className={`text-2xl text-white rounded-full flex items-center justify-center mr-4 transition-all ${
											depositState === TokenDepositStatus.Pending
												? 'bg-gray-400 w-10 h-10'
												: depositState === TokenDepositStatus.CheckingAllowance ||
													  depositState === TokenDepositStatus.ApprovingTokens ||
													  depositState === TokenDepositStatus.WaitingForApprovalConfirmation
													? 'bg-amber-500 w-12 h-12'
													: 'bg-emerald-600 w-10 h-10'
										}`}
									>
										{1}
									</div>
									<div className="text-lg">
										{depositState === TokenDepositStatus.Pending ? (
											<span className="text-gray-500">Approve {vault.token.symbol}</span>
										) : depositState === TokenDepositStatus.CheckingAllowance ? (
											<span className="animate-pulse">
												Checking allowance for {vault.token.symbol}...
											</span>
										) : depositState === TokenDepositStatus.ApprovingTokens ? (
											<span className="animate-pulse">
												Approving allowance for {vault.token.symbol}...
											</span>
										) : depositState === TokenDepositStatus.WaitingForApprovalConfirmation ? (
											<span className="animate-pulse">Waiting for approval confirmation...</span>
										) : (
											`${vault.token.symbol} allowance approved`
										)}
									</div>
								</div>

								<div className="flex items-center my-4">
									<div
										className={`text-2xl text-white rounded-full transition-all flex items-center justify-center mr-4 ${
											depositState === TokenDepositStatus.DepositingTokens
												? 'bg-amber-500 w-12 h-12'
												: depositState === TokenDepositStatus.WaitingForDepositConfirmation
													? 'bg-amber-500 w-12 h-12'
													: depositState === TokenDepositStatus.TokensDeposited
														? 'bg-emerald-600 w-10 h-10'
														: 'bg-gray-400 w-10 h-10'
										}`}
									>
										{2}
									</div>
									<div className="text-lg">
										{depositState === TokenDepositStatus.DepositingTokens ? (
											<span className="animate-pulse">
												Depositing {rawAmount} {vault.token.symbol}...
											</span>
										) : depositState === TokenDepositStatus.WaitingForDepositConfirmation ? (
											<span className="animate-pulse">Waiting for deposit confirmation...</span>
										) : depositState === TokenDepositStatus.TokensDeposited ? (
											'Deposit complete.'
										) : (
											<span className="text-gray-500">
												Depositing {rawAmount} {vault.token.symbol}...
											</span>
										)}
									</div>
								</div>
							</div>
						)}
						{chain?.blockExplorers?.default.url &&
							depositTxHash &&
							depositState !== TokenDepositStatus.Done && (
								<a
									href={(chain?.blockExplorers.default.url as string) + '/tx/' + depositTxHash}
									target="_blank"
									rel="noreferrer"
								>
									<Button className="w-fit">View Transaction</Button>
								</a>
							)}
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};
