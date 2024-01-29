import { Stack, StackItem, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Quizz } from "../../../models/game/quizz";
import { WithId } from "../../../utils/types";
import ResourceThumbnailCard from "../../Cards/ResourceThumbnailCard";
import { ChubbsDribble } from "../../Chubbs";
import List from "../../List";
import Section from "./Section";

const GamesSectionIntro = () => (
    <Stack
        align="center"
        as="header"
        direction={{ base: "column", lg: "row-reverse" }}
        justify="center"
        maxW="620px"
        px="5"
        spacing="2"
        id="games"
    >
        <ChubbsDribble alignSelf={{ base: "end", lg: "center" }} />
        <VStack spacing="2">
            <Text
                as="h2"
                textStyle="h2"
                textAlign={"left"}
                w="full"
            >
                Bosan membaca?
            </Text>
            <Text>
                Bosan membaca terus setiap hari? Kami menyediakan kamu dengan
                berbagai macam game yang tentunya asik, yuk coba salah satu!
            </Text>
        </VStack>
    </Stack>
);

export interface GamesSectionProps {
    quizzes: WithId<Quizz>[];
}

const GamesSection = ({ quizzes }: GamesSectionProps) => {
    const router = useRouter();
    const quizzCards = quizzes.map(quizz => (
        <ResourceThumbnailCard
            key={quizz.id}
            buttonLabel="Main"
            imageProps={{ src: quizz.thumbnail, alt: quizz.title }}
            title={quizz.title}
            onButtonClick={() => router.push(`/quizzes/${quizz.id}/intro`)}
        />
    ));

    return (
        <Section
            bg="sienna.100"
            flexDirection="column"
            h={{ base: "max", lg: "100vh" }}
        >
            <GamesSectionIntro />
            <List
                cards={quizzCards}
                listTitle="Yuk bermain!"
            />
        </Section>
    );
};

export default GamesSection;
