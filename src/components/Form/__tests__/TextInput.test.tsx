import React from 'react';
import userEvent from '@testing-library/user-event';
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

	test('correctly handles the value 0', () => {
		render(
			<Form initialValues={{ number: 0 }} onSubmit={() => { }}>
				<TextInput name="number" label="Number" />
			</Form>,
		);

		expect(screen.getByLabelText('Number')).toHaveValue('0');
	});

	test('handles empty string value', () => {
		render(
			<Form initialValues={{ name: '' }} onSubmit={() => { }}>
				<TextInput name="name" label="Name" />
			</Form>,
		);

		const input = screen.getByLabelText('Name');
		expect(input).toHaveValue('');

		userEvent.type(input, 'John');
		expect(input).toHaveValue('John');

		userEvent.clear(input);
		expect(input).toHaveValue('');
	});

	test('handles null value', () => {
		render(
			<Form initialValues={{ name: null }} onSubmit={() => { }}>
				<TextInput name="name" label="Name" />
			</Form>,
		);

		const input = screen.getByLabelText('Name');
		expect(input).toHaveValue('');
	});

	test('renders textarea when multiline prop is set to true', () => {
		render(
			<Form initialValues={{ description: '' }} onSubmit={() => { }}>
				<TextInput name="description" label="Description" multiline />
			</Form>,
		);

		expect(screen.getByLabelText('Description')).toBeInTheDocument();
		expect(screen.getByLabelText('Description').tagName).toBe('TEXTAREA');
	});

	
	
});
