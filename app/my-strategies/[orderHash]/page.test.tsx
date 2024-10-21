import StrategyAnalytics from '@/app/_components/StrategyAnalytics';
import { useQuery } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@tanstack/react-query', async () => {
	const actual = await vi.importActual('@tanstack/react-query');
	return {
		...actual,
		useQuery: vi.fn()
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
	beforeEach(() => {
		vi.mocked(useQuery).mockReturnValue({
			data: mockQueryData,
			isLoading: false,
			isError: false,
			error: null
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
});
