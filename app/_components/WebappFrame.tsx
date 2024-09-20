"use client";

import { useEffect, useState } from "react";
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
import { TokenInfo, getTokenInfos } from "../_services/getTokenInfo";
import { Button, Spinner } from "flowbite-react";
import ShareStateAsUrl from "./ShareStateAsUrl";
interface props {
  dotrainText: string;
  deploymentOption: string | null;
}

const WebappFrame = ({ dotrainText, deploymentOption }: props) => {
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
    textInputLabel: (() => {
      const deployment =
        yamlData.gui.deployments.find(
          (deployment) => deployment.deployment === deploymentOption
        ) || undefined;
      if (!deployment) {
        return "";
      }
      const fields = deployment.fields;
      const currentField = fields[0];
      if (currentField.min !== undefined && !currentField.presets) {
        return `Enter a number greater than ${currentField.min}`;
      }
      return "";
    })(),
    error: null,
    isWebapp: true,
    tokenInfos: [] as TokenInfo[],
  };

  const [currentState, setCurrentState] = useState<FrameState>(
    urlState || defaultState
  );
  const [fetchingTokens, setFetchingTokens] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    if (!fetchingTokens && currentState.tokenInfos.length === 0) {
      const fetchTokenInfos = async () => {
        setFetchingTokens(true);
        try {
          const tokenInfos = await getTokenInfos(yamlData);
          setCurrentState((prevState) => ({
            ...prevState,
            tokenInfos,
          }));
        } catch (e) {
          console.error(e);
          setError("Failed to fetch token information");
        } finally {
          setFetchingTokens(false);
        }
      };
      fetchTokenInfos();
    }
  }, [yamlData, fetchingTokens, currentState.tokenInfos.length]);

  const handleButtonClick = async (buttonData: any) => {
    setError(null);
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

    setCurrentState({ ...updatedState });

    if (inputText) {
      setInputText("");
    }
  };

  const buttonsData = generateButtonsData(yamlData, currentState);

  return fetchingTokens ? (
    <Spinner />
  ) : (
    <div className="flex-grow flex-col flex w-full ">
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
      <div className="flex flex-wrap gap-2 justify-center md:pb-20 pb-8 px-8 pt-10">
        {buttonsData.map((buttonData) => {
          return buttonData.buttonValue === "finalSubmit" ? (
            <div className="flex gap-2 flex-wrap justify-center">
              <SubmissionModal
                key={buttonData.buttonText}
                buttonText={buttonData.buttonText}
                yamlData={yamlData}
                currentState={currentState}
                dotrainText={dotrainText}
                setError={setError}
              />
              <ShareStateAsUrl currentState={currentState} />
            </div>
          ) : (
            <Button
              color="primary"
              size="sm"
              key={buttonData.buttonText}
              onClick={async () => {
                await handleButtonClick(buttonData);
              }}
            >
              {buttonData.buttonText}
            </Button>
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
