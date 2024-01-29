import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ArticlesAdminPage, {
    ArticlesAdminPageProps,
} from "../../../../components/pages/AdminPanel/ArticlesAdminPage";
import Loading from "../../../../components/Progress/Loading";
import { useSnapArticles } from "../../../../models/article/utils";
import { db } from "../../../../utils/firebase/get-firebase-client";
import { redirectIfNotAdmin } from "../../../../utils/redirect";

export const getServerSideProps: GetServerSideProps = redirectIfNotAdmin("/");

const Page = () => {
    const [articles, setArticles] = useState<ArticlesAdminPageProps["articles"]>();
    useSnapArticles(db, articles => {
        setArticles(
            articles.docs.map(article => ({
                id: article.id,
                ...article.data(),
            }))
        );
    });

    const router = useRouter();
    const goBack = async () => {
        router.push("/admin/panel");
    };

    return articles?.length ? (
        <ArticlesAdminPage
            articles={articles}
            onGoBackButtonClick={goBack}
        />
    ) : (
        <Loading />
    );
};

export default Page;
