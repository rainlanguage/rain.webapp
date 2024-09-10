"use client";
import { getTransactionAnalyticsData } from "@/app/_queries/strategyAnalytics";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TokenAndBalance } from "./TokenAndBalance";
import { formatTimestampSecondsAsLocal } from "../_services/dates";
import { Button } from "@/components/ui/button";
import { orderBookJson } from "@/public/_abis/OrderBook";
import { useWriteContract } from "wagmi";
import { decodeAbiParameters } from "viem";

interface props {
  transactionId: string;
}

const Property = ({ name, value }: { name: string; value: string }) => (
  <div className="flex justify-between">
    <span className="font-semibold">{name}</span>
    <span>{value}</span>
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

  // const order = transactionAnalyticsData?.data?.events.find(
  //   (event: any) => event.order
  // )?.order;
  // const orderBookAddress = order?.orderbook.id;
  // const totalTradeCount = order?.trades.length;
  // const inputVaults = order?.inputs.reduce((acc: any, vault: any) => {
  //   acc[vault.token.name] = order.trades.reduce(
  //     (acc: any, trade: any) => {
  //       if (
  //         trade.inputVaultBalanceChange.vault.token.name === vault.token.name
  //       ) {
  //         acc.totalIn =
  //           (acc.totalIn || 0) + Number(trade.inputVaultBalanceChange.amount);
  //       }
  //       return acc;
  //     },
  //     {
  //       decimals: vault.token.decimals,
  //       balance: vault.balance,
  //       address: vault.token.address,
  //       vaultId: vault.vaultId,
  //       totalIn: 0,
  //     }
  //   );

  //   return acc;
  // }, {});
  // const outputVaults = order?.outputs.reduce((acc: any, vault: any) => {
  //   acc[vault.token.name] = order.trades.reduce(
  //     (acc: any, trade: any) => {
  //       if (
  //         trade.outputVaultBalanceChange.vault.token.name === vault.token.name
  //       ) {
  //         acc.totalOut =
  //           (acc.totalOut || 0) +
  //           Math.abs(Number(trade.outputVaultBalanceChange.amount));
  //       }
  //       return acc;
  //     },
  //     {
  //       decimals: vault.token.decimals,
  //       balance: vault.balance,
  //       address: vault.token.address,
  //       vaultId: vault.vaultId,
  //       totalOut: 0,
  //     }
  //   );

  //   return acc;
  // }, {});

  useEffect(() => {
    console.log(query.data);
  }, [query]);

  return (
    <div className="container flex-grow pt-8">
      {query.isLoading && <div>Loading...</div>}
      {query.isError && <div>{query.error.message}</div>}
      {query.data && (
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-center mb-8">
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
          <Property name="Transaction ID" value={query.data.transaction.id} />
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
          <Property name="Owner" value={query.data.order.owner} />
          <Property
            name="Number of trades"
            value={query.data.order.trades.length}
          />
          <div className="grid grid-cols-2 gap-4">
            {query.data.order.inputs && (
              <div className="py-2">
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
              <div className="py-2">
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
      )}
    </div>
  );
};

export default StrategyAnalytics;
