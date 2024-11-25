'use client';
import { getStrategyAnalytics } from '@/app/_queries/getStrategyAnalytics';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TokenAndBalance } from './TokenAndBalance';
import { formatTimestampSecondsAsLocal } from '../_services/dates';
import { Button } from '@/components/ui/button';
import { orderBookJson } from '@/public/_abis/OrderBook';
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';
import { decodeAbiParameters } from 'viem';
import TradesTable from './TradesTable';
import QuotesTable, { QUERY_KEY as QUOTES_QUERY_KEY } from './QuotesTable';
import { Input, Output } from '../types';
import { SupportedChains } from '../_types/chains';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { waitForTransactionReceipt } from '@wagmi/core';
import { config } from '../providers';
import { Badge } from 'flowbite-react';
import { getNetworkSubgraphs } from '../_queries/subgraphs';
import { isAddressEqual, getAddress } from 'viem';

interface props {
	orderHash: string;
	network: string;
}

enum RemovalStatus {
	Idle = 'Remove strategy',
	Confirming = 'Confirm removal in wallet...',
	Removing = 'Removing strategy...',
	Removed = 'Stategy removed'
}

const Property = ({
	name,
	value,
	children
}: {
	name: string;
	value?: string;
	children?: React.ReactNode;
}) => (
	<div className="flex justify-between flex-col md:flex-row">
		<span className="font-semibold">{name}</span>
		<span>{value || children}</span>
	</div>
);

const QUERY_KEY = 'trades';
const SYNCED_QUERY_KEY = 'trades-quotes';

const StrategyAnalytics = ({ orderHash, network }: props) => {
	const queryClient = useQueryClient();
	const { switchChainAsync } = useSwitchChain();
	const { connectModalOpen, openConnectModal } = useConnectModal();
	const [removalStatus, setRemovalStatus] = useState(RemovalStatus.Idle);
	const { writeContractAsync } = useWriteContract();
	const address = useAccount().address;
	const userchain = useAccount().chain;
	const chain = SupportedChains[network as keyof typeof SupportedChains];

	const [pollingInterval, setPollingInterval] = useState<number>(10000);

	const subgraphUrl = getNetworkSubgraphs().find(
		(net) => net.name.toLowerCase() === network.toLowerCase()
	)?.subgraphUrl;

	const switchChain = async () => {
		if (userchain && chain.id !== userchain.id) {
			await switchChainAsync({ chainId: chain.id });
		}
	};

	const removeOrder = async () => {
		setRemovalStatus(RemovalStatus.Confirming);
		if (!address && !connectModalOpen) {
			openConnectModal?.();
			return;
		}
		await switchChain();
		try {
			const orderStruct = [orderBookJson.abi[17].inputs[2]];
			const order = decodeAbiParameters(orderStruct, query.data.orderBytes)[0];

			const hash = await writeContractAsync({
				abi: orderBookJson.abi,
				address: query.data.orderbook.id,
				functionName: 'removeOrder2',
				args: [order, []],
				chainId: chain.id
			});
			setRemovalStatus(RemovalStatus.Removing);

			await waitForTransactionReceipt(config, {
				hash,
				confirmations: 1
			});

			while (query.data.active) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				await query.refetch();
			}
			setRemovalStatus(RemovalStatus.Removed);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			setRemovalStatus(RemovalStatus.Idle);
			console.error('error', e.message);
		}
	};

	const refetchQuotes = async () => {
		await queryClient.refetchQueries({
			queryKey: [QUOTES_QUERY_KEY],
			exact: false
		});
	};

	const query = useQuery({
		queryKey: [SYNCED_QUERY_KEY, QUERY_KEY, orderHash],
		queryFn: () => getStrategyAnalytics(orderHash, network, subgraphUrl as string),
		enabled: !!orderHash && !!subgraphUrl,
		retry: 2,
		refetchInterval: pollingInterval
	});

	useEffect(() => {
		if (query.isError) {
			setPollingInterval(0);
		}
	}, [query]);

	// is the owner of the strategy the connected wallet?
	const isOwner =
		address &&
		query?.data?.owner &&
		isAddressEqual(getAddress(address), getAddress(query.data.owner));

	console.log({ address, owner: query?.data?.owner });

	return (
		<div className="container flex-grow pt-8 pb-safe">
			{!subgraphUrl && <div data-testid="no-sg-error">No subgraph found for this network</div>}
			{query.isLoading && <div data-testid="loading-indicator">Loading...</div>}
			{query.isError && <div data-testid="query-error">{query.error.message}</div>}
			{query.data && subgraphUrl && (
				<>
					<div className="flex flex-col gap-y-4">
						<div className="flex md:flex-row flex-col gap-4 justify-between items-center mb-8">
							<h1 className="text-2xl font-semibold">Strategy Analytics</h1>
							<div className="flex gap-4">
								<Badge
									data-testid="strategy-status"
									size="2xl"
									className="py-2 px-4"
									color={query.data.active ? 'green' : 'red'}>
									{query.data.active ? 'Active' : 'Inactive'}
								</Badge>

								{query.data.active && isOwner && (
									<Button
										data-testid="remove-strategy-btn"
										className={removalStatus !== RemovalStatus.Idle ? 'animate-pulse' : ''}
										onClick={() => {
											removeOrder();
										}}>
										{removalStatus}
									</Button>
								)}
							</div>
						</div>
						<Property name="Chain">
							<span className="break-words">
								{network[0].toUpperCase() + network.substring(1).toLowerCase()}
							</span>
						</Property>
						<Property name="Order hash">
							<span className="break-words">{orderHash}</span>
						</Property>
						<Property name="Transaction ID">
							<span className="break-words">{query.data.addEvents[0].transaction.id}</span>
						</Property>
						<Property
							name="Created"
							value={formatTimestampSecondsAsLocal(
								BigInt(query.data.addEvents[0].transaction.timestamp)
							)}
						/>
						<Property name="Active" value={query.data.active ? 'Active' : 'Inactive'} />
						<Property name="Owner">
							<span className="break-words">{query.data.owner}</span>
						</Property>
						<Property name="Number of trades" value={query.data.trades?.length || '0'} />
						<div className="grid md:grid-cols-2 gap-4">
							{query.data.inputs && (
								<div className="flex flex-col gap-2">
									<h2 className="font-semibold mb-2">Input tokens</h2>
									{query.data.inputs.map((vault: Input, i: number) => {
										return (
											<div key={i}>
												<TokenAndBalance
													input={vault}
													deposit
													withdraw
													network={network}
													onDepositWithdrawSuccess={refetchQuotes}
													showDepositWithdraw={isOwner}
												/>
											</div>
										);
									})}
								</div>
							)}
							{query.data.inputs && (
								<div className="flex flex-col gap-2">
									<h2 className="font-semibold mb-2">Output tokens</h2>
									{query.data.outputs.map((vault: Output, i: number) => {
										return (
											<div key={i}>
												<TokenAndBalance
													input={vault}
													deposit
													withdraw
													network={network}
													onDepositWithdrawSuccess={refetchQuotes}
													showDepositWithdraw={isOwner}
												/>
											</div>
										);
									})}
								</div>
							)}
						</div>
					</div>
					<QuotesTable
						syncedQueryKey={SYNCED_QUERY_KEY}
						order={query.data}
						subgraphUrl={subgraphUrl}
					/>
					<TradesTable trades={query.data.trades} />
				</>
			)}
		</div>
	);
};

export default StrategyAnalytics;
