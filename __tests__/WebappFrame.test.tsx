import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import WebappFrame from '@/app/_components/WebappFrame';
import { Mock, vi } from 'vitest';
import { generateButtonsData } from '@/app/_services/buttonsData';
import { fixturedTokenInfos } from '@/__fixtures__/tokenInfos';
import { fixedLimitFixture } from '@/__fixtures__/fixed-limit';
import { getTokenInfos } from '@/app/_services/getTokenInfo';
import { compress, decompress } from '@/app/_services/compress';
import userEvent from '@testing-library/user-event';
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';
import { useSearchParams } from 'next/navigation';

vi.mock('@/app/_services/parseDotrainFrontmatter', () => ({
	getOrderDetailsGivenDeployment: vi.fn()
}));

vi.mock('wagmi', () => ({
	useAccount: vi.fn(),
	useSwitchChain: vi.fn(),
	useWriteContract: vi.fn(),
	useChainId: vi.fn()
}));

// vi.mock('@/app/_components/FrameImage', () => ({
// 	FrameImage: () => <div />
// }));

vi.mock('@/app/_components/SubmissionModal', () => ({
	SubmissionModal: () => <div />
}));

vi.mock('@/app/_components/CodemirrorModal', () => ({
	CodemirrorModal: () => <div />
}));

vi.mock('next/navigation', async (importActual) => {
	const actual = await importActual();
	return {
		...(actual as object),
		useRouter: vi.fn(),
		useSearchParams: vi.fn()
	};
});

vi.mock('@/app/_services/getTokenInfo', () => ({
	getTokenInfos: vi.fn()
}));

vi.mock('@/app/_services/buttonsData', () => ({
	generateButtonsData: vi.fn()
}));

vi.mock('@/app/_services/compress', () => ({
	compress: vi.fn(),
	decompress: vi.fn()
}));

const mockedStateWithBinding = {
	strategyName: 'Fixed limit',
	strategyDescription: 'Fixed limit order strategy\n',
	currentStep: 'deposit',
	deploymentOption: {
		deployment: 'base-weth-usdc',
		name: 'Buy WETH with USDC on Base.',
		description: 'Buy WETH with USDC for fixed price on Base network.',
		deposits: [
			{
				token: 'base-usdc',
				min: 0,
				presets: [0, 10, 100, 1000, 10000]
			}
		],
		fields: [
			{
				binding: 'fixed-io',
				name: 'WETH price in USDC ($ per ETH)',
				min: 1000
			}
		]
	},
	bindings: {
		'fixed-io': '1234'
	},
	deposits: [],
	buttonPage: 0,
	buttonMax: 10,
	textInputLabel: '',
	error: null,
	isWebapp: true,
	tokenInfos: [
		{
			yamlName: 'base-weth',
			address: '0x4200000000000000000000000000000000000006',
			decimals: 18,
			symbol: 'WETH',
			name: 'Wrapped Ether'
		},
		{
			yamlName: 'base-usdc',
			address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
			decimals: 6,
			symbol: 'USDC',
			name: 'USD Coin'
		},
		{
			yamlName: 'flare-wflr',
			address: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d',
			decimals: 18,
			symbol: 'WFLR',
			name: 'Wrapped Flare'
		},
		{
			yamlName: 'flare-sflr',
			address: '0x12e605bc104e93B45e1aD99F9e555f659051c2BB',
			decimals: 18,
			symbol: 'sFLR',
			name: 'Staked FLR'
		},
		{
			yamlName: 'flare-eusdt',
			address: '0x96B41289D90444B8adD57e6F265DB5aE8651DF29',
			decimals: 6,
			symbol: 'eUSDT',
			name: 'Enosys USDT'
		}
	],
	requiresTokenApproval: false
};

