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
import { useAccount } from "wagmi";

interface SubmissionModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  buttonText: string;
  submissionState: {
    tokenApprovalStatus: string;
    strategyDeploymentStatus: string;
  };
  onOpen: () => void;
}

export const SubmissionModal = ({
  open,
  setOpen,
  buttonText,
  submissionState,
  onOpen,
}: SubmissionModalProps) => {
  if (submissionState.strategyDeploymentStatus === "approved") {
    setOpen(false);
  }

  const { isConnected } = useAccount();

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value === true) {
          onOpen();
        }
      }}
    >
      {isConnected ? (
        <DialogTrigger className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
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
          {submissionState.tokenApprovalStatus === "pending"
            ? "Pending..."
            : "Approved!"}
        </div>
        <div>
          Deploy strategy:{" "}
          {submissionState.strategyDeploymentStatus === "pending"
            ? "Pending..."
            : "Approved!"}
        </div>
      </DialogContent>
    </Dialog>
  );
};
