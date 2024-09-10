import React, { SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useChainId,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import { readContract } from "viem/actions";
import { waitForTransactionReceipt } from "viem/actions";
import { config } from "../providers";
import { erc20Abi, parseUnits } from "viem";
import { orderBookJson } from "@/public/_abis/OrderBook";
import { getOrderDetailsGivenDeployment } from "../_services/parseDotrainFrontmatter"; // Restored
import { getSubmissionTransactionData } from "../_services/transactionData"; // Assuming you're still using this
import yaml from "js-yaml"; // Still needed
import { YamlData } from "../_types/yamlData";
import { FrameState } from "../_types/frame";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SubmissionModalProps {
  yamlData: YamlData;
  currentState: FrameState;
  buttonText: string;
  dotrainText: string;
  setError: React.Dispatch<SetStateAction<string | null>>;
}

enum SubmissionStatus {
  CheckingAllowance = "CheckingAllowance",
  ApprovingTokens = "ApprovingTokens",
  WaitingForApprovalConfirmation = "WaitingForApprovalConfirmation",
  DeployingStrategy = "DeployingStrategy",
  WaitingForDeploymentConfirmation = "WaitingForDeploymentConfirmation",
  Done = "Done",
}

export const SubmissionModal = ({
  yamlData,
  buttonText,
  currentState,
  dotrainText,
  setError,
}: SubmissionModalProps) => {
  const router = useRouter();

  const account = useAccount();
  const currentWalletChainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();

  const [submissionState, setSubmissionState] = useState<SubmissionStatus>(
    SubmissionStatus.CheckingAllowance
  );

  const [open, setOpen] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const [hash, setHash] = useState<string | null>(null);

  useEffect(() => {
    if (submissionState === SubmissionStatus.Done) {
      setTimeout(() => {
        setShowFinalMessage(true);
      }, 1000);
    }
  }, [submissionState]);

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
    currentState.deploymentOption?.deployment || ""
  ); // Restored call to getOrderDetailsGivenDeployment

  const submitStrategy = async () => {
    setOpen(true);
    try {
      const outputTokenDecimals = await readContract(config.getClient(), {
        abi: erc20Abi,
        address: outputTokenAddress,
        functionName: "decimals",
      });

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

        // Send approval transaction
        const approveTx = await writeContractAsync({
          address: outputTokenAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [orderBookAddress, depositAmount],
        });

        setSubmissionState(SubmissionStatus.WaitingForApprovalConfirmation);

        // Wait for approval transaction confirmation
        await waitForTransactionReceipt(config.getClient(), {
          hash: approveTx,
          confirmations: 1,
        });

        setSubmissionState(SubmissionStatus.DeployingStrategy);
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

      // Send deployment transaction
      const deployTx = await writeContractAsync({
        address: orderBookAddress,
        abi: orderBookJson.abi,
        functionName: "multicall",
        args: [[addOrderCalldata, depositCallData]],
      });

      setSubmissionState(SubmissionStatus.WaitingForDeploymentConfirmation);

      // Wait for deployment transaction confirmation
      await waitForTransactionReceipt(config.getClient(), {
        hash: deployTx,
        confirmations: 4,
      });

      setHash(deployTx);

      setSubmissionState(SubmissionStatus.Done);
    } catch (e: any) {
      setError(e?.cause?.message || e?.message || "An error occurred");
      setOpen(false);
      console.error(e);
    }
  };

  return (
    <Dialog open={open}>
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
      <DialogContent className="bg-white flex flex-col justify-center w-full font-light gap-y-8">
        {!showFinalMessage && (
          <div>
            <DialogTitle className="w-full font-light text-2xl">
              Deploying your strategy
            </DialogTitle>
            <div
              className={`transition-opacity duration-1000 flex flex-col ${
                submissionState === SubmissionStatus.Done
                  ? "opacity-0"
                  : "opacity-100"
              }`}
            >
              <div className="flex items-center my-4">
                <div
                  className={`text-2xl text-white rounded-full flex items-center justify-center mr-4 transition-all ${
                    submissionState === SubmissionStatus.CheckingAllowance ||
                    submissionState === SubmissionStatus.ApprovingTokens ||
                    submissionState ===
                      SubmissionStatus.WaitingForApprovalConfirmation
                      ? "bg-amber-500 w-12 h-12"
                      : "bg-emerald-600 w-10 h-10"
                  }`}
                >
                  1
                </div>
                <div className="text-lg">
                  {submissionState === SubmissionStatus.CheckingAllowance ? (
                    <span className="animate-pulse">Checking allowance...</span>
                  ) : submissionState === SubmissionStatus.ApprovingTokens ? (
                    <span className="animate-pulse">Approving tokens...</span>
                  ) : submissionState ===
                    SubmissionStatus.WaitingForApprovalConfirmation ? (
                    <span className="animate-pulse">
                      Waiting for approval confirmation...
                    </span>
                  ) : (
                    "Tokens approved"
                  )}
                </div>
              </div>

              <div className="flex items-center my-4">
                <div
                  className={`text-2xl text-white rounded-full transition-all flex items-center justify-center mr-4 ${
                    submissionState === SubmissionStatus.DeployingStrategy
                      ? "bg-amber-500 w-12 h-12"
                      : submissionState ===
                        SubmissionStatus.WaitingForDeploymentConfirmation
                      ? "bg-amber-500 w-12 h-12"
                      : submissionState === SubmissionStatus.Done
                      ? "bg-emerald-600 w-10 h-10"
                      : "bg-gray-400 w-10 h-10"
                  }`}
                >
                  2
                </div>
                <div className="text-lg">
                  {submissionState === SubmissionStatus.DeployingStrategy ? (
                    <span className="animate-pulse">Deploying strategy...</span>
                  ) : submissionState ===
                    SubmissionStatus.WaitingForDeploymentConfirmation ? (
                    <span className="animate-pulse">
                      Waiting for deployment confirmation...
                    </span>
                  ) : submissionState === SubmissionStatus.Done ? (
                    "Strategy deployed"
                  ) : (
                    <span className="text-gray-500">Deploy strategy</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {showFinalMessage ? (
          <div className="flex flex-col items-start transition-opacity duration-1500 animate-fade-in gap-y-4">
            <DialogTitle className="w-full font-light text-2xl">
              Your strategy is live!
            </DialogTitle>
            <div>
              It will continue to trade until removed. If you're interested in
              creating your own strategies from scratch, try{" "}
              <a href="https://docs.rainlang.xyz"> Raindex.</a>
            </div>
            <Button
              className="mt-4"
              onClick={() =>
                router.push(`${window.location.origin}/my-strategies`)
              }
            >
              Track your strategy
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
