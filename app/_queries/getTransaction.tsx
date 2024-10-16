import { getNetworkSubgraphs } from './subgraphs';

export const getTransaction = async (transactionId: string, network: string) => {
	const subgraphUrl =
		getNetworkSubgraphs()[network as keyof ReturnType<typeof getNetworkSubgraphs>];

	if (!subgraphUrl) {
		throw new Error(`Subgraph URL for network "${network}" not found`);
	}

	const query = `{
        transactions(where: { id: "${transactionId}" }) {
          id
          timestamp
          blockNumber
        }
      }`;

	const response = await fetch(subgraphUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query })
	});

	const res = await response.json();

	if (res.errors) throw new Error(res.errors[0].message);

	if (res.data && res.data.transactions && res.data.transactions.length > 0) {
		const transaction = res.data.transactions[0];
		transaction.network = network;
		return transaction;
	}
};
