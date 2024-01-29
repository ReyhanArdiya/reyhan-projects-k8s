import { DocumentSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import GamePageIntro from "../../../components/pages/GamePage/GamePageIntro";
import Loading from "../../../components/Progress/Loading";
import QuizzContext from "../../../context/quizz-context";
import useGetUser from "../../../hooks/use-get-user";
import { Quizz } from "../../../models/game/quizz";
import { getQuizz } from "../../../models/game/quizz/utils";
import { db } from "../../../utils/firebase/get-firebase-client";

const Page = () => {
    const [quizzData, setQuizzData] = useState<DocumentSnapshot<Quizz>>();
    const router = useRouter();
    const user = useGetUser();
    const { playerNameChanged } = useContext(QuizzContext);
    const { quizzId } = router.query;

    useEffect(() => {
        getQuizz(db, quizzId as string)
            .then(d => setQuizzData(d))
            .catch(e => console.error(e));
    }, [quizzId]);

    useEffect(() => {
        user && user.displayName !== null && playerNameChanged(user.displayName);
    }, [playerNameChanged, user]);

    return quizzData ? (
        <GamePageIntro
            description={quizzData.data()!.description}
            title={quizzData.data()!.title}
            onStartGameClick={() =>
                router.push(
                    user && user.displayName
                        ? `/quizzes/${quizzId}`
                        : `/quizzes/${quizzId}/playername`
                )
            }
        />
    ) : (
        <Loading />
    );
};

export default Page;
