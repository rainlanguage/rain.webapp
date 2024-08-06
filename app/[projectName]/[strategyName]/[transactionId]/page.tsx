"use client";
import { transactionAnalytics } from "@/app/_queries/strategyAnalytics";
import { useState } from "react";

interface props {
  params: {
    projectName: string;
    strategyName: string;
    transactionId: string;
  };
}

const WebappFrame = ({ params: { transactionId } }: props) => {
  const [transactionAnalyticsData, setTransactionAnalyticsData] =
    useState<any>();
  return (
    <>
      <button
        onClick={async () => {
          const url =
            "https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-polygon/0.3/gn";

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: transactionAnalytics(transactionId),
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();
          setTransactionAnalyticsData(result);
        }}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Transaction Analytics data
      </button>
      <pre>{JSON.stringify(transactionAnalyticsData, null, 2)}</pre>
    </>
  );
};

export default WebappFrame;
