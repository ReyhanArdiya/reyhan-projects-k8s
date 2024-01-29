import type { Meta, StoryFn } from "@storybook/react";
import HelpMenuComp, { HelpMenuProps } from ".";
import { action } from "@storybook/addon-actions";

interface Args extends HelpMenuProps {}

const meta: Meta<Args> = {
    component: HelpMenuComp,
    parameters: {
        layout: "centered",
    },
    args: {
        onTextClick: action("Clicked Help!"),
    },
};

export const HelpMenu: StoryFn<Args> = args => <HelpMenuComp {...args} />;

export default meta;
