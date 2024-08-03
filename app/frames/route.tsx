import { farcasterHubContext } from "frames.js/middleware";
import { createFrames, Button } from "frames.js/next";
import { FrameImage } from "../UI/FrameImage";
import yaml from "js-yaml";
import fs from "fs";
import { YamlData } from "../types/yamlData";
import { generateButtons } from "../services/buttons";
import { FrameState } from "../types/frame";
import { getUpdatedFrameState } from "../services/frameState";

const yamlText = fs
  .readFileSync("streaming-gui-example.rain", "utf8")
  .split("---")[0];
const yamlData = yaml.load(yamlText) as YamlData;

const frames = createFrames<FrameState>({
  basePath: "/frames",
  middleware: [
    farcasterHubContext({
      // remove if you aren't using @frames.js/debugger or you just don't want to use the debugger hub
      ...(process.env.NODE_ENV === "production"
        ? {}
        : {
            hubHttpUrl: "http://localhost:3010/hub",
          }),
    }),
  ],
  initialState: {
    strategyName: yamlData.gui.name,
    currentStep: "start",
    deploymentOption: null,
    bindings: {},
    deposit: null,
    buttonPage: 0,
    textInputLabel: "",
    error: null,
  },
});

const handleRequest = frames(async (ctx) => {
  let currentState = { ...ctx.state };
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

  return {
    image: <FrameImage currentState={currentState} />,
    buttons: generateButtons(yamlData, currentState),
    textInput: currentState.textInputLabel,
    state: currentState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
