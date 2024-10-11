import { Order } from '../types';
import { getNetworkSubgraphs } from './subgraphs';

export const getOrders = async (owner?: string) => {
	const networks = await getNetworkSubgraphs();
	if (!owner) return;
	const query = `{
        orders(orderBy: timestampAdded, orderDirection: desc, where: { owner: "${owner}" }) {
          orderBytes
          orderHash
          owner
          outputs {
            token {
              id
              address
              name
              symbol
              decimals
            }
            balance
            vaultId
          }
          inputs {
            token {
              id
              address
              name
              symbol
              decimals
            }
            balance
            vaultId
          }
          orderbook {
            id
          }
          trades (first: 1000) { 
            id
          }
          active
          timestampAdded
          addEvents {
            transaction {
              id
              blockNumber
            }
          }
        }
      }`;

	// make a query for each network
	const promises: Promise<Order[]>[] = [];
	Object.entries(networks).forEach(([network, subgraphUrl]) => {
		promises.push(
			fetch(subgraphUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ query })
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.errors) throw new Error(res.errors[0].message);
					if (res.data && res.data.orders) {
						return res.data.orders.map((order: Order) => {
							order.network = network;
							return order;
						});
					}
				})
		);
	});

	const orderedResults = (await Promise.allSettled(promises))
    .filter(v => v.status === "fulfilled")
    .map(v => v.value)
    .flat()
    .sort((a, b) => +b.timestampAdded - +a.timestampAdded);
	return orderedResults;
};
