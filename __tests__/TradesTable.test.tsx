import { render, screen } from '@testing-library/react';
import TradesTable from '@/app/_components/TradesTable';
import { Trade } from '@/app/types';

const mockTrades: Trade[] = [
	{
		tradeEvent: {
			transaction: {
				timestamp: '1700000000',
				id: '0x1234567890abcdef1234567890abcdef12345678'
			},
			sender: '0xabcdefabcdefabcdefabcdefabcdefabcdef'
		},
		inputVaultBalanceChange: {
			amount: BigInt(1000000000000000000),
			vault: {
				token: {
					symbol: 'ETH',
					decimals: '18'
				}
			}
		},
		outputVaultBalanceChange: {
			amount: BigInt(2000000000000000000),
			vault: {
				token: {
					symbol: 'DAI',
					decimals: '18'
				}
			}
		}
	},
	{
		tradeEvent: {
			transaction: {
				timestamp: '1600000000',
				id: '0xabcdefabcdefabcdefabcdefabcdefabcdef'
			},
			sender: '0x1234567890abcdef1234567890abcdef12345678'
		},
		inputVaultBalanceChange: {
			amount: BigInt(500000000000000000),
			vault: {
				token: {
					symbol: 'ETH',
					decimals: '18'
				}
			}
		},
		outputVaultBalanceChange: {
			amount: BigInt(1000000000000000000),
			vault: {
				token: {
					symbol: 'USDC',
					decimals: '6'
				}
			}
		}
	}
] as unknown as Trade[];

describe('TradesTable', () => {
	it('displays trades sorted by timestamp in descending order', () => {
		render(<TradesTable trades={mockTrades} />);

		const tradeDates = screen.getAllByText(/^\d{1,2}\/\d{1,2}\/\d{4}/);

		expect(tradeDates.length).toBe(2);

		expect(new Date(tradeDates[0].textContent!).getTime()).toBeGreaterThan(
			new Date(tradeDates[1].textContent!).getTime()
		);
	});
});
