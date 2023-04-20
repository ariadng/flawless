import React from 'react';
/**
 * Interface representing the data passed through the FormContext.
 */
export interface FormContextData {
    values: {
        [key: string]: any;
    };
    errors: {
        [key: string]: string;
    };
    touched: {
        [key: string]: boolean;
    };
    setTouched: (touched: {
        [key: string]: boolean;
    }) => void;
    setFieldValue: (field: string, value: any) => void;
    setFieldError: (field: string, error: string) => void;
}
/**
 * The FormContext is used to provide form state and functions to all form components.
 */
export declare const FormContext: React.Context<FormContextData | null>;
/**
 * Custom hook to access the FormContext.
 * @throws {Error} If the hook is used outside of a FormProvider.
 * @returns {FormContextData} The FormContext data.
 */
export declare const useFormContext: () => FormContextData;
/**
 * Interface representing the props for the Form component.
 */
export interface FormProps {
    data: {
        [key: string]: any;
    };
    onSubmit: (values: {
        [key: string]: any;
    }) => void;
    children: React.ReactNode;
}
/**
 * A Form component that manages its fields' state and validation.
 */
export declare const Form: React.FC<FormProps>;
