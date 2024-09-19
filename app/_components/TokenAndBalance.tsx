import { formatUnits } from "viem";
import { WithdrawalModal } from "./WithdrawalModal";

export function TokenAndBalance({
  input,
  withdraw,
}: {
  input: any;
  withdraw?: boolean;
}) {
  return (
    <div className="flex border rounded-xl p-2 gap-x-3 items-center justify-between">
      <div className="flex flex-col gap-y-1">
        <div>{withdraw ? input.token.name : input.token.symbol}</div>
        <div className="text-gray-500">
          Balance:{" "}
          {Number(
            Number(formatUnits(input.balance, input.token.decimals)).toFixed(8)
          )}
        </div>
      </div>
      {withdraw && <WithdrawalModal vault={input} />}
    </div>
  );
}
