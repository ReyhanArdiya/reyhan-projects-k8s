import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import FormControlComp, { FormControlProps } from ".";

interface Args extends FormControlProps {}

const meta: Meta<Args> = {
    component: FormControlComp,
    args: {
        formLabelProps: { children: "Email" },
        inputProps: {
            placeholder: "Email",
            onChange(e) {
                action("Change value")(e.target.value);
            },
        },
        formErrorMessageProps: { children: "Error!" },
        formHelperTextProps: { children: "Helper" },
        isError: false,
    },
};

export const FormControl: StoryFn<Args> = args => <FormControlComp {...args} />;

export default meta;
