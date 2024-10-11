import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { DepositModal } from '@/app/_components/DepositModal';

import { formatUnits } from 'viem';

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
	orderbook: { id: '0xOrderBookAddress' }
};

const mockNetwork = 'flare';

describe('DepositModal', () => {
	it('updates input value to max balance with long decimal precision on "Max" button click', async () => {
		render(<DepositModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);
		fireEvent.click(triggerButton);

		const maxButton = await screen.findByRole('button', { name: /Max/i });
		fireEvent.click(maxButton);

		const input = screen.getByPlaceholderText('0') as HTMLInputElement;
		const expectedValue = formatUnits(BigInt('156879426436436000'), mockVault.token.decimals);
		expect(input.value).toBe(expectedValue);
		expect(input.value).toBe('0.156879426436436');
	});
});
