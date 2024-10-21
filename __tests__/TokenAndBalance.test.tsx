import { render, screen } from '@testing-library/react';
import { TokenAndBalance } from '@/app/_components/TokenAndBalance'; // adjust the path as per your project structure
import { vi } from 'vitest';
import { formatUnits, zeroAddress } from 'viem';
import { Output } from '@/app/types';

//
vi.mock('wagmi', async (importOriginal) => {
	const original = await importOriginal();
	return {
		...(original as object),
		useAccount: () => ({ address: zeroAddress, chain: { id: 1 } }),
		useReadContract: vi.fn(),
		useWriteContract: vi.fn(() => ({
			writeContractAsync: vi.fn().mockResolvedValue('0xMockTransactionHash')
		})),
		useSwitchChain: vi.fn(() => ({ switchChainAsync: vi.fn() }))
	};
});

const mockInput = {
	token: { name: 'Mock Token', symbol: 'MOCK', decimals: BigInt('18') },
	balance: BigInt('123456789123456789123456789')
} as unknown as Output;

describe('TokenAndBalance component', () => {
	it('displays the correct balance without rounding', () => {
		render(
			<TokenAndBalance input={mockInput} network="mockNetwork" deposit={false} withdraw={false} />
		);

		const balanceElement = screen.getByTestId('strat-balance');
		expect(balanceElement).toHaveTextContent(
			formatUnits(mockInput.balance, Number(mockInput.token.decimals))
		);
	});
});
