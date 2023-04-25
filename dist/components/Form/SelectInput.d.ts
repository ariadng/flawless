import React from 'react';
import { Option } from './Menu';
interface SelectInputProps {
    name: string;
    label: string;
    options: Option[];
    placeholder?: string;
    validate?: (value: string) => string | undefined;
}
declare const SelectInput: React.FC<SelectInputProps>;
export { SelectInput };
