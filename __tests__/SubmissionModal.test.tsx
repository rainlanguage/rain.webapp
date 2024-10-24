import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { SubmissionModal, SubmissionStatus } from '@/app/_components/SubmissionModal';
import { useWriteContract, useAccount, useChainId, useSwitchChain, useReadContract } from 'wagmi';
import { readContract, waitForTransactionReceipt } from 'viem/actions';
import { userEvent } from '@testing-library/user-event';
import { getOrderDetailsGivenDeployment } from '@/app/_services/parseDotrainFrontmatter';
import { getSubmissionTransactionData } from '@/app/_services/transactionData';
import { checkSubgraphForDeployment } from '@/app/_services/checkSubgraphForTransaction';
import { Providers, config as wagmiConfig } from '@/app/providers';
import { render } from '@testing-library/react';
import { WagmiProvider, createConfig, useConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet } from 'viem/chains';
import { http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FrameState } from '@/app/_types/frame';
import { YamlData } from '@/app/_types/yamlData';

vi.mock('next/navigation', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		useRouter: vi.fn()
	};
});

vi.mock('wagmi', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		useAccount: () => ({ address: '0xTestAddress', chain: { id: 1 }, isConnected: true }),
		useChainId: () => 1,
		useWriteContract: vi.fn(),
		useSwitchChain: vi.fn().mockImplementation(() => ({
			switchChainAsync: vi.fn().mockResolvedValue(true)
		})),
		useReadContract: vi.fn().mockImplementation(() => ({
			data: BigInt('156879426436436000')
		}))
	};
});

vi.mock('viem/actions', () => ({
	readContract: vi.fn(),
	waitForTransactionReceipt: vi.fn()
}));

vi.mock('@/app/_services/parseDotrainFrontmatter', () => ({
	getOrderDetailsGivenDeployment: vi.fn().mockReturnValue({
		orderBookAddress: '0xOrderBookAddress',
		network: { 'chain-id': 1 },
		scenario: { id: 'TestScenario' }
	})
}));

vi.mock('@/app/_services/transactionData', () => ({
	getSubmissionTransactionData: vi.fn().mockResolvedValue({
		addOrderCalldata: '0xAddOrderCalldata',
		depositCalldatas: ['0xDepositCalldata']
	})
}));

vi.mock('@/app/_services/checkSubgraphForTransaction', () => ({
	checkSubgraphForDeployment: vi.fn().mockResolvedValue('0xNewOrderHash')
}));

const mockYamlData = { someKey: 'someValue' };
const mockCurrentState = {
	strategyName: 'Fixed limit',
	strategyDescription: 'Fixed limit order strategy\n',
	currentStep: 'review',
	deploymentOption: {
		deployment: 'flare-slfr-wflr',
		name: 'Buy SFLR with WFLR on Flare.',
		description: 'Buy SFLR with WFLR for fixed price on Flare network.',
		deposits: [
			{
				token: 'flare-wflr',
				min: 0,
				presets: [0, 100, 1000, 10000, 100000]
			}
		],
		fields: [
			{
				binding: 'fixed-io',
				name: 'SFLR price in WFLR (WFLR per SFLR)',
				min: 1
			}
		]
	},
	bindings: {
		'fixed-io': '1'
	},
	deposits: [
		{
			tokenInfo: {
				yamlName: 'flare-wflr',
				address: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d',
				decimals: 18,
				symbol: 'WFLR',
				name: 'Wrapped Flare'
			},
			amount: 0
		}
	],
	buttonPage: 0,
	buttonMax: 10,
	textInputLabel: '',
	error: null,
	isWebapp: true,
	tokenInfos: [
		{
			yamlName: 'base-weth',
			address: '0x4200000000000000000000000000000000000006',
			decimals: 18,
			symbol: 'WETH',
			name: 'Wrapped Ether'
		},
		{
			yamlName: 'base-usdc',
			address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
			decimals: 6,
			symbol: 'USDC',
			name: 'USD Coin'
		},
		{
			yamlName: 'flare-wflr',
			address: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d',
			decimals: 18,
			symbol: 'WFLR',
			name: 'Wrapped Flare'
		},
		{
			yamlName: 'flare-sflr',
			address: '0x12e605bc104e93B45e1aD99F9e555f659051c2BB',
			decimals: 18,
			symbol: 'sFLR',
			name: 'Staked FLR'
		},
		{
			yamlName: 'flare-eusdt',
			address: '0x96B41289D90444B8adD57e6F265DB5aE8651DF29',
			decimals: 6,
			symbol: 'eUSDT',
			name: 'Enosys USDT'
		}
	]
};
const mockDotrainText = 'Mock Dotrain Text';

