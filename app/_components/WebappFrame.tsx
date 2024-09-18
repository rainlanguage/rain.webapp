"use client";

import { useState } from "react";
import { generateButtonsData } from "../_services/buttonsData";
import { YamlData } from "../_types/yamlData";
import { FrameImage } from "./FrameImage";
import { getUpdatedFrameState } from "../_services/frameState";
import { FrameState } from "../_types/frame";
import yaml from "js-yaml";
import { ProgressBar } from "./ProgressBar";
import _ from "lodash";
import { FailsafeSchemaWithNumbers } from "../_schemas/failsafeWithNumbers";
import { SubmissionModal } from "./SubmissionModal";
import { useSearchParams } from "next/navigation";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { TriangleAlert } from "lucide-react";
import { TokenInfo } from "../_services/getTokenInfo";
interface props {
  dotrainText: string;
  deploymentOption: string | null;
  tokenInfos: TokenInfo[];
}

const WebappFrame = ({ dotrainText, deploymentOption, tokenInfos }: props) => {
  const yamlData = yaml.load(dotrainText.split("---")[0], {
    schema: FailsafeSchemaWithNumbers,
  }) as YamlData;

  const searchParams = useSearchParams();
  const urlState = searchParams.get("currentState")
    ? {
        ...JSON.parse(searchParams.get("currentState") as string),
        requiresTokenApproval: false,
        isWebapp: true,
      }
    : null;
  const defaultState: FrameState = {
    strategyName: yamlData.gui.name,
    strategyDescription: yamlData.gui.description,
    currentStep: deploymentOption ? "fields" : "start",
    deploymentOption:
      yamlData.gui.deployments.find(
        (deployment) => deployment.deployment === deploymentOption
      ) || undefined,
    bindings: {},
    deposits: [],
    buttonPage: 0,
    buttonMax: 10,
    textInputLabel: "",
    error: null,
    isWebapp: true,
    tokenInfos,
  };

  const [currentState, setCurrentState] = useState<FrameState>(
    urlState || defaultState
  );
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>("");

  const handleButtonClick = async (buttonData: any) => {
    setError(null);
    console.log(buttonData);
    // Handle page navigation
    if (buttonData.buttonTarget === "textInputLabel") {
      console.log("buttonData.buttonValue", buttonData.buttonValue);
      setCurrentState({
        ...currentState,
        textInputLabel: buttonData.buttonValue,
      });
      return;
    } else if (buttonData.buttonTarget === "buttonPage") {
      setCurrentState({
        ...currentState,
        buttonPage: buttonData.buttonValue,
      });
      return;
    } else if (
      buttonData.buttonTarget === "buttonValue" &&
      buttonData.buttonValue === "back"
    ) {
      setCurrentState({
        ...currentState,
        textInputLabel: "",
      });
    }

    const updatedState = getUpdatedFrameState(
      yamlData,
      currentState,
      buttonData.buttonValue,
      inputText
    );

    if (
      updatedState.currentStep === "deposit" &&
      updatedState.deploymentOption
    ) {
      const deposit =
        updatedState.deploymentOption.deposits[
          Object.keys(currentState.deposits).length
        ];
      if (deposit.min && !deposit.presets) {
        updatedState.textInputLabel = `Enter a number greater than ${deposit.min}`;
      }
    }

    if (
      updatedState.currentStep === "fields" &&
      updatedState.deploymentOption
    ) {
      const field =
        updatedState.deploymentOption.fields[
          Object.keys(updatedState.bindings).length
        ];
      if (field.min && !field.presets) {
        updatedState.textInputLabel = `Enter a number greater than ${field.min}`;
      }
    }

    setCurrentState({ ...updatedState });

    if (inputText) {
      setInputText("");
    }
  };

  const buttonsData = generateButtonsData(yamlData, currentState);

  return (
    <div className="flex-grow flex-col flex w-full">
      <div className="w-full top-0">
        <ProgressBar currentState={currentState} />
      </div>
      <FrameImage currentState={currentState} />
      {currentState.textInputLabel && (
        <div className="flex justify-center mb-4">
          <input
            className="border-gray-200 rounded-lg border p-2 w-full max-w-96"
            type="number"
            placeholder={currentState.textInputLabel}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <br />
        </div>
      )}
      <div className="flex flex-wrap gap-2 justify-center pb-20 px-8">
        {buttonsData.map((buttonData) => {
          return buttonData.buttonValue === "finalSubmit" ? (
            <SubmissionModal
              key={buttonData.buttonText}
              buttonText={buttonData.buttonText}
              yamlData={yamlData}
              currentState={currentState}
              dotrainText={dotrainText}
              setError={setError}
            />
          ) : (
            <button
              key={buttonData.buttonText}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-colors"
              onClick={async () => {
                await handleButtonClick(buttonData);
              }}
            >
              {buttonData.buttonText}
            </button>
          );
        })}
        <div className="flex w-full justify-center">
          {currentState.error ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span className="text-red-600">{currentState.error}</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Dialog open={!!error}>
        <DialogContent className="bg-white flex flex-col items-center">
          <TriangleAlert color="red" />
          <div className="w-full text-center">{error}</div>
          <DialogClose asChild>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-colors"
              onClick={() => setError(null)}
            >
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebappFrame;
