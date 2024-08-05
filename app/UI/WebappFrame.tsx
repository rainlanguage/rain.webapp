"use client";
import { useState } from "react";
import { generateButtonsData } from "../services/buttons";
import { YamlData } from "../types/yamlData";
import { FrameImage } from "./FrameImage";
import { getUpdatedFrameState } from "../services/frameState";
import { FrameState } from "../types/frame";

interface props {
  yamlData: YamlData;
}

const WebappFrame = ({ yamlData }: props) => {
  const [currentState, setCurrentState] = useState<FrameState>({
    strategyName: yamlData.gui.name,
    currentStep: "start",
    deploymentOption: null,
    bindings: {},
    deposit: null,
    buttonPage: 0,
    textInputLabel: "",
    error: null,
  });
  const [inputText, setInputText] = useState<string>("");

  const buttonsData = generateButtonsData(yamlData, currentState);
  return (
    <>
      <div className="w-1/2 ml-10">
        <FrameImage currentState={currentState} />
        {currentState.textInputLabel && (
          <>
            <input
              type="number"
              placeholder={currentState.textInputLabel}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <br />
          </>
        )}
        {buttonsData.map((buttonData) => (
          <button
            key={buttonData.buttonText}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              // Handle page navigation
              if (buttonData.buttonTarget === "textInputLabel") {
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
              }

              const updatedState = getUpdatedFrameState(
                yamlData,
                currentState,
                buttonData.buttonValue,
                inputText
              );
              setCurrentState({ ...updatedState });
              if (inputText) {
                setInputText("");
              }
            }}
          >
            {buttonData.buttonText}
          </button>
        ))}
      </div>
    </>
  );
};

export default WebappFrame;
