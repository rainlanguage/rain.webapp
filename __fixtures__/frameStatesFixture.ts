export const fieldsFrameState = {
	currentStep: 'fields',
	deploymentOption: {
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
				min: 1000,
				presets: [
					{
						name: 'Zero preset',
						value: 0
					},
					{
						name: 'Thousand preset',
						value: 1000
					}
				]
			}
		]
	},
	bindings: {},
	buttonPage: 0,
	buttonMax: 4,
	tokenInfos: [
		{
			yamlName: 'base-usdc',
			symbol: 'USDC'
		}
	]
};

export const depositFrameState = {
	currentStep: 'deposit',
	deploymentOption: {
		deposits: [
			{
				token: 'base-usdc',
				min: 0,
				presets: [0, 10, 100, 1000, 10000]
			}
		]
	},
	bindings: { 'fixed-io': '1000' },
	deposits: [],
	buttonPage: 0,
	buttonMax: 4,
	tokenInfos: [
		{
			yamlName: 'base-usdc',
			symbol: 'USDC'
		}
	]
};

export const defaultFrameStateFixedLimit = {
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
	textInputLabel: 'Enter a number greater than or equal to 1000',
	error: null,
	isWebapp: true,
	tokenInfos: []
};
