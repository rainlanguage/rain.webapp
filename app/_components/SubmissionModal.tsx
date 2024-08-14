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

interface SubmissionModalProps {
  buttonText: string;
  submissionState: {
    tokenApprovalStatus: string;
    strategyDeploymentStatus: string;
  };
  onOpen: () => void;
}

export const SubmissionModal = ({
  buttonText,
  submissionState,
  onOpen,
}: SubmissionModalProps) => {
  const [open, setOpen] = useState(false);
  if (submissionState.strategyDeploymentStatus === "approved") {
    setOpen(false);
  }

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
      <DialogTrigger className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
        {buttonText}
      </DialogTrigger>
      <DialogContent>
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
