import { FrameState } from "../types/frame";
import { YamlData } from "../types/yamlData";

export const getUpdatedFrameState = (
  yamlData: YamlData,
  currentState: any,
  buttonValue: any,
  inputText?: string
): FrameState => {
  const updatedState = { ...currentState };
  switch (currentState.currentStep) {
    case "start":
      const deploymentOptions = Object.values(yamlData.gui.deployments);
      if (deploymentOptions.length === 1) {
        // Deployment step can be skipped if there is only one deployment
        updatedState.deploymentOption = deploymentOptions[0];
        updatedState.currentStep = "fields";
      } else if (buttonValue) {
        updatedState.currentStep = "deployment";
      }
      break;
    case "deployment":
      if (buttonValue) {
        updatedState.deploymentOption = JSON.parse(buttonValue);
        updatedState.currentStep = "fields";
      }
      break;
    case "fields":
      let currentBindingsCount = Object.keys(updatedState.bindings).length;
      const fields = updatedState.deploymentOption.fields;
      const currentField = fields[currentBindingsCount];

      const setBindingValue = (value: string) => {
        updatedState.bindings[currentField.binding] = value;
        currentBindingsCount++;
        updatedState.buttonPage = 0;
        updatedState.error = null;
      };

      if (buttonValue === "submit") {
        if (inputText && isNaN(Number(inputText))) {
          updatedState.error = "Value must be a number";
        } else if (inputText && Number(inputText) >= currentField.min) {
          setBindingValue(inputText);
          updatedState.textInputLabel = "";
        } else {
          updatedState.error = `Value must be at least ${currentField.min}`;
        }
      } else if (buttonValue === "back") {
        if (currentBindingsCount === 0) {
          updatedState.currentStep = "deployment";
        } else {
          const currentField = fields[currentBindingsCount - 1];
          delete updatedState.bindings[currentField.binding];
        }
      } else {
        setBindingValue(buttonValue);
      }
      // If all bindings are filled, we can move to the next step
      if (currentBindingsCount >= fields.length) {
        updatedState.currentStep = "deposit";
      }
      break;
    case "deposit":
      const setDepositValue = (value: number) => {
        updatedState.deposit = value;
        updatedState.error = null;
      };
      if (buttonValue === "submit") {
        if (inputText && isNaN(Number(inputText))) {
          updatedState.error = "Value must be a number";
        } else if (
          inputText &&
          inputText >= updatedState.deploymentOption.deposit.min
        ) {
          setDepositValue(Number(inputText));
          updatedState.textInputLabel = "";
        } else {
          updatedState.error = `Value must be at least ${updatedState.deploymentOption.deposit.min}`;
        }
      } else if (buttonValue === "back") {
        const currentField =
          updatedState.deploymentOption.fields[
            Object.keys(updatedState.bindings).length - 1
          ];
        delete updatedState.bindings[currentField.binding];
        updatedState.currentStep = "fields";
      } else {
        setDepositValue(Number(buttonValue));
      }
      if (updatedState.deposit !== null && updatedState.deposit > 0) {
        updatedState.currentStep = "review";
        updatedState.buttonPage = 0;
      }
      break;
    case "review":
      if (buttonValue === "back") {
        updatedState.deposit = null;
        updatedState.currentStep = "deposit";
      } else if (buttonValue === "submit") {
        updatedState.currentStep = "done";
      }
      break;
    case "done":
      if (buttonValue) {
        updatedState.currentStep = "start";
        updatedState.deploymentOption = undefined;
        updatedState.bindings = {};
        updatedState.deposit = null;
      }
      break;
  }
  return updatedState;
};
