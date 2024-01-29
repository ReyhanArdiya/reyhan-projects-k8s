import { Center } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import dayjs from "dayjs";
import ListComp, { ListProps } from ".";
import ResourceThumbnailCard from "../Cards/ResourceThumbnailCard";

interface Args extends ListProps {}

const meta: Meta<Args> = {
    component: ListComp,
    args: {
        listTitle: "Yuk membaca!",
        cards: [
            <ResourceThumbnailCard
                key="1"
                author={{
                    name: "John Doe",
                    picUrl: "https://picsum.photos/id/237/300/300",
                }}
                date={dayjs()}
                imageProps={{
                    src: "/PLACEHOLDER.png",
                    alt: "woof",
                }}
                title="Cara mencuci tangan yang baik dan benar"
                buttonLabel="Baca"
                onButtonClick={action("Read!")}
            />,
            <ResourceThumbnailCard
                key="2"
                author={{
                    name: "John Doe",
                    picUrl: "https://picsum.photos/id/237/300/300",
                }}
                date={dayjs()}
                imageProps={{
                    src: "/PLACEHOLDER.png",
                    alt: "woof",
                }}
                title="Cara mencuci tangan yang baik dan benar"
                buttonLabel="Baca"
                onButtonClick={action("Read!")}
            />,
            <ResourceThumbnailCard
                key="1"
                author={{
                    name: "John Doe",
                    picUrl: "https://picsum.photos/id/237/300/300",
                }}
                date={dayjs()}
                imageProps={{
                    src: "/PLACEHOLDER.png",
                    alt: "woof",
                }}
                title="Cara mencuci tangan yang baik dan benar"
                buttonLabel="Baca"
                onButtonClick={action("Read!")}
            />,
            <ResourceThumbnailCard
                key="2"
                author={{
                    name: "John Doe",
                    picUrl: "https://picsum.photos/id/237/300/300",
                }}
                date={dayjs()}
                imageProps={{
                    src: "/PLACEHOLDER.png",
                    alt: "woof",
                }}
                title="Cara mencuci tangan yang baik dan benar"
                buttonLabel="Baca"
                onButtonClick={action("Read!")}
            />,
        ],
    },
};

export const List: StoryFn<Args> = args => (
    <Center w="90vw">
        <ListComp {...args} />
    </Center>
);

export default meta;
