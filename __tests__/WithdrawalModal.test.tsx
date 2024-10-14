import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { WithdrawalModal } from '@/app/_components/WithdrawalModal';
import { formatUnits } from 'viem';
import { Input } from '@/app/types';

vi.mock('wagmi', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		useAccount: () => ({ address: '0xMockAddress', chain: { id: 1 } }),
		useReadContract: vi.fn(() => ({
			data: BigInt('156879426436436000')
		})),
		useWriteContract: vi.fn(() => ({ writeContractAsync: vi.fn() })),
		useSwitchChain: vi.fn(() => ({ switchChainAsync: vi.fn() }))
	};
});

const mockVault = {
	token: { address: '0xTokenAddress', decimals: 18, symbol: 'MOCK' },
	vaultId: BigInt(1),
	orderbook: { id: '0xOrderBookAddress' },
	balance: BigInt('156879426436436000')
};

const mockNetwork = 'flare';

describe('WithdrawalModal', () => {
	it('updates input value to max balance with long decimal precision on "Max" button click', async () => {
		render(<WithdrawalModal vault={mockVault as unknown as Input} network={mockNetwork} />);

		// Open modal by clicking the trigger
		const triggerButton = screen.getByText(/Withdraw/i);
		fireEvent.click(triggerButton);

		const maxButton = await screen.findByRole('button', { name: /Max/i });
		fireEvent.click(maxButton);

		const input = screen.getByPlaceholderText('0') as HTMLInputElement;
		const expectedValue = formatUnits(mockVault.balance, mockVault.token.decimals);
		expect(input.value).toBe(expectedValue);
		expect(input.value).toBe('0.156879426436436');
	});
});
