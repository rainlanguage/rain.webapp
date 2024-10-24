import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { DepositModal } from '@/app/_components/DepositModal';
import { useAccount, useChainId, useReadContract, useSwitchChain, useWriteContract } from 'wagmi';
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
		useReadContract: vi.fn(),
		useWriteContract: vi.fn(),
		useSwitchChain: vi.fn(),
		useChainId: vi.fn()
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
	let mockWriteContractAsync: Mock;

	beforeEach(() => {
		vi.resetAllMocks();
		(useReadContract as Mock).mockImplementation(() => ({
			data: BigInt('156879426436436000'),
			refetch: balanceRefetch
		}));
		mockWriteContractAsync = vi.fn();
		(useWriteContract as Mock).mockReturnValue({
			writeContractAsync: mockWriteContractAsync
		});
		(useSwitchChain as Mock).mockReturnValue({ switchChainAsync: vi.fn() });
		(readContract as Mock).mockReturnValue(BigInt('100000'));
	});
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
	it('sets error message from error.details', async () => {
		type CustomError = {
			message?: string;
			details: string;
		};
		const mockError: CustomError = { details: 'Specific error details' };
		(mockWriteContractAsync as Mock).mockRejectedValue(mockError);

		render(<DepositModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);
		fireEvent.click(triggerButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		await fireEvent.change(input, { target: { value: '0.1' } });
		const submitButton = screen.getByRole('button', { name: /Submit/i });
		await userEvent.click(submitButton);

		const errorMessage = await screen.findByText('Specific error details');
		expect(errorMessage).toBeInTheDocument();
	});
	it('fails the approve step and displays an error message', async () => {
		(useWriteContract as Mock).mockReturnValue({
			writeContractAsync: vi.fn().mockRejectedValue(new Error('Approval failed'))
		});
		(readContract as Mock).mockReturnValue(BigInt('100000'));
		(readContract as Mock).mockReturnValue(BigInt('0'));

		render(<DepositModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);

		await userEvent.click(triggerButton);
		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		await fireEvent.change(input, { target: { value: '0.000001' } });
		const submitButton = screen.getByRole('button', { name: /Submit/i });
		await userEvent.click(submitButton);

		await waitFor(async () => {
			const errorMessage = await screen.getByTestId('error-message');
			expect(errorMessage).toBeInTheDocument();
			expect(errorMessage).toHaveTextContent('An error occured while approving your deposit.');
		});
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
	it('fires the switch chain function if the chain is incorrect', async () => {
		(useSwitchChain as Mock).mockReturnValue({
			switchChain: vi.fn()
		});
		(readContract as Mock).mockReturnValue(BigInt('1010000000000'));
		(readContract as Mock).mockReturnValue(BigInt('1000000000000'));

		render(<DepositModal vault={mockVault} network={mockNetwork} />);

		const triggerButton = screen.getByText(/Deposit/i);
		await userEvent.click(triggerButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		await fireEvent.change(input, { target: { value: '0.00000001' } });
		const submitButton = screen.getByRole('button', { name: /Submit/i });
		await waitFor(() => expect(submitButton).not.toBeDisabled());
		await userEvent.click(submitButton);
		expect(useSwitchChain).toHaveBeenCalled();
	});
	it('does not fire the switchChain function connected to the strat chain', async () => {
		(useSwitchChain as Mock).mockReturnValue({
			switchChain: vi.fn()
		});

		(readContract as Mock).mockReturnValue(BigInt('1010000000000'));
		(readContract as Mock).mockReturnValue(BigInt('1000000000000'));

		render(<DepositModal vault={mockVault} network={'mainnet'} />);

		const triggerButton = screen.getByText(/Deposit/i);
		await userEvent.click(triggerButton);

		const input = screen.getByTestId('deposit-input') as HTMLInputElement;
		await fireEvent.change(input, { target: { value: '0.00000001' } });
		const submitButton = screen.getByRole('button', { name: /Submit/i });
		await waitFor(() => expect(submitButton).not.toBeDisabled());
		await userEvent.click(submitButton);
		expect(useSwitchChain).toHaveBeenCalled();
	});
});
