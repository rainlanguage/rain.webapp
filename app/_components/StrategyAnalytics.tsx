"use client";
import { getTransactionAnalyticsData } from "@/app/_queries/strategyAnalytics";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TokenAndBalance } from "./TokenAndBalance";
import { formatTimestampSecondsAsLocal } from "../_services/dates";
import { Button } from "@/components/ui/button";
import { orderBookJson } from "@/public/_abis/OrderBook";
import { useWriteContract } from "wagmi";
import { decodeAbiParameters, formatUnits } from "viem";
import { Table } from "flowbite-react";

interface props {
  transactionId: string;
}

const Property = ({
  name,
  value,
  children,
}: {
  name: string;
  value?: string;
  children?: React.ReactNode;
}) => (
  <div className="flex justify-between flex-col md:flex-row">
    <span className="font-semibold">{name}</span>
    <span>{value || children}</span>
  </div>
);

const StrategyAnalytics = ({ transactionId }: props) => {
  const query = useQuery({
    queryKey: [transactionId],
    queryFn: () => getTransactionAnalyticsData(transactionId),
    enabled: !!transactionId,
    refetchInterval: 10000,
  });

  const { writeContractAsync } = useWriteContract();

  const removeOrder = async () => {
    const orderStruct = [orderBookJson.abi[17].inputs[2]];
    const order = decodeAbiParameters(
      orderStruct,
      query.data.order.orderBytes
    )[0];

    await writeContractAsync({
      abi: orderBookJson.abi,
      address: query.data.order.orderbook.id,
      functionName: "removeOrder2",
      args: [order, []],
    });

    query.refetch();
  };

  return (
    <div className="container flex-grow pt-8 pb-safe">
      {query.isLoading && <div>Loading...</div>}
      {query.isError && <div>{query.error.message}</div>}
      {query.data && (
        <>
          <div className="flex flex-col gap-y-4">
            <div className="flex md:flex-row flex-col gap-4 justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold">Strategy Analytics</h1>
              {query.data.order.active && (
                <Button
                  onClick={() => {
                    removeOrder();
                  }}
                >
                  Remove strategy
                </Button>
              )}
            </div>
            <Property name="Transaction ID">
              <span className="break-words">{query.data.transaction.id}</span>
            </Property>
            <Property
              name="Created"
              value={formatTimestampSecondsAsLocal(
                BigInt(query.data.transaction.timestamp)
              )}
            />
            <Property
              name="Active"
              value={query.data.order.active ? "Active" : "Inactive"}
            />
            <Property name="Owner">
              <span className="break-words">{query.data.order.owner}</span>
            </Property>
            <Property
              name="Number of trades"
              value={query.data.order.trades?.length || "0"}
            />
            <div className="grid md:grid-cols-2 gap-4">
              {query.data.order.inputs && (
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold mb-2">Input tokens</h2>
                  {query.data.order.inputs.map((vault: any) => {
                    return (
                      <div key={vault}>
                        <TokenAndBalance input={vault} withdraw />
                      </div>
                    );
                  })}
                </div>
              )}
              {query.data.order.inputs && (
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold mb-2">Output tokens</h2>
                  {query.data.order.outputs.map((vault: any) => {
                    return (
                      <div key={vault}>
                        <TokenAndBalance input={vault} withdraw />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="w-full overflow-x-scroll pt-6">
            <Table hoverable striped>
              <Table.Head>
                <Table.HeadCell>DATE</Table.HeadCell>
                <Table.HeadCell>SENDER</Table.HeadCell>
                <Table.HeadCell>TRANSACTION HASH</Table.HeadCell>
                <Table.HeadCell>INPUT</Table.HeadCell>
                <Table.HeadCell>OUTPUT</Table.HeadCell>
                <Table.HeadCell>IO RATIO</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {query.data.order.trades.map((trade: any, i: number) => (
                  <Table.Row key={i}>
                    <Table.Cell>
                      {trade.tradeEvent.transaction.timestamp}
                    </Table.Cell>
                    <Table.Cell
                      onClick={() =>
                        navigator.clipboard.writeText(trade.tradeEvent.sender)
                      }
                      className="cursor-pointer"
                    >
                      {trade.tradeEvent.sender.slice(0, 5)}...
                      {trade.tradeEvent.sender.slice(-1 * 5)}
                    </Table.Cell>
                    <Table.Cell
                      onClick={() =>
                        navigator.clipboard.writeText(
                          trade.tradeEvent.transaction.id
                        )
                      }
                      className="cursor-pointer"
                    >
                      {trade.tradeEvent.transaction.id.slice(0, 5)}...
                      {trade.tradeEvent.transaction.id.slice(-1 * 5)}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-x-2">
                        {formatUnits(
                          trade.inputVaultBalanceChange.amount,
                          trade.inputVaultBalanceChange.vault.token.decimals
                        )}{" "}
                        {trade.inputVaultBalanceChange.vault.token.symbol}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-x-2">
                        {formatUnits(
                          trade.outputVaultBalanceChange.amount,
                          trade.outputVaultBalanceChange.vault.token.decimals
                        )}{" "}
                        {trade.outputVaultBalanceChange.vault.token.symbol}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      {(
                        trade.inputVaultBalanceChange.amount /
                        trade.outputVaultBalanceChange.amount
                      ).toFixed(2)}{" "}
                      {trade.inputVaultBalanceChange.vault.token.symbol}/
                      {trade.outputVaultBalanceChange.vault.token.symbol}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default StrategyAnalytics;
