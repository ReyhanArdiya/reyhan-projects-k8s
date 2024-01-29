import {
    Editable,
    EditablePreview,
    EditableProps,
    EditableTextarea,
    HStack,
    Icon,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Plus } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import EditQuizzContext from "../../../../context/edit-quizz-context";
import Answers, { AnswersProps } from "./Answers";

export interface QuestionMenuProps extends Pick<AnswersProps, "questionIndex"> {}

const QuestionMenu = ({ questionIndex }: QuestionMenuProps) => {
    const [checkboxIndex, setCheckboxIndex] = useState("0");
    const { body, questionTextUpdated, questionDeleted } =
        useContext(EditQuizzContext);
    const questionItem = body.at(questionIndex);

    useEffect(() => {
        questionItem?.options.some((option, i) => {
            if (option.isCorrect) {
                setCheckboxIndex(`${i}`);
                return true;
            }
        });
    }, [questionItem?.options]);

    if (!questionItem) {
        return null;
    }

    const deleteQuestion = () => questionDeleted(questionIndex);
    const updateQuestionText: EditableProps["onChange"] = value =>
        questionTextUpdated(questionIndex, value);

    return (
        <VStack
            spacing="2"
            p="3"
            bg="sienna.100"
            rounded="base"
            minW="280px"
            border="2px solid black"
        >
            <HStack
                w="full"
                justify="space-between"
            >
                <Text
                    as="h3"
                    textStyle="h3"
                >
                    Pertanyaan {questionIndex + 1}
                </Text>
                <Icon
                    as={Plus}
                    rotate="45deg"
                    transform="auto"
                    fill="black"
                    weight="bold"
                    onClick={deleteQuestion}
                    cursor="pointer"
                />
            </HStack>

            <Editable
                value={questionItem.question}
                w="full"
                minW="full"
                maxW="full"
                onChange={updateQuestionText}
            >
                <EditablePreview w="full" />
                <EditableTextarea w="full" />
            </Editable>

            <Answers
                questionIndex={questionIndex}
                value={checkboxIndex}
                setValue={setCheckboxIndex}
            />
        </VStack>
    );
};

export default QuestionMenu;
