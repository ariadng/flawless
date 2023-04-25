import React from 'react';
export interface InputProps {
    name: string;
    label: string;
    placeholder?: string;
    focused?: boolean;
    validate?: (value: string) => string | undefined;
    onClick?: () => void;
    renderInput: (inputProps: any) => React.ReactNode;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLDivElement>>;
export { Input };
