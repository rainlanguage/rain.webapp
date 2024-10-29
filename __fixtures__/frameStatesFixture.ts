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
