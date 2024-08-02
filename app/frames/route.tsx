import { farcasterHubContext } from "frames.js/middleware";
import { createFrames, Button } from "frames.js/next";
import { FrameImage } from "../UI/FrameImage";
import yaml from "js-yaml";
import fs from "fs";
import { YamlData } from "../types/yamlData";
import { generateButtons } from "../services/buttons";

const yamlText = fs
  .readFileSync("streaming-gui-example.rain", "utf8")
  .split("---")[0];
const yamlData = yaml.load(yamlText) as YamlData;

type state = {
  strategyName: string;
  currentStep: string;
  deploymentOption: any;
  bindings: any;
  deposit: number | null;
  buttonPage: number;
  textInputLabel: string;
  error: string | null;
};

const initialState = {
  strategyName: yamlData.gui.name,
  currentStep: "start",
  deploymentOption: null,
  bindings: {},
  deposit: null,
  buttonPage: 0,
  textInputLabel: "",
  error: null,
};

const frames = createFrames<state>({
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
  initialState,
});

const handleRequest = frames(async (ctx) => {
  const currentState = { ...ctx.state };
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
    switch (currentState.currentStep) {
      case "start":
        const deploymentOptions = Object.values(yamlData.gui.deployments);
        if (deploymentOptions.length === 1) {
          // Deployment step can be skipped if there is only one deployment
          currentState.deploymentOption = deploymentOptions[0];
          currentState.currentStep = "fields";
        } else if (buttonValue) {
          currentState.currentStep = "deployment";
        }
        break;
      case "deployment":
        if (buttonValue) {
          currentState.deploymentOption = JSON.parse(buttonValue);
          currentState.currentStep = "fields";
        }
        break;
      case "fields":
        let currentBindingsCount = Object.keys(currentState.bindings).length;
        const fields = currentState.deploymentOption.fields;

        if (buttonValue === "submit") {
          if (inputText && isNaN(Number(inputText))) {
            currentState.error = "Value must be a number";
          } else if (
            inputText &&
            Number(inputText) >= fields[currentBindingsCount].min
          ) {
            const currentField = fields[currentBindingsCount];
            currentState.bindings[currentField.binding] = inputText;
            currentState.textInputLabel = "";
            currentBindingsCount++;
            currentState.buttonPage = 0;
            currentState.error = null;
          } else {
            currentState.error = `Value must be at least ${fields[currentBindingsCount].min}`;
          }
        } else if (buttonValue === "back") {
          if (currentBindingsCount === 0) {
            currentState.currentStep = "deployment";
          } else {
            const currentField = fields[currentBindingsCount - 1];
            delete currentState.bindings[currentField.binding];
          }
        } else {
          const currentField = fields[currentBindingsCount];
          currentState.bindings[currentField.binding] = buttonValue;
          currentBindingsCount++;
          currentState.buttonPage = 0;
        }
        // If all bindings are filled, we can move to the next step
        if (currentBindingsCount >= fields.length) {
          currentState.currentStep = "deposit";
        }
        break;
      case "deposit":
        if (buttonValue === "submit") {
          if (inputText && isNaN(Number(inputText))) {
            currentState.error = "Value must be a number";
          } else if (
            inputText &&
            inputText >= currentState.deploymentOption.deposit.min
          ) {
            currentState.deposit = parseInt(inputText);
            currentState.textInputLabel = "";
            currentState.error = null;
          } else {
            currentState.error = `Value must be at least ${currentState.deploymentOption.deposit.min}`;
          }
        } else if (buttonValue === "back") {
          const currentField =
            currentState.deploymentOption.fields[
              Object.keys(currentState.bindings).length - 1
            ];
          delete currentState.bindings[currentField.binding];
          currentState.currentStep = "fields";
        } else {
          currentState.deposit = Number(buttonValue as string);
        }
        if (currentState.deposit !== null && currentState.deposit > 0) {
          currentState.currentStep = "review";
          currentState.buttonPage = 0;
        }
        break;
      case "review":
        if (buttonValue === "back") {
          currentState.deposit = null;
          currentState.currentStep = "deposit";
        } else if (buttonValue === "submit") {
          currentState.currentStep = "done";
        }
        break;
      case "done":
        if (buttonValue) {
          currentState.currentStep = "start";
          currentState.deploymentOption = undefined;
          currentState.bindings = {};
          currentState.deposit = null;
        }
        break;
    }
  }

  return {
    image: <FrameImage currentState={currentState} />,
    buttons: currentState.textInputLabel
      ? [
          <Button action="post" target={{ query: { textInputLabel: "" } }}>
            {"<"}
          </Button>,
          <Button action="post" target={{ query: { buttonValue: "submit" } }}>
            Submit
          </Button>,
        ]
      : generateButtons(yamlData, currentState),
    textInput: currentState.textInputLabel,
    state: currentState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
