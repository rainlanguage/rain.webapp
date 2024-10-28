type Network = {
	chainId: number;
	name: string;
	subgraphUrl: string;
};

export const getNetworkSubgraphs = (): Network[] => {
	return [
		{
			chainId: 14,
			name: 'flare',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-flare/0.8/gn'
		},
		{
			chainId: 8453,
			name: 'base',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-base/0.9/gn'
		},
		{
			chainId: 56,
			name: 'bsc',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-bsc/2024-10-14-63f4/gn'
		},
		{
			chainId: 59144,
			name: 'linea',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-linea/2024-10-14-12fc/gn'
		},
		{
			chainId: 42161,
			name: 'arbitrum',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-arbitrum/0.2/gn'
		},
		{
			chainId: 137,
			name: 'polygon',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-polygon/0.6/gn'
		},
		{
			chainId: 1,
			name: 'ethereum',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-mainnet/2024-10-25-af6a/gn'
		}
	];
};
