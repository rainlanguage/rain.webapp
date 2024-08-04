import { Button } from "frames.js/next";
import { DeploymentOption, YamlData } from "../types/yamlData";

interface HybridButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isWebapp: boolean;
  target?: any;
  children?: any;
}

export const HybridButton = ({
  isWebapp,
  target,
  children,
  ...rest
}: HybridButtonProps) => {
  return isWebapp ? (
    <button {...rest}>{children}</button>
  ) : (
    <Button action={"post"} target={{ query: target }}>
      {children}
    </Button>
  );
};

export const getPaginatedButtons = (
  allButtons: any[],
  buttonPage: number,
  isWebapp: boolean | undefined = false
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
          buttonPage > 0 &&
            HybridButton({
              isWebapp,
              target: { buttonPage: buttonPage - 1 },
              children: "<",
            }),
          ...allButtons.slice(buttonPageOffset, buttonEndIndex),
          includeMoreButton &&
            HybridButton({
              isWebapp,
              target: { buttonPage: buttonPage + 1 },
              children: "More",
            }),
        ]),
  ];
};

export const getPresetsButtons = (
  presets: number[],
  minimum: number | undefined,
  isWebapp: boolean | undefined = false
): any[] => {
  return [
    HybridButton({
      isWebapp: false,
      target: { buttonValue: "back" },
      children: "<",
    }),
    ...presets.map((preset: number) =>
      HybridButton({
        isWebapp: false,
        target: { buttonValue: `${preset}` },
        children: `${preset}`,
      })
    ),
    ...(minimum !== undefined
      ? [
          HybridButton({
            isWebapp,
            target: {
              textInputLabel: `Enter a number greater than ${minimum}`,
            },
            children: "Custom",
          }),
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
      HybridButton({
        isWebapp,
        target: { textInputLabel: "" },
        children: "<",
      }),
      HybridButton({
        isWebapp,
        target: { buttonValue: "submit" },
        children: "Submit",
      }),
    ];
  }
  switch (currentState.currentStep) {
    case "start":
      buttons = [
        HybridButton({
          isWebapp,
          target: { buttonValue: "start" },
          children: "Start",
        }),
      ];
      break;
    case "deployment":
      const allButtons = yamlData.gui.deployments.map(
        (deploymentOption: DeploymentOption) =>
          HybridButton({
            isWebapp,
            target: { buttonValue: JSON.stringify(deploymentOption) },
            children: deploymentOption.name,
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
        HybridButton({
          isWebapp,
          target: { buttonValue: "back" },
          children: "<",
        }),
        HybridButton({
          isWebapp,
          target: { buttonValue: "submit" },
          children: "Submit",
        }),
      ];
      break;
    case "done":
      buttons = [
        HybridButton({
          isWebapp,
          target: { buttonValue: "restart" },
          children: "Start over",
        }),
      ];
      break;
  }
  return buttons;
};
