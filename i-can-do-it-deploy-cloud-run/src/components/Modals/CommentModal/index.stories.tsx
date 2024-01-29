import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import CommentModalComp, { CommentModalProps } from ".";

interface Args extends CommentModalProps {}

const meta: Meta<Args> = {
    component: CommentModalComp,
    args: {
        body: "Lorem ipsum dolor sit amet,fjioejfioejfiojioaf ewiofjiwo jfiowejf opweweiofwejfio wjfoiwe fjoiwf jiowjfo iwej Lorem ipsum dolor sit amet,fjioejfioejfiojioaf ewiofjiwo jfiowejf opweweiofwejfio wjfoiwe fjoiwf jiowjfo iwej ",
        onSaveClick: action("Save Comment"),
        onCancelClick: action("Cancel edit"),
        onUpdateBody: action("Update body"),
        isOpen: true,
    },
};

export const CommentModal: StoryFn<Args> = args => <CommentModalComp {...args} />;

export default meta;
