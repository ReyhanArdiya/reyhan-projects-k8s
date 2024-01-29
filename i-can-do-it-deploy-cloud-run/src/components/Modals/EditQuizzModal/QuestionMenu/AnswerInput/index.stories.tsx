import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import AnswerInputComp, { AnswerInputProps } from ".";

interface Args extends AnswerInputProps {}

const meta: Meta<Args> = {
    component: AnswerInputComp,
    args: {
        onChange: ({ target: { value } }) => action("change!")(value),
        isSelected: false,
    },
};

export const AnswerInput: StoryFn<Args> = args => <AnswerInputComp {...args} />;

export default meta;
