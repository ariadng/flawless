// Input.tsx
import React, { useCallback, useState, forwardRef, ForwardedRef, useEffect, useRef } from 'react';
import { useFormContext } from './Form';
import inputStyles from './styles/Input.module.scss';
import classNames from 'classnames';

export interface InputProps {
	name: string;
	label: string;
	placeholder?: string;
	focused?: boolean;
	validate?: (value: string) => string | undefined;
	onClick?: () => void;
	renderInput: (inputProps: any) => React.ReactNode;
}

const Input = forwardRef(({ name, label, placeholder, validate, renderInput, onClick, ...props }: InputProps, ref: ForwardedRef<HTMLDivElement>) => {
	const { formId, values, errors, setFieldValue, setFieldError, touched, setTouched } = useFormContext();

	const [focused, setFocused] = useState(props.focused ? props.focused : false);

	const previousValue = useRef<any>(undefined);

	const isEmpty = (): boolean => {
		return values[name] === undefined || values[name] === null || String(values[name]).trim() === '';
	};

	const handleFocus = () => {
		setFocused(true);
	};

	const handleBlur = () => {
		setFocused(false);
	};

	const handleClick = () => {
		if(onClick) onClick();
	};

	const getValue = useCallback((name: string): string => {
		return values[name] === undefined || values[name] === null ? '' : String(values[name]);
	}, [values]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		setFieldValue(name, e.target.value);
		setTouched({ ...touched, [name]: true });
	};

	const handleValidation = useCallback(() => {
		if (values && validate) {
			const error = validate(values[name]);
			setFieldError(name, error || '');
		}
	}, [name, validate, values, setFieldError]);

	useEffect(() => {
		setFocused(props.focused ? props.focused : false);
	}, [props.focused]);

	useEffect(() => {
		if (previousValue.current !== values[name]) setTouched({ ...touched, [name]: true });
		if (validate) handleValidation();
		previousValue.current = values[name];
	}, [values[name], handleValidation]);

	const inputProps = {
		id: name,
		name: formId + '_' + name,
		value: getValue(name),
		onChange: handleChange,
		onFocus: handleFocus,
		onBlur: handleBlur,
	};

	return (
		<div
			ref={ref}
			className={classNames(inputStyles.FormField, { [inputStyles.filled]: !isEmpty(), [inputStyles.focused]: focused, [inputStyles.error]: errors[name] })}
			onClick={handleClick}
		>
			<div className={inputStyles.Field}>
				<div className={inputStyles.Input}>
					<label htmlFor={formId + '_' + name}>{label}</label>
					{renderInput(inputProps)}
				</div>
				<div className={inputStyles.Indicator} />
			</div>
			<div className={inputStyles.SupportingText}>
				{(touched[name] && errors[name]) && <div>{errors[name]}</div>}
			</div>
		</div>
	);
});

Input.displayName = 'Input';

export { Input };
