import React, { useRef, useEffect } from 'react';

interface AutoResizingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const AutoResizingTextarea: React.FC<AutoResizingTextareaProps> = ({ ...props }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'inherit';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [props.value]);

	return (
		<textarea
			rows={2}
			{...props}
			ref={textareaRef}
			style={{ ...props.style, overflow: 'hidden', resize: 'none' }}
		/>
	);
};

export { AutoResizingTextarea };
