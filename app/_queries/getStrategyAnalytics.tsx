const query = `
	query getOrder($orderHash: String!) {
	  orders(where: { orderHash: $orderHash }) {
    id
		active
		owner
		orderHash
		orderBytes
		orderbook {
		  id
		}
    addEvents {
      transaction {
        id
        timestamp
      }
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
			sender
			transaction {
			  id
			  timestamp
			}
		  }
		  inputVaultBalanceChange {
			amount
			vault {
			  token {
				name
				symbol
				decimals
			  }
			}
		  }
		  outputVaultBalanceChange {
			amount
			vault {
			  token {
				name
				symbol
				decimals
			  }
			}
		  }
		}
	  }
	}`;

export const getStrategyAnalytics = async (
	orderHash: string,
	network: string,
	subgraphUrl: string
) => {
	try {
		const variables = { orderHash };

		const response = await fetch(subgraphUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query,
				variables
			})
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();

		if (result.errors) {
			throw new Error(result.errors[0].message);
		} else if (result.data?.orders.length) {
			return result.data.orders[0];
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(
				`Error fetching transaction data from ${network} subgraph: ${error.message || ''}`
			);
		} else throw new Error('Unknown error fetching transaction data from subgraph');
	}
};
