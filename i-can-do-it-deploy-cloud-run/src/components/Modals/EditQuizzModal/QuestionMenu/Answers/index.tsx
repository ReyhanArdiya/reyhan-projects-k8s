import { Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import EditQuizzContext from "../../../../../context/edit-quizz-context";
import AnswerInput, { AnswerInputProps } from "../AnswerInput";

export interface AnswersProps {
    questionIndex: number;
    value: string;
    setValue: (nextVal: string) => void;
}

const Answers = ({ questionIndex, setValue, value }: AnswersProps) => {
    const editQuizzCtx = useContext(EditQuizzContext);
    const answerInputs = editQuizzCtx.body[questionIndex].options.map((prop, i) => {
        const onChangeHandler: AnswerInputProps["onChange"] = ({
            target: { value },
        }) => {
            editQuizzCtx.answerTextUpdated(questionIndex, i, value);
        };

        return (
            <Radio
                key={i}
                value={`${i}`}
            >
                <AnswerInput
                    value={prop.text}
                    isSelected={prop.isCorrect}
                    onChange={onChangeHandler}
                />
            </Radio>
        );
    });

    const selectInput = (nextVal: string) => {
        editQuizzCtx.correctAnswerChanged(questionIndex, +nextVal);
        setValue(nextVal);
    };

    return (
        <RadioGroup
            onChange={selectInput}
            value={value}
        >
            <VStack
                spacing="2"
                w="full"
            >
                {answerInputs}
            </VStack>
        </RadioGroup>
    );
};

export default Answers;
