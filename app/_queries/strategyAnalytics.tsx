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
      inputs {
        token {
          name
          decimals
        }
        balance
      }
      outputs {
        token {
          name
          decimals
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
