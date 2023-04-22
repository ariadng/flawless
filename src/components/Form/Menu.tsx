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
	className?: string;
	position?: 'top' | 'bottom';
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
	({ options, open, onSelect, className, position }, ref) => {
		return (
			<div
				className={`${styles.Menu} ${open ? styles.open : styles.closed} ${position ? styles[position] : styles.bottom}`}
				ref={ref}
			>
				{options.map((option) => (
					<div
						key={option.value}
						className={styles.Option}
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();
							onSelect(option.value);
						}}
					>
						{option.label}
					</div>
				))}
			</div>
		);
	},
);

Menu.displayName = 'Menu';
