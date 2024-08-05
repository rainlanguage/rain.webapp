import { DeploymentOption, YamlData } from "../_types/yamlData";

export const getPaginatedButtons = (
  allButtons: any[],
  buttonPage: number
): any[] => {
  const buttonPageOffset = buttonPage * 3;
  let buttonEndIndex = buttonPageOffset + 4;
  const includeMoreButton = buttonEndIndex < allButtons.length;
  if (includeMoreButton) {
    buttonEndIndex--;
  }
  return [
    ...(allButtons.length <= 3
      ? allButtons
      : [
          ...(buttonPage > 0
            ? [
                {
                  buttonTarget: "buttonPage",
                  buttonValue: buttonPage - 1,
                  buttonText: "<",
                },
              ]
            : []),
          ...allButtons.slice(buttonPageOffset, buttonEndIndex),
          ...(includeMoreButton
            ? [
                {
                  buttonTarget: "buttonPage",
                  buttonValue: buttonPage + 1,
                  buttonText: "More",
                },
              ]
            : []),
        ]),
  ];
};

export const getPresetsButtons = (
  presets: number[],
  minimum: number | undefined
): any[] => {
  return [
    {
      buttonTarget: "buttonValue",
      buttonValue: "back",
      buttonText: "<",
    },
    ...presets.map((preset: number) => ({
      buttonTarget: "buttonValue",
      buttonValue: `${preset}`,
      buttonText: `${preset}`,
    })),
    ...(minimum !== undefined
      ? [
          {
            buttonTarget: "textInputLabel",
            buttonValue: `Enter a number greater than ${minimum}`,
            buttonText: "Custom",
          },
        ]
      : []),
  ];
};

export const generateButtonsData = (
  yamlData: YamlData,
  currentState: any
): any[] => {
  let buttons: any[] = [];
  if (currentState.textInputLabel) {
    return [
      {
        buttonTarget: "textInputLabel",
        buttonValue: "",
        buttonText: "<",
      },
      {
        buttonTarget: "buttonValue",
        buttonValue: "submit",
        buttonText: "Submit",
      },
    ];
  }
  switch (currentState.currentStep) {
    case "start":
      buttons = [
        {
          buttonTarget: "buttonValue",
          buttonValue: "start",
          buttonText: "Start",
        },
      ];
      break;
    case "deployment":
      const allButtons = yamlData.gui.deployments.map(
        (deploymentOption: DeploymentOption) => ({
          buttonTarget: "buttonValue",
          buttonValue: JSON.stringify(deploymentOption),
          buttonText: deploymentOption.name,
        })
      );
      buttons = getPaginatedButtons(allButtons, currentState.buttonPage);
      break;
    case "fields":
      const field =
        currentState.deploymentOption.fields[
          Object.keys(currentState.bindings).length
        ];
      const fieldButtons = getPresetsButtons(field.presets, field.min);
      buttons = getPaginatedButtons(fieldButtons, currentState.buttonPage);
      break;
    case "deposit":
      const deposit = currentState.deploymentOption.deposit;
      const depositButtons = getPresetsButtons(deposit.presets, deposit.min);
      buttons = getPaginatedButtons(depositButtons, currentState.buttonPage);
      break;
    case "review":
      buttons = [
        {
          buttonTarget: "buttonValue",
          buttonValue: "back",
          buttonText: "<",
        },
        {
          buttonTarget: "buttonValue",
          buttonValue: "submit",
          buttonText: "Submit",
        },
      ];
      break;
    case "done":
      buttons = [
        {
          buttonTarget: "buttonValue",
          buttonValue: "restart",
          buttonText: "Start over",
        },
      ];
      break;
  }
  return buttons;
};
