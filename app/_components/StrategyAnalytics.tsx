'use client';
import { getTransactionAnalyticsData } from '@/app/_queries/strategyAnalytics';
import { useQuery } from '@tanstack/react-query';
import { TokenAndBalance } from './TokenAndBalance';
import { formatTimestampSecondsAsLocal } from '../_services/dates';
import { useAccount, useSwitchChain } from 'wagmi';
import TradesTable from './TradesTable';
import QuotesTable from './QuotesTable';
import { Input, Output } from '../types';
import { SupportedChains } from '../_types/chains';

import { RemoveModal } from './RemoveModal';

interface props {
	transactionId: string;
	network: string;
}

export enum StrategyRemoveStatus {
	Idle,
	Pending,
	Removing,
	WaitingForConfirmation,
	Completed,
	Error
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

const StrategyAnalytics = ({ transactionId, network }: props) => {
	const { switchChainAsync } = useSwitchChain();
	const query = useQuery({
		queryKey: [transactionId],
		queryFn: () => getTransactionAnalyticsData(transactionId, network),
		enabled: !!transactionId,
		refetchInterval: 10000
	});

	const address = useAccount().address;
	const userchain = useAccount().chain;
	const chain = SupportedChains[network as keyof typeof SupportedChains];

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
								<>
									<RemoveModal vault={query.data.order} network={network} />
								</>
							)}
						</div>
						<Property name="Chain">
							<span className="break-words">
								{network[0].toUpperCase() + network.substring(1).toLowerCase()}
							</span>
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
												<TokenAndBalance input={vault} deposit withdraw network={network} />
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
												<TokenAndBalance input={vault} deposit withdraw network={network} />
											</div>
										);
									})}
								</div>
							)}
						</div>
					</div>
					<QuotesTable order={query.data.order} />
					<TradesTable trades={query.data.order.trades} />
				</>
			)}
		</div>
	);
};

export default StrategyAnalytics;
