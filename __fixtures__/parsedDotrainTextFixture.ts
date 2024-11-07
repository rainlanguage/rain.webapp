export const parsedDotrainTextFixture = {
	deployment: {
		order: 'base-weth-usdc',
		scenario: 'base.weth-usdc'
	},
	order: {
		orderbook: 'base',
		network: 'base',
		inputs: [
			{
				token: 'base-weth'
			}
		],
		outputs: [
			{
				token: 'base-usdc'
			}
		]
	},
	orderBook: {
		address: '0xd2938e7c9fe3597f78832ce780feb61945c377d7',
		network: 'base',
		subgraph: 'base'
	},
	orderBookAddress: '0xd2938e7c9fe3597f78832ce780feb61945c377d7',
	network: {
		rpc: 'https://mainnet.base.org',
		'chain-id': 8453,
		'network-id': 8453,
		currency: 'ETH'
	},
	tokens: {
		'base-weth': {
			network: 'base',
			address: '0x4200000000000000000000000000000000000006',
			decimals: 18
		},
		'base-usdc': {
			network: 'base',
			address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
			decimals: 6
		},
		'flare-wflr': {
			network: 'flare',
			address: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d',
			decimals: 18
		},
		'flare-sflr': {
			network: 'flare',
			address: '0x12e605bc104e93B45e1aD99F9e555f659051c2BB',
			decimals: 18
		},
		'flare-eusdt': {
			network: 'flare',
			address: '0x96B41289D90444B8adD57e6F265DB5aE8651DF29',
			decimals: 6
		}
	},
	scenario: {
		runs: 1,
		bindings: {
			'fixed-io-output-token': '0x4200000000000000000000000000000000000006'
		}
	}
};
