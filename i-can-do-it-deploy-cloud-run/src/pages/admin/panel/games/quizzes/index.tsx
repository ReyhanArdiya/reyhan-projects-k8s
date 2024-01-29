import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import QuizzAdminPage, {
    QuizzAdminPageProps,
} from "../../../../../components/pages/AdminPanel/QuizzAdminPage";
import Loading from "../../../../../components/Progress/Loading";
import { useSnapQuizzes } from "../../../../../models/game/quizz/utils";
import { db } from "../../../../../utils/firebase/get-firebase-client";
import { redirectIfNotAdmin } from "../../../../../utils/redirect";

export const getServerSideProps: GetServerSideProps = redirectIfNotAdmin("/");

const Page = () => {
    const [quizzes, setQuizzes] = useState<QuizzAdminPageProps["quizzes"]>();
    useSnapQuizzes(db, quizzes => {
        setQuizzes(
            quizzes.docs.map(quizz => ({
                id: quizz.id,
                ...quizz.data(),
            }))
        );
    });

    const router = useRouter();
    const goBack = async () => {
        router.push("/admin/panel");
    };

    return quizzes?.length ? (
        <QuizzAdminPage
            onGoBackButtonClick={goBack}
            quizzes={quizzes}
        />
    ) : (
        <Loading />
    );
};

export default Page;
