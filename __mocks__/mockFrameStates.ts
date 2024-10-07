export const fieldsFrameState = {
	strategyName: 'Fixed limit',
	strategyDescription: 'Fixed limit order strategy\n',
	currentStep: 'fields',
	deploymentOption: {
		deployment: 'base-weth-usdc',
		name: 'Buy WETH with USDC on Base.',
		description: 'Buy WETH with USDC for fixed price on Base network.',
		deposits: [
			{
				token: 'base-usdc',
				min: 0,
				presets: [0, 10, 100, 1000, 10000]
			}
		],
		fields: [
			{
				binding: 'fixed-io',
				name: 'WETH price in USDC ($ per ETH)',
				min: 1000
			}
		]
	},
	bindings: {},
	deposits: [],
	buttonPage: 0,
	buttonMax: 10,
	textInputLabel: '',
	error: null,
	isWebapp: true,
	tokenInfos: [
		{
			yamlName: 'base-weth',
			address: '0x4200000000000000000000000000000000000006',
			decimals: 18,
			symbol: 'WETH',
			name: 'Wrapped Ether'
		},
		{
			yamlName: 'base-usdc',
			address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
			decimals: 6,
			symbol: 'USDC',
			name: 'USD Coin'
		},
		{
			yamlName: 'flare-wflr',
			address: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d',
			decimals: 18,
			symbol: 'WFLR',
			name: 'Wrapped Flare'
		},
		{
			yamlName: 'flare-sflr',
			address: '0x12e605bc104e93B45e1aD99F9e555f659051c2BB',
			decimals: 18,
			symbol: 'sFLR',
			name: 'Staked FLR'
		},
		{
			yamlName: 'flare-eusdt',
			address: '0x96B41289D90444B8adD57e6F265DB5aE8651DF29',
			decimals: 6,
			symbol: 'eUSDT',
			name: 'Enosys USDT'
		}
	]
};

export const depositFrameState = {
	currentStep: 'deposit',
	deploymentOption: {
		deployment: 'base-weth-usdc',
		name: 'Buy WETH with USDC on Base.',
		description: 'Buy WETH with USDC for fixed price on Base network.',
		deposits: [
			{
				token: 'base-usdc',
				min: 0,
				presets: [0, 10, 100, 1000, 10000]
			}
		],
		fields: [
			{
				binding: 'fixed-io',
				name: 'WETH price in USDC ($ per ETH)',
				min: 1000
			}
		]
	},
	bindings: {
		'fixed-io': '1000'
	},
	deposits: [],
	buttonPage: 0,
	buttonMax: 10,
	textInputLabel: '',
	tokenInfos: [
		{
			yamlName: 'base-weth',
			address: '0x4200000000000000000000000000000000000006',
			decimals: 18,
			symbol: 'WETH',
			name: 'Wrapped Ether'
		},
		{
			yamlName: 'base-usdc',
			address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
			decimals: 6,
			symbol: 'USDC',
			name: 'USD Coin'
		},
		{
			yamlName: 'flare-wflr',
			address: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d',
			decimals: 18,
			symbol: 'WFLR',
			name: 'Wrapped Flare'
		},
		{
			yamlName: 'flare-sflr',
			address: '0x12e605bc104e93B45e1aD99F9e555f659051c2BB',
			decimals: 18,
			symbol: 'sFLR',
			name: 'Staked FLR'
		},
		{
			yamlName: 'flare-eusdt',
			address: '0x96B41289D90444B8adD57e6F265DB5aE8651DF29',
			decimals: 6,
			symbol: 'eUSDT',
			name: 'Enosys USDT'
		}
	]
};
