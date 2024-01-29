import { Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Article } from "../../../models/article";
import { WithId } from "../../../utils/types";
import ResourceThumbnailCard from "../ResourceThumbnailCard";

export interface NewestArticleCardProps extends WithId<Article> {}

const NewestArticleCard = (props: NewestArticleCardProps) => {
    const router = useRouter();
    const goToArticle = () => router.push(`/articles/${props.id}`);

    return (
        <VStack
            as="article"
            bg="yellow.500"
            spacing="1"
            p="5"
            border="2px solid black"
            rounded="base"
        >
            <Text
                as="h2"
                textStyle="h2"
            >
                Artikel Terbaru
            </Text>
            <ResourceThumbnailCard
                buttonLabel="Baca"
                imageProps={{ src: props.thumbnail, alt: props.title }}
                title={props.title}
                date={dayjs(props.created)}
                author={props.author}
                onButtonClick={goToArticle}
            />
        </VStack>
    );
};

export default NewestArticleCard;
