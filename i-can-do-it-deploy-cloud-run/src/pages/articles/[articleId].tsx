import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ResourceThumbnailCardProps } from "../../components/Cards/ResourceThumbnailCard";
import ArticlePage from "../../components/pages/ArticlePage";
import { ArticlePageCommentsProps } from "../../components/pages/ArticlePage/ArticlePageComments";
import Loading from "../../components/Progress/Loading";
import useGetUser from "../../hooks/use-get-user";
import { Article } from "../../models/article";
import { useSnapArticleComments } from "../../models/article-comment/utils";
import { getArticle, useSnapArticles } from "../../models/article/utils";
import { db } from "../../utils/firebase/get-firebase-client";

const Page = () => {
    const router = useRouter();
    const { articleId } = router.query;
    const [articleData, setArticleData] = useState<Article>();
    const [otherArticles, setOtherArticles] = useState<ResourceThumbnailCardProps[]>(
        []
    );
    const user = useGetUser();

    useEffect(() => {
        if (articleId) {
            getArticle(db, articleId as string)
                .then(article => setArticleData(article.data()))
                .catch(e => console.error(e));
        }
    }, [articleId]);

    useSnapArticles(db, articles =>
        setOtherArticles(
            articles.docs.map(article => {
                const data = article.data();

                return {
                    buttonLabel: "Baca",
                    imageProps: { src: data.thumbnail },
                    onButtonClick: () => router.push(`/articles/${article.id}`),
                    title: data.title,
                    author: data.author,
                    date: dayjs(data.created),
                };
            })
        )
    );

    // Comments
    const [comments, setComments] = useState<ArticlePageCommentsProps["comments"]>();
    useSnapArticleComments(db, articleId as string, snapshot => {
        setComments(
            snapshot.docs.map(comment => ({
                ...comment.data(),
                id: comment.id,
            }))
        );
    });

    return articleData ? (
        <ArticlePage
            currentUserId={user?.uid}
            {...articleData}
            articleId={articleId as string}
            comments={comments}
            onMoreCommentsButtonClick={() => 1}
            otherArticles={otherArticles}
        />
    ) : (
        <Loading />
    );
};

export default Page;
