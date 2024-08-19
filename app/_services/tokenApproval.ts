import { erc20Abi, parseUnits, toHex } from "viem";
import { FrameState } from "../_types/frame";
import { YamlData } from "../_types/yamlData";
import { getPublicClient } from "./frameTransactions";
import { readContract } from "viem/actions";

export const hasEnoughTokenApproval = async (
  currentState: FrameState,
  yamlData: YamlData,
  requesterCustodyAddress: `0x${string}`
) => {
  const deployment =
    yamlData.deployments[currentState.deploymentOption.deployment];
  const order = yamlData.orders[deployment.order];

  const orderBook = yamlData.orderbooks[order.orderbook];
  const orderBookAddress = toHex(BigInt(orderBook.address));

  const network = yamlData.networks[order.network];

  const outputToken = yamlData.tokens[order.outputs[0].token];
  const outputTokenAddress = toHex(BigInt(outputToken.address));
  const client = getPublicClient(network);
  const outputTokenDecimals = await readContract(client, {
    abi: erc20Abi,
    address: outputTokenAddress,
    functionName: "decimals",
  });

  // Get token approval for output token, if required
  const depositAmount = parseUnits(
    String(currentState.deposit),
    outputTokenDecimals
  );
  const existingAllowance = await readContract(client, {
    abi: erc20Abi,
    address: outputTokenAddress,
    functionName: "allowance",
    args: [requesterCustodyAddress, orderBookAddress],
  });
  return existingAllowance >= depositAmount;
};
