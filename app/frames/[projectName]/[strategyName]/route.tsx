import { Button } from "frames.js/next";
import { FrameImage } from "../../../_components/FrameImage";
import { generateButtonsData } from "../../../_services/buttons";
import { getUpdatedFrameState } from "../../../_services/frameState";
import { frames } from "./frames";
import { FrameState } from "@/app/_types/frame";
import {
  getApprovalTransaction,
  getSubmissionTransaction,
} from "@/app/_services/transactions";

const parseButtonsData = (buttonsData: any[], currentState: FrameState) => {
  return buttonsData.map((button) => {
    if (button.buttonValue === "approve" || button.buttonValue === "submit") {
      // Update state after tokens have been approved or submission has been made
      const updatedState = {
        ...currentState,
        ...(button.buttonValue === "approve" ? { tokensApproved: true } : {}),
        ...(button.buttonValue === "submit" ? { currentStep: "done" } : {}),
      };
      return (
        <Button
          action="tx"
          target={{ query: { [button.buttonTarget]: button.buttonValue } }}
          post_url={{
            query: { currentState: encodeURI(JSON.stringify(updatedState)) },
          }}
        >
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

  // Handle state restoration after transaction
  if (ctx.url.searchParams.has("currentState")) {
    currentState = JSON.parse(
      decodeURI(ctx.url.searchParams.get("currentState")!)
    );
  }

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
  } else if (ctx.url.searchParams.get("buttonValue")) {
    const buttonValue = ctx.url.searchParams.get("buttonValue");
    // Handle transactions
    if (buttonValue === "approve") {
      return getApprovalTransaction(currentState, ctx.dotrainText);
    } else if (buttonValue === "submit") {
      return getSubmissionTransaction(currentState, ctx.dotrainText);
    }
    // Handle state transitions
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
    buttons: parseButtonsData(buttonsData, currentState),
    textInput: currentState.textInputLabel,
    state: currentState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
