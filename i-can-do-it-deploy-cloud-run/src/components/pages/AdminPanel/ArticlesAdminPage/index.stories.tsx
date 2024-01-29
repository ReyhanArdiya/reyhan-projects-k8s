import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import ArticlesAdminPageComp, { ArticlesAdminPageProps } from ".";

interface Args extends ArticlesAdminPageProps {}

const meta: Meta<Args> = {
    component: ArticlesAdminPageComp,
    args: {
        onGoBackButtonClick: action("Go back"),
        articles: [
            {
                author: {
                    name: "John Doe",
                    picUrl: "123",
                },
                body: [
                    {
                        text: "Lorem Ipsum",
                        audioSrc: "123",
                    },
                ],
                created: new Date(),
                id: "123",
                title: "Mock article",
                thumbnail: "123",
                headerVideoUrl: "123",
            },
            {
                author: {
                    name: "John Doe",
                    picUrl: "123",
                },
                body: [
                    {
                        text: "Lorem Ipsum",
                        audioSrc: "123",
                    },
                ],
                created: new Date(),
                id: "123",
                title: "Mock article",
                thumbnail: "123",
                headerVideoUrl: "123",
            },
            {
                author: {
                    name: "John Doe",
                    picUrl: "123",
                },
                body: [
                    {
                        text: "Lorem Ipsum",
                        audioSrc: "123",
                    },
                ],
                created: new Date(),
                id: "123",
                title: "Mock article",
                thumbnail: "123",
                headerVideoUrl: "123",
            },
        ],
    },
    parameters: {
        layout: "fullscreen",
    },
};

export const ArticlesAdminPage: StoryFn<Args> = args => (
    <ArticlesAdminPageComp {...args} />
);

export default meta;
