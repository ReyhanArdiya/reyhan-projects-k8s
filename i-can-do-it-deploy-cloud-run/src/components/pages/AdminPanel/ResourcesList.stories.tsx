import type { Meta, StoryFn } from "@storybook/react";
import ResourcesListComp, { ResourcesListProps } from "./ResourcesList";

interface Args extends ResourcesListProps {}

const meta: Meta<Args> = {
    component: ResourcesListComp,
    args: {},
    parameters: {
        layout: "fullscreen",
    },
};

export const ResourcesList: StoryFn<Args> = args => <ResourcesListComp {...args} />;

export default meta;
