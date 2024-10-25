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
		inputs: [{ token: { address: '0xTokenA', symbol: 'TKA', decimals: BigInt(18) } }] as Input[],
		outputs: [{ token: { address: '0xTokenB', symbol: 'TKB', decimals: BigInt(18) } }] as Output[],
		orderbook: { id: 'orderbook-id' }
	} as unknown as Order;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders the table with data when query is successful', () => {
		(useQuery as Mock).mockReturnValue({
			data: [
				{
					maxOutput: '0x10',
					ratio: '0x2',
					inputIOIndex: 0,
					outputIOIndex: 0
				}
			],
			isLoading: false,
			isError: false
		});

		render(<QuotesTable syncedQueryKey="testKey" order={mockOrder} />);
		expect(screen.getByRole('table')).toBeInTheDocument();
		expect(screen.getByText('TKA/TKB')).toBeInTheDocument();
	});
});
