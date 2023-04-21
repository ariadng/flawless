// Input.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext } from './Form';
import inputStyles from './styles/Input.module.scss';
import classNames from 'classnames';

export interface InputProps {
	name: string;
	label: string;
	placeholder?: string;
	validate?: (value: string) => string | undefined;
	renderInput: (inputProps: any) => React.ReactNode;
}

const Input: React.FC<InputProps> = ({ name, label, placeholder, validate, renderInput }) => {
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		setFieldValue(name, e.target.value);
		setTouched({ ...touched, [name]: true });

		if (validate) {
			const error = validate(e.target.value);
			setFieldError(name, error || '');
		}
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
		<div className={classNames(inputStyles.FormField, { [inputStyles.filled]: !isEmpty(), [inputStyles.focused]: focused, [inputStyles.error]: errors[name] })}>
			<div className={inputStyles.Field}>
				<div className={inputStyles.Input}>
					<label htmlFor={name}>{label}</label>
					{renderInput(inputProps)}
				</div>
				<div className={inputStyles.Indicator} />
			</div>
			<div className={inputStyles.SupportingText}>
				{(touched[name] && errors[name]) && <div>{errors[name]}</div>}
			</div>
    </div >
  );
};

export { Input };
