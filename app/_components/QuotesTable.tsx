import { Table } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
import { quote } from '@rainlanguage/orderbook';
import { BatchOrderQuotesResponse } from '@rainlanguage/orderbook/quote';
import * as allChains from 'wagmi/chains';
import { formatEther, formatUnits, fromHex } from 'viem';
import { Order } from '../types';

export type QuotesTableRef = {
	getQuotes: () => Promise<void>;
};

interface props {
	syncedQueryKey: string;
	order: Order;
	subgraphUrl: string;
}

export const QUERY_KEY = 'quotes';

const QuotesTable = ({ syncedQueryKey, order, subgraphUrl }: props) => {
	const { ...chains } = allChains;
	const orderChainKey = Object.keys(chains).find((chain) => chain === order.network);
	const quoteOrder = {
		id: '',
		orderBytes: order.orderBytes,
		orderHash: order.orderHash,
		owner: order.owner,
		outputs: order.outputs.map((output) => ({
			id: '',
			token: {
				id: '',
				address: output.token.address,
				name: output.token.name,
				symbol: output.token.symbol,
				decimals: output.token.decimals.toString()
			},
			balance: output.balance.toString(),
			vaultId: output.vaultId.toString(),
			owner: order.owner,
			ordersAsOutput: [],
			ordersAsInput: [],
			balanceChanges: [],
			orderbook: {
				id: order.orderbook.id
			}
		})),
		inputs: order.inputs.map((input) => ({
			id: '',
			token: {
				id: '',
				address: input.token.address,
				name: input.token.name,
				symbol: input.token.symbol,
				decimals: input.token.decimals.toString()
			},
			balance: input.balance.toString(),
			vaultId: input.vaultId.toString(),
			owner: order.owner,
			ordersAsOutput: [],
			ordersAsInput: [],
			balanceChanges: [],
			orderbook: {
				id: order.orderbook.id
			}
		})),
		orderbook: {
			id: order.orderbook.id
		},
		active: order.active === 'true',
		addEvents: [],
		meta: null,
		timestampAdded: '',
		trades: []
	};

	const query = useQuery<BatchOrderQuotesResponse[]>({
		queryKey: [syncedQueryKey, QUERY_KEY, order.orderHash],
		queryFn: () => getQuotes(),
		enabled: orderChainKey !== undefined && subgraphUrl !== undefined
	});

	const getQuotes = async () => {
		if (!subgraphUrl) return;
		if (orderChainKey === undefined) return;
		try {
			const result = await quote.getOrderQuote(
				[quoteOrder],
				(chains as any)[orderChainKey].rpcUrls.default.http[0]
			);
			return result;
		} catch (e: unknown) {
			if (e instanceof Error) {
				throw new Error(e.message);
			}
		}
	};
	if (!order.subgraphUrl) return null;
	return (
		<div className="w-full overflow-x-scroll pt-6">
			<Table hoverable striped>
				<Table.Head>
					<Table.HeadCell>PAIR</Table.HeadCell>
					<Table.HeadCell>MAXIMUM OUTPUT</Table.HeadCell>
					<Table.HeadCell>IO RATIO</Table.HeadCell>
					<Table.HeadCell>MAXIMUM INPUT</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{query.error && <Table.Row>{query.error.message}</Table.Row>}
					{query.isLoading && (
						<Table.Row>
							<p className="p-4 animate-pulse">{'Loading quotes...'}</p>
						</Table.Row>
					)}
					{query.data &&
						(query.data.length > 0 ? (
							query.data.map((quote, i: number) => {
								if (quote === undefined) return null;
								if (quote.data === undefined) return null;
								return (
									<Table.Row key={i} data-testid="data">
										<Table.Cell>{quote.pair.pairName}</Table.Cell>
										<Table.Cell>
											{formatEther(fromHex(quote.data?.maxOutput as `0x${string}`, 'bigint'))}
										</Table.Cell>
										<Table.Cell>
											{formatEther(fromHex(quote.data?.ratio as `0x${string}`, 'bigint'))}
										</Table.Cell>
										<Table.Cell>
											{formatUnits(
												fromHex(quote.data?.maxOutput as `0x${string}`, 'bigint') *
													fromHex(quote.data?.ratio as `0x${string}`, 'bigint'),
												36
											)}
										</Table.Cell>
									</Table.Row>
								);
							})
						) : (
							<Table.Row>
								<Table.Cell colSpan={4} className="text-center">
									No quotes found
								</Table.Cell>
							</Table.Row>
						))}
				</Table.Body>
			</Table>
		</div>
	);
};

export default QuotesTable;
