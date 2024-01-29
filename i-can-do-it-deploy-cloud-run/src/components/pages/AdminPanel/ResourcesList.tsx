import { Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { House } from "phosphor-react";
import AdminPanelResourceCard from "../../Cards/AdminPanelResourceCard";
import CircularIcon from "../../CircularIcon";

export interface ResourcesListProps {}

const ResourcesList = ({}: ResourcesListProps) => {
    const router = useRouter();
    return (
        <VStack
            spacing={{ base: "6", lg: "12" }}
            w="280px"
            mx="auto"
        >
            <VStack
                spacing="4"
                w="full"
            >
                <Text
                    w="full"
                    as="h1"
                    textStyle="h1"
                >
                    Resources
                </Text>

                <AdminPanelResourceCard
                    label="Artikel"
                    imageSrc="https://picsum.photos/300/300"
                    onClick={() => router.push(`${router.pathname}/articles`)}
                />
                <AdminPanelResourceCard
                    label="Game"
                    imageSrc="https://picsum.photos/300/300"
                    onClick={() => router.push(`${router.pathname}/games/quizzes`)}
                />
            </VStack>

            <Button
                leftIcon={
                    <CircularIcon
                        p="1"
                        icon={() => (
                            <House
                                weight="fill"
                                color="black"
                            />
                        )}
                    />
                }
                onClick={() => router.push("/")}
            >
                Beranda
            </Button>
        </VStack>
    );
};

export default ResourcesList;
