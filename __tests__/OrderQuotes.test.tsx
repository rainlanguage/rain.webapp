import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { vi } from 'vitest';
import StrategyAnalytics from '@/app/_components/StrategyAnalytics';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { act } from 'react';
import { quote } from '@rainlanguage/orderbook';
import QuotesTable from '@/app/_components/QuotesTable';

vi.mock('@tanstack/react-query', async () => {
	const actual = await vi.importActual('@tanstack/react-query');
	return {
		...actual,
		useQuery: vi.fn(),
		useQueryClient: vi.fn(() => ({
			queryClient: {
				refetchQueries: vi.fn()
			}
		}))
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

const mockTransactionId = '1234567890';
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
		id: mockTransactionId,
		timestamp: '1234567890'
	},
	order: mockOrder
};

describe('OrderQuotes', () => {
	beforeEach(() => {
		vi.mocked(useQuery).mockReturnValue({
			data: mockQueryData,
			isLoading: false,
			isError: false,
			error: null,
			refetch: vi.fn(),
			isPending: false,
			isSuccess: true,
			isFetching: false,
			status: 'success',
			fetchStatus: 'idle'
		} as any);
		vi.mocked(useQueryClient).mockReturnValue({
			refetchQueries: vi.fn()
		} as any);
		vi.clearAllMocks();
	});

	it('table should have correct headers', () => {
		const { container } = render(<QuotesTable order={mockOrder} />);
		expect(container.querySelector('table')).toBeInTheDocument();
		const headers = Array.from(container.querySelectorAll('th')).map((th) => th.textContent);
		expect(headers).toEqual(['PAIR', 'MAXIMUM OUTPUT', 'IO RATIO', 'MAXIMUM INPUT']);
	});

	it.only('should refetch quotes when deposit is successful', async () => {
		render(<StrategyAnalytics orderHash={mockTransactionId} network={mockNetwork} />);

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
			expect(quote.doQuoteSpecs).toHaveBeenCalledTimes(2);
		});
	});

	it.only('should refetch quotes when deposit is successful', async () => {
		render(<StrategyAnalytics orderHash={mockTransactionId} network={mockNetwork} />);

		const inputTokenBalance = screen.getAllByTestId('token-balance')[0];
		const withdrawButton = within(inputTokenBalance).getByRole('button', { name: /withdraw/i });
		await act(async () => {
			fireEvent.click(withdrawButton);
		});

		const withdrawModal = screen.getByRole('dialog');
		expect(withdrawModal).toBeInTheDocument();

		const input = within(withdrawModal).getByPlac('') as HTMLInputElement;
		await act(async () => {
			fireEvent.change(input, { target: { value: '0.1' } });
		});

		const submitButton = within(withdrawModal).getByRole('button', { name: /Submit/i });
		await act(async () => {
			fireEvent.click(submitButton);
		});

		const withdrawTxHash = await screen.findByText(/withdraw completed successfully!/);
		expect(withdrawTxHash).toBeInTheDocument();

		const dismissButton = within(withdrawModal).getByRole('button', { name: /Dismiss/i });
		expect(dismissButton).toBeInTheDocument();

		// Click the dismiss button
		await act(async () => fireEvent.click(dismissButton));

		// Check if the modal is closed
		await waitFor(() => {
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		});

		// Wait for the deposit to complete
		await waitFor(() => {
			expect(quote.doQuoteSpecs).toHaveBeenCalledTimes(2);
		});
	});
});
