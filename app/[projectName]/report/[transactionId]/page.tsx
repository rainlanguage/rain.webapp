import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import { FailsafeSchemaWithNumbers } from "@/app/_schemas/failsafeWithNumbers";
import { YamlData } from "@/app/_types/yamlData";
import StrategyAnalytics from "@/app/_components/StrategyAnalytics";

interface props {
  params: {
    projectName: string;
    strategyName: string;
    transactionId: string;
  };
}

const Home = ({
  params: { projectName, strategyName, transactionId },
}: props) => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "_strategies",
    projectName,
    `${strategyName}.rain`
  );
  const dotrainText = fs.readFileSync(filePath, "utf8");
  const yamlData = yaml.load(dotrainText.split("---")[0], {
    schema: FailsafeSchemaWithNumbers,
  }) as YamlData;

  return (
    <StrategyAnalytics yamlData={yamlData} transactionId={transactionId} />
  );
};

export default Home;
