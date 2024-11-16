import { formatUnits } from 'viem';
import { WithdrawalModal } from './WithdrawalModal';
import { DepositModal } from './DepositModal';
import { Input, Output } from '../types';

export function TokenAndBalance({
	input,
	withdraw,
	deposit,
	network,
	onDepositWithdrawSuccess,
	showDepositWithdraw
}: {
	input: Input | Output;
	network: string;
	withdraw?: boolean;
	deposit?: boolean;
	onDepositWithdrawSuccess?: () => void;
	showDepositWithdraw?: boolean;
}) {
	return (
		<div
			className="flex border rounded-xl p-2 gap-x-3 items-center justify-between"
			data-testid="token-balance"
		>
			<div className="flex flex-col gap-y-1">
				<div>{withdraw ? input.token.name : input.token.symbol}</div>
				<div className="text-gray-500" data-testid="strat-balance">
					Strategy Balance: {formatUnits(input.balance, Number(input.token.decimals))}
				</div>
			</div>
			<div className="flex gap-2">
				{deposit && showDepositWithdraw && (
					<DepositModal vault={input} network={network} onSuccess={onDepositWithdrawSuccess} />
				)}
				{withdraw && showDepositWithdraw && (
					<WithdrawalModal vault={input} network={network} onSuccess={onDepositWithdrawSuccess} />
				)}
			</div>
		</div>
	);
}
