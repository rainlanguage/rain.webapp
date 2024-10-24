import { getNetworkSubgraphs } from '../_queries/subgraphs';

export const checkSubgraphForDeployment = async (transactionHash: string, chainId?: number) => {
	return new Promise<string | undefined>((resolve, reject) => {
		let timeoutId: NodeJS.Timeout;
		const query = `
							query ($transaction: String!) {
								orders(
									where: {
										addEvents_: {
											transaction: $transaction
										}
									}
								) {
									id
									orderHash
								}
							}
						`;

		const variables = { transaction: transactionHash };

		const pollSubgraph = async () => {
			try {
				console.log('Polling subgraph for deployment');

				const subgraphUrl = getNetworkSubgraphs().find(
					(network) => network.chainId === chainId
				)?.subgraphUrl;

				if (!subgraphUrl) {
					throw new Error('Subgraph URL not found for chain ID');
				}

				const response = await fetch(subgraphUrl, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ query, variables })
				});

				const result = await response.json();
				console.log(result);
				if (result.errors?.length) {
					throw new Error(result.errors);
				}
				if (result.data?.orders?.length) {
					const newOrderHash = result.data.orders[0].orderHash;
					clearTimeout(timeoutId); // Clear the timeout to stop polling
					resolve(newOrderHash); // Resolve the promise with the deployment
				} else {
					// Schedule the next poll in 1 second if no deployment is found
					timeoutId = setTimeout(pollSubgraph, 1000);
				}
			} catch (error) {
				clearTimeout(timeoutId); // Clear the timeout on error
				console.error('Error checking subgraph for deployment:', error);
				reject(new Error('There was an error checking the subgraph for the deployment.'));
			}
		};

		pollSubgraph();
	});
};
