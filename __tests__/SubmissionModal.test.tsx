import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { SubmissionModal } from '@/app/_components/SubmissionModal';
import { useWriteContract, useAccount, useSwitchChain } from 'wagmi';
import { readContract, waitForTransactionReceipt } from 'viem/actions';
import { userEvent } from '@testing-library/user-event';
import { Providers } from '@/app/providers';
import { zeroAddress } from 'viem';
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
	const actual = await importOriginal();
	return {
		...(actual as object),
		useAccount: vi.fn(),
		useChainId: vi.fn().mockReturnValue(14),
		useSwitchChain: vi.fn(),
		useWriteContract: vi.fn(),
		useReadContract: vi.fn()
	};
});

vi.mock('viem/actions', () => ({
	readContract: vi.fn(),
	waitForTransactionReceipt: vi.fn()
}));

vi.mock('@/app/_services/parseDotrainFrontmatter', () => ({
	getOrderDetailsGivenDeployment: vi.fn().mockReturnValue({
		orderBookAddress: '0xOrderBookAddress',
		network: { 'chain-id': 14 },
		scenario: { id: 'TestScenario' }
	})
}));

vi.mock('@/app/_services/transactionData', () => ({
	getSubmissionTransactionData: vi.fn().mockResolvedValue({
		addOrderCalldata: '0xAddOrderCalldata',
		depositCalldatas: ['0xDepositCalldata']
	})
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
	beforeEach(() => {
		(useAccount as Mock).mockReturnValue({ address: '0x123', chain: { id: 14 } });
		(useSwitchChain as Mock).mockReturnValue({ switchChainAsync: vi.fn() });
		(useAccount as Mock).mockReturnValue({
			address: zeroAddress,
			chain: { id: 14 },
			isConnected: true
		});
	});
	it.only('opens the modal and shows disclaimer', async () => {
		(useWriteContract as Mock).mockReturnValue({
			writeContractAsync: vi.fn()
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
	it.only('Sets an error if user rejects transactions', async () => {
		const mockSetError = vi.fn(); // Mock the setError function

		// Mock writeContractAsync to throw an error
		(useWriteContract as Mock).mockReturnValue({
			writeContractAsync: vi
				.fn()
				.mockRejectedValue(new Error('There was an error performing multicall'))
		});

		// Mock readContract to return a specific balance value
		(readContract as Mock).mockResolvedValue({
			data: BigInt('156879426436436000')
		});

		// Render the component with the mocked setError function
		render(
			<Providers>
				<SubmissionModal
					yamlData={mockYamlData as unknown as YamlData}
					currentState={mockCurrentState as unknown as FrameState}
					buttonText="Deposit tokens and deploy strategy"
					dotrainText={mockDotrainText}
					setError={mockSetError} // Pass the mock setError function
				/>
			</Providers>
		);

		// Click to open the modal
		const openButton = screen.getByText(/Deposit tokens and deploy strategy/i);
		await userEvent.click(openButton);

		// Accept the disclaimer
		const acceptButton = screen.getByText(/I understand/i);
		fireEvent.click(acceptButton);

		// Wait for the error to be handled
		await waitFor(() => expect(mockSetError).toHaveBeenCalled());

		// Check that the error message passed to setError is correct
		expect(mockSetError).toHaveBeenCalledWith(
			expect.stringContaining('There was an error when confirming the transaction in your wallet.')
		);
	});
	it.only('Sets an error if multicall reverts', async () => {
		const mockSetError = vi.fn();

		(useWriteContract as Mock).mockReturnValue({
			writeContractAsync: vi.fn().mockResolvedValue('0xMockTransactionHash')
		});

		(waitForTransactionReceipt as Mock).mockRejectedValue(new Error('Multicall failed.'));

		(readContract as Mock).mockResolvedValue({
			data: BigInt('156879426436436000')
		});

		render(
			<Providers>
				<SubmissionModal
					yamlData={mockYamlData as unknown as YamlData}
					currentState={mockCurrentState as unknown as FrameState}
					buttonText="Deposit tokens and deploy strategy"
					dotrainText={mockDotrainText}
					setError={mockSetError} // Pass the mock setError function
				/>
			</Providers>
		);

		const openButton = screen.getByText(/Deposit tokens and deploy strategy/i);
		await userEvent.click(openButton);

		const acceptButton = screen.getByText(/I understand/i);
		fireEvent.click(acceptButton);

		await waitFor(() => expect(mockSetError).toHaveBeenCalled());

		expect(mockSetError).toHaveBeenCalledWith(expect.stringContaining('Multicall failed.'));
	});
});
