import React, { SetStateAction, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useSwitchChain, useWriteContract } from 'wagmi';
import * as allChains from 'wagmi/chains';
import { readContract } from 'viem/actions';
import { waitForTransactionReceipt } from 'viem/actions';
import { config } from '../providers';
import { Hex, erc20Abi, formatUnits, parseUnits } from 'viem';
import { orderBookJson } from '@/public/_abis/OrderBook';
import { getOrderDetailsGivenDeployment } from '../_services/parseDotrainFrontmatter';
import { getSubmissionTransactionData } from '../_services/transactionData';
import yaml from 'js-yaml';
import { Referral, YamlData } from '../_types/yamlData';
import { FrameState } from '../_types/frame';
import { useRouter } from 'next/navigation';
import { TokenInfo } from '../_services/getTokenInfo';
import { Alert, Button } from 'flowbite-react';
import { TriangleAlert } from 'lucide-react';
import { checkSubgraphForDeployment } from '../_services/checkSubgraphForTransaction';
import { getNetworkSubgraphs } from '../_queries/subgraphs';

interface SubmissionModalProps {
	yamlData: YamlData;
	currentState: FrameState;
	buttonText: string;
	dotrainText: string;
	setError: React.Dispatch<SetStateAction<string | React.ReactElement | null>>;
}

enum SubmissionStatus {
	Idle,
	Pending,
	CheckingBalances,
	CheckingAllowances,
	ApprovingTokens,
	WaitingForApprovalConfirmation,
	TokensApproved,
	PreparingStrategy,
	AwaitingDeploymentConfirmation,
	AwaitingDeploymentTx,
	StrategyDeployed,
	Error,
	Done
}

export interface TokenDepositWithStatus {
	tokenAddress: Hex;
	tokenInfo: TokenInfo;
	amount: number;
	referrals?: Referral[] | undefined;
	status: TokenDepositStatus;
}

export interface TokenDeposit {
	amount: number;
	tokenInfo: TokenInfo;
	referrals?: Referral[] | undefined;
}

export enum TokenDepositStatus {
	Pending = 'Pending',
	CheckingAllowance = 'CheckingAllowance',
	ApprovingTokens = 'ApprovingTokens',
	WaitingForApprovalConfirmation = 'WaitingForApprovalConfirmation',
	TokensApproved = 'TokensApproved',
	Error = 'Error',
	Done = 'Done'
}

