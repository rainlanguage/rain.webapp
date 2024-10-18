import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { DepositModal } from '@/app/_components/DepositModal';

import { formatUnits } from 'viem';
import { Input } from '@/app/types';

vi.mock('wagmi', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		useAccount: () => ({ address: '0xMockAddress', chain: { id: 1 } }),
		useReadContract: vi.fn(() => ({
			data: BigInt('327472398438872398423')
		})),
		useWriteContract: vi.fn(() => ({ writeContractAsync: vi.fn() })),
		useSwitchChain: vi.fn(() => ({ switchChainAsync: vi.fn() }))
	};
});

const mockVault = {
	token: { address: '0xTokenAddress', decimals: 18, symbol: 'MOCK' },
	vaultId: BigInt(1),
	orderbook: { id: '0xOrderBookAddress' }
} as unknown as Input;

const mockNetwork = 'flare';

describe('DepositModal', () => {
	it('updates input value to max balance with long decimal precision on "Max" button click', async () => {
		render(<DepositModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);
		fireEvent.click(triggerButton);

		const maxButton = await screen.findByRole('button', { name: /Max/i });
		fireEvent.click(maxButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		const expectedValue = formatUnits(BigInt('327472398438872398423'), Number(mockVault.token.decimals));
		expect(input.value).toBe(expectedValue);
		expect(input.value).toBe('327.472398438872398423');
	});

	it('allows typing of decimal places in the input field', async () => {
		render(<DepositModal vault={mockVault as unknown as Input} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);
		fireEvent.click(triggerButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		fireEvent.change(input, { target: { value: '123.456' } });

		expect(input.value).toBe('123.456');
	});

	it('shows an error when the deposit amount exceeds the wallet balance', async () => {
		render(<DepositModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);
		fireEvent.click(triggerButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;

		const exceededValue = '1000';
		fireEvent.change(input, { target: { value: exceededValue } });

		const errorMessage = await screen.findByText(/Amount exceeds wallet balance/i);
		expect(errorMessage).toBeInTheDocument();
	});
});
