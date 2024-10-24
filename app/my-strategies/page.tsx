'use client';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../_queries/getOrders';
import { useAccount } from 'wagmi';
import { Spinner, Table } from 'flowbite-react';
import { TableRowLink, TableCellLink } from '@/app/_components/TableRowLink';
import { formatTimestampSecondsAsLocal } from '../_services/dates';
import { TokenAndBalance } from '../_components/TokenAndBalance';
import { Input, Order, Output } from '../types';

export default function MyStrategies() {
	const account = useAccount();
	const query = useQuery({
		queryKey: [account.address],
		queryFn: () => getOrders(account?.address),
		enabled: !!account.address,
		refetchInterval: 10000
	});

	return (
		<div className="flex-grow w-full flex flex-col items-start justify-items-start md:p-8 p-2 container">
			<h1 className="text-2xl font-semibold mb-4">My Strategies</h1>
			{!account.isConnected && <div>Connect your wallet to view your strategies.</div>}
			<Spinner className={query.isLoading ? 'visible' : 'hidden'} />
			{query.isError && <div>Error: {query.error.message}</div>}
			{query.data && (
				<div className="w-full overflow-x-scroll">
					<Table hoverable>
						<Table.Head>
							<Table.HeadCell>Network</Table.HeadCell>
							<Table.HeadCell>Active</Table.HeadCell>
							<Table.HeadCell>Time Added</Table.HeadCell>
							<Table.HeadCell>Inputs</Table.HeadCell>
							<Table.HeadCell>Outputs</Table.HeadCell>
							<Table.HeadCell>Trades</Table.HeadCell>
						</Table.Head>
						<Table.Body>
							{query.data.map((order: Order, i: number) => (
								<TableRowLink
									key={i}
									data-testid="order-row"
									link={`${window.location.origin}/my-strategies/${order.orderHash}-${order.network}`}>
									<TableCellLink>{order.network}</TableCellLink>
									<TableCellLink>
										{order.active ? (
											<div className="text-emerald-500">Active</div>
										) : (
											<div className="text-red-500">Inactive</div>
										)}
									</TableCellLink>
									<TableCellLink>
										{formatTimestampSecondsAsLocal(BigInt(order.timestampAdded))}
									</TableCellLink>
									<TableCellLink>
										<div className="flex gap-x-2">
											{order.inputs.map((input: Input, i: number) => (
												<TokenAndBalance input={input} key={i} network={order.network} />
											))}
										</div>
									</TableCellLink>
									<TableCellLink>
										<div className="flex gap-x-2">
											{order.outputs.map((output: Output, i: number) => (
												<TokenAndBalance input={output} key={i} network={order.network} />
											))}
										</div>
									</TableCellLink>
									<TableCellLink>
										{order.trades.length === 1000 ? '>999' : order.trades.length}
									</TableCellLink>
								</TableRowLink>
							))}
						</Table.Body>
					</Table>
				</div>
			)}
		</div>
	);
}
