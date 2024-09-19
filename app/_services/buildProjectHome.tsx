import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { YamlData } from "../_types/yamlData";
import { FailsafeSchemaWithNumbers } from "../_schemas/failsafeWithNumbers";

interface ProjectHomeData {
  yamlDatas: StrategyFile[];
  webappMDText: string;
  frameMDText: string;
}

export interface StrategyFile {
  fileName: string;
  yamlData: YamlData;
}

export const retrieveProjectData = async (
  projectName: string
): Promise<ProjectHomeData> => {
  const dirPath = path.join(
    process.cwd(),
    "public",
    "_strategies",
    projectName
  );
  console.log("WHAAAAAAAAA", { projectName });
  const files = fs.readdirSync(dirPath, "utf8");

  const fileNames = files.filter((filename) => filename.endsWith(".rain"));
  const dotrainPaths = fileNames.map((filename) =>
    path.join(dirPath, filename)
  ); // Using `path.join` for platform-safe paths
  const dotrainFiles = dotrainPaths.map((filePath) =>
    fs.readFileSync(filePath, "utf8")
  );

  const yamlDatas = dotrainFiles.map((text, index) => {
    const yamlData = yaml.load(text.split("---")[0], {
      schema: FailsafeSchemaWithNumbers,
    }) as YamlData;
    return {
      fileName: "/" + path.parse(fileNames[index]).name, // Extracts the filename without extension
      yamlData: yamlData,
    };
  });

  const webappMDText = fs.readFileSync(
    dirPath.concat("/", "webapp.md"),
    "utf8"
  );
  const frameMDText = fs.readFileSync(dirPath.concat("/", "frame.md"), "utf8");

  return { yamlDatas, webappMDText, frameMDText };
};

export const buildProjectHome = async (data: ProjectHomeData) => {};
