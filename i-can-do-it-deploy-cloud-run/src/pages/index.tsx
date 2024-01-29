import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import HomePage, { HomePageProps } from "../components/pages/HomePage";
import { useSnapArticles } from "../models/article/utils";
import { useSnapQuizzes } from "../models/game/quizz/utils";
import { useSnapMembers } from "../models/member/utils";
import { CookieKeys } from "../utils/cookies";
import { db } from "../utils/firebase/get-firebase-client";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const firebaseToken = req.cookies[CookieKeys.FIREBASE_TOKEN];
    const isAuth = !!firebaseToken;
    const visited = req.cookies[CookieKeys.VISITED] === "true";

    return !isAuth && !visited
        ? {
              props: {},
              redirect: {
                  destination: "/intro",
              },
          }
        : { props: {} };
};

const Page: NextPage = () => {
    const [articles, setArticles] = useState<HomePageProps["articles"]>();
    useSnapArticles(db, articles => {
        setArticles(
            articles.docs.map(article => ({
                id: article.id,
                ...article.data(),
            }))
        );
    });

    const [quizzes, setQuizzes] = useState<HomePageProps["quizzes"]>();
    useSnapQuizzes(db, quizzes => {
        setQuizzes(
            quizzes.docs.map(quizz => ({
                id: quizz.id,
                ...quizz.data(),
            }))
        );
    });

    const [members, setMembers] = useState<HomePageProps["members"]>();
    useSnapMembers(db, members =>
        setMembers(members.docs.map(member => member.data()))
    );

    return (
        <HomePage
            articles={articles}
            quizzes={quizzes}
            members={members}
        />
    );
};

export default Page;
