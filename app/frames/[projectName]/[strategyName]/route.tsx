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
import * as fs from "node:fs/promises";
import * as path from "node:path";
import yaml from "js-yaml";
import { hasEnoughTokenApproval } from "@/app/_services/tokenApproval";

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

  if (currentState && !currentState.strategyDescription) {
    currentState.strategyDescription = yamlData.gui.description;
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
      return getApprovalTransaction(currentState, yamlData);
    } else if (buttonValue === "submit") {
      const updatedDotrainText =
        yaml.dump(yamlData) + "---" + ctx.dotrainText.split("---")[1];
      return getSubmissionTransaction(
        currentState,
        yamlData,
        updatedDotrainText
      );
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

  // Check for existing token allowance and update state
  if (
    currentState.currentStep === "review" &&
    currentState.requiresTokenApproval &&
    currentState.tokensApproved === false &&
    (ctx?.message as any)?.requesterCustodyAddress
  ) {
    currentState.tokensApproved = await hasEnoughTokenApproval(
      currentState,
      yamlData,
      (ctx.message as any)?.requesterCustodyAddress
    );
  }

  // Generate buttons based on current state
  const buttonsData = generateButtonsData(yamlData, currentState);

  const dmSansLight = fs.readFile(
    path.join(path.resolve(process.cwd(), "public/_fonts"), "DMSans-Light.ttf")
  );

  const [dmSansLightData] = await Promise.all([dmSansLight]);

  return {
    image: <FrameImage currentState={currentState} />,
    buttons: getFrameButtons(buttonsData, currentState, ctx.url),
    textInput: currentState.textInputLabel,
    state: currentState,
    imageOptions: {
      fonts: [
        {
          name: "DM Sans",
          data: dmSansLightData,
          weight: 400,
        },
      ],
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
