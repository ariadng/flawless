import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Form } from '../Form';
import { TextInput } from '../TextInput';

/**
 * Test suite for the TextInput component.
 */
describe('TextInput', () => {
	/**
	 * Test if the TextInput component renders the label and input field correctly.
	 */
	test('renders label and input', () => {
		render(
			<Form initialValues={{ name: '' }} onSubmit={() => { }}>
				<TextInput name="name" label="Name" />
			</Form>,
		);

		expect(screen.getByLabelText('Name')).toBeInTheDocument();
	});

	/**
	 * Test if the TextInput component displays an error message when validation fails.
	 */
	test('displays an error message when validation fails', () => {
		const validate = (value: string) => {
			if (!value) {
				return 'Name is required';
			}
		};

		render(
			<Form initialValues={{ name: '' }} onSubmit={() => { }}>
				<TextInput name="name" label="Name" validate={validate} />
				<button type="submit">Submit</button>
			</Form>,
		);

		fireEvent.click(screen.getByText('Submit')); // Simulate form submission

		expect(screen.getByText('Name is required')).toBeInTheDocument();
	});
});
