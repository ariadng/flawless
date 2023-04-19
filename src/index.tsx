import React from "react";
import ReactDOM from "react-dom";
import TextInput from './components/Form/TextInput';
import "./i18n";
import { Form } from "./components/Form/Form";

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
		<div>
			<h1>Sample Form</h1>
			<Form initialValues={{ name: '', email: '' }} onSubmit={handleSubmit}>
				<TextInput name="name" label="Name" validate={validateName} />
				<TextInput name="email" label="Email" />
				<button type="submit">Submit</button>
			</Form>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));