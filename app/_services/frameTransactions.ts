import { transaction } from "frames.js/core";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  erc20Abi,
  http,
  parseUnits,
  toHex,
} from "viem";
import { YamlData } from "@/app/_types/yamlData";
import { FrameState } from "@/app/_types/frame";
import { readContract } from "viem/actions";
import { orderBookJson } from "@/public/_abis/OrderBook";
import { getSubmissionTransactionData } from "./transactionData";
import * as chains from "viem/chains";

export const getPublicClient = (network: any) => {
  return createPublicClient({
    chain: Object.values(chains).find(
      (chain) => chain.id === Number(network["chain-id"])
    ),
    transport: http(),
  });
};

export const getApprovalTransaction = async (
  currentState: FrameState,
  yamlData: YamlData
) => {
  // Get network and orderbook data from the yaml file
  const deployment =
    yamlData.deployments[currentState.deploymentOption.deployment];
  const order = yamlData.orders[deployment.order];
  const network = yamlData.networks[order.network];

  const orderBook = yamlData.orderbooks[order.orderbook];
  const orderBookAddress = toHex(BigInt(orderBook.address));

  const outputToken = yamlData.tokens[order.outputs[0].token];
  const outputTokenAddress = toHex(BigInt(outputToken.address));

  const client = getPublicClient(network);
  const outputTokenDecimals = await readContract(client, {
    abi: erc20Abi,
    address: outputTokenAddress,
    functionName: "decimals",
  });

  const depositAmount = parseUnits(
    String(currentState.deposit),
    outputTokenDecimals
  );

  const approvalCalldata = encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    args: [orderBookAddress, depositAmount],
  });

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: `eip155:${network["chain-id"]}`,
    method: "eth_sendTransaction",
    params: {
      abi: erc20Abi,
      to: outputTokenAddress,
      data: approvalCalldata,
    },
  });
};

export const getSubmissionTransaction = async (
  currentState: FrameState,
  yamlData: YamlData,
  dotrainText: string
) => {
  // Get network and orderbook data from the yaml file
  const deployment =
    yamlData.deployments[currentState.deploymentOption.deployment];
  const order = yamlData.orders[deployment.order];
  const network = yamlData.networks[order.network];

  const orderBook = yamlData.orderbooks[order.orderbook];
  const orderBookAddress = toHex(BigInt(orderBook.address));

  const outputToken = yamlData.tokens[order.outputs[0].token];
  const outputTokenAddress = toHex(BigInt(outputToken.address));

  const client = getPublicClient(network);
  const outputTokenDecimals = await readContract(client, {
    abi: erc20Abi,
    address: outputTokenAddress,
    functionName: "decimals",
  });

  const { addOrderCalldata, depositCallData } =
    await getSubmissionTransactionData(
      currentState,
      dotrainText,
      outputTokenAddress,
      outputTokenDecimals
    );

  const multicallCalldata = encodeFunctionData({
    functionName: "multicall",
    abi: orderBookJson.abi,
    args: [[addOrderCalldata, depositCallData]],
  });

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: `eip155:${network["chain-id"]}`,
    method: "eth_sendTransaction",
    params: {
      abi: orderBookJson.abi as Abi,
      to: orderBookAddress,
      data: multicallCalldata,
    },
  });
};
