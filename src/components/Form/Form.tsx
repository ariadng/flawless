import { debounce, isEqual } from 'lodash';
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

/**
 * Interface representing the data passed through the FormContext.
 */
export interface FormContextData {
	formId: string;
	values: { [key: string]: any };
	errors: { [key: string]: string };
	touched: { [key: string]: boolean };
	setTouched: (touched: { [key: string]: boolean }) => void;
	setFieldValue: (field: string, value: any) => void;
	setFieldError: (field: string, error: string) => void;
}

/**
 * The FormContext is used to provide form state and functions to all form components.
 */
export const FormContext = createContext<FormContextData | null>(null);

/**
 * Custom hook to access the FormContext.
 * @throws {Error} If the hook is used outside of a FormProvider.
 * @returns {FormContextData} The FormContext data.
 */
export const useFormContext = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error('useFormContext must be used within a FormProvider');
	}
	return context;
};

/**
 * Interface representing the props for the Form component.
 */
export interface FormProps {
	data: { [key: string]: any };
	onUpdate?: (values: { [key: string]: any }) => void;
	onSubmit: (values: { [key: string]: any }) => void;
	children: React.ReactNode;
}

/**
 * A Form component that manages its fields' state and validation.
 */
export const Form: React.FC<FormProps> = ({ data, onSubmit, onUpdate, children }) => {
	const [values, setValues] = useState(data);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

	const formId = useMemo(() => Math.random().toString(36).substr(2, 9), []);

	const setFieldValue = useCallback((field: string, value: any) => {
		setValues((prevValues) => ({ ...prevValues, [field]: value }));
	}, []);

	const setFieldError = useCallback((field: string, error: string) => {
		setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
	}, []);

	/**
	 * Handles the submit event of the form, marking all fields as touched and calling the onSubmit function.
	 */
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Touch all fields when the form is submitted
		const allTouched = Object.keys(data).reduce((acc, key) => {
			acc[key] = true;
			return acc;
		}, {} as { [key: string]: boolean });

		setTouched(allTouched);
		onSubmit(values);
	};

	const debouncedSetValues = useCallback(
		debounce((newData) => {
			setValues(newData);
		}, 200),
		[]
	);

	// Update values when data change
	useEffect(() => {
		if (!isEqual(values, data)) {
			debouncedSetValues(data);
		}
	}, [data, debouncedSetValues]);

	useEffect(() => {
		if (onUpdate && !isEqual(values, data)) {
			onUpdate(values);
			console.log('values changed')
		}
	}, [values]);

	// Memoize the context value to prevent unnecessary updates to the context consumers.
	const contextValue = useMemo(
		() => ({ formId, values, errors, touched, setTouched, setFieldValue, setFieldError }),
		[values, errors, touched, setTouched, setFieldValue, setFieldError]
	);

	return (
		<FormContext.Provider value={contextValue}>
			<form onSubmit={handleSubmit}>{children}</form>
		</FormContext.Provider>
	);
};