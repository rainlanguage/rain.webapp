import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import { FailsafeSchemaWithNumbers } from "@/app/_schemas/failsafeWithNumbers";
import { YamlData } from "@/app/_types/yamlData";
import StrategyAnalytics from "@/app/_components/StrategyAnalytics";

interface props {
  params: {
    transactionId: string;
  };
}

const Home = ({ params: { transactionId } }: props) => {
  return <StrategyAnalytics transactionId={transactionId} />;
};

export default Home;
