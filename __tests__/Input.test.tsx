import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from '../components/ui/input';

describe('Input component', () => {
	it('renders an input element', () => {
		render(<Input placeholder="Enter text here" />);

		// Check if input is in the document
		const inputElement = screen.getByPlaceholderText('Enter text here');
		expect(inputElement).toBeInTheDocument();
	});

	it('applies given className and other props', () => {
		render(<Input className="custom-class" disabled />);

		// Check if input has custom class
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toHaveClass('custom-class');

		// Check if input is disabled
		expect(inputElement).toBeDisabled();
	});
});
