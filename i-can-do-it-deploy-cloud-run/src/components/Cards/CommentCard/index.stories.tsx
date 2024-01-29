import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import dayjs from "dayjs";
import CommentCardComp, { CommentCardProps } from ".";

interface Args extends CommentCardProps {}

const meta: Meta<Args> = {
    component: CommentCardComp,
    args: {
        author: {
            name: "John Doe",
            picUrl: "/PLACEHOLDER.png",
        },
        comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At felis nibh ullamcorper mi consequat elementum morbi facilisi ultrices. Arcu leo posuere suspendisse viverra viverra. Ridiculus eu eu integer at. Tellus posuere consequat, mauris enim.",
        timestamp: dayjs(),
    },
};

export const CommentCard: StoryFn<Args> = args => <CommentCardComp {...args} />;

export default meta;
