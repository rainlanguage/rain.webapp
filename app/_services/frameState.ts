import { FrameState } from '../_types/frame';
import { YamlData } from '../_types/yamlData';

export const getUpdatedFrameState = (
	yamlData: YamlData,
	currentState: FrameState,
	buttonValue: string,
	inputText?: string
): FrameState => {
	const updatedState = { ...currentState };
	switch (currentState.currentStep) {
		case 'start': {
			const deploymentOptions = Object.values(yamlData.gui.deployments);
			if (deploymentOptions.length === 1 || currentState.deploymentOption) {
				// Deployment step can be skipped if there is only one deployment or if the deployment is already selected
				updatedState.deploymentOption = deploymentOptions[0];
				updatedState.currentStep = 'fields';
				const firstField = updatedState.deploymentOption.fields[0];
				if (firstField.min !== undefined && !firstField.presets) {
					updatedState.textInputLabel = `Enter a number greater than ${firstField.min}`;
				}
			} else if (buttonValue) {
				updatedState.currentStep = 'deployment';
			}
			break;
		}
		case 'deployment':
			if (buttonValue) {
				updatedState.deploymentOption = JSON.parse(buttonValue);
				if (!updatedState.deploymentOption) {
					break;
				}
				updatedState.currentStep = 'fields';
				const firstField = updatedState.deploymentOption.fields[0];
				if (firstField.min !== undefined && !firstField.presets) {
					updatedState.textInputLabel = `Enter a number greater than ${firstField.min}`;
				}
			}
			break;
		case 'fields': {
			if (!updatedState.deploymentOption) throw new Error('Deployment option is required');
			let currentBindingsCount = Object.keys(updatedState.bindings).length;
			const fields = updatedState.deploymentOption.fields;
			const currentField = fields[currentBindingsCount];

			if (currentField.min !== undefined && !currentField.presets) {
				updatedState.textInputLabel = `Enter a number greater than ${currentField.min}`;
			}

			const setBindingValue = (value: string) => {
				updatedState.bindings[currentField.binding] = value;
				currentBindingsCount++;
				updatedState.buttonPage = 0;
				updatedState.error = null;
			};

			if (buttonValue === 'submit') {
				if (inputText && isNaN(Number(inputText))) {
					updatedState.error = 'Value must be a number';
				} else if (
					inputText &&
					currentField.min !== undefined &&
					Number(inputText) >= Number(currentField.min)
				) {
					setBindingValue(inputText);
					updatedState.textInputLabel = '';
				} else {
					updatedState.error = `Value must be at least ${currentField.min}`;
				}
			} else if (buttonValue === 'back') {
				if (currentBindingsCount === 0) {
					updatedState.currentStep = 'deployment';
					updatedState.deploymentOption = undefined;
					updatedState.textInputLabel = '';
				} else {
					const currentField = fields[currentBindingsCount - 1];
					if (currentField.min !== undefined && !currentField.presets) {
						updatedState.textInputLabel = `Enter a number greater than ${currentField.min}`;
					}
					delete updatedState.bindings[currentField.binding];
				}
				updatedState.error = null;
			} else if (buttonValue) {
				setBindingValue(buttonValue);
			}
			// If all bindings are filled, we can move to the next step
			if (currentBindingsCount >= fields.length) {
				updatedState.currentStep = 'deposit';
			}

			break;
		}
		case 'deposit': {
			if (!updatedState.deploymentOption) throw new Error('Deployment option is required');

			let currentDepositCount = updatedState.deposits.length;
			const deposits = updatedState.deploymentOption.deposits;
			const currentDeposit = deposits[currentDepositCount];

			if (currentDeposit.min !== undefined && !currentDeposit.presets) {
				updatedState.textInputLabel = `Enter a number greater than ${currentDeposit.min}`;
			}

			const setDepositValue = (value: number) => {
				const tokenInfo = updatedState.tokenInfos.find(
					(info) => info.yamlName === currentDeposit.token
				);
				if (!tokenInfo) throw new Error(`Token info not found for ${currentDeposit.token}`);

				updatedState.deposits.push({
					tokenInfo,
					referrals: currentDeposit.referrals,
					amount: value
				});
				updatedState.error = null;

				if (currentDepositCount >= deposits.length - 1) {
					updatedState.currentStep = 'review';
					updatedState.buttonPage = 0;
				}
			};

			if (buttonValue === 'submit' && currentDeposit.min !== undefined) {
				if (inputText && isNaN(Number(inputText))) {
					updatedState.error = 'Value must be a number';
				} else if (inputText && parseFloat(inputText) >= currentDeposit.min) {
					setDepositValue(Number(inputText));
					updatedState.textInputLabel = '';
				} else {
					updatedState.error = `Value must be at least ${currentDeposit.min}`;
				}
			} else if (buttonValue === 'back') {
				if (currentDepositCount === 0) {
					const currentField =
						updatedState.deploymentOption.fields[Object.keys(updatedState.bindings).length - 1];
					updatedState.textInputLabel = '';
					delete updatedState.bindings[currentField.binding];
					updatedState.currentStep = 'fields';
				} else {
					updatedState.deposits.pop();
					currentDepositCount--;
				}
				updatedState.error = null;
			} else {
				setDepositValue(Number(buttonValue));
			}
			break;
		}
		case 'review':
			if (buttonValue === 'back') {
				updatedState.deposits.pop();
				updatedState.currentStep = 'deposit';
			} else if (buttonValue === 'submit') {
				updatedState.currentStep = 'done';
			}
			break;
		case 'done':
			if (buttonValue) {
				updatedState.currentStep = 'start';
				updatedState.deploymentOption = undefined;
				updatedState.bindings = {};
			}
			break;
	}
	return updatedState;
};
