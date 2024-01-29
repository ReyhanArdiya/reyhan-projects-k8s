import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuizzPage from "../../../components/pages/QuizzPage";
import Loading from "../../../components/Progress/Loading";
import { Quizz } from "../../../models/game/quizz";
import { getQuizz } from "../../../models/game/quizz/utils";
import { db } from "../../../utils/firebase/get-firebase-client";

const Page: NextPage = () => {
    const router = useRouter();
    const { quizzId } = router.query;
    const [quizzData, setQuizzData] = useState<Quizz>();

    useEffect(() => {
        getQuizz(db, quizzId as string)
            .then(d => setQuizzData(d.data()))
            .catch(e => console.error(e));
    }, [quizzId]);

    return quizzData ? (
        <QuizzPage
            body={quizzData.body}
            quizzId={quizzId as string}
        />
    ) : (
        <Loading />
    );
};

export default Page;
