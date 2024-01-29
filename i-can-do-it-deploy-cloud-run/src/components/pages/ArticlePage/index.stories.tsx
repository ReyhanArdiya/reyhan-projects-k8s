import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import dayjs from "dayjs";
import ArticlePageComp, { ArticlePageProps } from ".";

interface Args extends ArticlePageProps {}

const meta: Meta<Args> = {
    component: ArticlePageComp,
    args: {
        author: {
            name: "John Doe",
            picUrl: "https://picsum.photos/id/237/300/300",
        },
        body: [
            {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra purus aenean varius vulputate vitae. Magnis pretium ultricies nunc sed nulla in.",
                audioSrc:
                    "https://p.scdn.co/mp3-preview/e55954a82350f1f270184e6abfd4ead566cc399f?cid=aecacc7fdd9e447abdf010edeacb571d",
            },
            {
                alt: "img 1",
                src: "https://picsum.photos/id/237/300/300",
                title: "Img 1",
            },
            {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra purus aenean varius vulputate vitae. Magnis pretium ultricies nunc sed nulla in.",
                audioSrc:
                    "https://p.scdn.co/mp3-preview/e55954a82350f1f270184e6abfd4ead566cc399f?cid=aecacc7fdd9e447abdf010edeacb571d",
            },
            {
                alt: "img 1",
                src: "https://picsum.photos/id/237/300/300",
                title: "Img 1",
            },
        ],
        comments: [
            {
                author: {
                    name: "John Doe",
                    picUrl: "https://picsum.photos/id/237/300/300",
                    uid: "123",
                },
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra purus aenean varius vulputate vitae. Magnis pretium ultricies nunc sed nulla in.",
                created: new Date(),
                id: "231",
            },
            {
                author: {
                    name: "John Doe",
                    picUrl: "https://picsum.photos/id/237/300/300",
                    uid: "123",
                },
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra purus aenean varius vulputate vitae. Magnis pretium ultricies nunc sed nulla in.",
                created: new Date(),
                id: "231",
            },
            {
                author: {
                    name: "John Doe",
                    picUrl: "https://picsum.photos/id/237/300/300",
                    uid: "123",
                },
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra purus aenean varius vulputate vitae. Magnis pretium ultricies nunc sed nulla in.",
                created: new Date(),
                id: "231",
            },
        ],
        created: new Date(),
        headerVideoUrl: "123",
        title: "Cara Mencuci Tangan dengan Baik & Benar",
        otherArticles: [
            {
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
            {
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
            {
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
            {
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
            {
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
        ],
    },
    parameters: {
        layout: "fullscreen",
    },
};

export const ArticlePage: StoryFn<Args> = args => <ArticlePageComp {...args} />;

export default meta;
