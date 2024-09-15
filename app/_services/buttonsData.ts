import { FrameState } from "../_types/frame";
import { DeploymentOption, YamlData } from "../_types/yamlData";

export const getPaginatedButtons = (
  allButtons: any[],
  buttonPage: number,
  buttonMax = 4
): any[] => {
  const buttonPageOffset = buttonPage * 3;
  let buttonEndIndex = buttonPageOffset + buttonMax;
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
                  buttonText: "←",
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
      buttonText: "←",
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
  currentState: FrameState
): any[] => {
  let buttons: any[] = [];
  if (currentState.textInputLabel) {
    return [
      {
        buttonTarget: "textInputLabel",
        buttonValue: "",
        buttonText: "←",
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
      buttons = getPaginatedButtons(
        allButtons,
        currentState.buttonPage,
        currentState.buttonMax
      );
      break;
    case "fields":
      if (!currentState.deploymentOption) {
        return buttons;
      }
      const field =
        currentState.deploymentOption.fields[
          Object.keys(currentState.bindings).length
        ];
      const fieldButtons = getPresetsButtons(field.presets, field.min);
      buttons = getPaginatedButtons(
        fieldButtons,
        currentState.buttonPage,
        currentState.buttonMax
      );
      break;
    case "deposit":
      if (!currentState.deploymentOption) {
        return buttons;
      }

      const deposit =
        currentState.deploymentOption.deposits[
          Object.keys(currentState.deposits).length
        ];

      // const deposit = currentState.deploymentOption.deposit;
      const depositButtons = getPresetsButtons(deposit.presets, deposit.min);
      buttons = getPaginatedButtons(
        depositButtons,
        currentState.buttonPage,
        currentState.buttonMax
      );
      break;
    case "review":
      buttons = [
        {
          buttonTarget: "buttonValue",
          buttonValue: "back",
          buttonText: "←",
        },
      ];

      const supportedNetworks = {
        Ethereum: 1,
        Arbitrum: 42161,
        Base: 8453,
        Degen: 666666666,
        Gnosis: 100,
        Optimism: 10,
        Zora: 7777777,
      };
      const deployment =
        yamlData.deployments[currentState.deploymentOption?.deployment || ""];
      const order = yamlData.orders[deployment.order];
      const network = yamlData.networks[order.network];

      if (
        currentState.isWebapp ||
        Object.values(supportedNetworks).includes(network["chain-id"])
      ) {
        buttons.push({
          buttonTarget: "buttonValue",
          buttonValue: "submit",
          buttonText: "Deposit tokens and deploy strategy",
        });
      } else {
        buttons.push({
          buttonAction: "link",
          buttonTarget: "currentState",
          buttonValue: encodeURIComponent(JSON.stringify(currentState)),
          buttonText: "Deposit tokens and deploy strategy",
        });
      }
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
