import type { Meta, StoryFn } from "@storybook/react";
import { ArrowRight } from "phosphor-react";
import CircularIconComp, { CircularIconProps } from ".";

interface Args extends CircularIconProps {}

const meta: Meta<Args> = {
    component: CircularIconComp,
    args: {
        icon: ArrowRight,
        fontSize: "20px",
    },
    parameters: {
        background: "dark",
    },
};

export const CircularIcon: StoryFn<Args> = args => <CircularIconComp {...args} />;

export default meta;
