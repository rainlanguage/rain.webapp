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
import YAML from "yaml";
import { YamlData } from "@/app/_types/yamlData";
import { FrameState } from "@/app/_types/frame";
import { readContract } from "viem/actions";
import { base } from "viem/chains";
import { orderBookJson } from "@/public/_abis/OrderBook";
import { getSubmissionTransactionData } from "./transactionData";

export const getApprovalTransaction = async (
  currentState: FrameState,
  dotrainText: string
) => {
  // Use different YAML parsing library because js-yaml does not support BigInt
  const YAMLData = YAML.parse(dotrainText.split("---")[0], {
    intAsBigInt: true,
  }) as YamlData;

  // TODO support multiple networks
  const client = createPublicClient({
    chain: base,
    transport: http(),
  });

  // Get network and orderbook data from the yaml file
  const deployment =
    YAMLData.deployments[currentState.deploymentOption.deployment];
  const order = YAMLData.orders[deployment.order];
  const network = YAMLData.networks[order.network];

  const orderBook = YAMLData.orderbooks[order.orderbook];
  const orderBookAddress = toHex(BigInt(orderBook.address));

  const outputToken = YAMLData.tokens[order.outputs[0].token];
  const outputTokenAddress = toHex(BigInt(outputToken.address));
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
  dotrainText: string
) => {
  // Use different YAML parsing library because js-yaml does not support BigInt
  const YAMLData = YAML.parse(dotrainText.split("---")[0], {
    intAsBigInt: true,
  }) as YamlData;

  // TODO support multiple networks
  const client = createPublicClient({
    chain: base,
    transport: http(),
  });

  // Get network and orderbook data from the yaml file
  const deployment =
    YAMLData.deployments[currentState.deploymentOption.deployment];
  const order = YAMLData.orders[deployment.order];
  const network = YAMLData.networks[order.network];

  const orderBook = YAMLData.orderbooks[order.orderbook];
  const orderBookAddress = toHex(BigInt(orderBook.address));

  const outputToken = YAMLData.tokens[order.outputs[0].token];
  const outputTokenAddress = toHex(BigInt(outputToken.address));
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
