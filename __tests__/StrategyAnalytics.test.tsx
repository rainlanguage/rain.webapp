import { render, screen, waitFor } from '@testing-library/react';
import StrategyAnalytics from '@/app/_components/StrategyAnalytics';
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { waitForTransactionReceipt } from '@wagmi/core';
import { Mock, vi } from 'vitest';

enum RemovalStatus {
	Idle = 'Remove strategy',
	Confirming = 'Confirm removal in wallet...',
	Removing = 'Removing strategy...',
	Removed = 'Stategy removed'
}

vi.mock('wagmi', () => ({
	useAccount: vi.fn(),
	useSwitchChain: vi.fn(),
	useWriteContract: vi.fn()
}));

vi.mock('@app/_queries/subgraphs', () => ({
	getNetworkSubgraphs: vi.fn()
}));

vi.mock(import('@tanstack/react-query'), async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		useQuery: vi.fn(),
		useQueryClient: vi.fn()
	};
});

vi.mock('@wagmi/core', () => ({
	waitForTransactionReceipt: vi.fn()
}));

describe('StrategyAnalytics', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		(useAccount as Mock).mockReturnValue({
			address: '0x1234567890123456789012345678901234567890',
			chain: { id: 1 }
		});
		(useSwitchChain as Mock).mockReturnValue({ switchChainAsync: vi.fn() });
		(useWriteContract as Mock).mockReturnValue({ writeContractAsync: vi.fn() });
		(waitForTransactionReceipt as Mock).mockReturnValue({ confirmations: 1 });
	});

	it('renders the strategy details and removal button', async () => {
		(useQuery as Mock).mockImplementationOnce(() => ({
			data: {
				active: true,
				orderBytes: '0xorderBytes',
				orderbook: { id: '0xorderbook' },
				inputs: [],
				outputs: [],
				trades: [],
				addEvents: [{ transaction: { id: '0xtransaction', timestamp: '1700000000' } }],
				owner: '0x1234567890123456789012345678901234567890'
			},
			isLoading: false,
			isError: false,
			refetch: vi.fn()
		}));
		render(<StrategyAnalytics orderHash="0xtransaction" network="flare" />);
		expect(screen.getByText('Strategy Analytics')).toBeInTheDocument();
		await waitFor(() => {
			expect(screen.getByText(RemovalStatus.Idle)).toBeInTheDocument();
		});
	});

	it('renders no removal button if the strategy is inactive', () => {
		(useQuery as Mock).mockImplementationOnce(() => ({
			data: {
				active: false,
				orderBytes: '0xorderBytes',
				orderbook: { id: '0xorderbook' },
				inputs: [],
				outputs: [],
				trades: [],
				addEvents: [{ transaction: { id: '0xtransaction', timestamp: '1700000000' } }]
			},
			isLoading: false,
			isError: false,
			refetch: vi.fn()
		}));
		(useQuery as Mock).mockImplementationOnce(() => ({
			data: []
		}));
		render(<StrategyAnalytics orderHash="0xtransaction" network="flare" />);
		expect(screen.getByTestId('strategy-status')).toHaveTextContent('Inactive');
		expect(screen.queryByTestId('remove-strategy-btn')).not.toBeInTheDocument();
	});

	it('initiates removeOrder process and updates removal status', async () => {
		(useQuery as Mock).mockImplementation(({ queryKey }) => {
			if (queryKey[1] === 'trades') {
				return {
					data: {
						active: true,
						orderBytes:
							'0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000f08bcbce72f62c95dcb7c07dcb5ed26acfcfbc1100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000260142cdd905c5892328b73e83779d2b112b527bc2dbc46aa78ac408b8b3638012e0000000000000000000000005fb33d710f8b58de4c9fdec703b5c2487a5219d600000000000000000000000084c6e7f5a1e5dd89594cc25bef4722a1b8871ae6000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000ad000000000000000000000000000000000000000000000000000000000000000200000000000000000000000012e605bc104e93b45e1ad99f9e555f659051c2bb0000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000002d0200000024080500021810000001100001361100000110000101100000031000041e120000221300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000012e605bc104e93b45e1ad99f9e555f659051c2bb00000000000000000000000000000000000000000000000000000000000000120804f3b2607b8f7abdeffa4eb500c65651c0cc253960bb7804c61ace1744541e00000000000000000000000000000000000000000000000000000000000000010000000000000000000000001d80c49bbbcd1c0911346656b529df9e5c2f783d00000000000000000000000000000000000000000000000000000000000000120804f3b2607b8f7abdeffa4eb500c65651c0cc253960bb7804c61ace1744541e',
						orderbook: { id: '0xorderbook' },
						inputs: [],
						outputs: [],
						trades: [],
						addEvents: [{ transaction: { id: '0xtransaction', timestamp: '1700000000' } }],
						owner: '0x1234567890123456789012345678901234567890'
					},
					isLoading: false,
					isError: false,
					refetch: vi.fn()
				};
			}
			return {
				data: []
			};
		});

		render(<StrategyAnalytics orderHash="0xtransaction" network="flare" />);

		const removeButton = screen.getByTestId('remove-strategy-btn');
		expect(removeButton).toHaveTextContent(RemovalStatus.Idle);
		await waitFor(() => userEvent.click(removeButton));

		await waitFor(() => {
			expect(removeButton).toHaveTextContent(RemovalStatus.Removing);
		});
	});
	it('renders the strategy details and removal button', () => {
		(useQuery as Mock).mockImplementationOnce(() => ({
			data: {
				active: true,
				orderBytes: '0xorderBytes',
				orderbook: { id: '0xorderbook' },
				inputs: [],
				outputs: [],
				trades: []
			},
			isLoading: false,
			isError: false,
			refetch: vi.fn()
		}));
		(useQuery as Mock).mockImplementationOnce(() => ({
			data: []
		}));
		render(<StrategyAnalytics orderHash="0xtransaction" network="flare" />);
		expect(screen.getByText('Strategy Analytics')).toBeInTheDocument();
		expect(screen.getByText(RemovalStatus.Idle)).toBeInTheDocument();
	});
	it('Show "no subgraph" error', () => {
		(useQuery as Mock).mockReturnValue(() => ({
			data: {},
			isLoading: false,
			isError: true,
			refetch: vi.fn()
		}));
		render(<StrategyAnalytics orderHash="0xtransaction" network="nonetwork" />);
		expect(screen.getByTestId('no-sg-error')).toBeInTheDocument();
	});
	it('Shows "no data" error', () => {
		(useQuery as Mock).mockImplementation(() => ({
			error: { message: 'No data found' },
			isLoading: false,
			isError: true,
			refetch: vi.fn()
		}));
		render(<StrategyAnalytics orderHash="0xtransaction" network="flare" />);
		expect(screen.getByTestId('query-error')).toBeInTheDocument();
		screen.debug();
	});
	it('Shows "Loading" state', () => {
		(useQuery as Mock).mockImplementation(() => ({
			isLoading: true,
			isError: false,
			refetch: vi.fn()
		}));
		render(<StrategyAnalytics orderHash="0xtransaction" network="flare" />);
		expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
		screen.debug();
	});
});