const mockedStateWithoutBinding = {
	strategyName: 'Fixed limit',
	strategyDescription: 'Fixed limit order strategy\n',
	currentStep: 'fields',
	deploymentOption: {
		deployment: 'base-weth-usdc',
		name: 'Buy WETH with USDC on Base.',
		description: 'Buy WETH with USDC for fixed price on Base network.',
		deposits: [[Object]],
		fields: [[Object]]
	},
	bindings: {},
	deposits: [],
	buttonPage: 0,
	buttonMax: 10,
	textInputLabel: '',
	error: null,
	isWebapp: true,
	tokenInfos: [
		{
			yamlName: 'base-weth',
			address: '0x4200000000000000000000000000000000000006',
			decimals: 18,
			symbol: 'WETH',
			name: 'Wrapped Ether'
		},
		{
			yamlName: 'base-usdc',
			address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
			decimals: 6,
			symbol: 'USDC',
			name: 'USD Coin'
		},
		{
			yamlName: 'flare-wflr',
			address: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d',
			decimals: 18,
			symbol: 'WFLR',
			name: 'Wrapped Flare'
		},
		{
			yamlName: 'flare-sflr',
			address: '0x12e605bc104e93B45e1aD99F9e555f659051c2BB',
			decimals: 18,
			symbol: 'sFLR',
			name: 'Staked FLR'
		},
		{
			yamlName: 'flare-eusdt',
			address: '0x96B41289D90444B8adD57e6F265DB5aE8651DF29',
			decimals: 6,
			symbol: 'eUSDT',
			name: 'Enosys USDT'
		}
	],
	requiresTokenApproval: false
};

