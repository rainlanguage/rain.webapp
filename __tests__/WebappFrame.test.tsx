import { render, screen, waitFor } from '@testing-library/react';
import WebappFrame from '@/app/_components/WebappFrame';
import { Mock, vi } from 'vitest';
import { generateButtonsData } from '@/app/_services/buttonsData';
import { fixturedTokenInfos } from '@/__fixtures__/tokenInfos';
import { mockFixedLimit } from '@/__fixtures__/fixed-limit';
import { getTokenInfos } from '@/app/_services/getTokenInfo';

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
});
