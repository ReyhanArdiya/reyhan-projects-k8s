import type { Meta, StoryFn } from "@storybook/react";
import EditQuizzModalComp, { EditQuizzModalProps } from ".";

interface Args extends EditQuizzModalProps {}

const meta: Meta<Args> = {
    component: EditQuizzModalComp,
    args: {},
};

export const EditQuizzModal: StoryFn<Args> = args => (
    <EditQuizzModalComp {...args} />
);

export default meta;
