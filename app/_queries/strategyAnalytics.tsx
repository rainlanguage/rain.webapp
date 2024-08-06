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
      }
      outputs {
        token {
          name
          decimals
        }
      }
      trades {
        tradeEvent {
          transaction {
            timestamp
          }
        }
        inputVaultBalanceChange {
          amount
        }
        outputVaultBalanceChange {
          amount
        }
      }
    }
    }
  }
}`;
