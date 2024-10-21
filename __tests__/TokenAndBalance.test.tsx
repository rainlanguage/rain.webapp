import { render, screen } from '@testing-library/react';
import { TokenAndBalance } from '@/app/_components/TokenAndBalance';
import { formatUnits } from 'viem';
import { Output } from '@/app/types';

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
