import type { Meta, StoryFn } from "@storybook/react";
import BaseCardComp, { BaseCardProps } from ".";

interface Args extends BaseCardProps {}

const meta: Meta<Args> = {
    component: BaseCardComp,
};

export const BaseCard: StoryFn<Args> = args => <BaseCardComp {...args} />;

export default meta;
