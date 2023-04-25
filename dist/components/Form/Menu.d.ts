import React from 'react';
export interface Option {
    value: string;
    label: string;
}
interface MenuProps {
    options: Option[];
    open: boolean;
    onSelect: (value: string) => void;
    className?: string;
    position?: 'top' | 'bottom';
}
export declare const Menu: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLDivElement>>;
export {};
