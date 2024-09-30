import { formatUnits } from 'viem';
import { WithdrawalModal } from './WithdrawalModal';
import { Input, Output } from '../types';

export function TokenAndBalance({
	input,
	withdraw
}: {
	input: Input | Output;
	withdraw?: boolean;
}) {
	return (
		<div className="flex border rounded-xl p-2 gap-x-3 items-center justify-between">
			<div className="flex flex-col gap-y-1">
				<div>{withdraw ? input.token.name : input.token.symbol}</div>
				<div className="text-gray-500">
					Balance:{' '}
					{Number(Number(formatUnits(input.balance, Number(input.token.decimals))).toFixed(8))}
				</div>
			</div>
			{withdraw && <WithdrawalModal vault={input} />}
		</div>
	);
}
