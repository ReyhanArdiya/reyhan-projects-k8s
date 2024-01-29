import { ChangeEventHandler } from "react";
import FormControl from "../../../../FormControl";

export interface AnswerInputProps {
    value?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    isSelected?: boolean;
}

const AnswerInput = ({ onChange, value, isSelected }: AnswerInputProps) => {
    return (
        <FormControl
            inputProps={{
                placeholder: "Jawaban",
                value,
                onChange,
                bg: isSelected ? "yellow.300" : "white",
            }}
        />
    );
};

export default AnswerInput;
