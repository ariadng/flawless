import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input } from './Input';
import { Option } from './Menu';
import styles from './styles/SelectInput.module.scss';
import { useFormContext } from './Form';
import { Menu } from './Menu';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface SelectInputProps {
	name: string;
	label: string;
	options: Option[];
	placeholder?: string;
	validate?: (value: string) => string | undefined;
}

const SelectInput: React.FC<SelectInputProps> = ({
	name,
	label,
	options,
	placeholder,
	validate,
}) => {
	const {
		formId,
		values,
		errors,
		setFieldValue,
		setFieldError,
		touched,
		setTouched,
	} = useFormContext();

	const [focused, setFocused] = useState(false);

	const isEmpty = (): boolean => {
		return (
			values[name] === undefined ||
			values[name] === null ||
			String(values[name]).trim() === ''
		);
	};

	const getValue = useCallback((name: string): string => {
		return values[name] === undefined || values[name] === null
			? ''
			: String(values[name]);
	}, [values]);

	const debouncedValidate = useMemo(() => (validate ? validate : null), [
		validate,
	]);

	useEffect(() => {
		if (touched && debouncedValidate) {
			const error = debouncedValidate(values[name]);
			setFieldError(name, error || '');
		}
	}, [name, touched, validate, values, setFieldError]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFieldValue(name, e.target.value);
		setTouched({ ...touched, [name]: true });

		if (validate) {
			const error = validate(e.target.value);
			setFieldError(name, error || '');
		}
	};

	const inputRef = useRef<HTMLInputElement>(null);

	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen((prevOpen) => !prevOpen);
	};

	const inputProps = {
		id: name,
		name,
		value: getValue(name),
		onChange: handleChange,
	};

	const handleMenuClose = () => {
		setMenuOpen(false);
	};

	const handleSelect = (value: string) => {
		setMenuOpen(false);
		setFieldValue(name, value);
		inputRef.current?.focus();
	};

	const getLabel = (value: string): string => {
		const option = options.find((option) => option.value === value);
		return option ? option.label : value;
	};

	const menuRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(menuRef, handleMenuClose, triggerRef);

	const openMenu = () => {
		inputRef.current?.focus();
		setMenuOpen(true);
	};

	const closeMenu = () => {
		setMenuOpen(false);
		inputRef.current?.focus();
	};

	const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
		setFocused(true);
		// openMenu();
	};

	const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
		setFocused(false);
		if (menuOpen) {
			setTimeout(() => {
				closeMenu();
			}, 200);
		}
	};

	return (
		<Input
			ref={triggerRef}
			name={name}
			label={label}
			placeholder={placeholder}
			validate={validate}
			onClick={() => { openMenu() }}
			focused={focused}
			renderInput={(inputProps) => (
				<div>
					<div className={styles.Value}>
						<input ref={inputRef} name={formId + '_' + name} value={getLabel(inputProps.value) || ''} placeholder={placeholder} onFocus={handleInputFocus} onBlur={handleInputBlur} readOnly />
					</div>
					<Menu
						ref={menuRef}
						options={options}
						open={menuOpen}
						onSelect={handleSelect}
					/>
				</div>
			)}
		/>
	);
};

export { SelectInput };
