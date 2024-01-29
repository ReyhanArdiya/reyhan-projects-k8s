import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import { useContext, useEffect } from "react";
import QuestionMenuComp, { QuestionMenuProps } from ".";
import EditQuizzContext, {
    EditQuizzContextProvider,
} from "../../../../context/edit-quizz-context";

interface Args extends QuestionMenuProps {}

const meta: Meta<Args> = {
    component: QuestionMenuComp,
    args: {
        questionIndex: 0,
    },
    decorators: [
        Story => (
            <EditQuizzContextProvider>
                <Story />
            </EditQuizzContextProvider>
        ),
    ],
};

export const QuestionMenu: StoryFn<Args> = args => {
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
                        isCorrect: true,
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
                question:
                    "Lorem ipsum dolor sit amet,fjioejfioejfiojioaf ewiofjiwo jfiowejf opweweiofwejfio wjfoiwe fjoiwf jiowjfo iwej Lorem ipsum dolor sit amet,fjioejfioejfiojioaf ewiofjiwo jfiowejf opweweiofwejfio wjfoiwe fjoiwf jiowjfo iwej ",
            },
            {
                options: [
                    {
                        isCorrect: false,
                        text: "Mock answer 6",
                    },
                    {
                        isCorrect: true,
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
    action("Body")(editQuizzCtx.body);

    return <QuestionMenuComp {...args} />;
};

export default meta;
