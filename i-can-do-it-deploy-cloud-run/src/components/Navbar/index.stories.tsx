import type { Meta, StoryFn } from "@storybook/react";
import NavbarComp, { NavbarProps } from ".";

interface Args extends NavbarProps {}

const meta: Meta<Args> = {
    component: NavbarComp,
    args: {
        userAvatarHref: "",
        articleIconHref: "",
        gameIconHref: "",
        logoHref: "",
    },
};

export const Navbar: StoryFn<Args> = args => <NavbarComp {...args} />;

export default meta;
