import * as chains from "viem/chains";
import { createPublicClient, http } from "viem";

export const getPublicClient = (network: any) => {
  let chain = Object.values(chains).find(
    (chain) => chain.id === Number(network["chain-id"])
  );
  if (chain?.id === 14) {
    chain = {
      ...chain,
      contracts: {
        multicall3: {
          address: "0xcA11bde05977b3631167028862bE2a173976CA11",
          blockCreated: 3002461,
        },
      },
    };
  }
  return createPublicClient({
    chain,
    transport: http(),
  });
};
