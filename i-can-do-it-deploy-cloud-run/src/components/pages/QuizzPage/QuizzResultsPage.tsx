import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { QuerySnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { House, Repeat } from "phosphor-react";
import { ReactNode } from "react";
import { GameRecord } from "../../../models/game";
import { Quizz, QuizzScore } from "../../../models/game/quizz";
import ResourceThumbnailCard from "../../Cards/ResourceThumbnailCard";
import { ChubbsGood } from "../../Chubbs";
import CircularIcon from "../../CircularIcon";
import List, { ListProps } from "../../List";
import UserScore from "../../UserScore";

const Score = ({ correct, total }: { correct: number; total: number }) => (
    <Text
        fontFamily="Sniglet"
        fontSize="5xl"
    >
        <Text
            as="span"
            color="sienna.500"
        >
            {correct}
        </Text>
        <Text
            as="span"
            color="blue"
        >
            /
        </Text>
        <Text
            as="span"
            color="yellow.500"
        >
            {total}
        </Text>
    </Text>
);

const Message = ({ score }: { score: "good" | "average" | "bad" }) => {
    let message: string;
    switch (score) {
        case "bad":
            message = "Tidak apa-apa, kamu bisa belajar dan mencoba lagi nanti!";
            break;
        case "average":
            message = "Keren! Skormu bagus!";
            break;
        case "good":
            message = "Wow! Kamu mendapatkan skor sempurna, keren!";
            break;
    }

    return <Text>{message}</Text>;
};

export interface QuizzResultsPageProps {
    quizzId: string;
    correct: number;
    total: number;
    gameRecords: GameRecord<QuizzScore>[];
    otherGames?: QuerySnapshot<Quizz>;
}

const QuizzResultsPage = ({
    correct,
    gameRecords,
    total,
    otherGames,
    quizzId,
}: QuizzResultsPageProps) => {
    const userScores = gameRecords
        .sort(({ score: { correct: a } }, { score: { correct: b } }) => b - a)
        .map((gameRecord, i) => (
            <UserScore
                key={i}
                avatarHref={gameRecord.picUrl}
                name={gameRecord.name}
                score={gameRecord.score.correct}
            />
        ));

    let messageOption: "good" | "average" | "bad" = "good";
    const scoreThreshold = Math.floor(total / 2);
    if (correct < scoreThreshold) {
        messageOption = "bad";
    } else if (correct >= scoreThreshold && correct !== total) {
        messageOption = "average";
    }

    const router = useRouter();
    const goHome = () => router.push("/");

    let otherGamesCards: ReactNode[];
    if (otherGames) {
        otherGamesCards = otherGames.docs.map((otherGame, i) => {
            const data = otherGame.data();
            return (
                <ResourceThumbnailCard
                    key={i}
                    buttonLabel="Main"
                    imageProps={{ src: data.thumbnail, alt: data.title }}
                    title={data.title}
                    onButtonClick={() =>
                        router.push(`/quizzes/${otherGame.id}/intro`)
                    }
                />
            );
        });
    }

    return (
        <VStack
            w="full"
            spacing="6"
        >
            <VStack
                spacing="0"
                w="full"
            >
                <Text
                    as="h1"
                    textStyle="h1"
                >
                    Hasil Skor!
                </Text>
                <ChubbsGood />
                <Score
                    correct={correct}
                    total={total}
                />
                <Message score={messageOption} />
            </VStack>

            <Center
                w="full"
                maxW="400px"
                px="5"
            >
                <VStack
                    bg="white"
                    border="2px solid black"
                    px="3"
                    spacing="3"
                    py="2"
                    rounded="base"
                    w="full"
                >
                    <Text
                        as="h2"
                        textStyle="h1"
                        fontSize="2rem"
                    >
                        Hasil Skor!
                    </Text>
                    <VStack
                        w="full"
                        spacing="inherit"
                    >
                        {userScores}
                    </VStack>
                </VStack>
            </Center>

            <VStack spacing="4">
                <Button
                    leftIcon={
                        <CircularIcon
                            p="1"
                            icon={() => (
                                <Repeat
                                    weight="fill"
                                    color="black"
                                />
                            )}
                        />
                    }
                    bg="blue.500"
                    onClick={() => router.push(`/quizzes/${quizzId}/intro`)}
                >
                    Main Lagi?
                </Button>
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
                    onClick={goHome}
                >
                    Beranda
                </Button>
            </VStack>

            {otherGames && (
                <List
                    listTitle="Game lainnya"
                    cards={otherGamesCards!}
                />
            )}
        </VStack>
    );
};

export default QuizzResultsPage;
