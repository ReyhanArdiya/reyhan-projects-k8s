import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import { useContext, useEffect, useState } from "react";
import AnswersComp, { AnswersProps } from ".";
import EditQuizzContext, {
    EditQuizzContextProvider,
} from "../../../../../context/edit-quizz-context";

interface Args extends AnswersProps {}

const meta: Meta<Args> = {
    component: AnswersComp,
    args: {
        questionIndex: 0,
        value: "0",
    },
    decorators: [
        Story => (
            <EditQuizzContextProvider>
                <Story />
            </EditQuizzContextProvider>
        ),
    ],
};

export const Answers: StoryFn<Args> = args => {
    const editQuizzCtx = useContext(EditQuizzContext);
    useEffect(() => {
        editQuizzCtx.bodyReplaced([
            {
                options: [
                    {
                        isCorrect: false,
                        text: "Mock answer 1",
                    },
                    {
                        isCorrect: false,
                        text: "Mock answer 2",
                    },
                    {
                        isCorrect: false,
                        text: "Mock answer 3",
                    },
                    {
                        isCorrect: false,
                        text: "Mock answer 4",
                    },
                    {
                        isCorrect: false,
                        text: "Mock answer 5",
                    },
                ],
                question: "Lorem ipsum",
            },
            {
                options: [
                    {
                        isCorrect: false,
                        text: "Mock answer 6",
                    },
                    {
                        isCorrect: false,
                        text: "Mock answer 7",
                    },
                    {
                        isCorrect: false,
                        text: "Mock answer 8",
                    },
                    {
                        isCorrect: false,
                        text: "Mock answer 9",
                    },
                    {
                        isCorrect: false,
                        text: "Mock answer 10",
                    },
                ],
                question: "Lorem ipsum",
            },
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [value, setValue] = useState(args.value);

    return (
        <AnswersComp
            {...args}
            value={value}
            setValue={setValue}
        />
    );
};

export default meta;
