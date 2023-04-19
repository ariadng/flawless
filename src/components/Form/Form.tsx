import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

/**
 * Interface representing the data passed through the FormContext.
 */
interface FormContextData {
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
const FormContext = createContext<FormContextData | null>(null);

/**
 * Custom hook to access the FormContext.
 * @throws {Error} If the hook is used outside of a FormProvider.
 * @returns {FormContextData} The FormContext data.
 */
const useFormContext = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error('useFormContext must be used within a FormProvider');
	}
	return context;
};

/**
 * Interface representing the props for the Form component.
 */
interface FormProps {
	initialValues: { [key: string]: any };
	onSubmit: (values: { [key: string]: any }) => void;
	children: React.ReactNode;
}

/**
 * A Form component that manages its fields' state and validation.
 */
const Form: React.FC<FormProps> = ({ initialValues, onSubmit, children }) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

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
		const allTouched = Object.keys(initialValues).reduce((acc, key) => {
			acc[key] = true;
			return acc;
		}, {} as { [key: string]: boolean });

		setTouched(allTouched);
		onSubmit(values);
	};

	// Memoize the context value to prevent unnecessary updates to the context consumers.
	const contextValue = useMemo(
		() => ({ values, errors, touched, setTouched, setFieldValue, setFieldError }),
		[values, errors, touched, setTouched, setFieldValue, setFieldError]
	);

	return (
		<FormContext.Provider value={contextValue}>
			<form onSubmit={handleSubmit}>{children}</form>
		</FormContext.Provider>
	);
};

export { Form, useFormContext };
