import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from '../Form';
import { TextInput } from '../TextInput';

const NUM_UPDATES = 1000;

const initialValues = { input0: '' };

const onSubmit = jest.fn();

test('Form performance with a single TextInput updated multiple times', async () => {
	render(
		<Form data={initialValues} onSubmit={onSubmit}>
			<TextInput name="input0" label="Input input0" />
		</Form>,
	);

	const input = screen.getByLabelText('Input input0');
	const startTime = performance.now();

	for (let i = 0; i < NUM_UPDATES; i++) {
		fireEvent.change(input, { target: { value: `Test ${i}` } });
	}

	const endTime = performance.now();
	const elapsedTime = endTime - startTime;

	console.log(`Time taken to update input ${NUM_UPDATES} times: ${elapsedTime} ms`);

	// You can set a threshold here for how long the updates should take
	const MAX_TIME = 1000; // in milliseconds
	expect(elapsedTime).toBeLessThanOrEqual(MAX_TIME);
});
