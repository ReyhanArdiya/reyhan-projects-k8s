import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import AdminPanelResourceCardComp, { AdminPanelResourceCardProps } from ".";

interface Args extends AdminPanelResourceCardProps {}

const meta: Meta<Args> = {
    component: AdminPanelResourceCardComp,
    args: {
        label: "Artikel",
        imageSrc: "https://picsum.photos/id/237/300/300",
        onClick: action("Clicked card"),
    },
};

export const AdminPanelResourceCard: StoryFn<Args> = args => (
    <AdminPanelResourceCardComp {...args} />
);

export default meta;
