import { act, render, screen, waitFor } from '@testing-library/react';
import WebappFrame from '@/app/_components/WebappFrame';
import { Mock, vi } from 'vitest';
import { generateButtonsData } from '@/app/_services/buttonsData';
import { fixturedTokenInfos } from '@/__fixtures__/tokenInfos';
import { mockFixedLimit } from '@/__fixtures__/fixed-limit';
import { getTokenInfos } from '@/app/_services/getTokenInfo';
import { compress } from '@/app/_services/compress';
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

vi.mock('@/app/_services/getTokenInfo', () => ({
	getTokenInfos: vi.fn()
}));

vi.mock('@/app/_services/buttonsData', () => ({
	generateButtonsData: vi.fn()
}));

vi.mock('@/app/_services/compress', () => ({
	compress: vi.fn()
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

	it.only('updates the URL with the current state', async () => {
		const mockCompressedState = 'mockCompressedState';

		// Mocking necessary functions
		(compress as Mock).mockResolvedValue(mockCompressedState);
		const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
		(getTokenInfos as Mock).mockResolvedValue(fixturedTokenInfos);
		(generateButtonsData as Mock).mockReturnValue([
			{ buttonValue: 'customValue', buttonText: 'Custom' }
		]);

		// Render the component
		render(<WebappFrame dotrainText={mockFixedLimit} deploymentOption="" />);

		// Wait for the input field to be available in the DOM
		await waitFor(() => {
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});

		const input = screen.getByTestId('input') as HTMLInputElement;
		const button = screen.getByTestId('button-' + 'Custom') as HTMLButtonElement;
		expect(button).toBeInTheDocument();

		// Simulate typing into the input field
		await act(async () => {
			await userEvent.type(input, '123');
		});

		// Simulate clicking the custom button
		await userEvent.click(button);

		// Wait for the URL to be updated
		await waitFor(() => {
			expect(replaceStateSpy).toHaveBeenCalled();
			expect(replaceStateSpy).toHaveBeenCalledTimes(1);
			const url = new URL(window.location.href);
			url.searchParams.set('currentState', mockCompressedState);

			expect(replaceStateSpy).toHaveBeenCalledWith({}, '', url.toString());
		});
		// Clean up mock
		replaceStateSpy.mockRestore();
	});

	it('updates the URL with the current state when a preset button is clicked', async () => {
		const mockCompressedState = 'mockCompressedState';

		// Mocking the compress and token info services
		(compress as Mock).mockResolvedValue(mockCompressedState);
		(getTokenInfos as Mock).mockResolvedValue(fixturedTokenInfos);

		// Mock the buttons data that will be rendered
		(generateButtonsData as Mock).mockReturnValue([
			{ buttonValue: 'presetValue', buttonText: 'Preset' },
			{ buttonValue: 'presetValue2', buttonText: 'Preset2' }
		]);

		// Spy on window.history.replaceState
		const replaceStateSpy = vi.spyOn(window.history, 'replaceState');

		// Render the component
		render(<WebappFrame dotrainText={mockFixedLimit} deploymentOption="" />);

		// Wait for the preset button to be in the document
		await waitFor(() => {
			expect(screen.getByText('Preset')).toBeInTheDocument();
		});

		// Simulate clicking the preset button
		act(() => {
			const presetButton = screen.getByText('Preset');
			presetButton.click();
		});

		// Wait for URL updates to be triggered
		await waitFor(() => {
			expect(replaceStateSpy).toHaveBeenCalled();
			const url = new URL(window.location.href);
			expect(url.searchParams.get('currentState')).toEqual(mockCompressedState);
		});

		// Clean up mock
		replaceStateSpy.mockRestore();
	});
});
