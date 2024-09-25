import { Table } from "flowbite-react";
import { quote } from "@rainlanguage/orderbook";
import * as allChains from "wagmi/chains";
import { useState } from "react";
import { formatEther, formatUnits, fromHex } from "viem";

interface props {
  order: any;
}

const QuotesTable = ({ order }: props) => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const { ...chains } = allChains;
  const orderChainKey = Object.keys(chains).find(
    (chain) => chain === order.network
  );

  const specs = order.inputs.reduce(
    (acc: quote.QuoteSpec[], input: any, inputIndex: number) => {
      return [
        ...acc,
        ...order.outputs.map((output: any, outputIndex: number) => ({
          orderHash: order.orderHash,
          inputIOIndex: inputIndex,
          outputIOIndex: outputIndex,
          signedContext: [],
          orderbook: order.orderbook.id,
        })),
      ];
    },
    []
  );

  const getQuotes = async () => {
    if (orderChainKey === undefined) return;

    const result = await quote.doQuoteSpecs(
      specs,
      order.subgraphUrl,
      (chains as any)[orderChainKey].rpcUrls.default.http[0]
    );

    setQuotes(result);
  };

  if (!quotes.length) {
    getQuotes();
  }

  return (
    <div className="w-full overflow-x-scroll pt-6">
      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>PAIR</Table.HeadCell>
          <Table.HeadCell>MAXIMUM OUTPUT</Table.HeadCell>
          <Table.HeadCell>PRICE</Table.HeadCell>
          <Table.HeadCell>MAXIMUM INPUT</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {quotes.map((quote: any, i: number) => (
            <Table.Row key={i}>
              <Table.Cell>
                {order.inputs[specs[i].inputIOIndex].token.symbol}/
                {order.outputs[specs[i].outputIOIndex].token.symbol}
              </Table.Cell>
              <Table.Cell>
                {formatEther(fromHex(quote.maxOutput, "bigint"))}
              </Table.Cell>
              <Table.Cell>
                {formatEther(fromHex(quote.ratio, "bigint"))}
              </Table.Cell>
              <Table.Cell>
                {formatUnits(
                  fromHex(quote.maxOutput, "bigint") *
                    fromHex(quote.ratio, "bigint"),
                  36
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default QuotesTable;
