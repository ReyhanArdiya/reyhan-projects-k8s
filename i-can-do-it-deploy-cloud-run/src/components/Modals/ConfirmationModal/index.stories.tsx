import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import ConfirmationModalComp, { ConfirmationModalProps } from ".";

interface Args extends ConfirmationModalProps {}

const meta: Meta<Args> = {
    component: ConfirmationModalComp,
    args: {
        modalText: "Apakah kamu ingin keluar dari akun ini?",
        modalProps: {
            isOpen: true,
            onClose: action("close!"),
        },
    },
};

export const ConfirmationModal: StoryFn<Args> = args => (
    <ConfirmationModalComp {...args} />
);

export default meta;
