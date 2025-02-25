import React, { SetStateAction, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { YamlData } from '../_types/yamlData';
import { FrameState } from '../_types/frame';
import { Button } from 'flowbite-react';
import { DotrainOrder } from '@rainlanguage/orderbook/common';
import CodeMirror from '@uiw/react-codemirror';
import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog';
import { RainlangLR } from 'codemirror-rainlang';
import { getOrderDetailsGivenDeployment } from '../_services/parseDotrainFrontmatter';
import yaml from 'js-yaml';

interface CodemirrorModalProps {
	yamlData: YamlData;
	currentState: FrameState;
	dotrainText: string;
	setError: React.Dispatch<SetStateAction<string | React.ReactElement | null>>;
}

export const CodemirrorModal = ({ currentState, dotrainText, yamlData }: CodemirrorModalProps) => {
	const { scenario } = getOrderDetailsGivenDeployment(
		yamlData,
		currentState.deploymentOption?.deployment || ''
	);

	const [composedDotrainText, setComposedDotrainText] = useState<string>('');

	const getComposedDotrainText = async () => {
		const convertedBindings = Object.keys(currentState.bindings).reduce((acc, key) => {
			const value = currentState.bindings[key];
			if (typeof value !== 'number' || isNaN(value)) {
				return { ...acc, [key]: value };
			}
			return { ...acc, [key]: Number(value) };
		}, {});
		scenario.bindings = {
			...scenario.bindings,
			...convertedBindings
		};
		const updatedDotrainText = yaml.dump(yamlData) + '---' + dotrainText.split('---')[1];
		const dotrainOrder = await DotrainOrder.create(updatedDotrainText);

		setComposedDotrainText(
			await dotrainOrder.composeDeploymentToRainlang(
				currentState.deploymentOption?.deployment || ''
			)
		);
	};
	getComposedDotrainText();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					color="primary"
					size="sm"
					className=" from-blue-600 to-violet-600 bg-gradient-to-br"
				>
					Show Rainlang
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white flex flex-col justify-center w-full font-light gap-y-8">
				<DialogHeader>Generated Rainlang</DialogHeader>
				<CodeMirror height="50vh" value={composedDotrainText} extensions={[RainlangLR]} />
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button">Close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
