import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { RemoveModal } from '@/app/_components/RemoveModal';
import { Input } from '@/app/types';

vi.mock('wagmi', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		useAccount: () => ({ address: '0xMockAddress', chain: { id: 1 } }),
		useReadContract: vi.fn(() => ({ data: BigInt('156879426436436000') })),
		useWriteContract: vi.fn(() => ({
			writeContractAsync: vi.fn().mockResolvedValue('0xMockTransactionHash')
		})),
		useSwitchChain: vi.fn(() => ({ switchChainAsync: vi.fn() }))
	};
});

vi.mock('@wagmi/core', () => ({
	waitForTransactionReceipt: vi.fn().mockResolvedValue({ status: 'success' })
}));

const mockVault = {
	orderBytes:
		'0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000f08bcbce72f62c95dcb7c07dcb5ed26acfcfbc1100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000380a409a43fbd92d5eac3dcfa702f4028844138a1aad6400e0228e3f1726419c9840000000000000000000000005fb33d710f8b58de4c9fdec703b5c2487a5219d600000000000000000000000084c6e7f5a1e5dd89594cc25bef4722a1b8871ae6000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001c100000000000000000000000000000000000000000000000000000000000000070000000000000000000000000000000000000000000000000d99a8cec7e2000083464c52000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c328093e61ee4000008a73746172742d74696d650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004563918244f4000000000000000000000000000000000000000000000000124bc0ddd92e56000000000000000000000000000000915e36ef882941816356bc3718df868054f868ad00000000000000000000000000000000000000000000000000000000000000a104000000300034004c0b0700050b1000020b2000030010000200100000011000003d12000000100002001000012b120000031000014a020000000000000502000201100002011000010212000600100000361100001207000601100003031000010c1200004911000001100005011000042e120000001000001a1000004712000000100001001000023d12000003100001491100000010000400100003471200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000001d80c49bbbcd1c0911346656b529df9e5c2f783d00000000000000000000000000000000000000000000000000000000000000121f315effe17cc4f120ae1b3a56e863301bead794233a1fbe5e4e2d15c72ed8ce0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000fbda5f676cb37624f28265a144a48b0d6e87d3b600000000000000000000000000000000000000000000000000000000000000061f315effe17cc4f120ae1b3a56e863301bead794233a1fbe5e4e2d15c72ed8ce',
	orderbook: { id: '0xOrderBookAddress' }
} as unknown as Input;
const mockNetwork = 'flare';

const mockOnComplete = vi.fn();

describe('RemoveModal', () => {
	beforeEach(() => {
		mockOnComplete.mockClear();
	});

	it('opens the modal when the trigger button is clicked', async () => {
		render(<RemoveModal vault={mockVault} network={mockNetwork} onComplete={mockOnComplete} />);

		const triggerButton = screen.getByText(/Remove Strategy/i);
		fireEvent.click(triggerButton);

		await waitFor(() => {
			expect(screen.getByTestId('confirm-warning')).toBeInTheDocument();
		});
	});

	it('displays confirmation step and progresses to removing status on Confirm click', async () => {
		render(<RemoveModal vault={mockVault} network={mockNetwork} onComplete={mockOnComplete} />);

		const triggerButton = screen.getByText(/Remove Strategy/i);
		fireEvent.click(triggerButton);

		const confirmButton = screen.getByText(/Confirm Removal/i);
		fireEvent.click(confirmButton);

		await waitFor(() =>
			expect(screen.getByText('Waiting for confirmation...')).toBeInTheDocument()
		);
	});

	it('calls onComplete after successful removal', async () => {
		render(<RemoveModal vault={mockVault} network={mockNetwork} onComplete={mockOnComplete} />);

		const triggerButton = screen.getByText(/Remove Strategy/i);
		fireEvent.click(triggerButton);

		const confirmButton = screen.getByText(/Confirm Removal/i);
		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(screen.getByText('Strategy removed successfully!')).toBeInTheDocument();
			expect(mockOnComplete).toHaveBeenCalled();
		});
	});

	it('shows error message when removal fails', async () => {
		const mockInvalidVault = {
			orderBytes: 'invalidOrderBytes',
			orderbook: { id: '0xOrderBookAddress' }
		} as unknown as Input;
		render(
			<RemoveModal vault={mockInvalidVault} network={mockNetwork} onComplete={mockOnComplete} />
		);

		const triggerButton = screen.getByText(/Remove Strategy/i);
		fireEvent.click(triggerButton);

		const confirmButton = screen.getByText(/Confirm Removal/i);
		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(
				screen.getByText('An error occurred while removing the strategy.')
			).toBeInTheDocument();
		});
	});
});
