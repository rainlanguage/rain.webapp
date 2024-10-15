import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StrategyRemoveStatus } from './StrategyAnalytics';
import { useState } from 'react';
import { orderBookJson } from '@/public/_abis/OrderBook';
import { config } from '../providers';
import { decodeAbiParameters } from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core';
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { SupportedChains } from '../_types/chains';
import { Input } from '../types';

interface RemoveModalProps {
	vault: Input;
	network: string;
	onComplete: () => void;
}

export const RemoveModal = ({ vault, network, onComplete }: RemoveModalProps) => {
	const { switchChainAsync } = useSwitchChain();
	const { connectModalOpen, openConnectModal } = useConnectModal();

	const { writeContractAsync } = useWriteContract();
	const [removeStatus, setRemoveStatus] = useState<StrategyRemoveStatus>(StrategyRemoveStatus.Idle);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const address = useAccount().address;
	const userchain = useAccount().chain;
	const chain = SupportedChains[network as keyof typeof SupportedChains];

	const switchChain = async () => {
		if (userchain && chain.id !== userchain.id) {
			await switchChainAsync({ chainId: chain.id });
		}
	};

	const handleClose = () => {
		setError(null);
		setRemoveStatus(StrategyRemoveStatus.Idle);
		setDialogOpen(false);
	};

	const removeOrder = async () => {
		if (!address && !connectModalOpen) {
			openConnectModal?.();
			return;
		}
		try {
			setRemoveStatus(StrategyRemoveStatus.WaitingForConfirmation);
			await switchChain();

			const orderStruct = [orderBookJson.abi[17].inputs[2]];

			const order = decodeAbiParameters(orderStruct, vault.orderBytes)[0];

			const removeTx = await writeContractAsync({
				abi: orderBookJson.abi,
				address: vault.orderbook.id as `0x${string}`,
				functionName: 'removeOrder2',
				args: [order, []],
				chainId: chain.id
			});
			setRemoveStatus(StrategyRemoveStatus.Removing);

			try {
				console.log('awaiting transaction receipt');
				await waitForTransactionReceipt(config, {
					hash: removeTx,
					confirmations: 1
				});
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (e: any) {
				setRemoveStatus(StrategyRemoveStatus.Error);

				console.error(e.message);
				setError(e.details || 'An error occurred while removing the strategy.');
			}
			setRemoveStatus(StrategyRemoveStatus.Completed);
			onComplete();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			setRemoveStatus(StrategyRemoveStatus.Error);
			console.error(e.message);
			setError(e.details || 'An error occurred while removing the strategy.');
		}
	};

	const handleRemoveOrder = async () => {
		setDialogOpen(true);
		await removeOrder();
	};

	const renderStatusStep = (
		step: number,
		label: string,
		isActive: boolean,
		isCompleted: boolean
	) => (
		<div className="flex items-center my-4">
			<div
				className={`text-2xl text-white rounded-full flex items-center justify-center mr-4 transition-all ${
					isActive
						? 'bg-amber-500 w-12 h-12'
						: isCompleted
							? 'bg-emerald-600 w-10 h-10'
							: 'bg-gray-400 w-10 h-10'
				}`}
			>
				{step}
			</div>
			<div className="text-lg">
				<span className={`${isActive ? 'text-amber-600 animate-pulse' : 'text-gray-500'}`}>
					{label}
				</span>
			</div>
		</div>
	);

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl">
					Remove Strategy
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold">Remove Strategy</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					{removeStatus === StrategyRemoveStatus.Error ? (
						<div className="flex flex-col gap-4 justify-center">
							<div className="bg-red-200 text-black p-4 rounded-lg flex flex-col gap-2">
								<p>Failed to remove the strategy.</p>
								<p>{error}</p>
							</div>
							<Button className="w-fit" onClick={handleClose}>
								Dismiss
							</Button>
						</div>
					) : removeStatus === StrategyRemoveStatus.Idle ? (
						<div className="flex flex-col items-center space-y-4">
							<p className="text-red-600 font-semibold text-center" data-testid="confirm-warning">
								Are you sure you want to remove the strategy? This action cannot be undone.
							</p>
							<Button onClick={handleRemoveOrder} className="w-full bg-blue-500 hover:bg-blue-700">
								Confirm Removal
							</Button>
						</div>
					) : (
						<>
							{renderStatusStep(
								1,
								'Waiting for confirmation...',
								removeStatus === StrategyRemoveStatus.WaitingForConfirmation,
								removeStatus >= StrategyRemoveStatus.Removing
							)}
							{renderStatusStep(
								2,
								'Removing strategy...',
								removeStatus === StrategyRemoveStatus.Removing,
								removeStatus === StrategyRemoveStatus.Completed
							)}
						</>
					)}
					{removeStatus === StrategyRemoveStatus.Completed && (
						<div className="bg-green-100 text-green-700 p-4 rounded-md">
							<p>Strategy removed successfully!</p>
						</div>
					)}
					{removeStatus !== StrategyRemoveStatus.Idle &&
						removeStatus !== StrategyRemoveStatus.Error && (
							<Button onClick={handleClose} className="w-full bg-gray-300">
								Close
							</Button>
						)}
				</div>
			</DialogContent>
		</Dialog>
	);
};
