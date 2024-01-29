import { VStack } from "@chakra-ui/react";
import { type NextPage } from "next";
import { Article } from "../../../models/article";
import ArticlePageBody from "./ArticlePageBody";
import ArticlePageComments, {
    ArticlePageCommentsProps,
} from "./ArticlePageComments";
import ArticlePageHero from "./ArticlePageHero";
import OtherArticlesSection, {
    OtherArticlesSectionProps,
} from "./OtherArticlesSection";
import ScrollToBottomButton from "./ScrollToBottomButton";

export interface ArticlePageProps
    extends Omit<Article, "thumbnail" | "comments">,
        Partial<OtherArticlesSectionProps>,
        Partial<ArticlePageCommentsProps> {
    articleId: string;
}

const ArticlePage: NextPage<ArticlePageProps> = ({
    author,
    articleId,
    body,
    created,
    title,
    headerVideoUrl,
    otherArticles,
    comments,
    onMoreCommentsButtonClick,
    currentUserId,
}) => {
    return (
        <VStack
            w="full"
            bg="yellow.100"
            mx="auto"
            spacing="6"
        >
            <ArticlePageHero
                author={author}
                created={created}
                title={title}
                headerVideoUrl={headerVideoUrl}
            />
            <ArticlePageBody body={body} />
            <VStack
                spacing="0"
                w="full"
            >
                {otherArticles && (
                    <OtherArticlesSection otherArticles={otherArticles} />
                )}
                {comments && onMoreCommentsButtonClick && (
                    <ArticlePageComments
                        currentUserId={currentUserId || ""}
                        articleId={articleId}
                        comments={comments}
                        onMoreCommentsButtonClick={onMoreCommentsButtonClick}
                    />
                )}
            </VStack>
            <ScrollToBottomButton />
        </VStack>
    );
};

export default ArticlePage;
