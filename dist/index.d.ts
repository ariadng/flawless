/// <reference types="react" />
export * from './components';
import * as flawless from './components';
declare const _default: {
    FormContext: import("react").Context<flawless.FormContextData | null>;
    useFormContext: () => flawless.FormContextData;
    Form: import("react").FC<flawless.FormProps>;
    TextInput: import("react").FC<flawless.TextInputProps>;
};
export default _default;
