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
import { waitForTransactionReceipt } from 'viem/actions';
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { SupportedChains } from '../_types/chains';

interface RemoveModalProps {
	vault: any; // Adjust the type to match your vault type if available
	network: string;
}

export const RemoveModal = ({ vault, network }: RemoveModalProps) => {
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
				address: vault.orderbook.id,
				functionName: 'removeOrder2',
				args: [order, []],
				chainId: chain.id
			});
			setRemoveStatus(StrategyRemoveStatus.Removing);

			await waitForTransactionReceipt(config, {
				hash: removeTx,
				confirmations: 1
			});
			setRemoveStatus(StrategyRemoveStatus.Completed);
		} catch (e) {
			setRemoveStatus(StrategyRemoveStatus.Error);
			console.error(e.message);
			setError(e.details || 'An error occured while removing the strategy.');
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
				}`}>
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
					) : (
						<>
							{renderStatusStep(
								1,
								'Waiting for confirmation...',
								removeStatus === StrategyRemoveStatus.WaitingForConfirmation,
								removeStatus > StrategyRemoveStatus.WaitingForConfirmation
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
					<div className="flex gap-2">
						{removeStatus === StrategyRemoveStatus.Idle && (
							<Button onClick={handleRemoveOrder} className="w-full bg-blue-500 hover:bg-blue-700">
								Confirm Removal
							</Button>
						)}
						{removeStatus !== StrategyRemoveStatus.Idle &&
							removeStatus !== StrategyRemoveStatus.Error && (
								<Button onClick={handleClose} className="w-full bg-gray-300">
									Close
								</Button>
							)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
