"use client";
import { useState } from "react";
import { generateButtonsData } from "../_services/buttonsData";
import { YamlData } from "../_types/yamlData";
import { FrameImage } from "./FrameImage";
import { getUpdatedFrameState } from "../_services/frameState";
import { FrameState } from "../_types/frame";
import yaml from "js-yaml";
import YAML from "yaml";
import { useWriteContract } from "wagmi";
import { toHex, erc20Abi, parseUnits } from "viem";
import { orderBookJson } from "@/public/_abis/OrderBook";
import { readContract } from "wagmi/actions";
import { config } from "../providers";
import { getSubmissionTransactionData } from "../_services/transactionData";

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

      // Get token approval for output token
      const depositAmount = parseUnits(
        String(currentState.deposit),
        outputTokenDecimals
      );
      await writeContractAsync({
        address: outputTokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [orderBookAddress, depositAmount],
      });

      // Get multicall data for addOrder and deposit
      const { addOrderCalldata, depositCallData } =
        await getSubmissionTransactionData(
          currentState,
          dotrainText,
          outputTokenAddress,
          outputTokenDecimals
        );

      await writeContractAsync({
        address: orderBookAddress,
        abi: orderBookJson.abi,
        functionName: "multicall",
        args: [[addOrderCalldata, depositCallData]],
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
    <>
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
            onClick={async () => {
              await handleButtonClick(buttonData);
            }}
          >
            {buttonData.buttonText}
          </button>
        ))}
      {error && <div>{error.message}</div>}
      {hash && <div>Transaction successful! {hash}</div>}
    </>
  );
};

export default WebappFrame;
