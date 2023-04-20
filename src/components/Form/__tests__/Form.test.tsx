import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Form } from '../Form';
import { TextInput } from '../TextInput';
describe('Form', () => {
	test('submits form with correct values', () => {
		const handleSubmit = jest.fn();

		render(
			<Form data={{ name: '', email: '' }} onSubmit={handleSubmit}>
				<TextInput name="name" label="Name" />
				<TextInput name="email" label="Email" />
				<button type="submit">Submit</button>
			</Form>,
		);

		fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
		fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
		fireEvent.click(screen.getByText('Submit'));

		expect(handleSubmit).toHaveBeenCalledTimes(1);
		expect(handleSubmit).toHaveBeenCalledWith({ name: 'John Doe', email: 'john.doe@example.com' });
	});
});
