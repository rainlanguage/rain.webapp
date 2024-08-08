import { transaction } from "frames.js/core";
import { frames } from "../route";
import { getAddOrderCalldata } from "@rainlanguage/orderbook";
import { Abi, toHex } from "viem";
import { orderBookJson } from "@/public/_abis/OrderBook";
import YAML from "yaml";
import { YamlData } from "@/app/_types/yamlData";

export const POST = frames(async (ctx) => {
  // Use different YAML parsing library because js-yaml does not support BigInt
  const YAMLData = YAML.parse(ctx.dotrainText.split("---")[0], {
    intAsBigInt: true,
  }) as YamlData;

  const addOrderCalldata = await getAddOrderCalldata(
    ctx.dotrainText,
    ctx.state.deploymentOption.deployment
  );

  // Get network data from the yaml file
  const deployment =
    YAMLData.deployments[ctx.state.deploymentOption.deployment];
  const scenario = YAMLData.scenarios[deployment.scenario];
  const deployer = YAMLData.deployers[scenario.deployer];
  const network = YAMLData.networks[deployer.network];

  // Get order book data from the yaml file
  const order = YAMLData.orders[deployment.order];
  const orderBook = YAMLData.orderbooks[order.orderbook];

  console.log({
    chainId: `eip155:${network["chain-id"]}`,
    method: "eth_sendTransaction",
    params: {
      abi: orderBookJson.abi as Abi,
      to: toHex(BigInt(orderBook.address)),
      data: toHex(addOrderCalldata),
    },
  });

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: `eip155:${network["chain-id"]}`,
    method: "eth_sendTransaction",
    params: {
      abi: orderBookJson.abi as Abi,
      to: toHex(BigInt(orderBook.address)),
      data: toHex(addOrderCalldata),
    },
  });
});
