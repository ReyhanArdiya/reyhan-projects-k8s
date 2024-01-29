import type { Meta, StoryFn } from "@storybook/react";
import MemberCardComp, { MemberCardProps } from ".";

interface Args extends MemberCardProps {}

const meta: Meta<Args> = {
    component: MemberCardComp,
    args: {
        name: "John Doe",
        picUrl: "/PLACEHOLDER.png",
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At felis nibh ullamcorper mi consequat elementum morbi facilisi ultrices. Arcu leo posuere suspendisse viverra viverra. Ridiculus eu eu integer at. Tellus posuere consequat, mauris enim.",
        socials: {
            instagram: "reyhan_roze",
            email: "123@gmail.com",
        },
    },
};

export const MemberCard: StoryFn<Args> = args => <MemberCardComp {...args} />;

export default meta;
