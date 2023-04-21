import React from 'react';
import { Input } from './Input';
import { AutoResizingTextarea } from './AutoResizingTextarea';

export interface TextInputProps {
	name: string;
	label: string;
	multiline?: boolean;
	placeholder?: string;
	validate?: (value: string) => string | undefined;
}

export const TextInput: React.FC<TextInputProps> = React.memo(({ name, label, validate, multiline, placeholder }) => {
	return (
		<Input
			name={name}
			label={label}
			validate={validate}
			renderInput={(inputProps) => multiline ? <AutoResizingTextarea placeholder={placeholder} {...inputProps} /> : <input placeholder={placeholder} {...inputProps} />}
		/>
	);
});
