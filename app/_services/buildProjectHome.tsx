import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { YamlData } from '../_types/yamlData';
import { FailsafeSchemaWithNumbers } from '../_schemas/failsafeWithNumbers';

interface ProjectHomeData {
	yamlDatas: StrategyFile[];
	webappMDText: string;
	frameMDText: string;
}

export interface StrategyFile {
	fileName: string;
	yamlData: YamlData;
	descriptionMD: string;
}

export const retrieveProjectData = async (projectName: string): Promise<ProjectHomeData> => {
	const dirPath = path.join(process.cwd(), 'public', '_strategies', projectName);
	const subDirs = fs
		.readdirSync(dirPath, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	const yamlDatas = subDirs.map((subDir) => {
		const subDirPath = path.join(dirPath, subDir);

		// Find the .rain file in the subdirectory
		const rainFile = fs.readdirSync(subDirPath).find((filename) => filename.endsWith('.rain'));

		if (!rainFile) {
			throw new Error(`No .rain file found in directory: ${subDirPath}`);
		}

		const rainFilePath = path.join(subDirPath, rainFile);
		const descriptionFilePath = path.join(subDirPath, 'description.md');

		// Read and parse the .rain file
		const rainFileContent = fs.readFileSync(rainFilePath, 'utf8');
		const yamlData = yaml.load(rainFileContent.split('---')[0], {
			schema: FailsafeSchemaWithNumbers
		}) as YamlData;

		// Read the description.md file
		const descriptionMD = fs.readFileSync(descriptionFilePath, 'utf8');

		return {
			fileName: rainFile.replace('.rain', ''),
			yamlData,
			descriptionMD
		};
	});

	// Reading the webapp.md and frame.md
	const webappMDText = fs.readFileSync(path.join(dirPath, 'webapp.md'), 'utf8');
	const frameMDText = fs.readFileSync(path.join(dirPath, 'frame.md'), 'utf8');

	return { yamlDatas, webappMDText, frameMDText };
};
