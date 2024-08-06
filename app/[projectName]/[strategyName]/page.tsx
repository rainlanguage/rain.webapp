import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";
import WebappFrame from "../../_components/WebappFrame";
import yaml from "js-yaml";
import fs from "fs";
import { YamlData } from "../../_types/yamlData";

interface generateMetadataProps {
  params: {
    projectName: string;
    strategyName: string;
  };
}

export async function generateMetadata({
  params,
}: generateMetadataProps): Promise<Metadata> {
  return {
    title: "Frames Next.js Example",
    other: {
      ...(await fetchMetadata(
        new URL(
          `/frames/${params.projectName}/${params.strategyName}`,
          process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000"
        )
      )),
    },
  };
}

interface homeProps {
  params: {
    projectName: string;
    strategyName: string;
  };
}

export default async function Home({ params }: homeProps) {
  const yamlText = fs
    .readFileSync(
      `public/_strategies/${params.projectName}/${params.strategyName}.rain`,
      "utf8"
    )
    .split("---")[0];
  const yamlData = yaml.load(yamlText) as YamlData;

  return <WebappFrame yamlData={yamlData} />;
}
