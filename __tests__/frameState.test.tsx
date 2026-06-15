import { getFieldPresetsButtons } from '@/app/_services/buttonsData';
import { getUpdatedFrameState } from '@/app/_services/frameState';
import { TokenInfo } from '@/app/_services/getTokenInfo';
import { FrameState } from '@/app/_types/frame';
import { Field, YamlData, DeploymentOption } from '@/app/_types/yamlData';

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

	describe('fields step - boolean preset', () => {
		const booleanYamlData: YamlData = {
			...mockYamlData,
			gui: {
				...mockYamlData.gui,
				deployments: [
					{
						...mockYamlData.gui.deployments[0],
						fields: [
							{
								binding: 'pin-best-quote',
								name: 'Pin to best quote',
								description: 'Whether to pin the order to the best quote',
								presets: [
									{ name: 'Enabled', value: true },
									{ name: 'Disabled', value: false }
								]
							}
						]
					}
				]
			}
		};

		const booleanState = (): FrameState => ({
			...defaultState,
			deploymentOption: booleanYamlData.gui.deployments[0] as DeploymentOption,
			bindings: {}
		});

		const booleanField = booleanYamlData.gui.deployments[0].fields[0] as Field;
		// The value a button emits is what gets bound; a boolean preset emits rainlang 1/0.
		const enabledButtonValue = getFieldPresetsButtons(booleanField).find(
			(button) => button.buttonText === 'Enabled'
		)?.buttonValue as string;
		const disabledButtonValue = getFieldPresetsButtons(booleanField).find(
			(button) => button.buttonText === 'Disabled'
		)?.buttonValue as string;

		it('should bind a "true" boolean preset as rainlang 1', () => {
			expect(enabledButtonValue).toBe('1');
			const result = getUpdatedFrameState(booleanYamlData, booleanState(), enabledButtonValue);
			expect(result.error).toBeNull();
			expect(result.bindings['pin-best-quote']).toBe('1');
		});

		it('should bind a "false" boolean preset as rainlang 0', () => {
			expect(disabledButtonValue).toBe('0');
			const result = getUpdatedFrameState(booleanYamlData, booleanState(), disabledButtonValue);
			expect(result.error).toBeNull();
			expect(result.bindings['pin-best-quote']).toBe('0');
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
