import { formatUnits } from 'viem';
import { WithdrawalModal } from './WithdrawalModal';
import { DepositModal } from './DepositModal';
import { Input, Output } from '../types';

export function TokenAndBalance({
	input,
	withdraw,
	deposit,
	network
}: {
	input: Input | Output;
	network: string;
	withdraw?: boolean;
	deposit?: boolean;
}) {
	return (
		<div className="flex border rounded-xl p-2 gap-x-3 items-center justify-between">
			<div className="flex flex-col gap-y-1">
				<div>{withdraw ? input.token.name : input.token.symbol}</div>
				<div className="text-gray-500">
					Strategy Balance:{' '}
					{Number(Number(formatUnits(input.balance, Number(input.token.decimals))).toFixed(8))}
				</div>
			</div>
			<div className="flex gap-2">
				{deposit && <DepositModal vault={input} network={network} />}
				{withdraw && <WithdrawalModal vault={input} network={network} />}
			</div>
		</div>
	);
}
