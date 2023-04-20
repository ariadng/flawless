import React from 'react';
/**
 * Interface representing the props for the TextInput component.
 */
export interface TextInputProps {
    name: string;
    label: string;
    validate?: (value: string) => string | undefined;
    multiline?: boolean;
}
/**
 * A TextInput component that integrates with the Form component to manage its state and validation.
 */
export declare const TextInput: React.FC<TextInputProps>;
