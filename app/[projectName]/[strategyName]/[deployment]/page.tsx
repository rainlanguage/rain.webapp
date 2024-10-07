import { fetchMetadata } from 'frames.js/next';
import { Metadata } from 'next';
import WebappFrame from '@/app/_components/WebappFrame';
import fs from 'fs';
import path from 'path';

interface generateMetadataProps {
	params: {
		projectName: string;
		strategyName: string;
		deployment: string;
	};
}

export async function generateMetadata({ params }: generateMetadataProps): Promise<Metadata> {
	// get all dirs in the project name and find the one that ends with the project name
	const allDirs = fs.readdirSync(
		path.join(process.cwd(), 'public', '_strategies', params.projectName)
	);

	const strategyDir = allDirs.find((dir) => dir.endsWith(params.strategyName));

	if (!strategyDir) {
		throw new Error(
			`No directory found for strategy: ${params.strategyName} in project: ${params.projectName}`
		);
	}
	return {
		other: {
			...(await fetchMetadata(
				new URL(
					`/frames/${params.projectName}/${params.strategyName}/${params.deployment}`,
					process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
				)
			))
		}
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
	// get all dirs in the project name and find the one that ends with the project name
	const allDirs = fs.readdirSync(
		path.join(process.cwd(), 'public', '_strategies', params.projectName)
	);

	const strategyDir = allDirs.find((dir) => dir.endsWith(params.strategyName));

	if (!strategyDir) {
		throw new Error(
			`No directory found for strategy: ${params.strategyName} in project: ${params.projectName}`
		);
	}

	const filePath = path.join(
		process.cwd(),
		'public',
		'_strategies',
		params.projectName,
		strategyDir,
		`${params.strategyName}.rain`
	);
	const dotrainText = fs.readFileSync(filePath, 'utf8');

	return <WebappFrame dotrainText={dotrainText} deploymentOption={params.deployment} />;
}
