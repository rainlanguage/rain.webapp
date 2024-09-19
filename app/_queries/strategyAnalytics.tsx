import { getNetworkSubgraphs } from "./subgraphs";

export const transactionAnalytics = (transactionId: string) => `
{
  addOrders (sortBy: transaction__timestamp, where: {transaction: "${transactionId}"}) {
    transaction {
      id
      timestamp
    }
    id
    order {
      active
      owner
      orderHash
      orderBytes
      orderbook {
        id
      }
      inputs {
        orderbook {
          id
        }
        vaultId
        token {
          name
          decimals
          address
          symbol
        }
        balance
      }
      outputs {
        orderbook {
          id
        }
        vaultId
        token {
          name
          decimals
          address
          symbol
        }
        balance
      }
      trades {
        tradeEvent {
          transaction {
            timestamp
          }
        }
        inputVaultBalanceChange {
          amount
          vault {
            token {
              name
            }
          }
        }
        outputVaultBalanceChange {
          amount
          vault {
            token {
              name
            }
          }
        }
      }
    }
  }
}`;

export const getTransactionAnalyticsData = async (transactionId: string) => {
  const networks = getNetworkSubgraphs();
  // Find which subgraph has the transaction data by checking each subgraph
  for (let [network, subgraphUrl] of Object.entries(networks)) {
    try {
      const response = await fetch(subgraphUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: transactionAnalytics(transactionId),
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      return result.data.addOrders[0];
    } catch (error: any) {
      if (error?.message)
        throw new Error(
          `Error fetching transaction data from ${network} subgraph: ${
            error?.message || ""
          }`
        );
    }
  }
};
