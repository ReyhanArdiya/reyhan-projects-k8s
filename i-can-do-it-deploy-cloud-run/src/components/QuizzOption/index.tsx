import { Text } from "@chakra-ui/react";
import { MouseEventHandler, ReactNode } from "react";

export interface QuizzOptionProps {
    children: ReactNode;
    onClick: MouseEventHandler;
}

const QuizzOption = ({ children, onClick }: QuizzOptionProps) => {
    return (
        <Text
            cursor="pointer"
            w="full"
            as="div"
            onClick={onClick}
            textStyle="input"
            borderWidth="2px"
            borderColor="black"
            borderStyle="solid"
            rounded="base"
            p="2"
            _placeholder={{ color: "gray.600" }}
            _hover={{
                bg: "yellow.500",
            }}
            bg="white"
        >
            {children}
        </Text>
    );
};

export default QuizzOption;
