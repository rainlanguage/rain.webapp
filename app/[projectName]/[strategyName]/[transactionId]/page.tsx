"use client";
import { transactionAnalytics } from "@/app/_queries/strategyAnalytics";
import { useState } from "react";
import { formatUnits } from "viem";

interface props {
  params: {
    projectName: string;
    strategyName: string;
    transactionId: string;
  };
}

const StrategyAnalytics = ({ params: { transactionId } }: props) => {
  const [transactionAnalyticsData, setTransactionAnalyticsData] =
    useState<any>();

  const getTransactionAnalyticsData = async () => {
    const response = await fetch(
      "https://api.goldsky.com/api/public/project_clv14x04y9kzi01saerx7bxpg/subgraphs/ob4-base/0.4/gn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: transactionAnalytics(transactionId),
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    setTransactionAnalyticsData(result);
  };
  if (transactionAnalyticsData === undefined) {
    getTransactionAnalyticsData();
  }

  const order = transactionAnalyticsData?.data?.events[0]?.order;
  const totalTradeCount = order?.trades.length;
  const inputVaults = order?.inputs.reduce((acc: any, vault: any) => {
    acc[vault.token.name] = order.trades.reduce(
      (acc: any, trade: any) => {
        if (
          trade.inputVaultBalanceChange.vault.token.name === vault.token.name
        ) {
          acc.totalIn =
            (acc.totalIn || 0) + Number(trade.inputVaultBalanceChange.amount);
        }
        return acc;
      },
      {
        decimals: vault.token.decimals,
        balance: vault.balance,
      }
    );

    return acc;
  }, {});
  const outputVaults = order?.outputs.reduce((acc: any, vault: any) => {
    acc[vault.token.name] = order.trades.reduce(
      (acc: any, trade: any) => {
        if (
          trade.outputVaultBalanceChange.vault.token.name === vault.token.name
        ) {
          acc.totalOut =
            (acc.totalOut || 0) +
            Math.abs(Number(trade.outputVaultBalanceChange.amount));
        }
        return acc;
      },
      {
        decimals: vault.token.decimals,
        balance: vault.balance,
      }
    );

    return acc;
  }, {});

  return (
    <div className="p-4">
      {totalTradeCount && (
        <h1>
          <span className="font-bold">Number of trades:</span> {totalTradeCount}
        </h1>
      )}
      {inputVaults && (
        <div className="py-2">
          <h2 className="underline">Input Vaults</h2>
          {Object.keys(inputVaults).map((token: any) => (
            <div>
              <h3 className="font-semibold">{token}</h3>
              <p>
                <span className="font-medium">Total In:</span>{" "}
                {formatUnits(
                  inputVaults[token].totalIn,
                  inputVaults[token].decimals
                )}
              </p>
              <p>
                <span className="font-medium">Balance:</span>{" "}
                {formatUnits(
                  inputVaults[token].balance,
                  inputVaults[token].decimals
                )}
              </p>
            </div>
          ))}
        </div>
      )}
      {outputVaults && (
        <div className="py-2">
          <h2 className="underline">Output Vaults</h2>
          {Object.keys(outputVaults).map((token: any) => (
            <div>
              <h3 className="font-semibold">{token}</h3>
              <p>
                <span className="font-medium">Total Out:</span>{" "}
                {formatUnits(
                  outputVaults[token].totalOut,
                  outputVaults[token].decimals
                )}
              </p>
              <p>
                <span className="font-medium">Balance:</span>{" "}
                {formatUnits(
                  outputVaults[token].balance,
                  outputVaults[token].decimals
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StrategyAnalytics;
