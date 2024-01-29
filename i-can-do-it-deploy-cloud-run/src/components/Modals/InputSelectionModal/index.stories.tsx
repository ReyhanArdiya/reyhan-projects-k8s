import { Button } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import { Article, ImageSquare } from "phosphor-react";
import InputSelectionModalComp, { InputSelectionModalProps } from ".";

interface Args extends InputSelectionModalProps {}

const meta: Meta<Args> = {
    component: InputSelectionModalComp,
    args: {
        isOpen: true,
        onClose: action("Close modal"),
        title: "Title",
    },
    parameters: {
        docs: {
            inlineStories: false,
            iframeHeight: 500,
        },
    },
};

export const Default: StoryFn<Args> = args => <InputSelectionModalComp {...args} />;

export const ArticleInputSelectionModal: StoryFn<Args> = args => (
    <InputSelectionModalComp
        {...args}
        title="Pilih Input"
    >
        <Button
            leftIcon={<Article weight="fill" />}
            w="full"
            onClick={action("Add paragraph input")}
        >
            Paragraf
        </Button>
        <Button
            leftIcon={<ImageSquare weight="fill" />}
            w="full"
            onClick={action("Add picture input")}
        >
            Gambar
        </Button>
    </InputSelectionModalComp>
);

export const GameInputSelectionModal: StoryFn<Args> = args => (
    <InputSelectionModalComp
        {...args}
        title="Pilih Input"
    >
        <Button
            leftIcon={<Article weight="fill" />}
            w="full"
            onClick={action("Add paragraph input")}
        >
            Quizz
        </Button>
    </InputSelectionModalComp>
);

export default meta;
