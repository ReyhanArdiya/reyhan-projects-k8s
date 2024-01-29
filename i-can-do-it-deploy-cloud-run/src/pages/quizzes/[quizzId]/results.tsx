import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import QuizzResultsPage from "../../../components/pages/QuizzPage/QuizzResultsPage";
import Loading from "../../../components/Progress/Loading";
import QuizzContext from "../../../context/quizz-context";
import { Quizz } from "../../../models/game/quizz";
import {
    getQuizz,
    getQuizzes,
    useSnapQuizzes,
} from "../../../models/game/quizz/utils";
import { db } from "../../../utils/firebase/get-firebase-client";

const Page: NextPage = () => {
    const router = useRouter();
    const { quizzId } = router.query;
    const [quizzData, setQuizzData] = useState<Quizz>();
    const [quizzes, setQuizzes] = useState<Awaited<ReturnType<typeof getQuizzes>>>();
    const { correct, total } = useContext(QuizzContext);

    useEffect(() => {
        getQuizz(db, quizzId as string)
            .then(d => setQuizzData(d.data()))
            .catch(e => console.error(e));
    }, [quizzId]);

    useSnapQuizzes(db, quizzes => {
        setQuizzes(quizzes);
    });

    return quizzData ? (
        <QuizzResultsPage
            quizzId={quizzId as string}
            otherGames={quizzes}
            gameRecords={quizzData.gameRecords!}
            correct={correct}
            total={total}
        />
    ) : (
        <Loading />
    );
};

export default Page;
