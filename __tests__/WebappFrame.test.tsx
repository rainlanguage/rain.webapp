import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import WebappFrame from '@/app/_components/WebappFrame';
import fs from 'fs';
import path from 'path';
import { vi } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams({}),
}));

// Mock getTokenInfo
vi.mock('@/app/_services/getTokenInfo', () => ({
  getTokenInfos: vi.fn().mockResolvedValue([
    {
      decimals: 18,
      symbol: 'WETH',
      name: 'Wrapped Ether',
      yamlName: 'weth',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    },
    {
      decimals: 6,
      symbol: 'USDC',
      name: 'USD Coin',
      yamlName: 'usdc',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    }
  ]),
}));

describe('WebappFrame', () => {
	it('renders the correct text input placeholders', async () => {
		const filePath = path.join(
			process.cwd(),
			'public',
				'_strategies',
				'raindex',
				'2-dynamic-spread',
				'dynamic-spread.rain'
		);
		const dotrainText = fs.readFileSync(filePath, 'utf8');

        render(<WebappFrame dotrainText={dotrainText} deploymentOption={null} />);

        await waitFor(() => {
            expect(screen.getByText(/Start/i)).toBeInTheDocument();
        });
        fireEvent.click(screen.getByText(/Start/i));

        await waitFor(() => {
            expect(screen.getByText(/Initial price (USDC.e per WETH)/i)).toBeInTheDocument();
        });
	});
});
