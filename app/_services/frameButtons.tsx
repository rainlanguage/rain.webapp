import { Button } from "frames.js/next";
import { FrameState } from "frames.js/next/types";

export const getFrameButtons = (
  buttonsData: any[],
  currentState: FrameState
) => {
  return buttonsData.map((button) => {
    if (button.buttonValue === "approve" || button.buttonValue === "submit") {
      // Update state after tokens have been approved or submission has been made
      const updatedState = {
        ...(currentState as object),
        ...(button.buttonValue === "approve" ? { tokensApproved: true } : {}),
        ...(button.buttonValue === "submit" ? { currentStep: "done" } : {}),
      };
      return (
        <Button
          action="tx"
          target={{ query: { [button.buttonTarget]: button.buttonValue } }}
          post_url={{
            query: { currentState: encodeURI(JSON.stringify(updatedState)) },
          }}
        >
          {button.buttonText}
        </Button>
      );
    }
    return (
      <Button
        action="post"
        target={{ query: { [button.buttonTarget]: button.buttonValue } }}
      >
        {button.buttonText}
      </Button>
    );
  });
};
