import type { Meta, StoryFn } from "@storybook/react";
import ICanDoItLogoComp, { ICanDoItLogoProps } from ".";

interface Args extends ICanDoItLogoProps {}

const meta: Meta<Args> = {
    component: ICanDoItLogoComp,
    args: {
        noText: false,
    },
};

export const ICanDoItLogo: StoryFn<Args> = args => <ICanDoItLogoComp {...args} />;

export default meta;
