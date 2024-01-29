import { Stack, StackItem, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Article } from "../../../models/article";
import { WithId } from "../../../utils/types";
import NewestArticleCard from "../../Cards/NewestArticleCard";
import ResourceThumbnailCard from "../../Cards/ResourceThumbnailCard";
import { ChubbsBook } from "../../Chubbs";
import List from "../../List";
import Section from "./Section";

const ArticlesSectionIntro = () => (
    <Stack
        align="center"
        as="header"
        direction={{ base: "column", lg: "row" }}
        justify="center"
        maxW="620px"
        px="5"
        spacing="2"
        id="articles"
    >
        <ChubbsBook alignSelf={{ base: "start", lg: "center" }} />
        <VStack spacing="2">
            <Text
                as="h2"
                textStyle="h2"
                textAlign={{ base: "right", lg: "left" }}
                w="full"
            >
                Ingin membaca hal baru?
            </Text>
            <Text>
                Bingung mau belajar life skills dimana? Tenang saja! Kami selalu
                menuliskan artikel-artikel baru supaya kamu bisa lebih terampil dalam
                kehidupan!
            </Text>
        </VStack>
    </Stack>
);

export interface ArticlesSectionProps {
    articles: WithId<Article>[];
}

const ArticlesSection = ({ articles }: ArticlesSectionProps) => {
    const router = useRouter();
    const articleCards = articles.map(article => (
        <ResourceThumbnailCard
            key={article.id}
            buttonLabel="Baca"
            imageProps={{ src: article.thumbnail, alt: article.title }}
            title={article.title}
            date={dayjs(article.created)}
            author={article.author}
            onButtonClick={() => router.push(`/articles/${article.id}`)}
        />
    ));

    return (
        <Section
            bg="blue.100"
            flexDirection="column"
            h={{ base: "max", lg: "100vh" }}
        >
            <ArticlesSectionIntro />
            <NewestArticleCard {...articles[0]} />
            <List
                cards={articleCards}
                listTitle="Yuk membaca!"
            />
        </Section>
    );
};

export default ArticlesSection;
