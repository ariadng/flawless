import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	en: {
		translation: {
			// English translations go here
		},
	},
	es: {
		translation: {
			// Spanish translations go here
		},
	},
	// Add more languages here
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	keySeparator: false,
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
