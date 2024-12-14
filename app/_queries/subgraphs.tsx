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
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-flare/2024-12-13-9dc7/gn'
		},
		{
			chainId: 8453,
			name: 'base',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-base/2024-12-13-9c39/gn'
		},
		{
			chainId: 56,
			name: 'bsc',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-bsc/2024-12-13-2244/gn'
		},
		{
			chainId: 59144,
			name: 'linea',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-linea/2024-12-13-09c7/gn'
		},
		{
			chainId: 42161,
			name: 'arbitrum',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-arbitrum-one/2024-12-13-7435/gn'
		},
		{
			chainId: 137,
			name: 'polygon',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-matic/2024-12-13-d2b4/gn'
		},
		{
			chainId: 1,
			name: 'mainnet',
			subgraphUrl:
				'https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-mainnet/2024-12-13-7f22/gn'
		}
	];
};
