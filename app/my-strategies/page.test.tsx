import { render, screen, fireEvent } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import Page from './page';
import { Mock, vi } from 'vitest';

vi.mock('wagmi', () => ({
	useAccount: vi.fn()
}));

vi.mock('@tanstack/react-query', async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...(actual as object),
		useQuery: vi.fn()
	};
});

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}));

describe('Page', () => {
	it('navigates to the order details page when the details button is clicked', () => {
		(useAccount as Mock).mockReturnValue({ address: '0x123', isConnected: true });
		(useQuery as Mock).mockReturnValue({
			data: [
				{
					orderHash: 'order123',
					network: 'Ethereum',
					active: true,
					timestampAdded: '1700000000',
					inputs: [],
					outputs: [],
					trades: []
				}
			],
			isLoading: false,
			isError: false
		});

		render(<Page />);

		const linkElement = screen.getByRole('link', { name: /details/i });

		expect(linkElement).toHaveAttribute(
			'href',
			`${window.location.origin}/my-strategies/order123-Ethereum`
		);

		fireEvent.click(linkElement);
	});
});
