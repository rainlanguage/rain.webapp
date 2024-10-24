import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import WebappFrame from '@/app/_components/WebappFrame';
import { Mock, vi } from 'vitest';
import { generateButtonsData } from '@/app/_services/buttonsData';
import { fixturedTokenInfos } from '@/__fixtures__/tokenInfos';
import { fixedLimitFixture } from '@/__fixtures__/fixed-limit';
import { getTokenInfos } from '@/app/_services/getTokenInfo';
import { compress } from '@/app/_services/compress';
import userEvent from '@testing-library/user-event';
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';

const mockedSearchParams = 'mockedSearchParams';

const { useRouter, useSearchParams } = vi.hoisted(() => {
	const mockedRouterReplace = vi.fn();
	const mockedGetSearchParams = vi.fn((param) => {
		if (param === 'currentState') return mockedSearchParams;
		return null;
	});
	return {
		useRouter: () => ({ replace: mockedRouterReplace }),
		useSearchParams: () => ({ get: mockedGetSearchParams })
	};
});

vi.mock('@/app/_services/parseDotrainFrontmatter', () => ({
	getOrderDetailsGivenDeployment: vi.fn()
}));

vi.mock('wagmi', () => ({
	useAccount: vi.fn(),
	useSwitchChain: vi.fn(),
	useWriteContract: vi.fn(),
	useChainId: vi.fn()
}));

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
		(useAccount as Mock).mockReturnValue({ address: '0x123', chain: { id: 1 } });
		(useSwitchChain as Mock).mockReturnValue({ switchChainAsync: vi.fn() });
		(useWriteContract as Mock).mockReturnValue({ writeContractAsync: vi.fn() });
	});

	it('shows input field when only one "Custom" button is present', async () => {
		(getTokenInfos as Mock).mockResolvedValue(fixturedTokenInfos);
		(generateButtonsData as Mock).mockReturnValue([
			{ buttonValue: 'customValue', buttonText: 'Custom' }
		]);
		render(<WebappFrame dotrainText={fixedLimitFixture} deploymentOption="" />);
		await waitFor(() => {
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});
	});

	it('updates the URL with the current state', async () => {
		const mockCompressedState = 'mockCompressedState';
		(compress as Mock).mockResolvedValue(mockCompressedState);
		const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
		(getTokenInfos as Mock).mockResolvedValue(fixturedTokenInfos);
		(generateButtonsData as Mock).mockReturnValue([
			{ buttonValue: 'customValue', buttonText: 'Custom' }
		]);

		render(<WebappFrame dotrainText={fixedLimitFixture} deploymentOption="" />);

		await waitFor(() => {
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});

		const input = screen.getByTestId('input') as HTMLInputElement;
		const button = screen.getByTestId('button-' + 'Custom') as HTMLButtonElement;
		expect(button).toBeInTheDocument();

		await act(async () => {
			await userEvent.type(input, '123');
			await fireEvent.click(button);
		});
		screen.debug();

		await waitFor(() => {
			expect(replaceStateSpy).toHaveBeenCalled();
			expect(replaceStateSpy).toHaveBeenCalledTimes(1);
		});
		replaceStateSpy.mockRestore();
	});

	it('updates the URL with the current state when a preset button is clicked', async () => {
		const mockCompressedState = 'mockCompressedState';

		(compress as Mock).mockResolvedValue(mockCompressedState);
		(getTokenInfos as Mock).mockResolvedValue(fixturedTokenInfos);

		(generateButtonsData as Mock).mockReturnValue([
			{ buttonValue: 'presetValue', buttonText: 'Preset' },
			{ buttonValue: 'presetValue2', buttonText: 'Preset2' }
		]);

		const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
		render(<WebappFrame dotrainText={fixedLimitFixture} deploymentOption="" />);

		await waitFor(() => {
			expect(screen.getByTestId('button-Preset')).toBeInTheDocument();
		});

		act(() => {
			const presetButton = screen.getByText('Preset');
			presetButton.click();
		});

		await waitFor(() => {
			expect(replaceStateSpy).toHaveBeenCalled();
			expect(replaceStateSpy).toHaveBeenCalledTimes(1);
			const url = new URL(window.location.href);
			expect(url.searchParams.get('currentState')).toEqual(mockCompressedState);
		});

		replaceStateSpy.mockRestore();
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
		render(<WebappFrame dotrainText={fixedLimitFixture} deploymentOption="" />);

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

	it('updates preserves the previous form value', async () => {
		const mockCompressedState = 'mockCompressedState';
		(compress as Mock).mockResolvedValue(mockCompressedState);
		const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
		(getTokenInfos as Mock).mockResolvedValue(fixturedTokenInfos);
		(generateButtonsData as Mock).mockReturnValue([
			{ buttonValue: 'customValue', buttonText: 'Custom' }
		]);

		render(<WebappFrame dotrainText={fixedLimitFixture} deploymentOption="" />);

		await waitFor(() => {
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});

		const input = screen.getByTestId('input') as HTMLInputElement;
		const button = screen.getByTestId('button-' + 'Custom') as HTMLButtonElement;
		expect(button).toBeInTheDocument();

		await act(async () => {
			await userEvent.type(input, '123');
			await userEvent.click(button);
		});

		await waitFor(() => {
			expect(replaceStateSpy).toHaveBeenCalled();
			expect(replaceStateSpy).toHaveBeenCalledTimes(1);
		});
		// test clicking the back button
		// test clicking custom(if necessary)
		// value should be previous state
	});
});
