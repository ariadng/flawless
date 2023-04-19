import React, { useEffect } from 'react';
import { useFormContext } from './Form';

/**
 * Interface representing the props for the TextInput component.
 */
interface TextInputProps {
	name: string;
	label: string;
	validate?: (value: string) => string | undefined;
}

/**
 * A TextInput component that integrates with the Form component to manage its state and validation.
 */
const TextInput: React.FC<TextInputProps> = ({ name, label, validate }) => {
	const { values, errors, setFieldValue, setFieldError, touched, setTouched } = useFormContext();

	/**
	 * When the component mounts or updates, check if the input field is touched and
	 * has a validate function, and then set the field error accordingly.
	 */
	useEffect(() => {
		if (touched && validate) {
			const error = validate(values[name]);
			setFieldError(name, error || '');
		}
	}, [name, touched, validate, values, setFieldError]);

	/**
	 * Handles the change event for the input field, updating its value and
	 * marking it as touched.
	 */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFieldValue(name, e.target.value);
		setTouched({ ...touched, [name]: true });
	};

	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input id={name} name={name} value={values[name]} onChange={handleChange} />
			{(touched[name] && errors[name]) && <div>{errors[name]}</div>}
		</div>
	);
};

export { TextInput };
