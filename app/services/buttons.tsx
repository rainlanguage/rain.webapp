import { Button } from "frames.js/next";
import { DeploymentOption, YamlData } from "../types/yamlData";

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
          buttonPage > 0 && (
            <Button
              action="post"
              target={{ query: { buttonPage: buttonPage - 1 } }}
            >
              {"<"}
            </Button>
          ),
          ...allButtons.slice(buttonPageOffset, buttonEndIndex),
          includeMoreButton && (
            <Button
              action="post"
              target={{ query: { buttonPage: buttonPage + 1 } }}
            >
              {"More"}
            </Button>
          ),
        ]),
  ];
};

export const getPresetsButtons = (
  presets: number[],
  minimum: number | undefined
): any[] => {
  return [
    <Button action="post" target={{ query: { buttonValue: "back" } }}>
      {"<"}
    </Button>,
    ...presets.map((preset: number) => (
      <Button action="post" target={{ query: { buttonValue: `${preset}` } }}>
        {String(preset)}
      </Button>
    )),
    ...(minimum !== undefined
      ? [
          <Button
            action="post"
            target={{
              query: {
                textInputLabel: `Enter a number greater than ${minimum}`,
              },
            }}
          >
            Custom
          </Button>,
        ]
      : []),
  ];
};

export const generateButtons = (
  yamlData: YamlData,
  currentState: any,
  isWebapp: boolean | undefined = false
): any[] => {
  let buttons: any[] = [];
  if (currentState.textInputLabel) {
    return [
      <Button action="post" target={{ query: { textInputLabel: "" } }}>
        {"<"}
      </Button>,
      <Button action="post" target={{ query: { buttonValue: "submit" } }}>
        Submit
      </Button>,
    ];
  }
  switch (currentState.currentStep) {
    case "start":
      buttons = [
        <Button action="post" target={{ query: { buttonValue: "start" } }}>
          Start
        </Button>,
      ];
      break;
    case "deployment":
      const allButtons = yamlData.gui.deployments.map(
        (deploymentOption: DeploymentOption) => (
          <Button
            action="post"
            target={{
              query: { buttonValue: JSON.stringify(deploymentOption) },
            }}
          >
            {deploymentOption.name}
          </Button>
        )
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
        <Button action="post" target={{ query: { buttonValue: "back" } }}>
          {"<"}
        </Button>,
        <Button action="post" target={{ query: { buttonValue: "submit" } }}>
          Submit
        </Button>,
      ];
      break;
    case "done":
      buttons = [
        <Button action="post" target={{ query: { buttonValue: "restart" } }}>
          Start over
        </Button>,
      ];
      break;
  }
  return buttons;
};
