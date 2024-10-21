import { formatUnits } from 'viem';
import { Table } from 'flowbite-react';
import { Trade } from '../types';
import { formatTimestampSecondsAsLocal } from '../_services/dates';

interface props {
	trades: Trade[];
}

const TradesTable = ({ trades }: props) => {
	const sortByTimestamp = (a: Trade, b: Trade) => {
		return +b.tradeEvent.transaction.timestamp - +a.tradeEvent.transaction.timestamp;
	};

	const sortedTrades = trades.sort(sortByTimestamp);
	return (
		<div className="w-full overflow-x-scroll pt-6">
			<h1 className="text-2xl mb-2 font-semibold">Trades</h1>
			<Table hoverable striped>
				<Table.Head>
					<Table.HeadCell>DATE</Table.HeadCell>
					<Table.HeadCell>SENDER</Table.HeadCell>
					<Table.HeadCell>TRANSACTION HASH</Table.HeadCell>
					<Table.HeadCell>INPUT</Table.HeadCell>
					<Table.HeadCell>OUTPUT</Table.HeadCell>
					<Table.HeadCell>IO RATIO</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{sortedTrades.map((trade: Trade, i: number) => (
						<Table.Row key={i}>
							<Table.Cell>
								{formatTimestampSecondsAsLocal(BigInt(trade.tradeEvent.transaction.timestamp))}
							</Table.Cell>
							<Table.Cell
								onClick={() => navigator.clipboard.writeText(trade.tradeEvent.sender)}
								className="cursor-pointer"
							>
								{trade.tradeEvent.sender.slice(0, 5)}...
								{trade.tradeEvent.sender.slice(-1 * 5)}
							</Table.Cell>
							<Table.Cell
								onClick={() => navigator.clipboard.writeText(trade.tradeEvent.transaction.id)}
								className="cursor-pointer"
							>
								{trade.tradeEvent.transaction.id.slice(0, 5)}...
								{trade.tradeEvent.transaction.id.slice(-1 * 5)}
							</Table.Cell>
							<Table.Cell>
								<div className="flex gap-x-2">
									{formatUnits(
										trade.inputVaultBalanceChange.amount,
										Number(trade.inputVaultBalanceChange.vault.token.decimals)
									)}{' '}
									{trade.inputVaultBalanceChange.vault.token.symbol}
								</div>
							</Table.Cell>
							<Table.Cell>
								<div className="flex gap-x-2">
									{formatUnits(
										BigInt(Math.abs(Number(trade.outputVaultBalanceChange.amount))),
										Number(trade.outputVaultBalanceChange.vault.token.decimals)
									)}{' '}
									{trade.outputVaultBalanceChange.vault.token.symbol}
								</div>
							</Table.Cell>
							<Table.Cell>
								{Math.abs(
									Number(
										BigInt(trade.inputVaultBalanceChange.amount) / BigInt(trade.outputVaultBalanceChange.amount)
									)
								).toFixed(2)}{' '}
								{trade.inputVaultBalanceChange.vault.token.symbol}/
								{trade.outputVaultBalanceChange.vault.token.symbol}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
};

export default TradesTable;
