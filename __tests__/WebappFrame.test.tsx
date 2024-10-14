import { render, screen, waitFor } from '@testing-library/react';
import WebappFrame from '@/app/_components/WebappFrame';
import { Mock, vi } from 'vitest';
import { generateButtonsData } from '@/app/_services/buttonsData';
import { fixturedTokenInfos } from '@/__fixtures__/tokenInfos';
import { mockFixedLimit } from '@/__fixtures__/fixed-limit';
import userEvent from '@testing-library/user-event';

const { useRouter, useSearchParams } = vi.hoisted(() => {
	const mockedRouterReplace = vi.fn();
	const mockedGetSearchParams = vi.fn((param) => {
		if (param === 'currentState') return 'mockEncodedStateString';
		return null;
	});

	return {
		useRouter: () => ({ replace: mockedRouterReplace }),
		useSearchParams: () => ({ get: mockedGetSearchParams })
	};
});

vi.mock('next/navigation', async (importActual) => {
	const actual = await importActual();
	return {
		...(actual as object),
		useRouter,
		useSearchParams
	};
});

vi.mock('@/app/_services/buttonsData', () => ({
	generateButtonsData: vi.fn()
}));

describe('WebappFrame Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.resetAllMocks();
	});

	it('shows input field when only one "Custom" button is present', async () => {
		(generateButtonsData as Mock).mockReturnValue([
			{ buttonValue: 'customValue', buttonText: 'Custom' }
		]);
		render(<WebappFrame dotrainText={mockFixedLimit} deploymentOption="" />);
		await waitFor(() => {
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});
	});
	it.only('shows preset buttons when there are multiple choices', async () => {
		(generateButtonsData as Mock).mockReturnValue([
			{
				buttonTarget: 'buttonValue',
				buttonValue: 'back',
				buttonText: '←'
			},
			{
				buttonTarget: 'buttonValue',
				buttonValue: '0',
				buttonText: '0 USDC'
			},
			{
				buttonTarget: 'buttonValue',
				buttonValue: '10',
				buttonText: '10 USDC'
			},
			{
				buttonTarget: 'textInputLabel',
				buttonValue: 'Enter a number greater than 0',
				buttonText: 'Custom'
			}
		]);

		render(<WebappFrame dotrainText={mockFixedLimit} deploymentOption="" />);

		await waitFor(() => {
			expect(screen.getByText('0 USDC')).toBeInTheDocument();
			expect(screen.getByText('10 USDC')).toBeInTheDocument();
		});

		const customButton = screen.getByText('Custom');
		await userEvent.click(customButton);
		await waitFor(() => {
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});
	});
});
