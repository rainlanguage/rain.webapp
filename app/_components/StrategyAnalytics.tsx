'use client';
import { getTransactionAnalyticsData } from '@/app/_queries/strategyAnalytics';
import { useQuery } from '@tanstack/react-query';
import { TokenAndBalance } from './TokenAndBalance';
import { formatTimestampSecondsAsLocal } from '../_services/dates';
import { Button } from '@/components/ui/button';
import { orderBookJson } from '@/public/_abis/OrderBook';
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';
import { decodeAbiParameters } from 'viem';
import TradesTable from './TradesTable';
import QuotesTable, { QuotesTableRef } from './QuotesTable';
import { Input, Output } from '../types';
import { SupportedChains } from '../_types/chains';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRef } from 'react';

interface props {
	orderHash: string;
	network: string;
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

const StrategyAnalytics = ({ orderHash, network }: props) => {
	const { switchChainAsync } = useSwitchChain();
	const { connectModalOpen, openConnectModal } = useConnectModal();
	const query = useQuery({
		queryKey: [orderHash],
		queryFn: () => getTransactionAnalyticsData(orderHash, network),
		enabled: !!orderHash,
		refetchInterval: 10000
	});

	const { writeContractAsync } = useWriteContract();

	const address = useAccount().address;
	const userchain = useAccount().chain;
	const chain = SupportedChains[network as keyof typeof SupportedChains];

	const switchChain = async () => {
		if (userchain && chain.id !== userchain.id) {
			await switchChainAsync({ chainId: chain.id });
		}
	};

	const removeOrder = async () => {
		if (!address && !connectModalOpen) {
			openConnectModal?.();
			return;
		}
		await switchChain();
		const orderStruct = [orderBookJson.abi[17].inputs[2]];
		const order = decodeAbiParameters(orderStruct, query.data.order.orderBytes)[0];

		await writeContractAsync({
			abi: orderBookJson.abi,
			address: query.data.order.orderbook.id,
			functionName: 'removeOrder2',
			args: [order, []],
			chainId: chain.id
		});

		query.refetch();
	};

	const quotesTableRef = useRef<QuotesTableRef>(null);

	const refetchQuotes = () => {
		quotesTableRef.current?.getQuotes();
	};

	return (
		<div className="container flex-grow pt-8 pb-safe">
			{query.isLoading && <div>Loading...</div>}
			{query.isError && <div>{query.error.message}</div>}
			{query.data && (
				<>
					<div className="flex flex-col gap-y-4">
						<div className="flex md:flex-row flex-col gap-4 justify-between items-center mb-8">
							<h1 className="text-2xl font-semibold">Strategy Analytics</h1>
							{query.data.order.active && (
								<Button
									onClick={() => {
										removeOrder();
									}}
								>
									Remove strategy
								</Button>
							)}
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
							<span className="break-words">{query.data.transaction.id}</span>
						</Property>
						<Property
							name="Created"
							value={formatTimestampSecondsAsLocal(BigInt(query.data.transaction.timestamp))}
						/>
						<Property name="Active" value={query.data.order.active ? 'Active' : 'Inactive'} />
						<Property name="Owner">
							<span className="break-words">{query.data.order.owner}</span>
						</Property>
						<Property name="Number of trades" value={query.data.order.trades?.length || '0'} />
						<div className="grid md:grid-cols-2 gap-4">
							{query.data.order.inputs && (
								<div className="flex flex-col gap-2">
									<h2 className="font-semibold mb-2">Input tokens</h2>
									{query.data.order.inputs.map((vault: Input, i: number) => {
										return (
											<div key={i}>
												<TokenAndBalance
													input={vault}
													deposit
													withdraw
													network={network}
													onDepositWithdrawSuccess={refetchQuotes}
												/>
											</div>
										);
									})}
								</div>
							)}
							{query.data.order.inputs && (
								<div className="flex flex-col gap-2">
									<h2 className="font-semibold mb-2">Output tokens</h2>
									{query.data.order.outputs.map((vault: Output, i: number) => {
										return (
											<div key={i}>
												<TokenAndBalance
													input={vault}
													deposit
													withdraw
													network={network}
													onDepositWithdrawSuccess={refetchQuotes}
												/>
											</div>
										);
									})}
								</div>
							)}
						</div>
					</div>
					<QuotesTable order={query.data.order} ref={quotesTableRef} />
					<TradesTable trades={query.data.order.trades} />
				</>
			)}
		</div>
	);
};

export default StrategyAnalytics;
