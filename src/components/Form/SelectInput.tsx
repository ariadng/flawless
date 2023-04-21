import React from 'react';
import { Input } from './Input';
import styles from './styles/SelectInput.module.scss';

interface Option {
	value: string;
	label: string;
}

interface SelectInputProps {
	name: string;
	label: string;
	options: Option[];
	placeholder?: string;
	validate?: (value: string) => string | undefined;
}

const SelectInput: React.FC<SelectInputProps> = ({ name, label, options, placeholder, validate }) => {
	return (
		<Input
			name={name}
			label={label}
			placeholder={placeholder}
			validate={validate}
			renderInput={(inputProps) => (
				<select className={styles.SelectInput} {...inputProps}>
					<option value="">Select...</option>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			)}
		/>
	);
};

export { SelectInput };