describe('WebappFrame Component', () => {
	beforeEach(() => {
		vi.resetAllMocks();
		(useAccount as Mock).mockReturnValue({ address: '0x123', chain: { id: 1 } });
		(useSwitchChain as Mock).mockReturnValue({ switchChainAsync: vi.fn() });
		(useWriteContract as Mock).mockReturnValue({ writeContractAsync: vi.fn() });
	});

	it.only('shows input field when only one "Custom" button is present', async () => {
		(useSearchParams as Mock).mockReturnValue({
			get: vi.fn(),
			set: vi.fn()
		});
		(getTokenInfos as Mock).mockResolvedValue(fixturedTokenInfos);
		(generateButtonsData as Mock).mockReturnValue([
			{ buttonValue: 'customValue', buttonText: 'Custom' }
		]);
		render(<WebappFrame dotrainText={fixedLimitFixture} deploymentOption="" />);
		await waitFor(() => {
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});
	});

	it.only('updates the URL with the current state', async () => {
		(useSearchParams as Mock).mockReturnValue({
			get: vi.fn(),
			set: vi.fn()
		});
		const mockCompressedState = 'mockCompressedState';
		(compress as Mock).mockResolvedValue(mockCompressedState);
		const pushStateSpy = vi.spyOn(window.history, 'pushState');

		(getTokenInfos as Mock).mockResolvedValue(fixturedTokenInfos);
		(generateButtonsData as Mock).mockReturnValue([
			{ buttonValue: 'customValue', buttonText: 'Custom' }
		]);

		render(<WebappFrame dotrainText={fixedLimitFixture} deploymentOption="" />);

		await waitFor(() => {
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});

		const input = screen.getByTestId('input') as HTMLInputElement;
		const button = screen.getByTestId('button-' + 'customValue') as HTMLButtonElement;
		expect(button).toBeInTheDocument();

		await userEvent.type(input, '123');
		await userEvent.click(button);

		screen.debug();

		await waitFor(() => {
			expect(pushStateSpy).toHaveBeenCalled();
			expect(pushStateSpy).toHaveBeenCalledTimes(1);
			console.log(pushStateSpy.mock.calls[0]);
		});
		pushStateSpy.mockRestore();
	});

	it.only('updates the URL with the current state when a preset button is clicked', async () => {
		(useSearchParams as Mock).mockReturnValue({
			get: vi.fn(),
			set: vi.fn()
		});
		const mockCompressedState = 'mockCompressedState';

		(compress as Mock).mockResolvedValue(mockCompressedState);
		(getTokenInfos as Mock).mockResolvedValue(fixturedTokenInfos);
		(generateButtonsData as Mock).mockReturnValue([
			{ buttonValue: 'presetValue', buttonText: 'Preset' },
			{ buttonValue: 'presetValue2', buttonText: 'Preset2' }
		]);

		const pushStateSpy = vi.spyOn(window.history, 'pushState');
		render(<WebappFrame dotrainText={fixedLimitFixture} deploymentOption="" />);

		await waitFor(() => {
			expect(screen.getByTestId('button-presetValue')).toBeInTheDocument();
		});

		act(() => {
			const presetButton = screen.getByText('Preset');
			presetButton.click();
		});

		await waitFor(() => {
			expect(pushStateSpy).toHaveBeenCalled();
			expect(pushStateSpy).toHaveBeenCalledTimes(1);
			const url = new URL(window.location.href);
			expect(url.searchParams.get('currentState')).toEqual(mockCompressedState);
		});

		pushStateSpy.mockRestore();
	});

	it.only('renders the correct text input placeholder', async () => {
		(useSearchParams as Mock).mockReturnValue({
			get: vi.fn(),
			set: vi.fn()
		});
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
	it.only('pre-fills form values based on URL state', async () => {
		const mockedReviewState = {
			strategyName: 'Fixed limit',
			strategyDescription: 'Fixed limit order strategy\n',
			currentStep: 'review',
			deploymentOption: {
				deployment: 'base-weth-usdc',
				name: 'Buy WETH with USDC on Base.',
				description: 'Buy WETH with USDC for fixed price on Base network.',
				deposits: [
					{
						token: 'base-usdc',
						min: 0,
						presets: [0, 10, 100, 1000, 10000]
					}
				],
				fields: [
					{
						binding: 'fixed-io',
						name: 'WETH price in USDC ($ per ETH)',
						min: 1000
					}
				]
			},
			bindings: {
				'fixed-io': '1000'
			},
			deposits: [
				{
					tokenInfo: {
						yamlName: 'base-usdc',
						address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
						decimals: 6,
						symbol: 'USDC',
						name: 'USD Coin'
					},
					amount: 1000
				}
			],
			buttonPage: 0,
			buttonMax: 10,
			textInputLabel: '',
			error: null,
			isWebapp: true,
			tokenInfos: [
				{
					yamlName: 'base-weth',
					address: '0x4200000000000000000000000000000000000006',
					decimals: 18,
					symbol: 'WETH',
					name: 'Wrapped Ether'
				},
				{
					yamlName: 'base-usdc',
					address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
					decimals: 6,
					symbol: 'USDC',
					name: 'USD Coin'
				},
				{
					yamlName: 'flare-wflr',
					address: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d',
					decimals: 18,
					symbol: 'WFLR',
					name: 'Wrapped Flare'
				},
				{
					yamlName: 'flare-sflr',
					address: '0x12e605bc104e93B45e1aD99F9e555f659051c2BB',
					decimals: 18,
					symbol: 'sFLR',
					name: 'Staked FLR'
				},
				{
					yamlName: 'flare-eusdt',
					address: '0x96B41289D90444B8adD57e6F265DB5aE8651DF29',
					decimals: 6,
					symbol: 'eUSDT',
					name: 'Enosys USDT'
				}
			],
			requiresTokenApproval: false
		};
		(useSearchParams as Mock).mockReturnValue({
			get: vi.fn(() => 'mockstate'),
			set: vi.fn(() => JSON.stringify(mockedReviewState))
		});
		(decompress as Mock).mockResolvedValue(JSON.stringify(mockedReviewState));

		(getTokenInfos as Mock).mockResolvedValue(fixturedTokenInfos);
		(generateButtonsData as Mock).mockReturnValue([
			{
				buttonTarget: 'buttonValue',
				buttonValue: 'back',
				buttonText: '←'
			},
			{
				buttonTarget: 'buttonValue',
				buttonValue: 'finalSubmit',
				buttonText: 'Deposit tokens and deploy strategy'
			}
		]);
		render(<WebappFrame dotrainText={fixedLimitFixture} deploymentOption="" />);

		await waitFor(() => {
			expect(screen.getByText('Review choices')).toBeInTheDocument();
			expect(screen.queryAllByText('Buy WETH with USDC on Base.')).toHaveLength(2);
			expect(screen.queryAllByText('1000')).toHaveLength(2);
		});
	});
});
