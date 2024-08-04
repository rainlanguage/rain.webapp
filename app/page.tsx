import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";
import WebappFrame from "./UI/WebappFrame";
import yaml from "js-yaml";
import fs from "fs";
import { YamlData } from "./types/yamlData";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Frames Next.js Example",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/frames",
          process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000"
        )
      )),
    },
  };
}

export default async function Home() {
  const yamlText = fs
    .readFileSync("streaming-gui-example.rain", "utf8")
    .split("---")[0];
  const yamlData = yaml.load(yamlText) as YamlData;

  return <WebappFrame yamlData={yamlData} />;
}
