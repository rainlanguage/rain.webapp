import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import StrategyAnalytics from '@/app/_components/StrategyAnalytics';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { act } from 'react';
import { quote } from '@rainlanguage/orderbook';
import QuotesTable from '@/app/_components/QuotesTable';
import { Order } from '@/app/types';

const mockOrderHash = '1234567890';
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
	addEvents: [
		{
			transaction: {
				id: '0xMockTransactionId',
				timestamp: BigInt(17000000)
			}
		}
	],
	subgraphUrl: 'https://example.com/subgraph'
};

const mockQuotes = [
	{
		maxOutput: '0x1',
		ratio: '0x1'
	}
];

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
		useAccount: () => ({ address: '0xMockOwner', chain: { id: 1 } }),
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
			doQuoteSpecs: vi.fn().mockResolvedValue([])
		}
	};
});

describe('Quotes table refetch functions', () => {
	let refetchQueriesMock: Mock;

	const setup = () => {
		refetchQueriesMock = vi.fn(() => {
			// @ts-expect-error we are not using any parameters
			quote.doQuoteSpecs();
		});
		vi.mocked(useQuery).mockImplementationOnce(
			() =>
				({
					data: mockOrder
				}) as any
		);
		vi.mocked(useQuery).mockImplementationOnce(
			() =>
				({
					data: mockQuotes
				}) as any
		);
		vi.mocked(useQueryClient).mockReturnValue({
			refetchQueries: refetchQueriesMock
		} as any);
		vi.clearAllMocks();
	};

	it('table should have correct headers', () => {
		vi.mocked(useQuery).mockReturnValue({
			data: [],
			isLoading: false,
			error: null
		} as any);
		const { container } = render(
			<QuotesTable order={mockOrder as unknown as Order} syncedQueryKey="" subgraphUrl="url.com" />
		);
		expect(container.querySelector('table')).toBeInTheDocument();
		const headers = Array.from(container.querySelectorAll('th')).map((th) => th.textContent);
		expect(headers).toEqual(['PAIR', 'MAXIMUM OUTPUT', 'IO RATIO', 'MAXIMUM INPUT']);
	});

	it('should refetch quotes when deposit is successful', async () => {
		setup();

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
			expect(quote.doQuoteSpecs).toHaveBeenCalledTimes(1);
		});
	});

	it('should refetch quotes when withdrawal is successful', async () => {
		setup();

		render(<StrategyAnalytics orderHash={mockOrderHash} network={mockNetwork} />);

		const inputTokenBalance = screen.getAllByTestId('token-balance')[0];
		const depositButton = within(inputTokenBalance).getByRole('button', { name: /Withdraw/i });
		fireEvent.click(depositButton);

		const depositModal = screen.getByRole('dialog');
		expect(depositModal).toBeInTheDocument();

		const input = within(depositModal).getByPlaceholderText(
			'Enter a number greater than 0'
		) as HTMLInputElement;
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
			expect(quote.doQuoteSpecs).toHaveBeenCalledTimes(1);
		});
	});
});
