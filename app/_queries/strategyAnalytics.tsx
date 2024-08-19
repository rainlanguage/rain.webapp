export const transactionAnalytics = (transactionId: string) => `
{
  events (where: {transaction: "${transactionId}"}) {
    transaction {
      id
    }
    ... on AddOrder {
    id
    order {
      orderHash
      orderbook {
        id
      }
      inputs {
        vaultId
        token {
          name
          decimals
          address
        }
        balance
      }
      outputs {
        vaultId
        token {
          name
          decimals
          address
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
  }
}`;
