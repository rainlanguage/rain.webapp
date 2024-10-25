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
} as unknown as Input;

const mockNetwork = 'flare';

describe('WithdrawalModal', () => {
	it('updates input value to max balance with long decimal precision on "Max" button click', async () => {
		render(<WithdrawalModal vault={mockVault} network={mockNetwork} />);

		// Open modal by clicking the trigger
		const triggerButton = screen.getByText(/Withdraw/i);
		fireEvent.click(triggerButton);

		const maxButton = await screen.findByRole('button', { name: /Max/i });
		fireEvent.click(maxButton);

		const input = screen.getByTestId('withdrawal-input') as HTMLInputElement;
		const expectedValue = formatUnits(mockVault.balance, Number(mockVault.token.decimals));
		expect(input.value).toBe(expectedValue);
		expect(input.value).toBe('0.156879426436436');
	});
	it('allows typing of decimal places in the input field', async () => {
		render(<WithdrawalModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Withdraw/i);
		fireEvent.click(triggerButton);

		const input = screen.getByTestId('withdrawal-input') as HTMLInputElement;

		fireEvent.change(input, { target: { value: '123.456' } });

		expect(input.value).toBe('123.456');
	});

	it('uses correct separator for input value', async () => {
		render(<WithdrawalModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Withdraw/i);
		fireEvent.click(triggerButton);

		const input = screen.getByTestId('withdrawal-input') as HTMLInputElement;
		fireEvent.change(input, { target: { value: '123,456' } });

		expect(input.value).toBe('123.456');
	});

	it('shows an error when the input value exceeds the vault balance', async () => {
		render(<WithdrawalModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Withdraw/i);
		fireEvent.click(triggerButton);

		const input = screen.getByTestId('withdrawal-input') as HTMLInputElement;

		const exceededValue = '1000';
		fireEvent.change(input, { target: { value: exceededValue } });

		const errorMessage = await screen.findByText(/Amount exceeds vault balance/i);
		expect(errorMessage).toBeInTheDocument();
	});
	it('disables button when 0 withdrawal', async () => {
		render(<WithdrawalModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Withdraw/i);
		fireEvent.click(triggerButton);

		const input = screen.getByTestId('withdrawal-input') as HTMLInputElement;

		await fireEvent.change(input, { target: { value: '0' } });

		const submitButton = screen.getByTestId('withdraw-button') as HTMLButtonElement;
		expect(submitButton).toBeDisabled();
	});
	it('disables button when withdrawal amount is empty string', async () => {
		render(<WithdrawalModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Withdraw/i);
		fireEvent.click(triggerButton);

		const input = screen.getByTestId('withdrawal-input') as HTMLInputElement;

		await fireEvent.change(input, { target: { value: '' } });

		const submitButton = screen.getByTestId('withdraw-button') as HTMLButtonElement;
		expect(submitButton).toBeDisabled();
	});
});
