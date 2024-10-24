import StrategyAnalytics from '@/app/_components/StrategyAnalytics';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { act, render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';

vi.mock('@tanstack/react-query', async () => {
	const actual = await vi.importActual('@tanstack/react-query');
	return {
		...actual,
		useQuery: vi.fn(),
		useQueryClient: vi.fn()
	};
});

vi.mock('wagmi', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		useAccount: () => ({ address: '0xMockAddress', chain: { id: 1 } }),
		useReadContract: vi.fn(() => ({ readContract: vi.fn() })),
		useWriteContract: vi.fn(() => ({ writeContractAsync: vi.fn() })),
		useSwitchChain: vi.fn(() => ({ switchChainAsync: vi.fn() }))
	};
});

vi.mock('@wagmi/core', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		waitForTransactionReceipt: vi.fn().mockResolvedValue({})
	};
});

vi.mock('viem/actions', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		readContract: vi.fn().mockResolvedValue(BigInt('1000000000000000000'))
	};
});

vi.mock('@rainlanguage/orderbook', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		quote: {
			doQuoteSpecs: vi.fn().mockResolvedValue([
				{
					maxOutput: '0x1',
					ratio: '0x1'
				}
			])
		}
	};
});

const mockOrderHash = 'some-order-hash';
const mockNetwork = 'flare';
const mockOrder = {
	network: 'flare',
	active: 'true',
	owner: '0xMockOwner',
	trades: [],
	inputs: [
		{
			orderbook: { id: '0xMockOrderbookAddress' },
			vaultId: BigInt(1),
			token: {
				id: '0xToken1Address',
				address: '0xToken1Address',
				name: 'Token 1',
				symbol: 'TKN1',
				decimals: BigInt(18)
			},
			balance: BigInt('1000000000000000000')
		}
	],
	outputs: [
		{
			orderbook: { id: '0xMockOrderbookAddress' },
			vaultId: BigInt(2),
			token: {
				id: '0xToken2Address',
				address: '0xToken2Address',
				name: 'Token 2',
				symbol: 'TKN2',
				decimals: BigInt(18)
			},
			balance: BigInt('2000000000000000000')
		}
	],
	orderbook: { id: '0xMockOrderbookAddress' },
	orderBytes: '0x1234',
	orderHash: '0x1234',
	timestampAdded: '2024-02-20T12:00:00Z',
	addEvents: [],
	subgraphUrl: 'https://example.com/subgraph'
};
const mockQueryData = {
	transaction: {
		id: 'some-transaction-id',
		timestamp: '1234567890'
	},
	order: mockOrder
};

describe('StrategyAnalytics', () => {
	let refetchQueriesMock: Mock;

	beforeEach(() => {
		refetchQueriesMock = vi.fn();
		vi.mocked(useQuery).mockImplementationOnce(
			() =>
				({
					data: mockQueryData,
					isLoading: false,
					isError: false,
					error: null
				}) as any
		);
		vi.mocked(useQuery).mockImplementationOnce(
			() =>
				({
					data: []
				}) as any
		);
		vi.mocked(useQueryClient).mockReturnValue({
			refetchQueries: refetchQueriesMock
		} as any);
		vi.clearAllMocks();
	});

	it('should have order hash', () => {
		act(() => {
			render(<StrategyAnalytics orderHash={mockOrderHash} network={mockNetwork} />);
		});
		expect(screen.getByText('Order hash')).toBeInTheDocument();
		expect(screen.getByText(mockOrderHash)).toBeInTheDocument();
	});

	it('should refetch the order on deposit success', async () => {
		render(<StrategyAnalytics orderHash={mockOrderHash} network={mockNetwork} />);

		const inputTokenBalance = screen.getAllByTestId('token-balance')[0];
		const depositButton = within(inputTokenBalance).getByRole('button', { name: /Deposit/i });
		await act(async () => {
			fireEvent.click(depositButton);
		});

		const depositModal = screen.getByRole('dialog');
		expect(depositModal).toBeInTheDocument();

		const input = within(depositModal).getByTestId('deposit-input') as HTMLInputElement;
		await act(async () => {
			fireEvent.change(input, { target: { value: '0.1' } });
		});

		const submitButton = within(depositModal).getByRole('button', { name: /Submit/i });
		await act(async () => {
			fireEvent.click(submitButton);
		});

		const depositTxHash = await screen.findByText(/Deposit completed successfully!/);
		expect(depositTxHash).toBeInTheDocument();

		const dismissButton = within(depositModal).getByRole('button', { name: /Dismiss/i });
		expect(dismissButton).toBeInTheDocument();

		// Click the dismiss button
		await act(async () => fireEvent.click(dismissButton));

		// Check if the modal is closed
		await waitFor(() => {
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		});

		// Wait for the deposit to complete
		await waitFor(() => {
			expect(refetchQueriesMock).toHaveBeenCalled();
		});
	});

	it('should refetch the order on withdrawal success', async () => {
		render(<StrategyAnalytics orderHash={mockOrderHash} network={mockNetwork} />);

		const inputTokenBalance = screen.getAllByTestId('token-balance')[0];
		const depositButton = within(inputTokenBalance).getByRole('button', { name: /Withdraw/i });
		fireEvent.click(depositButton);

		const depositModal = screen.getByRole('dialog');
		expect(depositModal).toBeInTheDocument();

		const input = within(depositModal).getByPlaceholderText('0') as HTMLInputElement;
		fireEvent.change(input, { target: { value: '0.1' } });

		const submitButton = within(depositModal).getByRole('button', { name: /Submit/i });
		await act(async () => {
			fireEvent.click(submitButton);
		});

		// Check if the modal is closed
		await waitFor(() => {
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		});

		// Wait for the deposit to complete
		await waitFor(() => {
			expect(refetchQueriesMock).toHaveBeenCalled();
		});
	});
});
