import React from 'react';
export interface TextInputProps {
    name: string;
    label: string;
    multiline?: boolean;
    placeholder?: string;
    validate?: (value: string) => string | undefined;
}
export declare const TextInput: React.FC<TextInputProps>;
