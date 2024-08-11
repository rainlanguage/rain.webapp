"use client";
import { useState } from "react";
import { generateButtonsData } from "../_services/buttonsData";
import { YamlData } from "../_types/yamlData";
import { FrameImage } from "./FrameImage";
import { getUpdatedFrameState } from "../_services/frameState";
import { FrameState } from "../_types/frame";
import { getAddOrderCalldata } from "@rainlanguage/orderbook";
import yaml from "js-yaml";
import YAML from "yaml";
import { useWriteContract } from "wagmi";
import { encodeFunctionData, toHex, erc20Abi, parseUnits } from "viem";
import { orderBookJson } from "@/public/_abis/OrderBook";
import { readContract } from "wagmi/actions";
import { config } from "../providers";
import { ProgressBar } from "./ProgressBar";

interface props {
  dotrainText: string;
}

const WebappFrame = ({ dotrainText }: props) => {
  const yamlData = yaml.load(dotrainText.split("---")[0]) as YamlData;
  const YAMLData = YAML.parse(dotrainText.split("---")[0], {
    intAsBigInt: true,
  }) as YamlData;

  const { data: hash, error, writeContractAsync } = useWriteContract();
  const [currentState, setCurrentState] = useState<FrameState>({
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
  });
  const [inputText, setInputText] = useState<string>("");

  const handleButtonClick = async (buttonData: any) => {
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

    if (
      currentState.deposit &&
      currentState.currentStep === "review" &&
      buttonData.buttonValue === "submit"
    ) {
      const deployment =
        YAMLData.deployments[currentState.deploymentOption.deployment];
      const order = YAMLData.orders[deployment.order];

      const orderBook = YAMLData.orderbooks[order.orderbook];
      const orderBookAddress = toHex(BigInt(orderBook.address));

      const outputToken = YAMLData.tokens[order.outputs[0].token];
      const outputTokenAddress = toHex(BigInt(outputToken.address));
      const outputTokenDecimals = await readContract(config, {
        abi: erc20Abi,
        address: outputTokenAddress,
        functionName: "decimals",
      });

      const depositAmount = parseUnits(
        String(currentState.deposit),
        outputTokenDecimals
      );

      // Get token approval for output token
      await writeContractAsync({
        address: outputTokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [orderBookAddress, depositAmount],
      });

      // Add order to orderbook and deposit output token to vault
      const addOrderCallData = await getAddOrderCalldata(
        dotrainText,
        currentState.deploymentOption.deployment
      );
      const depositCallData = encodeFunctionData({
        functionName: "deposit2",
        abi: orderBookJson.abi,
        args: [
          outputTokenAddress,
          toHex(BigInt(order.outputs[0]["vault-id"])),
          depositAmount,
          [],
        ],
      });
      await writeContractAsync({
        address: orderBookAddress,
        abi: orderBookJson.abi,
        functionName: "multicall",
        args: [[toHex(addOrderCallData), depositCallData]],
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
        {buttonsData.map((buttonData) => (
          <button
            key={buttonData.buttonText}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            onClick={async () => {
              await handleButtonClick(buttonData);
            }}
          >
            {buttonData.buttonText}
          </button>
        ))}
        </div>
      {error && <div>{error.message}</div>}
      {hash && <div>Transaction successful! {hash}</div>}
    </div>
  );
};

export default WebappFrame;
