import React, { useEffect, useState } from 'react';
import { useFormContext } from './Form';
import styles from './styles/TextInput.module.scss';
import classNames from 'classnames';


/**
 * Interface representing the props for the TextInput component.
 */
interface TextInputProps {
	name: string;
	label: string;
	validate?: (value: string) => string | undefined;
	multiline?: boolean;
}

/**
 * A TextInput component that integrates with the Form component to manage its state and validation.
 */
const TextInput: React.FC<TextInputProps> = ({ name, label, validate, multiline }) => {
	const { values, errors, setFieldValue, setFieldError, touched, setTouched } = useFormContext();

	const [focused, setFocused] = useState(false);

	const isEmpty = (): boolean => {
		return values[name] === undefined || values[name] === null || String(values[name]).trim() === '';
	};

	const handleFocus = () => {
		setFocused(true);
	};

	const handleBlur = () => {
		setFocused(false);
	};

	const getValue = (): string => {
		return values[name] === undefined || values[name] === null ? '' : String(values[name]).trim();
	};

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
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFieldValue(name, e.target.value);
		setTouched({ ...touched, [name]: true });
	};

	const inputProps = {
		id: name,
		name,
		value: getValue(),
		onChange: handleChange,
		onFocus: handleFocus,
        onBlur: handleBlur,
	};

	return (
		<div className={classNames(styles.TextInput, { [styles.filled]: !isEmpty(), [styles.focused]: focused, [styles.error]: errors[name] })}>
			<div className={styles.Field}>
				<div className={styles.Input}>
					<label htmlFor={name}>{label}</label>
					{multiline ? (
						<textarea {...inputProps} />
					) : (
						<input {...inputProps} />
					)}
				</div>
				<div className={styles.Indicator} />
			</div>
			<div className={styles.SupportingText}>
				{(touched[name] && errors[name]) && <div>{errors[name]}</div>}
			</div>
		</div>
	);
};

export { TextInput };
