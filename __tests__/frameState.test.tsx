import { getUpdatedFrameState } from '@/app/_services/frameState';
import { TokenInfo } from '@/app/_services/getTokenInfo';
import { FrameState } from '@/app/_types/frame';
import { YamlData, DeploymentOption } from '@/app/_types/yamlData';

describe('getUpdatedFrameState', () => {
	const mockYamlData: YamlData = {
		networks: {},
		subgraphs: {},
		orderbooks: {},
		deployers: {},
		tokens: {},
		orders: {},
		scenarios: {},
		deployments: {},
		gui: {
			name: 'Test Strategy',
			description: 'Test Description',
			deployments: [
				{
					deployment: 'testDeployment',
					name: 'Test Deployment',
					description: 'Test deployment description',
					fields: [
						{ binding: 'field1', name: 'Field 1', description: 'First field', min: 5 },
						{ binding: 'field2', name: 'Field 2', description: 'Second field', min: 10 }
					],
					deposit: { token: 'token1', min: 20 },
					deposits: [
						{ token: 'token1', min: 20 },
						{ token: 'token2', min: 30 }
					]
				}
			]
		}
	};

	const defaultState: FrameState = {
		strategyName: 'Test Strategy',
		strategyDescription: 'Test Description',
		currentStep: 'fields',
		deploymentOption: mockYamlData.gui.deployments[0] as DeploymentOption,
		bindings: {},
		deposits: [],
		buttonPage: 0,
		buttonMax: 10,
		textInputLabel: '',
		error: null,
		isWebapp: true,
		tokenInfos: [
			{ yamlName: 'token1', tokenAddress: '0xToken1', decimals: 18 },
			{ yamlName: 'token2', tokenAddress: '0xToken2', decimals: 18 }
		] as unknown as TokenInfo[]
	};

	describe('fields step - submit button', () => {
		it('should set an error if inputText is not a number', () => {
			const result = getUpdatedFrameState(mockYamlData, defaultState, 'submit', 'invalidNumber');
			expect(result.error).toBe('Value must be a number');
		});

		it('should set an error if inputText is below the minimum value', () => {
			const result = getUpdatedFrameState(mockYamlData, defaultState, 'submit', '3');
			expect(result.error).toBe('Value must be at least 5');
		});

		it('should bind value and clear error if inputText is equal to the minimum value', () => {
			const result = getUpdatedFrameState(mockYamlData, defaultState, 'submit', '5');
			expect(result.error).toBeNull();
			expect(result.bindings.field1).toBe('5');
			expect(result.textInputLabel).toBe('');
		});

		it('should bind value and clear error if inputText is greater than the minimum value', () => {
			const result = getUpdatedFrameState(mockYamlData, defaultState, 'submit', '10');
			expect(result.error).toBeNull();
			expect(result.bindings.field1).toBe('5');
			expect(result.textInputLabel).toBe('');
		});
	});

	describe('deposit step - submit button', () => {
		it('should set an error if inputText is not a number', () => {
			const stateWithDeposits = { ...defaultState, currentStep: 'deposit' };
			const result = getUpdatedFrameState(
				mockYamlData,
				stateWithDeposits,
				'submit',
				'invalidNumber'
			);
			expect(result.error).toBe('Value must be a number');
		});

		it('should set an error if inputText is below the minimum deposit value', () => {
			const stateWithDeposits = { ...defaultState, currentStep: 'deposit' };
			const result = getUpdatedFrameState(mockYamlData, stateWithDeposits, 'submit', '10');
			expect(result.error).toBe('Value must be at least 20');
		});

		it('should add deposit and clear error if inputText is equal to the minimum deposit value', () => {
			const stateWithDeposits = { ...defaultState, currentStep: 'deposit' };
			const result = getUpdatedFrameState(mockYamlData, stateWithDeposits, 'submit', '20');
			expect(result.error).toBeNull();
			expect(result.deposits[0]).toEqual({
				tokenInfo: { yamlName: 'token1', tokenAddress: '0xToken1', decimals: 18 },
				referrals: undefined,
				amount: 20
			});
			expect(result.textInputLabel).toBe('');
		});

		it('should add deposit and clear error if inputText is greater than the minimum deposit value', () => {
			const stateWithDeposits = { ...defaultState, currentStep: 'deposit' };
			const result = getUpdatedFrameState(mockYamlData, stateWithDeposits, 'submit', '30');
			expect(result.error).toBeNull();
			expect(result.deposits[0]).toEqual({
				tokenInfo: { yamlName: 'token1', tokenAddress: '0xToken1', decimals: 18 },
				referrals: undefined,
				amount: 20
			});
			expect(result.textInputLabel).toBe('');
		});
	});
});
