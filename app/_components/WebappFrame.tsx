"use client";
import { useState } from "react";
import { generateButtonsData } from "../_services/buttonsData";
import { YamlData } from "../_types/yamlData";
import { FrameImage } from "./FrameImage";
import { getUpdatedFrameState } from "../_services/frameState";
import { FrameState } from "../_types/frame";
import yaml from "js-yaml";
import {
  useAccount,
  useChainId,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import { toHex, erc20Abi, parseUnits } from "viem";
import { orderBookJson } from "@/public/_abis/OrderBook";
import { readContract } from "wagmi/actions";
import { config } from "../providers";
import { ProgressBar } from "./ProgressBar";
import { getSubmissionTransactionData } from "../_services/transactionData";
import _, { set } from "lodash";
import { FailsafeSchemaWithNumbers } from "../_schemas/failsafeWithNumbers";
import { SubmissionModal } from "./SubmissionModal";
import { useSearchParams } from "next/navigation";

interface props {
  dotrainText: string;
}

const WebappFrame = ({ dotrainText }: props) => {
  const yamlData = yaml.load(dotrainText.split("---")[0], {
    schema: FailsafeSchemaWithNumbers,
  }) as YamlData;

  const account = useAccount();
  const currentWalletChainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { data: hash, writeContractAsync } = useWriteContract();

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
    currentStep: "start",
    deploymentOption: null,
    bindings: {},
    deposit: null,
    buttonPage: 0,
    textInputLabel: "",
    error: null,
    requiresTokenApproval: false,
    isWebapp: true,
  };
  const [currentState, setCurrentState] = useState<FrameState>(
    urlState || defaultState
  );
  const [error, setError] = useState<Error | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [submissionState, setSubmissionState] = useState({
    tokenApprovalStatus: "pending",
    strategyDeploymentStatus: "pending",
  });
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

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
    }

    try {
      if (
        currentState.deposit &&
        currentState.currentStep === "review" &&
        buttonData.buttonValue === "submit"
      ) {
        const deployment =
          yamlData.deployments[currentState.deploymentOption.deployment];
        const order = yamlData.orders[deployment.order];

        const fullScenarioPath = deployment.scenario
          .split(".")
          .map((scenario, index, array) =>
            index === array.length - 1 ? scenario : scenario + ".scenarios"
          )
          .join(".");
        const scenario = _.get(yamlData.scenarios, fullScenarioPath);
        const convertedBindings = Object.keys(currentState.bindings).reduce(
          (acc, key) => {
            const value = currentState.bindings[key];
            if (isNaN(value)) {
              return { ...acc, [key]: value };
            }
            return { ...acc, [key]: Number(value) };
          },
          {}
        );
        scenario.bindings = {
          ...scenario.bindings,
          ...convertedBindings,
        };

        const orderBook = yamlData.orderbooks[order.orderbook];
        const orderBookAddress = toHex(BigInt(orderBook.address));

        const network = yamlData.networks[order.network];
        if (currentWalletChainId !== network["chain-id"]) {
          await switchChainAsync({ chainId: network["chain-id"] });
        }

        const outputToken = yamlData.tokens[order.outputs[0].token];
        const outputTokenAddress = toHex(BigInt(outputToken.address));
        const outputTokenDecimals = await readContract(config, {
          abi: erc20Abi,
          address: outputTokenAddress,
          functionName: "decimals",
        });

        // Get token approval for output token, if required
        const depositAmount = parseUnits(
          String(currentState.deposit),
          outputTokenDecimals
        );
        const existingAllowance = await readContract(config, {
          abi: erc20Abi,
          address: outputTokenAddress,
          functionName: "allowance",
          args: [account.address as `0x${string}`, orderBookAddress],
        });
        if (existingAllowance < depositAmount) {
          await writeContractAsync({
            address: outputTokenAddress,
            abi: erc20Abi,
            functionName: "approve",
            args: [orderBookAddress, depositAmount],
          });
        }
        await setSubmissionState({
          tokenApprovalStatus: "approved",
          strategyDeploymentStatus: "pending",
        });

        // Get multicall data for addOrder and deposit
        const updatedDotrainText =
          yaml.dump(yamlData) + "---" + dotrainText.split("---")[1];
        const { addOrderCalldata, depositCallData } =
          await getSubmissionTransactionData(
            currentState,
            updatedDotrainText,
            outputTokenAddress,
            outputTokenDecimals
          );

        await writeContractAsync({
          address: orderBookAddress,
          abi: orderBookJson.abi,
          functionName: "multicall",
          args: [[addOrderCalldata, depositCallData]],
        });
        await setSubmissionState({
          tokenApprovalStatus: "approved",
          strategyDeploymentStatus: "approved",
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
    } catch (error) {
      setSubmissionState({
        tokenApprovalStatus: "pending",
        strategyDeploymentStatus: "pending",
      });
      setIsSubmissionModalOpen(false);
      setError(error as Error);
    }
  };

  const buttonsData = generateButtonsData(yamlData, currentState);

  return (
    <div className="flex-grow flex-col flex w-full">
      <div className="absolute w-full top-0">
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
      <div className="flex gap-x-2 justify-center pb-20">
        {buttonsData.map((buttonData) => {
          return buttonData.buttonValue === "submit" ? (
            <SubmissionModal
              key={buttonData.buttonText}
              open={isSubmissionModalOpen}
              setOpen={setIsSubmissionModalOpen}
              buttonText={buttonData.buttonText}
              submissionState={submissionState}
              onOpen={async () => {
                await handleButtonClick(buttonData);
              }}
            />
          ) : (
            <button
              key={buttonData.buttonText}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              onClick={async () => {
                await handleButtonClick(buttonData);
              }}
            >
              {buttonData.buttonText}
            </button>
          );
        })}
      </div>
      {error && <div>{error.message}</div>}
      {hash && submissionState.strategyDeploymentStatus === "approved" && (
        <>
          <div>Transaction successful! {hash}</div>
          <div>
            <a
              href={`${window.location.origin}${window.location.pathname}/${hash}`}
            >
              Analytics
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default WebappFrame;
