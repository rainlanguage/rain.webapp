import { render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useQuery } from '@tanstack/react-query';
import QuotesTable from '@/app/_components/QuotesTable';
import { Order, Output, Input } from '@/app/types';

vi.mock('@tanstack/react-query', () => {
	const actual = vi.importActual('@tanstack/react-query');
	return {
		...actual,
		useQuery: vi.fn()
	};
});

describe('QuotesTable Component', () => {
	const mockOrder: Order = {
		orderHash: '0x123',
		network: 'polygon',
		inputs: [
			{
				token: { address: '0xTokenA', symbol: 'TKA', decimals: BigInt(18) },
				balance: BigInt(0),
				vaultId: BigInt(0)
			}
		] as Input[],
		outputs: [
			{
				token: { address: '0xTokenB', symbol: 'TKB', decimals: BigInt(18) },
				balance: BigInt(0),
				vaultId: BigInt(0)
			}
		] as Output[],
		orderbook: { id: 'orderbook-id' },
		subgraphUrl: 'https://subgraph-url.com'
	} as unknown as Order;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('displays loading indicator when data is being fetched', () => {
		(useQuery as Mock).mockReturnValue({
			data: null,
			isLoading: true,
			isError: false
		});

		render(
			<QuotesTable syncedQueryKey="testKey" order={mockOrder} subgraphUrl="https://example.com" />
		);
		expect(screen.getByText('Loading quotes...')).toBeInTheDocument();
	});

	it('displays error message when query fails', () => {
		(useQuery as Mock).mockReturnValue({
			data: null,
			isLoading: false,
			isError: true,
			error: { message: 'Failed to fetch data' }
		});

		render(
			<QuotesTable syncedQueryKey="testKey" order={mockOrder} subgraphUrl="https://example.com" />
		);
		expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
	});

	it('renders the table with data when query is successful', () => {
		(useQuery as Mock).mockReturnValue({
			data: [
				{
					data: {
						maxOutput: '0x10',
						ratio: '0x2',
						inputIOIndex: 0,
						outputIOIndex: 0
					},
					pair: {
						pairName: 'TKA/TKB',
						inputIndex: 0,
						outputIndex: 0
					}
				}
			],
			isLoading: false,
			isError: false
		});

		render(
			<QuotesTable syncedQueryKey="testKey" order={mockOrder} subgraphUrl="https://example.com" />
		);
		expect(screen.getByRole('table')).toBeInTheDocument();
		expect(screen.getByText('TKA/TKB')).toBeInTheDocument();
	});

	it('shows an error if no quotes data is found', () => {
		(useQuery as Mock).mockReturnValue({ data: [], isLoading: false, isError: false });

		render(<QuotesTable syncedQueryKey="testKey" order={mockOrder} subgraphUrl={'0x0x0'} />);
		expect(screen.getByText('No quotes found')).toBeInTheDocument();
	});
});
