import MyStrategies from '@/app/my-strategies/page';
import { useQuery } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}));

vi.mock('wagmi', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		useAccount: () => ({ address: '0xMockAddress', chain: { id: 1 } })
	};
});

vi.mock('@tanstack/react-query', async () => {
	const actual = await vi.importActual('@tanstack/react-query');
	return {
		...actual,
		useQuery: vi.fn()
	};
});

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
	timestampAdded: Date.now(),
	addEvents: [
		{
			transaction: {
				id: '0x1234'
			}
		}
	],
	subgraphUrl: 'https://example.com/subgraph'
};

describe('OrdersTable', () => {
	beforeEach(() => {
		vi.mocked(useRouter).mockReturnValue({
			push: vi.fn()
		} as any);

		vi.mocked(useQuery).mockReturnValue({
			data: [mockOrder],
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
		vi.clearAllMocks();
	});

	it('opens a new tab when clicking on an order with ctrl or cmd key', () => {
		render(<MyStrategies />);

		const firstRow = screen.getAllByRole('row')[1];
		const mockWindowOpen = vi.fn();
		vi.spyOn(window, 'open').mockImplementation(mockWindowOpen);

		fireEvent.click(firstRow, { ctrlKey: true });

		expect(mockWindowOpen).toHaveBeenCalledWith(
			`${window.location.origin}/my-strategies/${mockOrder.addEvents[0].transaction.id}-${mockOrder.network}`,
			'_blank'
		);

		fireEvent.click(firstRow, { metaKey: true });

		expect(mockWindowOpen).toHaveBeenCalledWith(
			`${window.location.origin}/my-strategies/${mockOrder.addEvents[0].transaction.id}-${mockOrder.network}`,
			'_blank'
		);

		expect(useRouter().push).not.toHaveBeenCalled();
	});
});
