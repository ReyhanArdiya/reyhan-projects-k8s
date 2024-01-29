import type { Meta, StoryFn } from "@storybook/react";
import AudibleTextComp, { AudibleTextProps } from ".";

interface Args extends AudibleTextProps {}

const meta: Meta<Args> = {
    component: AudibleTextComp,
    args: {
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra purus aenean varius vulputate vitae. Magnis pretium ultricies nunc sed nulla in.",
        audioUrl:
            "https://p.scdn.co/mp3-preview/e55954a82350f1f270184e6abfd4ead566cc399f?cid=aecacc7fdd9e447abdf010edeacb571d",
    },
};

export const AudibleText: StoryFn<Args> = args => <AudibleTextComp {...args} />;

export default meta;
