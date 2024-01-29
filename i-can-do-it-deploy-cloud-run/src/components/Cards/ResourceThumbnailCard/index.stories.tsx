import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import dayjs from "dayjs";
import ResourceThumbnailCardComp, { ResourceThumbnailCardProps } from ".";

interface Args extends ResourceThumbnailCardProps {}

const meta: Meta<Args> = {
    component: ResourceThumbnailCardComp,
    args: {
        author: {
            name: "John Doe",
            picUrl: "https://picsum.photos/id/237/300/300",
        },
        date: dayjs(),
        imageProps: {
            src: "/PLACEHOLDER.png",
            alt: "woof",
        },
        onButtonClick: action("Go to article page"),
        title: "Cara mencuci tangan yang baik dan benar",
        buttonLabel: "Baca",
    },
    parameters: {
        layout: "centered",
    },
};

export const ResourceThumbnailCard: StoryFn<Args> = args => (
    <ResourceThumbnailCardComp {...args} />
);

export default meta;
