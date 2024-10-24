import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { DepositModal } from '@/app/_components/DepositModal';
import { useWriteContract } from 'wagmi';
import { formatUnits, zeroAddress } from 'viem';
import { Input } from '@/app/types';
import { readContract } from 'viem/actions';
import { userEvent } from '@testing-library/user-event';

const balanceRefetch = vi.fn().mockName('balanceRefetch');

vi.mock('wagmi', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		useAccount: () => ({ address: zeroAddress, chain: { id: 1 } }),
		useReadContract: vi.fn().mockImplementation(() => ({
			data: BigInt('156879426436436000'),
			refetch: balanceRefetch
		})),
		useWriteContract: vi.fn(),
		useSwitchChain: vi.fn(() => ({ switchChainAsync: vi.fn() }))
	};
});

vi.mock('viem/actions', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		readContract: vi.fn()
	};
});

vi.mock('@wagmi/core', () => ({
	waitForTransactionReceipt: vi.fn()
}));

const mockVault = {
	token: { address: zeroAddress, decimals: 18, symbol: 'MOCK' },
	vaultId: BigInt(1),
	orderbook: { id: zeroAddress }
} as unknown as Input;

const mockNetwork = 'flare';

describe('DepositModal', () => {
	it('updates input value to max balance with long decimal precision on "Max" button click', async () => {
		(useWriteContract as Mock).mockResolvedValue({
			writeContractAsync: vi.fn().mockResolvedValue('0xMockTransactionHash')
		});
		render(<DepositModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);
		fireEvent.click(triggerButton);

		const maxButton = await screen.findByRole('button', { name: /Max/i });
		fireEvent.click(maxButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		const expectedValue = formatUnits(
			BigInt('156879426436436000'),
			Number(mockVault.token.decimals)
		);
		expect(input.value).toBe(expectedValue);
		expect(input.value).toBe('0.156879426436436');
	});

	it('allows typing of decimal places in the input field', async () => {
		render(<DepositModal vault={mockVault as unknown as Input} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);
		fireEvent.click(triggerButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		fireEvent.change(input, { target: { value: '123.456' } });

		expect(input.value).toBe('123.456');
	});

	it('uses correct separator for input value', async () => {
		render(<DepositModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);
		fireEvent.click(triggerButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		fireEvent.change(input, { target: { value: '123,456' } });

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
	it('triggers refetch for both balance and allowance after a successful deposit', async () => {
		(useWriteContract as Mock).mockReturnValue({
			writeContractAsync: vi.fn().mockResolvedValue('0xMockTransactionHash')
		});
		(readContract as Mock).mockReturnValue(BigInt('100000'));
		const mockOnSuccess = vi.fn();

		render(<DepositModal vault={mockVault} network={mockNetwork} onSuccess={mockOnSuccess} />);

		const triggerButton = screen.getByText(/Deposit/i);
		await userEvent.click(triggerButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		await fireEvent.change(input, { target: { value: '0.000001' } });
		const submitButton = screen.getByRole('button', { name: /Submit/i });
		await userEvent.click(submitButton);

		const successMessage = await screen.findByText(/Deposit completed successfully!/);
		expect(successMessage).toBeInTheDocument();

		await waitFor(() => {
			expect(balanceRefetch).toHaveBeenCalled();
			expect(mockOnSuccess).toHaveBeenCalled();
		});
	});
	it('fails the approve step and displays an error message', async () => {
		(useWriteContract as Mock).mockReturnValue({
			writeContractAsync: vi.fn().mockRejectedValue(new Error('Approval failed'))
		});
		(readContract as Mock).mockReturnValue(BigInt('100000'));

		render(<DepositModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);
		await userEvent.click(triggerButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		await fireEvent.change(input, { target: { value: '0.000001' } });
		const submitButton = screen.getByRole('button', { name: /Submit/i });
		await userEvent.click(submitButton);

		const errorMessage = await screen.findByText(/Error during approval process/i);
		expect(errorMessage).toBeInTheDocument();
	});
	it('disables the submit button if 0 deposit', async () => {
		(readContract as Mock).mockReturnValue(BigInt('100000'));

		render(<DepositModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);
		await userEvent.click(triggerButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		await fireEvent.change(input, { target: { value: '0' } });
		const submitButton = screen.getByRole('button', { name: /Submit/i });
		await waitFor(() => expect(submitButton).toBeDisabled());
	});
	it('disables the submit button if empty string in deposit field', async () => {
		(readContract as Mock).mockReturnValue(BigInt('100000'));

		render(<DepositModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);
		await userEvent.click(triggerButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		await fireEvent.change(input, { target: { value: '' } });
		const submitButton = screen.getByRole('button', { name: /Submit/i });
		await waitFor(() => expect(submitButton).toBeDisabled());
	});
});
