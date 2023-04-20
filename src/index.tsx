import React from "react";
import "./i18n";
import "./styles/style.scss";

import { Form, TextInput } from "./components";

const App = () => {
	const handleSubmit = (values: { [key: string]: any }) => {
		console.log('Form submitted with values:', values);
	};

	const validateName = (value: string) => {
		if (!value) {
			return 'Name is required';
		}
		if (value.length < 3) {
			return 'Name must be at least 3 characters long';
		}
	};

	return (
		<div style={{ width: 320, marginLeft: 'auto', marginRight: 'auto', paddingTop: 120 }}>
			<h1>Sample Form</h1>
			<br />
			<br />
			<Form data={{ name: '', email: '' }} onSubmit={handleSubmit}>
				<TextInput name="name" label="Name" validate={validateName} />
				<TextInput name="email" label="Email" />
				<TextInput name="description" label="Description" multiline />
				<br />
				<br />
				<button type="submit">Submit</button>
			</Form>
		</div>
	);
};

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
if (domNode) {
	const root = createRoot(domNode);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
}