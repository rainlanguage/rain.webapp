import { getUpdatedFrameState } from '../app/_services/frameState';
import { FrameState } from '../app/_types/frame';
import { YamlData } from '../app/_types/yamlData';

describe('getUpdatedFrameState', () => {
	let yamlDataFixture: YamlData;
	let initialState: FrameState;

	beforeEach(() => {
		yamlDataFixture = {
			gui: {
				deployments: [
					{
						name: 'Test Deployment',
						description: 'Test Description',
						fields: [
							{ binding: 'field1', presets: [{ name: 'Preset 1', value: '10' }] },
							{ binding: 'field2', min: 5 },
							{ binding: 'field3' }
						]
					}
				]
			}
		} as YamlData;

		initialState = {
			currentStep: 'fields',
			deploymentOption: yamlDataFixture.gui.deployments[0],
			bindings: { field1: '10', field2: '7' },
			deposits: [],
			tokenInfos: [],
			buttonPage: 0,
			error: null,
			textInputLabel: '',
			strategyName: 'Test Strategy',
			strategyDescription: 'Test Strategy Description'
		} as FrameState;
	});

	test('handles back button correctly for different field types', () => {
		let updatedState = getUpdatedFrameState(mockYamlData, initialState, 'back');
		expect(updatedState.textInputLabel).toBe('Enter a number greater than or equal to 5');
		expect(updatedState.bindings).toEqual({ field1: '10' });

		updatedState = getUpdatedFrameState(yamlDataFixture, updatedState, 'back');
		expect(updatedState.textInputLabel).toBe('');
		expect(updatedState.bindings).toEqual({});

		updatedState = getUpdatedFrameState(yamlDataFixture, updatedState, 'back');
		expect(updatedState.currentStep).toBe('deployment');
		expect(updatedState.deploymentOption).toBeUndefined();
	});
});
