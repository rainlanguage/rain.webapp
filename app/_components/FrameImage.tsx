'use client';

import { FrameState } from '../_types/frame';
import { ProgressBar } from './ProgressBar';
import { useState } from 'react';
import { PencilLine } from 'lucide-react';

export const FrameImage = ({
	currentState,
	setCurrentState
}: {
	currentState: FrameState;
	setCurrentState: React.Dispatch<React.SetStateAction<FrameState>>;
}) => {
	const [editingBinding, setEditingBinding] = useState<string | null>(null);
	const [editingDeposit, setEditingDeposit] = useState<string | null>(null);

	const EditableBindingRow = ({
		name,
		binding,
		bindingValue
	}: {
		name: string;
		binding: string;
		bindingValue: string | number;
	}) => {
		const [value, setValue] = useState(bindingValue);
		const isEditing = editingBinding === binding;

		return (
			<tr className="border-t border-gray-300 table-row py-3" tw="border-t border-gray-300">
				<td
					className="lg:p-3 p-2 font-regular text-gray-700"
					tw="p-4 font-semibold text-gray-700 w-[300px] leading-tight"
				>
					{name}
				</td>
				<td className="px-4 text-gray-600 " tw="px-4 py-2 text-gray-600">
					{isEditing && (
						<div className="flex items-center gap-2">
							<input
								data-testid="binding-input"
								className="border-gray-200 rounded-lg border text-xl p-2 w-full max-w-96"
								type="number"
								placeholder={currentState.textInputLabel}
								value={value}
								onChange={(e) => {
									setValue(e.target.value);
								}}
							/>
							<button
								className="text-sm p-2 rounded-md bg-blue-500 text-white"
								data-testid="binding-save-button"
								onClick={() => {
									const newBindings = {
										...currentState.bindings,
										[binding]: value
									};
									setCurrentState({
										...currentState,
										bindings: newBindings
									});
									setEditingBinding(null);
								}}
							>
								Save
							</button>
						</div>
					)}
					{!isEditing && (
						<div className="flex items-center justify-between">
							{bindingValue}
							<button
								data-testid="binding-edit-button"
								onClick={() => {
									setEditingBinding(binding);
								}}
							>
								<PencilLine size={20} />
							</button>
						</div>
					)}
				</td>
			</tr>
		);
	};

	const EditableDepositRow = ({
		tokenInfo,
		amount
	}: {
		tokenInfo: any;
		amount: string | number;
	}) => {
		const [value, setValue] = useState(amount);
		const isEditing = editingDeposit === tokenInfo.address;

		return (
			<tr className="border-t border-gray-300 table-row" tw="border-t border-gray-300">
				<td
					className="p-2 lg:p-3 font-regular text-gray-700"
					tw="px-4 py-4 font-semibold text-gray-700 w-[300px] leading-tight"
				>
					{tokenInfo.symbol}
				</td>
				<td className="px-4 text-gray-600" tw="px-4 py-2 text-gray-600">
					{isEditing ? (
						<div className="flex items-center gap-2">
							<input
								data-testid="deposit-input"
								className="border-gray-200 rounded-lg border text-xl p-2 w-full max-w-96"
								type="number"
								value={value}
								onChange={(e) => setValue(Number(e.target.value))}
							/>
							<button
								className="text-sm p-2 rounded-md bg-blue-500 text-white"
								data-testid="deposit-save-button"
								onClick={() => {
									const newDeposits = currentState.deposits.map((v) =>
										v.tokenInfo.address === tokenInfo.address ? { ...v, amount: Number(value) } : v
									);
									setCurrentState({
										...currentState,
										deposits: newDeposits
									});
									setEditingDeposit(null);
								}}
							>
								Save
							</button>
						</div>
					) : (
						<div className="flex items-center justify-between">
							{amount}
							<button
								data-testid="deposit-edit-button"
								onClick={() => setEditingDeposit(tokenInfo.address)}
							>
								<PencilLine size={20} />
							</button>
						</div>
					)}
				</td>
			</tr>
		);
	};

	return (
		<div
			className={`flex flex-col md:justify-center items-center md:text-[50px] text-center text-[30px] relative flex-grow px-8`}
			tw={`flex flex-col items-center justify-center h-full w-full text-center`}
		>
			<div tw="absolute top-0 flex w-full" className="hidden">
				<ProgressBar currentState={currentState} />
			</div>
			{currentState.deploymentOption ? (
				<div
					className="top-0 md:text-xl text-sm border rounded-full bg-gray-100 px-6 py-3 my-4 md:mb-0"
					tw="absolute top-12 text-[30px] border rounded-full bg-gray-100 px-6 py-3"
				>
					{currentState.deploymentOption.name}
				</div>
			) : (
				''
			)}
			<div
				tw="text-[60px] font-light flex px-28 "
				className="font-light md:px-32 max-w-[1200px] w-full flex flex-col justify-center flex-grow"
			>
				{currentState.currentStep === 'start' ? (
					<div className="flex flex-col gap-y-8" tw="flex flex-col">
						<div className="text-1xl">{currentState.strategyName}</div>
						<div className="text-lg" tw="text-[30px] mt-5">
							{currentState.strategyDescription}
						</div>
					</div>
				) : (
					''
				)}
				{currentState.currentStep === 'deployment' ? 'Choose a strategy variation.' : ''}
				{currentState.currentStep === 'fields' && currentState.deploymentOption ? (
					<div className="flex flex-col gap-y-6" tw="flex flex-col">
						<div className="leading-tight">
							{currentState.deploymentOption.fields[Object.keys(currentState.bindings).length].name}
						</div>
						<div className="text-2xl whitespace-pre-line" tw="text-2xl whitespace-pre-line">
							{
								currentState.deploymentOption.fields[Object.keys(currentState.bindings).length]
									.description
							}
						</div>
					</div>
				) : (
					''
				)}
				{currentState.currentStep === 'deposit' && currentState.deploymentOption
					? `Choose your deposit amount for ${
							currentState.tokenInfos.find(
								(info) =>
									info.yamlName ===
									currentState.deploymentOption!.deposits[Object.keys(currentState.deposits).length]
										.token
							)?.symbol
						}.`
					: ''}
				{currentState.currentStep === 'review' && currentState.deploymentOption ? (
					<table
						className="min-w-full bg-white text-left text-[20px] lg:text-[25px]"
						tw="text-left"
					>
						<tbody tw="flex flex-col text-[40px] w-full">
							<tr>
								<td
									className="p-2 lg:p-3 text-2xl font-bold text-gray-800"
									tw="px-4 py-2 text-[50px] font-bold text-gray-800"
								>
									Review choices
								</td>
							</tr>
							<tr className="border-t border-gray-300 table-row py-3" tw="border-t border-gray-300">
								<td
									className="lg:p-3 p-2 font-regular text-gray-700"
									tw="px-4 py-4 font-regular text-gray-700 w-[300px]"
								>
									Deployment
								</td>
								<td className="p-4 text-gray-600" tw="px-4 py-2 text-gray-600">
									{currentState.deploymentOption.name}
								</td>
							</tr>
							{Object.keys(currentState.bindings).map((binding: string) => {
								if (!currentState.deploymentOption) return;
								const field = currentState.deploymentOption.fields.find(
									(field: { binding: string }) => field.binding === binding
								);
								if (!field) return;
								return (
									<EditableBindingRow
										key={binding}
										name={field.name}
										binding={binding}
										bindingValue={currentState.bindings[binding]}
									/>
								);
							})}
							<tr className="flex flex-col lg:table-row py-3" tw="border-t border-gray-300">
								<td
									className="lg:p-3 p-2 text-2xl font-bold text-gray-800"
									tw="px-4 py-2 text-[30px] font-bold text-gray-800"
								>
									Deposits
								</td>
							</tr>
							{currentState.deposits.map(({ tokenInfo, amount }) => (
								<EditableDepositRow key={tokenInfo.address} tokenInfo={tokenInfo} amount={amount} />
							))}
						</tbody>
					</table>
				) : (
					''
				)}
				{currentState.currentStep === 'done' ? 'Done!' : ''}
			</div>
			<div className="hidden" tw="right-2 bottom-2 flex absolute w-[232px] h-[37px]">
				<svg
					style={{ width: '100%', height: '100%' }}
					width="860"
					height="139"
					viewBox="0 0 860 139"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M235.036 84.1922V73.2862L225.688 55.4922H229.583L236.758 70.0062L243.933 55.4922H247.787L238.48 73.2862V84.1922H235.036Z"
						fill="#181818"
					/>
					<path
						d="M204.479 84.1922V55.4922H214.565C216.588 55.4922 218.255 55.8202 219.567 56.4762C220.907 57.1049 221.905 57.9795 222.561 59.1002C223.217 60.1935 223.544 61.4235 223.544 62.7902C223.544 64.6489 223.039 66.1112 222.027 67.1772C221.043 68.2432 219.854 68.9812 218.46 69.3912C219.526 69.5825 220.497 70.0062 221.371 70.6622C222.246 71.3182 222.929 72.1382 223.421 73.1222C223.941 74.1062 224.201 75.1859 224.201 76.3612C224.201 77.8099 223.845 79.1355 223.134 80.3382C222.424 81.5135 221.371 82.4565 219.977 83.1672C218.583 83.8505 216.889 84.1922 214.893 84.1922H204.479ZM207.923 68.0382H214.319C216.151 68.0382 217.558 67.6145 218.542 66.7672C219.526 65.8925 220.018 64.6899 220.018 63.1592C220.018 61.7105 219.526 60.5489 218.542 59.6742C217.586 58.7995 216.137 58.3622 214.197 58.3622H207.923V68.0382ZM207.923 81.3222H214.524C216.492 81.3222 218.01 80.8712 219.076 79.9692C220.142 79.0399 220.674 77.7552 220.674 76.1152C220.674 74.5025 220.114 73.2179 218.993 72.2612C217.873 71.2772 216.356 70.7852 214.442 70.7852H207.923V81.3222Z"
						fill="#181818"
					/>
					<path
						d="M165.081 84.1922V55.4922H173.896C178.953 55.4922 182.67 56.7769 185.048 59.3462C187.453 61.9155 188.656 65.4415 188.656 69.9242C188.656 74.3249 187.453 77.8099 185.048 80.3792C182.67 82.9212 178.953 84.1922 173.896 84.1922H165.081ZM168.525 81.3222H173.814C176.602 81.3222 178.816 80.8712 180.456 79.9692C182.123 79.0399 183.312 77.7279 184.023 76.0332C184.734 74.3112 185.089 72.2749 185.089 69.9242C185.089 67.5189 184.734 65.4552 184.023 63.7332C183.312 62.0112 182.123 60.6855 180.456 59.7562C178.816 58.8269 176.602 58.3622 173.814 58.3622H168.525V81.3222Z"
						fill="#181818"
					/>
					<path
						d="M141.938 84.1922V55.4922H159.691V58.3212H145.382V68.3252H158.461V71.1132H145.382V81.3632H159.691V84.1922H141.938Z"
						fill="#181818"
					/>
					<path
						d="M117.635 84.1922V55.4922H126.901C129.142 55.4922 130.973 55.8612 132.395 56.5992C133.816 57.3372 134.868 58.3485 135.552 59.6332C136.235 60.9179 136.577 62.3392 136.577 63.8972C136.577 65.7012 136.085 67.3275 135.101 68.7762C134.144 70.2249 132.641 71.2499 130.591 71.8512L136.864 84.1922H132.805L126.983 72.3432H126.737H121.079V84.1922H117.635ZM121.079 69.6372H126.655C128.869 69.6372 130.481 69.1042 131.493 68.0382C132.504 66.9722 133.01 65.6055 133.01 63.9382C133.01 62.2435 132.504 60.9042 131.493 59.9202C130.509 58.9089 128.882 58.4032 126.614 58.4032H121.079V69.6372Z"
						fill="#181818"
					/>
					<path
						d="M94.4922 84.1922V55.4922H112.245V58.3212H97.9362V68.3252H111.015V71.1132H97.9362V81.3632H112.245V84.1922H94.4922Z"
						fill="#181818"
					/>
					<path
						d="M60.7577 84.2332L52.8857 55.4922H56.5757L62.7667 80.1332L69.8187 55.4922H73.6317L80.4787 80.1332L86.7517 55.4922H90.4417L82.4057 84.1922H78.4697L71.6227 60.4942L64.6117 84.1922L60.7577 84.2332Z"
						fill="#181818"
					/>
					<path
						d="M36.7807 84.684C33.9654 84.684 31.4917 84.069 29.3597 82.839C27.2551 81.5817 25.6014 79.8323 24.3987 77.591C23.2234 75.3497 22.6357 72.7667 22.6357 69.842C22.6357 66.9173 23.2234 64.348 24.3987 62.134C25.6014 59.8927 27.2551 58.1433 29.3597 56.886C31.4917 55.6287 33.9654 55 36.7807 55C39.6234 55 42.0971 55.6287 44.2017 56.886C46.3337 58.1433 47.9874 59.8927 49.1627 62.134C50.3381 64.348 50.9257 66.9173 50.9257 69.842C50.9257 72.7667 50.3381 75.3497 49.1627 77.591C47.9874 79.8323 46.3337 81.5817 44.2017 82.839C42.0971 84.069 39.6234 84.684 36.7807 84.684ZM36.7807 81.65C38.8854 81.65 40.7304 81.1853 42.3157 80.256C43.9284 79.2993 45.1721 77.9463 46.0467 76.197C46.9487 74.4203 47.3997 72.302 47.3997 69.842C47.3997 67.382 46.9487 65.2773 46.0467 63.528C45.1721 61.7787 43.9284 60.4393 42.3157 59.51C40.7304 58.5533 38.8854 58.075 36.7807 58.075C34.6761 58.075 32.8174 58.5533 31.2047 59.51C29.6194 60.4393 28.3757 61.7787 27.4737 63.528C26.5991 65.2773 26.1617 67.382 26.1617 69.842C26.1617 72.302 26.5991 74.4203 27.4737 76.197C28.3757 77.9463 29.6194 79.2993 31.2047 80.256C32.8174 81.1853 34.6761 81.65 36.7807 81.65Z"
						fill="#181818"
					/>
					<path
						d="M0 84.1922V55.4922H9.43C11.6713 55.4922 13.5163 55.8612 14.965 56.5992C16.4137 57.3372 17.4797 58.3349 18.163 59.5922C18.8737 60.8495 19.229 62.2709 19.229 63.8562C19.229 65.4142 18.8873 66.8219 18.204 68.0792C17.5207 69.3365 16.4547 70.3479 15.006 71.1132C13.5573 71.8512 11.6987 72.2202 9.43 72.2202H3.444V84.1922H0ZM3.444 69.3092H9.348C11.644 69.3092 13.2703 68.8309 14.227 67.8742C15.211 66.8902 15.703 65.5509 15.703 63.8562C15.703 62.1342 15.211 60.7949 14.227 59.8382C13.2703 58.8542 11.644 58.3622 9.348 58.3622H3.444V69.3092Z"
						fill="#181818"
					/>
					<path
						d="M798.246 38.4082H815.526L859.942 101H842.79L798.246 38.4082ZM841.382 38.4082H858.406L813.99 101H796.966L841.382 38.4082Z"
						fill="#181818"
					/>
					<path
						d="M769.035 102.28C763.062 102.28 757.558 100.829 752.523 97.9279C747.574 95.0266 743.649 91.1013 740.747 86.1519C737.931 81.1173 736.523 75.5706 736.523 69.5119C736.523 63.5386 737.931 58.0773 740.747 53.1279C743.649 48.1786 747.574 44.2959 752.523 41.4799C757.473 38.5786 762.891 37.1279 768.779 37.1279C774.326 37.1279 779.403 38.4933 784.011 41.2239C788.705 43.8693 792.417 47.5386 795.147 52.2319C797.878 56.8399 799.243 62.0026 799.243 67.7199C799.243 69.5973 799.158 71.3893 798.987 73.0959H743.947V62.7279H784.139C783.969 60.1679 783.115 57.8639 781.579 55.8159C780.129 53.6826 778.209 52.0613 775.819 50.9519C773.515 49.7573 770.998 49.1599 768.267 49.1599C764.683 49.1599 761.483 50.0133 758.667 51.7199C755.851 53.3413 753.675 55.7306 752.139 58.8879C750.603 61.9599 749.835 65.6719 749.835 70.0239C749.835 73.9493 750.646 77.4479 752.267 80.5199C753.889 83.5066 756.107 85.8533 758.923 87.5599C761.825 89.2666 765.153 90.1199 768.907 90.1199C772.918 90.1199 776.331 89.2666 779.147 87.5599C781.963 85.7679 783.713 83.3786 784.395 80.3919H798.475C797.451 87.0479 794.209 92.3813 788.747 96.3919C783.286 100.317 776.715 102.28 769.035 102.28Z"
						fill="#181818"
					/>
					<path
						d="M691.815 102.28C686.354 102.28 681.319 100.829 676.711 97.9279C672.103 95.0266 668.477 91.0586 665.831 86.0239C663.186 80.9892 661.863 75.5279 661.863 69.6399C661.863 63.7519 663.186 58.3332 665.831 53.3839C668.477 48.3492 672.103 44.3812 676.711 41.4799C681.319 38.5786 686.354 37.1279 691.815 37.1279C697.362 37.1279 702.141 38.4506 706.151 41.0959C710.247 43.7412 713.362 47.5386 715.495 52.4879C717.629 57.3519 718.695 63.0692 718.695 69.6399C718.695 76.2959 717.629 82.0986 715.495 87.0479C713.362 91.9119 710.247 95.6666 706.151 98.3119C702.141 100.957 697.362 102.28 691.815 102.28ZM694.887 88.7119C698.471 88.7119 701.714 87.9012 704.615 86.2799C707.517 84.5732 709.778 82.2692 711.399 79.3679C713.106 76.4666 713.959 73.2239 713.959 69.6399C713.959 66.0559 713.106 62.8559 711.399 60.0399C709.778 57.1386 707.517 54.8772 704.615 53.2559C701.714 51.5492 698.471 50.6959 694.887 50.6959C691.389 50.6959 688.189 51.5492 685.287 53.2559C682.386 54.9626 680.082 57.2666 678.375 60.1679C676.754 63.0692 675.943 66.2266 675.943 69.6399C675.943 73.1386 676.754 76.3386 678.375 79.2399C680.082 82.1412 682.386 84.4452 685.287 86.1519C688.189 87.8586 691.389 88.7119 694.887 88.7119ZM713.959 11.3999H728.295V101H713.959V11.3999Z"
						fill="#181818"
					/>
					<path
						d="M609.624 101H595.416V38.4079H609.624V101ZM640.216 67.0799C640.216 62.1306 638.808 58.2053 635.992 55.3039C633.261 52.3173 629.635 50.8239 625.112 50.8239C620.419 50.8239 616.664 52.3173 613.848 55.3039C611.032 58.2053 609.624 62.1306 609.624 67.0799H605.272C605.272 61.1066 606.211 55.8586 608.088 51.3359C610.051 46.7279 612.781 43.2293 616.28 40.8399C619.864 38.3653 623.96 37.1279 628.568 37.1279C633.859 37.1279 638.467 38.2799 642.392 40.5839C646.317 42.8026 649.304 46.0453 651.352 50.3119C653.485 54.5786 654.552 59.5706 654.552 65.2879V101H640.216V67.0799Z"
						fill="#181818"
					/>
					<path
						d="M583.339 38.4081V101H569.131V38.4081H583.339ZM576.299 27.6561C573.739 27.6561 571.563 26.7601 569.771 24.968C567.979 23.1761 567.083 21.0427 567.083 18.568C567.083 16.0934 567.979 13.96 569.771 12.1681C571.563 10.2907 573.739 9.35205 576.299 9.35205C578.859 9.35205 581.035 10.2907 582.827 12.1681C584.619 13.96 585.515 16.0934 585.515 18.568C585.515 21.0427 584.619 23.1761 582.827 24.968C581.035 26.7601 578.859 27.6561 576.299 27.6561Z"
						fill="#181818"
					/>
					<path
						d="M557.191 101H542.855V38.4079H557.191V101ZM520.711 102.28C515.249 102.28 510.215 100.829 505.607 97.9279C500.999 95.0266 497.372 91.0586 494.727 86.0239C492.081 80.9893 490.759 75.5279 490.759 69.6399C490.759 63.7519 492.081 58.3333 494.727 53.3839C497.372 48.3493 500.999 44.3813 505.607 41.4799C510.215 38.5786 515.249 37.1279 520.711 37.1279C526.257 37.1279 531.036 38.4506 535.047 41.0959C539.143 43.7413 542.257 47.5386 544.391 52.4879C546.524 57.3519 547.591 63.0693 547.591 69.6399C547.591 76.2959 546.524 82.0986 544.391 87.0479C542.257 91.9119 539.143 95.6666 535.047 98.3119C531.036 100.957 526.257 102.28 520.711 102.28ZM523.783 88.7119C527.367 88.7119 530.609 87.9013 533.511 86.2799C536.412 84.5733 538.673 82.2693 540.295 79.3679C542.001 76.4666 542.855 73.2239 542.855 69.6399C542.855 66.0559 542.001 62.8559 540.295 60.0399C538.673 57.1386 536.412 54.8773 533.511 53.2559C530.609 51.5493 527.367 50.6959 523.783 50.6959C520.284 50.6959 517.084 51.5493 514.183 53.2559C511.281 54.9626 508.977 57.2666 507.271 60.1679C505.649 63.0693 504.839 66.2266 504.839 69.6399C504.839 73.1386 505.649 76.3386 507.271 79.2399C508.977 82.1413 511.281 84.4453 514.183 86.1519C517.084 87.8586 520.284 88.7119 523.783 88.7119Z"
						fill="#181818"
					/>
					<path
						d="M453.936 38.4079H468.144V47.1119C469.936 44.0399 472.282 41.6079 475.184 39.8159C478.17 38.0239 481.456 37.1279 485.04 37.1279C486.832 37.1279 488.794 37.3839 490.928 37.8959V50.9519C488.453 50.3546 486.362 50.0559 484.656 50.0559C481.498 50.0559 478.682 50.7386 476.208 52.1039C473.733 53.4693 471.77 55.4746 470.32 58.1199C468.869 60.7653 468.144 63.9226 468.144 67.5919V101H453.936V38.4079Z"
						fill="#181818"
					/>
					<path
						d="M367.1 115.265C367.1 131.025 357.877 138.105 346.5 138.105C335.123 138.105 325.9 131.025 325.9 115.265C325.9 108.552 329.912 99.031 334.469 90.6148C340.711 79.0871 346.5 69.0512 346.5 69.0512C346.5 69.0512 352.29 79.0871 358.532 90.6148C363.089 99.031 367.1 108.552 367.1 115.265Z"
						fill="#0038C9"
					/>
					<path
						d="M325.9 22.8396C325.9 7.07977 335.123 1.00185e-06 346.5 0C357.877 -1.00185e-06 367.1 7.07977 367.1 22.8396C367.1 29.5532 363.089 39.0738 358.532 47.49C352.29 59.0178 346.5 69.0537 346.5 69.0537C346.5 69.0537 340.711 59.0177 334.469 47.49C329.912 39.0738 325.9 29.5532 325.9 22.8396Z"
						fill="#6E95F9"
					/>
					<path
						d="M317.067 110.129C303.517 118.009 292.819 113.503 287.13 103.579C281.442 93.6544 282.917 82.0691 296.467 74.1892C302.239 70.8324 312.43 69.5713 321.945 69.3385C334.977 69.0197 346.5 69.0521 346.5 69.0521C346.5 69.0521 340.766 79.1205 333.976 90.3293C329.019 98.5127 322.839 106.772 317.067 110.129Z"
						fill="#164CD6"
					/>
					<path
						d="M375.933 27.9759C389.483 20.096 400.181 24.6015 405.87 34.5261C411.558 44.4506 410.083 56.0359 396.533 63.9158C390.761 67.2726 380.57 68.5337 371.055 68.7665C358.023 69.0853 346.5 69.0529 346.5 69.0529C346.5 69.0529 352.234 58.9846 359.024 47.7757C363.981 39.5923 370.161 31.3327 375.933 27.9759Z"
						fill="#8BABFF"
					/>
					<path
						d="M296.467 63.9145C282.917 56.0346 281.442 44.4493 287.13 34.5247C292.819 24.6002 303.517 20.0946 317.067 27.9745C322.839 31.3313 329.019 39.5909 333.976 47.7743C340.766 58.9832 346.5 69.0515 346.5 69.0515C346.5 69.0515 334.977 69.084 321.945 68.7651C312.43 68.5323 302.239 67.2713 296.467 63.9145Z"
						fill="#3D6BE1"
					/>
					<path
						d="M396.533 74.1892C410.083 82.0691 411.558 93.6544 405.87 103.579C400.181 113.503 389.483 118.009 375.933 110.129C370.161 106.772 363.981 98.5127 359.024 90.3293C352.234 79.1205 346.5 69.0521 346.5 69.0521C346.5 69.0521 358.023 69.0197 371.055 69.3385C380.57 69.5713 390.761 70.8324 396.533 74.1892Z"
						fill="#AEC4FF"
					/>
				</svg>
			</div>
		</div>
	);
};
