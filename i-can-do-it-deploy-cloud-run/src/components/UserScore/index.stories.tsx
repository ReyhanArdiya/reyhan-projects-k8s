import type { Meta, StoryFn } from "@storybook/react";
import UserScoreComp, { UserScoreProps } from ".";

interface Args extends UserScoreProps {}

const meta: Meta<Args> = {
    component: UserScoreComp,
    args: {
        name: "John Doe",
        avatarHref: "https://picsum.photos/200/300",
        score: 4,
    },
};

export const UserScore: StoryFn<Args> = args => <UserScoreComp {...args} />;

export default meta;
