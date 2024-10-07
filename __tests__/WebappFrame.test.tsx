import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WebappFrame from '@/app/_components/WebappFrame';
import { Mock, vi } from 'vitest';
import { generateButtonsData } from '@/app/_services/buttonsData';
import { mockFixedLimit } from '@/__mocks__/fixed-limit';
import userEvent from '@testing-library/user-event';

vi.mock('@/app/_services/buttonsData', () => ({
	generateButtonsData: vi.fn()
}));

describe('WebappFrame Component', () => {
	beforeEach(() => {
		vi.resetAllMocks();
		vi.clearAllMocks();
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
	it('shows preset buttons when there are multiple choices', async () => {
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
			expect(screen.getByText('←')).toBeInTheDocument();
			expect(screen.getByText('0 USDC')).toBeInTheDocument();
			expect(screen.getByText('10 USDC')).toBeInTheDocument();
		});

		const customButton = await screen.getByText('Custom');
		await userEvent.click(customButton);

		await waitFor(() => {
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});
	});
});
