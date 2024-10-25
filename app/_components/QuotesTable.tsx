import { Table } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
import { quote } from '@rainlanguage/orderbook';
import * as allChains from 'wagmi/chains';
import { formatEther, formatUnits, fromHex } from 'viem';
import { Input, Order, Output } from '../types';

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
	const specs = order.inputs.reduce((acc: quote.QuoteSpec[], input: Input, inputIndex: number) => {
		return [
			...acc,
			...order.outputs.reduce((acc: quote.QuoteSpec[], output: Output, outputIndex: number) => {
				// Prevents TokenSelfTrade error
				if (order.inputs[inputIndex].token.address === order.outputs[outputIndex].token.address) {
					return acc;
				}

				return [
					...acc,
					{
						orderHash: order.orderHash,
						inputIOIndex: inputIndex,
						outputIOIndex: outputIndex,
						signedContext: [],
						orderbook: order.orderbook.id
					}
				];
			}, [])
		];
	}, []);

	const query = useQuery<quote.OrderQuoteValue[]>({
		queryKey: [syncedQueryKey, QUERY_KEY, order.orderHash],
		queryFn: () => getQuotes(order, specs),
		enabled: orderChainKey !== undefined && subgraphUrl !== undefined
	});

	const getQuotes = async (order: Order, specs: quote.QuoteSpec[]) => {
		if (!subgraphUrl) return;
		if (orderChainKey === undefined) return;
		try {
			const result = await quote.doQuoteSpecs(
				specs,
				subgraphUrl,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
							query.data.map((quote: quote.OrderQuoteValue, i: number) => {
								if (typeof quote === 'string') return null;
								return (
									<Table.Row key={i} data-testid="data">
										<Table.Cell>
											{order.inputs[specs[i].inputIOIndex].token.symbol}/
											{order.outputs[specs[i].outputIOIndex].token.symbol}
										</Table.Cell>
										<Table.Cell>
											{formatEther(fromHex(quote.maxOutput as `0x${string}`, 'bigint'))}
										</Table.Cell>
										<Table.Cell>
											{formatEther(fromHex(quote.ratio as `0x${string}`, 'bigint'))}
										</Table.Cell>
										<Table.Cell>
											{formatUnits(
												fromHex(quote.maxOutput as `0x${string}`, 'bigint') *
													fromHex(quote.ratio as `0x${string}`, 'bigint'),
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
