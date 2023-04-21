// useOnClickOutside.ts
import { RefObject, useEffect } from 'react';

export const useOnClickOutside = (
	ref: RefObject<HTMLElement>,
	handler: () => void,
	triggerRef?: RefObject<HTMLElement>
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (
				ref.current &&
				!ref.current.contains(target) &&
				(!triggerRef || !triggerRef.current || !triggerRef.current.contains(target))
			) {
				handler();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, handler, triggerRef]);
};
