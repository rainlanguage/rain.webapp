import { Address } from 'viem';

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
				min: 1000
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

export const reviewFrameState = {
	currentStep: 'review',
	bindings: { 'fixed-io-1': '1000', 'fixed-io-2': '3000' },
	deploymentOption: {
		name: 'Test Deployment',
		fields: [
			{
				binding: 'fixed-io-1',
				value: '1000',
				name: 'Fixed IO',
				description: 'Fixed IO Description'
			},
			{
				binding: 'fixed-io-2',
				value: '3000',
				name: 'Fixed IO 2',
				description: 'Fixed IO 2 Description'
			}
		],
		deposit: {
			token: 'base-usdc'
		},
		deposits: [],
		deployment: 'some-deployment',
		description: 'Test Description'
	},
	deposits: [
		{
			tokenInfo: {
				yamlName: 'base-usdc',
				symbol: 'USDC',
				decimals: 6,
				name: 'USD Coin',
				address: '0xabcd' as Address
			},
			amount: 4000
		}
	],
	buttonPage: 0,
	buttonMax: 4,
	tokenInfos: [
		{
			yamlName: 'base-usdc',
			symbol: 'USDC',
			decimals: 6,
			name: 'USD Coin',
			address: '0xabcd' as Address
		}
	],
	strategyName: '',
	strategyDescription: '',
	textInputLabel: '',
	error: null
};
