import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WebappFrame from '@/app/_components/WebappFrame';
import { Mock, vi } from 'vitest';
import { generateButtonsData } from '@/app/_services/buttonsData';
import { fixturedTokenInfos } from '@/__fixtures__/tokenInfos';
import { mockFixedLimit } from '@/__fixtures__/fixed-limit';
import { getTokenInfos } from '@/app/_services/getTokenInfo';
import { act } from 'react';

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

vi.mock('@/app/_services/getTokenInfo', () => ({
	getTokenInfos: vi.fn()
}));

vi.mock('@/app/_services/buttonsData', () => ({
	generateButtonsData: vi.fn()
}));

describe('WebappFrame Component', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('shows input field when only one "Custom" button is present', async () => {
		(getTokenInfos as Mock).mockResolvedValue(fixturedTokenInfos);
		(generateButtonsData as Mock).mockReturnValue([
			{ buttonValue: 'customValue', buttonText: 'Custom' }
		]);
		render(<WebappFrame dotrainText={mockFixedLimit} deploymentOption="" />);
		await waitFor(() => {
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});
	});

	it('renders the correct text input placeholder', async () => {
		(getTokenInfos as Mock).mockResolvedValue(fixturedTokenInfos);
		(generateButtonsData as Mock).mockReturnValue([
			{ buttonTarget: 'buttonValue', buttonValue: '0', buttonText: '0 USDC' },
			{ buttonTarget: 'buttonValue', buttonValue: '10', buttonText: '10 USDC' },
			{
				buttonTarget: 'textInputLabel',
				buttonValue: 'Some placeholder value',
				buttonText: 'Custom'
			}
		]);
		render(<WebappFrame dotrainText={mockFixedLimit} deploymentOption="" />);

		await waitFor(() => {
			expect(screen.getByRole('button', { name: 'Custom' })).toBeInTheDocument();
		});

		const customButton = screen.getByRole('button', { name: 'Custom' });
		act(() => {
			fireEvent.click(customButton);
		});
		(generateButtonsData as Mock).mockReturnValue([]);

		expect(screen.getByPlaceholderText('Some placeholder value')).toBeInTheDocument();
	});
});