export const SubmissionModal = ({
	yamlData,
	buttonText,
	currentState,
	dotrainText,
	setError
}: SubmissionModalProps) => {
	const [showDisclaimer, setShowDisclaimer] = useState(true);

	const router = useRouter();

	const account = useAccount();

	const currentWalletChainId = useChainId();
	const { switchChainAsync } = useSwitchChain();
	const { writeContractAsync } = useWriteContract();

	const { orderBookAddress, network, scenario } = getOrderDetailsGivenDeployment(
		yamlData,
		currentState.deploymentOption?.deployment || ''
	);
	const { ...chains } = allChains;

	const [submissionState, setSubmissionState] = useState<SubmissionStatus>(SubmissionStatus.Idle);

	const [tokenDeposits, setTokenDeposits] = useState<TokenDepositWithStatus[]>(
		currentState.deposits
			.map((deposit) => ({
				tokenAddress: deposit.tokenInfo.address as Hex,
				tokenInfo: currentState.tokenInfos.find(
					(info) => info.address === deposit.tokenInfo.address
				)!,
				amount: deposit.amount,
				referrals: deposit.referrals,
				status: TokenDepositStatus.Pending
			}))
			.filter((deposit) => deposit.amount > 0)
	);

	const [open, setOpen] = useState(false);
	const [showFinalMessage, setShowFinalMessage] = useState(false);
	const [transactionHash, setTransactionHash] = useState<string | null>(null);
	const [newOrderHash, setNewOrderHash] = useState<string | null>(null);
	const [subgraphError, setSubgraphError] = useState<string | null>(null);
	useEffect(() => {
		console.log(showDisclaimer, showFinalMessage);
	}, [showDisclaimer, showFinalMessage]);
	useEffect(() => {
		if (submissionState === SubmissionStatus.Done) {
			setTimeout(() => {
				setShowFinalMessage(true);
			}, 1000);
		}
	}, [submissionState]);
	console.log(currentState);

	const resetSubmissionState = () => {
		setOpen(false);
		setSubmissionState(SubmissionStatus.Idle);
		setShowFinalMessage(false);
		setShowDisclaimer(true);
	};

	const submitStrategy = async () => {
		try {
			// Make sure the user is on the correct chain
			if (currentWalletChainId !== network['chain-id']) {
				await switchChainAsync({ chainId: network['chain-id'] });
			}

			setSubmissionState(SubmissionStatus.CheckingBalances);
			// Check if the user has sufficient funds
			for (const deposit of tokenDeposits) {
				console.log(tokenDeposits);
				if (!deposit.tokenInfo) throw new Error(`Token info not found`);

				const depositAmount = parseUnits(String(deposit.amount), deposit.tokenInfo.decimals);

				const balance = await readContract(config.getClient(), {
					abi: erc20Abi,
					address: deposit.tokenInfo.address,
					functionName: 'balanceOf',
					args: [account.address as `0x${string}`]
				});
				console.log(balance);

				if (balance < depositAmount) {
					console.log('ERROR', Number(balance - depositAmount));
					setError(
						<>
							<p className="mb-3">
								You do not have enough {deposit.tokenInfo.symbol} to cover this deposit.
							</p>
							<p className="mb-3">
								Your balance: {formatUnits(BigInt(balance), deposit.tokenInfo.decimals)}
								<br />
								Deposit amount: {deposit.amount}
							</p>
							{deposit.referrals ? (
								<>
									You may be able to get {deposit.tokenInfo.symbol} from:{' '}
									<ul>
										{deposit.referrals?.map((ref, index) => (
											<li key={index}>
												<a
													href={ref.url}
													target="_blank"
													rel="noreferrer"
													style={{ color: 'blue', textDecoration: 'underline' }}>
													{ref.name}
												</a>
											</li>
										))}
									</ul>
								</>
							) : (
								''
							)}
						</>
					);
					setOpen(false);
					return;
				}
			}
			setSubmissionState(SubmissionStatus.CheckingAllowances);

			// Check if the user has sufficient token approvals
			for (const deposit of tokenDeposits) {
				console.log('check approvals');
				if (!deposit.tokenInfo) throw new Error(`Token info not found`);

				const depositAmount = parseUnits(String(deposit.amount), deposit.tokenInfo.decimals);

				const existingAllowance = await readContract(config.getClient(), {
					abi: erc20Abi,
					address: deposit.tokenInfo.address,
					functionName: 'allowance',
					args: [account.address as `0x${string}`, orderBookAddress]
				});

				if (existingAllowance < depositAmount) {
					setTokenDeposits((prev) =>
						prev.map((prevDeposit) =>
							prevDeposit.tokenInfo.address === deposit.tokenInfo.address
								? { ...prevDeposit, status: TokenDepositStatus.ApprovingTokens }
								: prevDeposit
						)
					);

					try {
						const approveTx = await writeContractAsync({
							address: deposit.tokenInfo.address,
							abi: erc20Abi,
							functionName: 'approve',
							args: [orderBookAddress, depositAmount]
						});

						setTokenDeposits((prev) =>
							prev.map((prevDeposit) =>
								prevDeposit.tokenInfo.address === deposit.tokenInfo.address
									? {
											...prevDeposit,
											status: TokenDepositStatus.WaitingForApprovalConfirmation
										}
									: prevDeposit
							)
						);

						// Wait for approval transaction confirmation
						await waitForTransactionReceipt(config.getClient(), {
							hash: approveTx,
							confirmations: 1
						});

						setTokenDeposits((prev) =>
							prev.map((prevDeposit) =>
								prevDeposit.tokenInfo.address === deposit.tokenInfo.address
									? { ...prevDeposit, status: TokenDepositStatus.TokensApproved }
									: prevDeposit
							)
						);
					} catch (e: any) {
						setError(
							e.details || 'There was an error approving the token spend. Please try again.'
						);
						return;
					}
				} else {
					setTokenDeposits((prev) =>
						prev.map((prevDeposit) =>
							prevDeposit.tokenInfo.address === deposit.tokenInfo.address
								? { ...prevDeposit, status: TokenDepositStatus.TokensApproved }
								: prevDeposit
						)
					);
				}
			}
			setSubmissionState(SubmissionStatus.PreparingStrategy);

			// PREPARE STRATEGY //
			let addOrderCalldata;
			let depositCalldatas;

			try {
				const convertedBindings = Object.keys(currentState.bindings).reduce((acc, key) => {
					const value = currentState.bindings[key];
					if (typeof value !== 'number' || isNaN(value)) {
						return { ...acc, [key]: value };
					}
					return { ...acc, [key]: value };
				}, {});
				scenario.bindings = {
					...scenario.bindings,
					...convertedBindings
				};

				const updatedDotrainText = yaml.dump(yamlData) + '---' + dotrainText.split('---')[1];

				tokenDeposits.map((deposit) => {
					return { ...deposit, amount: 0 };
				});

				const result = await getSubmissionTransactionData(
					currentState,
					updatedDotrainText,
					tokenDeposits
				);

				addOrderCalldata = result.addOrderCalldata;
				depositCalldatas = result.depositCalldatas;
			} catch (e: any) {
				setError(
					e.details ||
						'There was an error preparing the strategy. This may be caused by invalid deployment options.'
				);
				setOpen(false);
				return;
			}
			// PERFORM STRATEGY DEPLOYMENT //

			try {
				setSubmissionState(SubmissionStatus.AwaitingDeploymentConfirmation);
				const deployTx = await writeContractAsync({
					address: orderBookAddress,
					abi: orderBookJson.abi,
					functionName: 'multicall',
					args: [[addOrderCalldata, ...depositCalldatas]]
				});

				setTransactionHash(deployTx);
				setSubmissionState(SubmissionStatus.AwaitingDeploymentTx);

				await waitForTransactionReceipt(config.getClient(), {
					hash: deployTx,
					confirmations: 1
				});

				// WAIT FOR SG TO UPDATE //

				try {
					const newDeploymentOrderHash = await checkSubgraphForDeployment(
						deployTx,
						account?.chainId
					);
					if (!newDeploymentOrderHash) {
						throw new Error('No deployment found');
					} else {
						setNewOrderHash(newDeploymentOrderHash);
						setSubmissionState(SubmissionStatus.Done);
					}
				} catch {
					setSubgraphError(
						`Deployment was successful, but there was an error while polling the subgraph. Please check 'My stratgies' for the new deployment.`
					);
					return setSubmissionState(SubmissionStatus.Done);
				}

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (e: any) {
				setError(e.details || 'There was an error deploying your strategy');
				setOpen(false);
				return;
			}
		} catch (e: any) {
			if (
				e?.cause?.message?.includes('addEthereumChain') ||
				e?.message?.includes('addEthereumChain')
			) {
				setError(
					`Your wallet doesn't support switching to ${
						Object.values(chains).find((chain) => chain.id === network['chain-id'])?.name
					}`
				);
			} else {
				setError(e.details || e?.cause?.message || e?.message || 'An error occurred');
			}
			setOpen(false);
		}
	};

	return (
		<Dialog open={open}>
			{account.isConnected ? (
				<Button
					onClick={() => setOpen(true)}
					data-testid="open-strategy-deployment-modal"
					color="primary"
					size="sm"
					className=" from-blue-600 to-violet-600 bg-gradient-to-br">
					{buttonText}
				</Button>
			) : (
				<ConnectButton />
			)}
			<DialogContent
				onInteractOutside={resetSubmissionState}
				className="bg-white flex flex-col justify-center w-full font-light gap-y-8">
				{showDisclaimer && (
					<div className="flex flex-col items-start gap-y-4">
						<DialogTitle className="w-full font-light text-2xl">Wait!</DialogTitle>
						<div className="space-y-4">
							<Alert color="red" className="text-base">
								<div className="flex items-center justify-center">
									<TriangleAlert color="red" size="40" />
									<span className="ml-2">
										Before you deploy your strategy, make sure you understand the following:
									</span>
								</div>
							</Alert>

							<ul className="list-disc list-outside space-y-2 text-gray-700">
								<li className="ml-4">
									This front end is provided as a tool to interact with the Raindex smart contracts.
								</li>
								<li className="ml-4">
									You are deploying your own strategy and depositing funds to an immutable smart
									contract using your own wallet and private keys.
								</li>
								<li className="ml-4">
									Nobody is custodying your funds, there is no recourse for recovery of funds if
									lost.
								</li>
								<li className="ml-4">
									There is no endorsement or guarantee provided with these strategies.
								</li>
								<li className="ml-4">
									Do not proceed if you do not understand the strategy you are deploying.
								</li>
								<li className="ml-4">Do not invest unless you are prepared to lose all funds.</li>
							</ul>
						</div>
						<Button
							size="sm"
							color="primary"
							onClick={() => {
								setShowDisclaimer(false);
								submitStrategy();
							}}>
							I understand
						</Button>
					</div>
				)}

				{!showDisclaimer && !showFinalMessage && (
					<div>
						<DialogTitle className="w-full font-light text-2xl mb-4">
							Deploying your strategy
						</DialogTitle>
						<div
							className={`transition-opacity duration-1000 flex flex-col ${
								submissionState === SubmissionStatus.Done ? 'opacity-0' : 'opacity-100'
							}`}>
							{/* Checking deposits */}
							<div className={`transition-opacity duration-1000 flex flex-col`}>
								<div className="flex items-center my-4">
									<div
										className={`text-2xl text-white rounded-full flex items-center justify-center mr-4 transition-all ${
											submissionState === SubmissionStatus.Pending ||
											submissionState === SubmissionStatus.Idle
												? 'bg-gray-400 w-10 h-10'
												: submissionState === SubmissionStatus.CheckingBalances
													? 'bg-amber-500 w-12 h-12'
													: submissionState > SubmissionStatus.CheckingBalances
														? 'bg-emerald-600 w-10 h-10'
														: ''
										}`}>
										{1}
									</div>
									<div className="text-lg">
										{submissionState === SubmissionStatus.CheckingBalances ? (
											<span className="animate-pulse">Checking token balances...</span>
										) : submissionState > SubmissionStatus.CheckingBalances ? (
											<span>Balances checked</span>
										) : (
											<span className="text-gray-500">Check token balances</span>
										)}
									</div>
								</div>
							</div>
							{/* CHECKING DEPOSITS */}

							{tokenDeposits.map((deposit, i) => (
								<div key={i} className="flex items-center my-4">
									<div
										className={`text-2xl text-white rounded-full flex items-center justify-center mr-4 transition-all ${
											submissionState < SubmissionStatus.CheckingAllowances
												? 'bg-gray-400 w-10 h-10'
												: deposit.status === TokenDepositStatus.CheckingAllowance ||
													  deposit.status === TokenDepositStatus.ApprovingTokens ||
													  deposit.status === TokenDepositStatus.WaitingForApprovalConfirmation
													? 'bg-amber-500 w-12 h-12'
													: 'bg-emerald-600 w-10 h-10'
										}`}>
										{i + 2}
									</div>
									<div className="text-lg">
										{deposit.status === TokenDepositStatus.Pending ? (
											<span className="text-gray-500">Approve {deposit.tokenInfo.symbol}</span>
										) : deposit.status === TokenDepositStatus.CheckingAllowance ? (
											<span className="animate-pulse">
												Checking allowance for {deposit.tokenInfo.symbol}...
											</span>
										) : deposit.status === TokenDepositStatus.ApprovingTokens ? (
											<span className="animate-pulse">
												Approving allowance for {deposit.tokenInfo.symbol}...
											</span>
										) : deposit.status === TokenDepositStatus.WaitingForApprovalConfirmation ? (
											<span className="animate-pulse">Waiting for approval confirmation...</span>
										) : (
											`${deposit.tokenInfo.symbol} allowance approved`
										)}
									</div>
								</div>
							))}

							<div className="flex items-center my-4">
								<div
									className={`text-2xl text-white rounded-full transition-all flex items-center justify-center mr-4 ${
										submissionState === SubmissionStatus.PreparingStrategy ||
										submissionState === SubmissionStatus.AwaitingDeploymentConfirmation ||
										submissionState === SubmissionStatus.AwaitingDeploymentTx
											? 'bg-amber-500 w-12 h-12'
											: submissionState === SubmissionStatus.Done
												? 'bg-emerald-600 w-10 h-10'
												: 'bg-gray-400 w-10 h-10'
									}`}>
									{tokenDeposits.length + 2}
								</div>
								<div className="text-lg">
									{submissionState === SubmissionStatus.PreparingStrategy ? (
										<span className="animate-pulse">Preparing your strategy for deployment...</span>
									) : submissionState === SubmissionStatus.AwaitingDeploymentConfirmation ? (
										<span className="animate-pulse">Confirm deployment in wallet...</span>
									) : submissionState === SubmissionStatus.AwaitingDeploymentTx ? (
										<span className="animate-pulse">Waiting for deployment transaction...</span>
									) : submissionState === SubmissionStatus.Done ? (
										'Strategy deployed'
									) : (
										<span className="text-gray-500">Deploy strategy</span>
									)}
								</div>
							</div>
							{transactionHash && (
								<Button
									className="w-fit"
									onClick={() =>
										window.open(
											`${account?.chain?.blockExplorers?.default.url}/tx/${transactionHash}`,
											'_blank'
										)
									}>
									View deployment transaction
								</Button>
							)}
						</div>
					</div>
				)}

				{showFinalMessage ? (
					<div className="flex flex-col items-start transition-opacity duration-1500 animate-fade-in gap-y-4">
						<DialogTitle className="w-full font-light text-2xl">Your strategy is live!</DialogTitle>
						<div>
							It will continue to trade until removed. If you&apos;re interested in creating your
							own strategies from scratch, try <a href="https://docs.rainlang.xyz"> Raindex.</a>
						</div>
						{subgraphError && (
							<Alert color="red">
								<div className="flex items-center justify-center">
									<TriangleAlert color="red" size="40" />
									<span className="ml-2">{subgraphError}</span>
								</div>
							</Alert>
						)}
						<div className="flex gap-x-2 mt-4">
							{newOrderHash ? (
								<Button
									onClick={() =>
										router.push(
											`${window.location.origin}/my-strategies/${newOrderHash}-${getNetworkSubgraphs().find((n) => n.chainId === account.chainId)?.name}`
										)
									}>
									Track your strategy
								</Button>
							) : (
								<Button onClick={() => router.push(`${window.location.origin}/my-strategies/`)}>
									View my Strategies{' '}
								</Button>
							)}
							<Button
								onClick={() =>
									window.open(
										`${account?.chain?.blockExplorers?.default.url}/tx/${transactionHash}`,
										'_blank'
									)
								}>
								View transaction
							</Button>
						</div>
					</div>
				) : null}
			</DialogContent>
		</Dialog>
	);
};
