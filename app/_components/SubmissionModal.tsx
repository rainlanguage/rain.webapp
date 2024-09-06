"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Config,
  UseAccountReturnType,
  useAccount,
  useChainId,
  useConnect,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import { getOrderDetailsGivenDeployment } from "../_services/parseDotrainFrontmatter";
import { YamlData } from "../_types/yamlData";
import { FrameState } from "../_types/frame";
import { readContract } from "viem/actions";
import { config } from "../providers";
import { erc20Abi, parseUnits } from "viem";
import { getSubmissionTransactionData } from "../_services/transactionData";
import yaml from "js-yaml";
import { orderBookJson } from "@/public/_abis/OrderBook";

interface SubmissionModalProps {
  yamlData: YamlData;
  currentState: FrameState;
  buttonText: string;
  dotrainText: string;
}

enum SubmissionStatus {
  CheckingAllowance = "CheckingAllownace",
  ApprovingTokens = "ApprovingTokens",
  DeployingStrategy = "DeployingStrategy",
  Done = "Done",
}

export const SubmissionModal = ({
  yamlData,
  buttonText,
  currentState,
  dotrainText,
}: SubmissionModalProps) => {
  const account = useAccount();
  const currentWalletChainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { data: hash, writeContractAsync } = useWriteContract();

  const [submissionState, setSubmissionState] = useState<SubmissionStatus>(
    SubmissionStatus.CheckingAllowance
  );

  const {
    deployment,
    order,
    orderBook,
    orderBookAddress,
    network,
    outputToken,
    outputTokenAddress,
    scenario,
  } = getOrderDetailsGivenDeployment(
    yamlData,
    currentState.deploymentOption.deployment
  );

  const submitStrategy = async () => {
    const outputTokenDecimals = await readContract(config.getClient(), {
      abi: erc20Abi,
      address: outputTokenAddress,
      functionName: "decimals",
    });

    // Get token approval for output token, if required
    const depositAmount = parseUnits(
      String(currentState.deposit),
      outputTokenDecimals
    );

    const existingAllowance = await readContract(config.getClient(), {
      abi: erc20Abi,
      address: outputTokenAddress,
      functionName: "allowance",
      args: [account.address as `0x${string}`, orderBookAddress],
    });

    if (existingAllowance < depositAmount) {
      setSubmissionState(SubmissionStatus.ApprovingTokens);

      await writeContractAsync({
        address: outputTokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [orderBookAddress, depositAmount],
      });
    } else {
      setSubmissionState(SubmissionStatus.DeployingStrategy);
    }

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

    if (currentWalletChainId !== network["chain-id"]) {
      await switchChainAsync({ chainId: network["chain-id"] });
    }

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

    setSubmissionState(SubmissionStatus.Done);
  };

  return (
    <Dialog>
      {account.isConnected ? (
        <DialogTrigger
          onClick={submitStrategy}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-colors"
        >
          {buttonText}
        </DialogTrigger>
      ) : (
        <ConnectButton />
      )}
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Submit strategy</DialogTitle>
        </DialogHeader>
        <div>
          Approve tokens:{" "}
          {submissionState === SubmissionStatus.ApprovingTokens
            ? "Pending..."
            : "Approved!"}
        </div>
        <div>
          Deploy strategy:{" "}
          {submissionState === SubmissionStatus.DeployingStrategy
            ? "Pending..."
            : "Approved!"}
        </div>
      </DialogContent>
    </Dialog>
  );
};
