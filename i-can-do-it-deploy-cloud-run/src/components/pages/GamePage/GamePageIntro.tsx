import { Button, Text, VStack } from "@chakra-ui/react";
import { ArrowRight } from "phosphor-react";
import { MouseEventHandler } from "react";
import { ChubbsAirplane } from "../../Chubbs";
import CircularIcon from "../../CircularIcon";

export interface GamePageIntroProps {
    title: string;
    description: string;
    onStartGameClick: MouseEventHandler;
}

const GamePageIntro = ({
    description,
    onStartGameClick,
    title,
}: GamePageIntroProps) => {
    return (
        <VStack
            px="8"
            spacing={{ base: "6", lg: "12" }}
            w="full"
            bg="yellow.100"
            align="center"
            justify="center"
            maxW="400px"
        >
            <VStack
                spacing="2"
                w="full"
            >
                <ChubbsAirplane />
                <Text
                    as="h1"
                    textStyle="h1"
                >
                    {title}
                </Text>
                <Text
                    textAlign="left"
                    w="full"
                >
                    {description}
                </Text>
            </VStack>
            <Button
                onClick={onStartGameClick}
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
                Mulai Bermain
            </Button>
        </VStack>
    );
};

export default GamePageIntro;
