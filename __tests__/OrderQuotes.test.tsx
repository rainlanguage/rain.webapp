import QuotesTable from '@/app/_components/QuotesTable';
import { render } from '@testing-library/react';
import { vi } from 'vitest';

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

describe('OrderQuotes', () => {
	it('table should have correct headers', () => {
		const { container } = render(<QuotesTable order={mockOrder} />);
		expect(container.querySelector('table')).toBeInTheDocument();
		const headers = Array.from(container.querySelectorAll('th')).map((th) => th.textContent);
		expect(headers).toEqual(['PAIR', 'MAXIMUM OUTPUT', 'IO RATIO', 'MAXIMUM INPUT']);
	});
});
