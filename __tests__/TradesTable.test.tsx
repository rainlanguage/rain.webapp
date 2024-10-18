import { render, screen } from '@testing-library/react';
import TradesTable from '@/app/_components/TradesTable';
import { Trade } from '@/app/types';
import { formatUnits } from 'viem';

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
			amount: BigInt(5000000000000000000),
			vault: {
				token: {
					symbol: 'ETH',
					decimals: '18'
				}
			}
		},
		outputVaultBalanceChange: {
			amount: BigInt(-2000000000000000000),
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
			amount: BigInt(-1000000000000000000),
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

	it('displays output in absolute value', () => {
		render(<TradesTable trades={mockTrades} />);

		const tableRows = screen.getAllByRole('row');
		const ioRatios = tableRows
			.map((row) => row.children[row.children.length - 2]?.textContent)
			.filter(Boolean);

		expect(ioRatios[1]).toBe(
			`${formatUnits(
				BigInt(Math.abs(Number(mockTrades[0].outputVaultBalanceChange.amount))),
				Number(mockTrades[0].outputVaultBalanceChange.vault.token.decimals)
			)} DAI`
		);
		expect(ioRatios[2]).toBe(
			`${formatUnits(
				BigInt(Math.abs(Number(mockTrades[1].outputVaultBalanceChange.amount))),
				Number(mockTrades[1].outputVaultBalanceChange.vault.token.decimals)
			)} USDC`
		);
	});

	it('displays io ratios in absolute value', () => {
		render(<TradesTable trades={mockTrades} />);

		const tableRows = screen.getAllByRole('row');
		const ioRatios = tableRows.map((row) => row.lastChild?.textContent).filter(Boolean);

		expect(ioRatios[1]).toBe(
			`${Math.abs(Number(mockTrades[0].inputVaultBalanceChange.amount / mockTrades[0].outputVaultBalanceChange.amount)).toFixed(2)} ETH/DAI`
		);
		expect(ioRatios[2]).toBe(
			`${Math.abs(Number(mockTrades[1].inputVaultBalanceChange.amount / mockTrades[1].outputVaultBalanceChange.amount)).toFixed(2)} ETH/USDC`
		);
	});
});
