import { getAddOrderCalldata } from "@rainlanguage/orderbook/common";
import {
  decodeFunctionData,
  encodeFunctionData,
  parseUnits,
  toHex,
} from "viem";
import { FrameState } from "../_types/frame";
import { orderBookJson } from "@/public/_abis/OrderBook";

interface DecodedAddOrderCallData {
  args?: {
    validInputs?: {
      vaultId?: string;
    }[];
  }[];
}

export const getSubmissionTransactionData = async (
  currentState: FrameState,
  dotrainText: string,
  outputTokenAddress: string,
  outputTokenDecimals: number
) => {
  const depositAmount = parseUnits(
    String(currentState.deposit),
    outputTokenDecimals
  );

  const addOrderCalldata = await getAddOrderCalldata(
    dotrainText,
    currentState.deploymentOption.deployment
  );

  // Get randomly generated vaultId from addOrder call data
  const decodedAddOrderCalldata = decodeFunctionData({
    data: toHex(addOrderCalldata),
    abi: orderBookJson.abi,
  }) as DecodedAddOrderCallData;
  const vaultId = decodedAddOrderCalldata?.args?.[0]?.validInputs?.[0]
    ?.vaultId as string;

  const depositCallData = encodeFunctionData({
    functionName: "deposit2",
    abi: orderBookJson.abi,
    args: [outputTokenAddress, toHex(vaultId), depositAmount, []],
  });

  return {
    addOrderCalldata: toHex(addOrderCalldata),
    depositCallData,
  };
};
