import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import EditArticleModalComp, { EditArticleModalProps } from ".";

interface Args extends EditArticleModalProps {}

const meta: Meta<Args> = {
    component: EditArticleModalComp,
    args: {
        isOpen: true,
        initialData: {
            body: [
                {
                    id: 1,
                    text: "She takes me to a better place",
                    audioFile: new File(["fjeijfe"], "meow.mp4"),
                },
                {
                    id: 2,
                    imageFile: new File(["fjeijfe"], "meow.jpg"),
                },
            ],
            title: "This is a mock article",
            author: {
                name: "John Doe",
            },
            created: new Date(),
            headerVideo: new File(["fjeijfe"], "meow.jpg"),
            thumbnail: new File(["fjeijfe"], "meow.jpg"),
        },
        onCancelClick: action("Canceled"),
        onDeleteIconClick: action("Delete article"),
        onSaveClick: action("Save article"),
    },
};

export const EditArticleModal: StoryFn<Args> = args => (
    <EditArticleModalComp {...args} />
);

export default meta;
