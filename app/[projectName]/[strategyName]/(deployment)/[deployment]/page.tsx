import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";
import WebappFrame from "@/app/_components/WebappFrame";
import fs from "fs";
import path from "path";

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
    deployment: string;
  };
}

export default async function Home({ params }: homeProps) {
  const filePath = path.join(
    process.cwd(),
    "public",
    "_strategies",
    params.projectName,
    `${params.strategyName}.rain`
  );
  const dotrainText = fs.readFileSync(filePath, "utf8");

  return (
    <WebappFrame
      dotrainText={dotrainText}
      deploymentOption={params.deployment}
    />
  );
}
