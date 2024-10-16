import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

vi.mock(import('@tanstack/react-query'), async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		useQuery: vi.fn()
	};
});

vi.mock('@wagmi/core', () => ({
	waitForTransactionReceipt: vi.fn()
}));

describe('StrategyAnalytics', () => {
	beforeEach(() => {
		(useAccount as Mock).mockReturnValue({ address: '0x123', chain: { id: 1 } });
		(useSwitchChain as Mock).mockReturnValue({ switchChainAsync: vi.fn() });
		(useWriteContract as Mock).mockReturnValue({ writeContractAsync: vi.fn() });
		(useQuery as Mock).mockReturnValue({
			data: {
				order: {
					active: true,
					orderBytes: '0xorderBytes',
					orderbook: { id: '0xorderbook' },
					inputs: [],
					outputs: [],
					trades: []
				},
				transaction: { id: '0xtransaction', timestamp: '1700000000' }
			},
			isLoading: false,
			isError: false,
			refetch: vi.fn()
		});
		(waitForTransactionReceipt as Mock).mockResolvedValue({ confirmations: 1 });
	});

	it.only('renders the strategy details and removal button', () => {
		render(<StrategyAnalytics transactionId="0xtransaction" network="ethereum" />);
		expect(screen.getByText('Strategy Analytics')).toBeInTheDocument();
		expect(screen.getByText(RemovalStatus.Idle)).toBeInTheDocument();
	});

	it.only('initiates removeOrder process and updates removal status', async () => {
		const mockSwitchChainAsync = vi.fn();
		const mockWriteContractAsync = vi.fn().mockResolvedValue('0xtxhash');
		const mockRefetch = vi.fn();
		const mockWaitForTransactionReceipt = vi.fn().mockResolvedValue({ confirmations: 1 });

		// Override mocks with specific behavior for this test
		(useSwitchChain as Mock).mockReturnValue({ switchChainAsync: mockSwitchChainAsync });
		(useWriteContract as Mock).mockReturnValue({ writeContractAsync: mockWriteContractAsync });
		(useQuery as Mock).mockReturnValue({
			data: {
				order: {
					active: true,
					orderBytes: '0xorderBytes',
					orderbook: { id: '0xorderbook' },
					inputs: [],
					outputs: [],
					trades: []
				},
				transaction: { id: '0xtransaction', timestamp: '1700000000' }
			},
			isLoading: false,
			isError: false,
			refetch: mockRefetch
		});
		(waitForTransactionReceipt as Mock).mockReturnValue(mockWaitForTransactionReceipt);

		render(<StrategyAnalytics transactionId="0xtransaction" network="flare" />);

		// Trigger removeOrder
		const removeButton = screen.getByTestId('remove-strategy');
		await userEvent.click(removeButton);

		// Confirm status changes to Confirming
		await waitFor(() => {
			expect(screen.getByText(RemovalStatus.Confirming)).toBeInTheDocument();
		});

		// Confirm status changes to Removing after chain switch and contract write
		await waitFor(() => expect(mockSwitchChainAsync).toHaveBeenCalled());
		await waitFor(() => expect(mockWriteContractAsync).toHaveBeenCalled());
		expect(screen.getByText(RemovalStatus.Removing)).toBeInTheDocument();

		// Simulate transaction receipt and order inactive
		await waitFor(() => expect(mockWaitForTransactionReceipt).toHaveBeenCalled());

		// Mock order becomes inactive after polling
		(useQuery as Mock).mockReturnValueOnce({
			data: {
				order: { active: false, orderBytes: '0xorderBytes', orderbook: { id: '0xorderbook' } },
				transaction: { id: '0xtransaction', timestamp: '1700000000' }
			},
			isLoading: false,
			isError: false,
			refetch: mockRefetch
		});

		// Polling should trigger refetch and mark order as removed
		await waitFor(() => expect(mockRefetch).toHaveBeenCalled());
		expect(screen.getByText(RemovalStatus.Removed)).toBeInTheDocument();
	});
});
