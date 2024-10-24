import { getNetworkSubgraphs } from '../_queries/subgraphs';
import { Order } from '../types';

export const checkSubgraphForDeployment = async (transactionHash: string, network?: string) => {
	try {
		let isDeploymentIndexed = false;
		while (!isDeploymentIndexed) {
			console.log('polling subgraph for deployment');
			const subgraphUrl =
				getNetworkSubgraphs()[network as keyof ReturnType<typeof getNetworkSubgraphs>];
			const response = await fetch(subgraphUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `
						query {
							orders(orderBy: timestampAdded, orderDirection: desc) {
								addEvents {
									transaction {
										id
										blockNumber
									}
								}
                                orderHash
							}
						}
					`
				})
			});
			const result = await response.json();
			console.log(result);
			const orders = result.data.orders;
			const indexedDeployment = orders.find(
				(order: Order) => order.addEvents[0]?.transaction.id === transactionHash
			);
			if (indexedDeployment) {
				console.log('Deployment indexed:', indexedDeployment);
				isDeploymentIndexed = true;
				return indexedDeployment;
			} else {
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		}
	} catch (error) {
		console.error('Error checking subgraph for deployment:', error);
		throw new Error('There was an error checking the subgraph for the deployment.');
	}
};