describe('SubmissionModal', () => {
	it.only('opens the modal and shows disclaimer', async () => {
		(useWriteContract as Mock).mockResolvedValue({
			writeContractAsync: vi.fn().mockResolvedValue('0xMockTransactionHash')
		});
		render(
			<Providers>
				<SubmissionModal
					yamlData={mockYamlData as unknown as YamlData}
					currentState={mockCurrentState as unknown as FrameState}
					buttonText="Deposit tokens and deploy strategy"
					dotrainText={mockDotrainText}
					setError={vi.fn()}
				/>
			</Providers>
		);

		// Click to open the modal
		const openButton = screen.getByText(/Deposit tokens and deploy strategy/i);
		fireEvent.click(openButton);

		// Check if disclaimer is visible
		const disclaimerTitle = await screen.findByText(/Wait!/i);
		expect(disclaimerTitle).toBeInTheDocument();

		// Accept the disclaimer
		const acceptButton = screen.getByText(/I understand/i);
		fireEvent.click(acceptButton);

		await waitFor(() => expect(screen.queryByText(/Wait!/i)).not.toBeInTheDocument());
	});

	it.only('shows balances checked status after disclaimer is accepted', async () => {
		(useWriteContract as Mock).mockResolvedValue({
			writeContractAsync: vi.fn().mockResolvedValue('0xMockTransactionHash')
		});
		(readContract as Mock).mockResolvedValue(BigInt('1000000000000000000000000'));
		(readContract as Mock).mockResolvedValue(BigInt('1000000000000000000000000'));

		render(
			<Providers>
				<SubmissionModal
					yamlData={mockYamlData as unknown as YamlData}
					currentState={mockCurrentState as unknown as FrameState}
					buttonText="Deposit tokens and deploy strategy"
					dotrainText={mockDotrainText}
					setError={vi.fn()}
				/>
			</Providers>
		);

		// Click to open the modal
		const openButton = screen.getByText(/Deposit tokens and deploy strategy/i);
		fireEvent.click(openButton);

		// Check if disclaimer is visible
		const disclaimerTitle = await screen.findByText(/Wait!/i);
		expect(disclaimerTitle).toBeInTheDocument();

		// Accept the disclaimer
		const acceptButton = screen.getByText(/I understand/i);
		await userEvent.click(acceptButton);

		// Check if 'Checking token balances' is shown
		await waitFor(() => expect(screen.getByText(/Deploying your strategy/i)).toBeInTheDocument());
		screen.debug();

		// // Simulate balance check passing
		// expect(screen.getByText(/Balances checked/i)).toBeInTheDocument();
	});

	it('approves tokens when necessary and shows correct status', async () => {
		(readContract as Mock).mockReturnValue(BigInt('100000000000000000')); // Simulate insufficient allowance
		(useWriteContract as Mock).mockReturnValue({
			writeContractAsync: vi.fn().mockResolvedValue('0xApproveTxHash')
		});
		(waitForTransactionReceipt as Mock).mockResolvedValue({ status: 'confirmed' });

		render(
			<SubmissionModal
				yamlData={mockYamlData}
				currentState={mockCurrentState}
				buttonText="Submit"
				dotrainText={mockDotrainText}
				setError={vi.fn()}
			/>
		);

		// Open modal and accept disclaimer
		const openButton = screen.getByText(/Submit/i);
		fireEvent.click(openButton);
		const acceptButton = screen.getByText(/I understand/i);
		fireEvent.click(acceptButton);

		// Wait for token approval step
		await waitFor(() =>
			expect(screen.getByText(/Approving allowance for TKN.../i)).toBeInTheDocument()
		);
		expect(waitForTransactionReceipt).toHaveBeenCalled();
	});

	it('handles error during approval process', async () => {
		(useWriteContract as Mock).mockReturnValue({
			writeContractAsync: vi.fn().mockRejectedValue(new Error('Approval failed'))
		});

		const mockSetError = vi.fn();

		render(
			<SubmissionModal
				yamlData={mockYamlData}
				currentState={mockCurrentState}
				buttonText="Submit"
				dotrainText={mockDotrainText}
				setError={mockSetError}
			/>
		);

		// Open modal and accept disclaimer
		const openButton = screen.getByText(/Submit/i);
		fireEvent.click(openButton);
		const acceptButton = screen.getByText(/I understand/i);
		fireEvent.click(acceptButton);

		// Check for error handling during approval
		await waitFor(() => expect(mockSetError).toHaveBeenCalledWith('Error during approval process'));
		expect(screen.getByText(/Failed to deposit./i)).toBeInTheDocument();
	});

	it('handles successful strategy deployment and polls subgraph for deployment', async () => {
		(useWriteContract as Mock).mockReturnValue({
			writeContractAsync: vi.fn().mockResolvedValue('0xDeployTxHash')
		});
		(waitForTransactionReceipt as Mock).mockResolvedValue({ status: 'confirmed' });

		render(
			<SubmissionModal
				yamlData={mockYamlData}
				currentState={mockCurrentState}
				buttonText="Submit"
				dotrainText={mockDotrainText}
				setError={vi.fn()}
			/>
		);

		// Open modal and accept disclaimer
		const openButton = screen.getByText(/Submit/i);
		fireEvent.click(openButton);
		const acceptButton = screen.getByText(/I understand/i);
		fireEvent.click(acceptButton);

		// Wait for deployment confirmation
		await waitFor(() =>
			expect(screen.getByText(/Waiting for deployment transaction/i)).toBeInTheDocument()
		);

		// Check for subgraph polling and deployment success
		await waitFor(() =>
			expect(checkSubgraphForDeployment).toHaveBeenCalledWith('0xDeployTxHash', 1)
		);
		expect(screen.getByText(/Your strategy is live!/i)).toBeInTheDocument();
	});
});
