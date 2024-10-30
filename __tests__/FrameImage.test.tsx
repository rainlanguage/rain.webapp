import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { FrameImage } from '@/app/_components/FrameImage';
import { reviewFrameState } from '../__fixtures__/frameStatesFixture';

describe('FrameImage', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should update deployment fields in review page', async () => {
		const setCurrentState = vi.fn();
		render(<FrameImage currentState={reviewFrameState} setCurrentState={setCurrentState} />);
		expect(screen.getByText('1000')).toBeInTheDocument();
		expect(screen.getByText('3000')).toBeInTheDocument();
		expect(screen.getByText('4000')).toBeInTheDocument();

		for (let i = 1; i < 3; i++) {
			fireEvent.click(screen.getAllByTestId('binding-edit-button')[i - 1]);
			expect(screen.getByTestId('binding-input')).toBeInTheDocument();

			fireEvent.change(screen.getByTestId('binding-input'), {
				target: { value: (5000 * i).toString() }
			});
			fireEvent.click(screen.getByTestId('binding-save-button'));

			expect(setCurrentState).toHaveBeenCalledWith({
				...reviewFrameState,
				bindings: { ...reviewFrameState.bindings, [`fixed-io-${i}`]: (5000 * i).toString() }
			});
		}

		fireEvent.click(screen.getByTestId('deposit-edit-button'));
		expect(screen.getByTestId('deposit-input')).toBeInTheDocument();

		fireEvent.change(screen.getByTestId('deposit-input'), {
			target: { value: '10000' }
		});
		fireEvent.click(screen.getByTestId('deposit-save-button'));

		expect(setCurrentState).toHaveBeenCalledWith({
			...reviewFrameState,
			deposits: [{ ...reviewFrameState.deposits[0], amount: 10000 }]
		});
	});
});
