import React from "react";
import "./i18n";
import "./styles/style.scss";

import { Form, SelectInput, TextInput } from "./components";

const App = () => {

	const [data, setData] = React.useState<{ [key: string]: any }>({});

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
		<div style={{ display: 'flex' }}>
			<div style={{ width: 320, marginLeft: 'auto', marginRight: 'auto', paddingTop: 120 }}>
				<h1>Sample Form</h1>
				<br />
				<br />
				<Form data={data} onSubmit={handleSubmit} onUpdate={(updated) => setData(updated)}>
					<TextInput name="name" label="Name" validate={validateName} placeholder="Enter your full name..." />
					<TextInput name="email" label="Email" placeholder="Enter your email address..." />
					<SelectInput name="gender" label="Gender" placeholder="Select a gender..." options={[
						{ label: "Male", value: "male" },
						{ label: "Female", value: "female" },
					]} />
					<TextInput name="description" label="Description" placeholder="Enter description..." multiline />
					<br />
					<br />
					<button type="submit">Submit</button>
				</Form>
			</div>
			<div style={{ width: 320, marginLeft: 'auto', marginRight: 'auto', paddingTop: 120 }}>
				<h1>Sample Form</h1>
				<br />
				<br />
				<Form data={data} onSubmit={handleSubmit} onUpdate={(updated) => setData(updated) }>
					<TextInput name="name" label="Name" validate={validateName} placeholder="Enter your full name..." />
					<TextInput name="email" label="Email" placeholder="Enter your email address..." />
					<SelectInput name="gender" label="Gender" placeholder="Select a gender..." options={[
						{ label: "Male", value: "male" },
						{ label: "Female", value: "female" },
					]} />
					<TextInput name="description" label="Description" placeholder="Enter description..." multiline />
					<br />
					<br />
					<button type="submit">Submit</button>
				</Form>
			</div>
			<div style={{ width: 320, marginLeft: 'auto', marginRight: 'auto', paddingTop: 120 }}>
				<h1>Sample Form</h1>
				<br />
				<br />
				<Form data={data} onSubmit={handleSubmit} onUpdate={(updated) => setData(updated)}>
					<TextInput name="name" label="Name" validate={validateName} placeholder="Enter your full name..." />
					<TextInput name="email" label="Email" placeholder="Enter your email address..." />
					<SelectInput name="gender" label="Gender" placeholder="Select a gender..." options={[
						{ label: "Male", value: "male" },
						{ label: "Female", value: "female" },
					]} />
					<TextInput name="description" label="Description" placeholder="Enter description..." multiline />
					<br />
					<br />
					<button type="submit">Submit</button>
				</Form>
			</div>
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