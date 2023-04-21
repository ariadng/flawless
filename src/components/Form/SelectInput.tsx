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
		values,
		errors,
		setFieldValue,
		setFieldError,
		touched,
		setTouched,
	} = useFormContext();

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
	};

	const getLabel = (value: string): string => {
		const option = options.find((option) => option.value === value);
		return option ? option.label : value;
	};

	const menuRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(menuRef, handleMenuClose, triggerRef);

	const openMenu = () => {
		setMenuOpen(true);
	};

	return (
		<Input
			name={name}
			label={label}
			placeholder={placeholder}
			validate={validate}
			renderInput={(inputProps) => (
				<div ref={triggerRef}>
					<div className={styles.Value}>
						<input value={getLabel(inputProps.value) || placeholder} onFocus={() => { openMenu() }} readOnly />
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
