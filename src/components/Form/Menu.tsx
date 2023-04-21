// Menu.tsx
import React, { forwardRef } from 'react';
import styles from './styles/Menu.module.scss';

export interface Option {
	value: string;
	label: string;
}

interface MenuProps {
	options: Option[];
	open: boolean;
	onSelect: (value: string) => void;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
	({ options, open, onSelect }, ref) => {
		if (!open) {
			return null;
		}

		return (
			<div className={styles.Menu} ref={ref}>
				{options.map((option) => (
					<div
						key={option.value}
						className={styles.Option}
						onClick={(event) => { event.preventDefault(); event.stopPropagation(); onSelect(option.value); }}
					>
						{option.label}
					</div>
				))}
			</div>
		);
	},
);

Menu.displayName = 'Menu';
