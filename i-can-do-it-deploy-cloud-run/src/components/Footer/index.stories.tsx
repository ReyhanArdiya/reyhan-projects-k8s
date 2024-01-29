import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import FooterComp, { FooterProps } from ".";

interface Args extends FooterProps {}

const meta: Meta<Args> = {
    component: FooterComp,
    parameters: {
        layout: "centered",
    },
    args: {
        emailLink: "mailto:mreyhanapwsw@gmail.com",
        whatsappLink: "wa.me:085161112684",
        iconLink: "/",
    },
};

export const Footer: StoryFn<Args> = args => <FooterComp {...args} />;

export default meta;
