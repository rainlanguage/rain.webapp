import { Button } from "frames.js/next";
import { FrameImage } from "../../../_components/FrameImage";
import { generateButtonsData } from "../../../_services/buttons";
import { getUpdatedFrameState } from "../../../_services/frameState";
import { frames } from "./frames";
import { FrameState } from "@/app/_types/frame";

const parseButtonsData = (buttonsData: any[]) => {
  return buttonsData.map((button) => {
    if (button.buttonValue === "submit") {
      return (
        <Button action="tx" target="/txdata">
          {button.buttonText}
        </Button>
      );
    }
    return (
      <Button
        action="post"
        target={{ query: { [button.buttonTarget]: button.buttonValue } }}
      >
        {button.buttonText}
      </Button>
    );
  });
};

const handleRequest = frames(async (ctx) => {
  const yamlData = ctx.yamlData;
  let currentState: FrameState = { ...(ctx.state as FrameState) };

  if (currentState && !currentState.strategyName) {
    currentState.strategyName = yamlData.gui.name;
  }

  // Handle page navigation
  if (ctx.url.searchParams.has("textInputLabel")) {
    currentState.textInputLabel = ctx.url.searchParams.get(
      "textInputLabel"
    ) as string;
    currentState.error = null;
  } else if (ctx.url.searchParams.has("buttonPage")) {
    currentState.buttonPage = parseInt(ctx.url.searchParams.get("buttonPage")!);
  } else {
    // Handle state transitions
    const buttonValue = ctx.url.searchParams.get("buttonValue");
    const inputText = ctx.message?.inputText;
    currentState = getUpdatedFrameState(
      yamlData,
      currentState,
      buttonValue,
      inputText
    );
  }

  const buttonsData = generateButtonsData(yamlData, currentState);

  return {
    image: <FrameImage currentState={currentState} />,
    buttons: parseButtonsData(buttonsData),
    textInput: currentState.textInputLabel,
    state: currentState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
