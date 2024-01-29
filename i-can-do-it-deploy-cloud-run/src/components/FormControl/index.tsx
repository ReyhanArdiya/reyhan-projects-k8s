import {
    FormErrorMessageProps,
    FormHelperText,
    FormLabelProps,
    HelpTextProps,
    InputProps,
    FormControl as ChakraFormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack,
} from "@chakra-ui/react";

export interface FormControlProps {
    formLabelProps?: FormLabelProps;
    inputProps: InputProps;
    isError?: boolean;
    formErrorMessageProps?: FormErrorMessageProps;
    formHelperTextProps?: HelpTextProps;
}

const FormControl = ({
    inputProps,
    formErrorMessageProps,
    formHelperTextProps,
    formLabelProps,
    isError,
}: FormControlProps) => {
    const formInfo = isError ? (
        <FormErrorMessage
            textStyle="input"
            {...formErrorMessageProps}
        />
    ) : (
        <FormHelperText
            textStyle="input"
            {...formHelperTextProps}
        />
    );

    return (
        <ChakraFormControl
            as={VStack}
            align="start"
            spacing="1"
            isInvalid={isError}
        >
            {formLabelProps && (
                <FormLabel
                    m="0"
                    textStyle="input"
                    {...formLabelProps}
                />
            )}
            <Input
                textStyle="input"
                borderWidth="2px"
                borderColor="black"
                borderStyle="solid"
                rounded="base"
                p="2"
                _placeholder={{ color: "gray.600" }}
                _hover={{
                    borderColor: "yellow.500",
                }}
                bg="white"
                {...inputProps}
            />
            {formInfo}
        </ChakraFormControl>
    );
};

export default FormControl;
