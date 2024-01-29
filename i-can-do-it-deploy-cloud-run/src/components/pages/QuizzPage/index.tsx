import { Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import QuizzContext from "../../../context/quizz-context";
import useIsAuth from "../../../hooks/use-is-auth";
import { Quizz } from "../../../models/game/quizz";
import { saveQuizzGameRecord } from "../../../models/game/quizz/utils";
import { auth, db } from "../../../utils/firebase/get-firebase-client";
import Loading from "../../Progress/Loading";
import QuizzOption from "../../QuizzOption";

export interface QuizzPageProps extends Pick<Quizz, "body"> {
    quizzId: string;
}

const QuizzPage = ({ quizzId, body }: QuizzPageProps) => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const {
        answeredCorrectly,
        correct,
        playerName,
        total,
        playerNameChanged,
        newGameStarted,
    } = useContext(QuizzContext);
    const router = useRouter();
    const isAuth = useIsAuth();

    if (isAuth) {
        playerNameChanged(auth.currentUser!.displayName!);
    }

    const isQuizzFinished = questionNumber >= body.length;

    useEffect(() => {
        newGameStarted(body.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isQuizzFinished) {
        const options = body[questionNumber].options.map((option, i) => {
            const answerQuizz = () => {
                option.isCorrect && answeredCorrectly();

                setQuestionNumber(n => n + 1);
            };

            return (
                <QuizzOption
                    key={i}
                    onClick={answerQuizz}
                >
                    {option.text}
                </QuizzOption>
            );
        });

        return (
            <VStack
                px="5"
                maxW="400px"
                w="full"
                bg="sienna.100"
                spacing="5"
            >
                <VStack
                    w="full"
                    spacing="2"
                >
                    <Text
                        w="full"
                        textAlign="left"
                        as="h1"
                        textStyle="h1"
                    >
                        Pertanyaan {questionNumber + 1}
                    </Text>
                    <Text
                        w="full"
                        textAlign="left"
                    >
                        {body[questionNumber].question}
                    </Text>
                </VStack>
                <VStack
                    w="full"
                    spacing="2.5"
                >
                    {options}
                </VStack>
            </VStack>
        );
    } else {
        const finishQuizz = async () => {
            try {
                await saveQuizzGameRecord(db, quizzId, {
                    name: playerName,
                    picUrl: isAuth ? auth.currentUser!.photoURL! : "",
                    score: {
                        correct,
                        total,
                    },
                });

                router.replace(`/quizzes/${quizzId}/results`);
            } catch (err) {
                console.error(err);
            }
        };

        finishQuizz();

        return <Loading />;
    }
};

export default QuizzPage;
