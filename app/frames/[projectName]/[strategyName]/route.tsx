import { FrameImage } from "../../../_components/FrameImage";
import { generateButtonsData } from "../../../_services/buttonsData";
import { getUpdatedFrameState } from "../../../_services/frameState";
import { frames } from "./frames";
import { FrameState } from "@/app/_types/frame";
import {
  getApprovalTransaction,
  getSubmissionTransaction,
} from "@/app/_services/frameTransactions";
import { getFrameButtons } from "@/app/_services/frameButtons";

const handleRequest = frames(async (ctx) => {
  const yamlData = ctx.yamlData;
  let currentState: FrameState = { ...(ctx.state as FrameState) };

  // Handle state restoration after transactions
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

  // Generate buttons based on current state
  const buttonsData = generateButtonsData(yamlData, currentState);

  return {
    image: <FrameImage currentState={currentState} />,
    buttons: getFrameButtons(buttonsData, currentState),
    textInput: currentState.textInputLabel,
    state: currentState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
