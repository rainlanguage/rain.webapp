import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodemirrorModal } from '@/app/_components/CodemirrorModal';
import { Mock, vi } from 'vitest';
import { getOrderDetailsGivenDeployment } from '@/app/_services/parseDotrainFrontmatter';

vi.mock('@rainlanguage/orderbook/common', () => ({
	DotrainOrder: {
		create: vi.fn().mockResolvedValue({
			composeDeploymentToRainlang: vi.fn().mockResolvedValue('Mocked Rainlang Output')
		})
	}
}));

vi.mock('@/app/_services/parseDotrainFrontmatter', () => {
	return {
		getOrderDetailsGivenDeployment: vi.fn()
	};
});

const mockYamlData = {} as any;
const mockCurrentState = {
	deploymentOption: { deployment: 'base-weth-usdc' },
	bindings: {
		'fixed-io': '1'
	}
} as any;
const mockDotrainText = 'Sample dotrain text';
const mockSetError = vi.fn();

describe('CodemirrorModal', () => {
	beforeAll(() => {
		(getOrderDetailsGivenDeployment as Mock).mockReturnValue({
			scenario: {
				runs: 1,
				bindings: {
					'fixed-io-output-token': '0x12e605bc104e93B45e1aD99F9e555f659051c2BB',
					'fixed-io': '1'
				}
			}
		});
	});
	it('composes and displays Rainlang text correctly', async () => {
		render(
			<CodemirrorModal
				yamlData={mockYamlData}
				currentState={mockCurrentState}
				dotrainText={mockDotrainText}
				setError={mockSetError}
			/>
		);

		await userEvent.click(screen.getByText(/show rainlang/i));

		await waitFor(() => {
			expect(screen.getByText('Mocked Rainlang Output')).toBeInTheDocument();
		});
	});

	it('closes the modal when close button is clicked', async () => {
		render(
			<CodemirrorModal
				yamlData={mockYamlData}
				currentState={mockCurrentState}
				dotrainText={mockDotrainText}
				setError={mockSetError}
			/>
		);

		await userEvent.click(screen.getByText(/show rainlang/i));
		expect(screen.getByText(/generated rainlang/i)).toBeInTheDocument();

		await userEvent.click(screen.getByRole('button', { name: /close/i }));
		await waitFor(() => {
			expect(screen.queryByText(/generated rainlang/i)).not.toBeInTheDocument();
		});
	});
});
