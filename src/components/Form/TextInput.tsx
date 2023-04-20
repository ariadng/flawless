import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from './Form';
import styles from './styles/TextInput.module.scss';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { AutoResizingTextarea } from './AutoResizingTextarea';


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
const TextInput: React.FC<TextInputProps> = React.memo(({ name, label, validate, multiline }) => {
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

	const getValue = useCallback((name: string): string => {
		return values[name] === undefined || values[name] === null ? '' : String(values[name]);
	}, [values]);

	
	const debouncedValidate = useMemo(() => validate ? validate : null, [validate]);

	/**
	 * When the component mounts or updates, check if the input field is touched and
	 * has a validate function, and then set the field error accordingly.
	 */
	useEffect(() => {
		if (touched && debouncedValidate) {
			const error = debouncedValidate(values[name]);
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
		value: getValue(name),
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
						<AutoResizingTextarea {...inputProps} />
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
});

export { TextInput };
