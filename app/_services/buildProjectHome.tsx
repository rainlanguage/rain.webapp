import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { YamlData } from "../_types/yamlData";
import { FailsafeSchemaWithNumbers } from "../_schemas/failsafeWithNumbers";

interface ProjectHomeData {yamlDatas: YamlData[], webappMDText: string, frameMDText: string};

export const retrieveProjectData = async (projectName: string): Promise<ProjectHomeData> => {
    const dirPath = path.join(
        process.cwd(),
        "public",
        "_strategies",
        projectName,
      );
    const files = fs.readdirSync(dirPath, "utf8");

    const dotrainPaths = files.filter(filename => filename.endsWith(".rain")).map(filename => dirPath.concat("/", filename));
    const dotrainFiles = dotrainPaths.map(path => fs.readFileSync(path, "utf8"));
    const yamlDatas = dotrainFiles.map(text => yaml.load(text.split("---")[0], {
        schema: FailsafeSchemaWithNumbers,
      }) as YamlData)

    const webappMDText = fs.readFileSync(dirPath.concat("/", 'webapp.md'), "utf8");
    const frameMDText = fs.readFileSync(dirPath.concat("/", 'frame.md'), "utf8");

    return {yamlDatas, webappMDText, frameMDText};
}

export const buildProjectHome = async (data: ProjectHomeData) => {

}
