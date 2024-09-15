import { getAddOrderCalldata } from "@rainlanguage/orderbook/common";
import {
  decodeFunctionData,
  encodeFunctionData,
  parseUnits,
  toHex,
} from "viem";
import { FrameState } from "../_types/frame";
import { orderBookJson } from "@/public/_abis/OrderBook";
import { TokenDeposit } from "../_components/SubmissionModal";

interface DecodedAddOrderCallData {
  args?: {
    validOutputs?: {
      vaultId: string;
      token: string;
    }[];
  }[];
}

export const getSubmissionTransactionData = async (
  currentState: FrameState,
  dotrainText: string,
  tokenDeposits: TokenDeposit[]
) => {
  const addOrderCalldata = await getAddOrderCalldata(
    dotrainText,
    currentState.deploymentOption?.deployment || ""
  );

  // Get the vault ids from the decoded calldata
  const decodedAddOrderCalldata = decodeFunctionData({
    data: toHex(addOrderCalldata),
    abi: orderBookJson.abi,
  }) as DecodedAddOrderCallData;

  const depositCalldatas = tokenDeposits.map((tokenDeposit) => {
    const depositAmount = parseUnits(
      String(tokenDeposit.amount),
      tokenDeposit.tokenInfo.decimals
    );

    const vaultId = decodedAddOrderCalldata.args?.[0]?.validOutputs?.find(
      (io) => io.token === tokenDeposit.tokenAddress
    )?.vaultId;

    if (!vaultId) {
      throw new Error("Vault id not found");
    }

    return encodeFunctionData({
      functionName: "deposit2",
      abi: orderBookJson.abi,
      args: [tokenDeposit.tokenAddress, toHex(vaultId), depositAmount, []],
    });
  });

  return {
    addOrderCalldata: toHex(addOrderCalldata),
    depositCalldatas,
  };
};
