import { Button, Text, VStack } from "@chakra-ui/react";
import { ArrowRight } from "phosphor-react";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { ChubbsConfused } from "../../Chubbs";
import CircularIcon from "../../CircularIcon";
import FormControl from "../../FormControl";

export interface DisplayNamePageProps {
    onButtonClick: MouseEventHandler<HTMLButtonElement>;
    displayName: string;
    onDisplayNameInputChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    buttonLabel: string;
}

const DisplayNamePage = ({
    onButtonClick,
    displayName,
    onDisplayNameInputChange,
    placeholder,
    buttonLabel,
}: DisplayNamePageProps) => {
    return (
        <VStack
            px="8"
            spacing={12}
            w="full"
            bg="blue.100"
            align="center"
            justify="center"
            maxW="400px"
            flexGrow="1"
        >
            <VStack
                spacing="2"
                w="full"
            >
                <ChubbsConfused />
                <Text
                    as="h1"
                    textStyle="h1"
                >
                    Kenalan dulu yuk!
                </Text>
                <Text
                    w="full"
                    textAlign="left"
                >
                    Siapa nih namamu?
                </Text>
                <FormControl
                    inputProps={{
                        value: displayName,
                        placeholder,
                        onChange: onDisplayNameInputChange,
                    }}
                />
            </VStack>

            <Button
                onClick={onButtonClick}
                rightIcon={
                    <CircularIcon
                        p="1"
                        icon={() => (
                            <ArrowRight
                                weight="bold"
                                color="black"
                            />
                        )}
                    />
                }
            >
                {buttonLabel}
            </Button>
        </VStack>
    );
};

export default DisplayNamePage;
