import { Box, Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { House } from "phosphor-react";
import ResourceThumbnailCard, {
    ResourceThumbnailCardProps,
} from "../../Cards/ResourceThumbnailCard";
import CircularIcon from "../../CircularIcon";
import List from "../../List";

export interface OtherArticlesSectionProps {
    otherArticles: ResourceThumbnailCardProps[];
}

const OtherArticlesSection = ({ otherArticles }: OtherArticlesSectionProps) => {
    const router = useRouter();
    const goHome = () => router.push("/");

    const articlesCard = otherArticles.map((article, i) => (
        <ResourceThumbnailCard
            key={i}
            {...article}
        />
    ));

    return (
        <VStack
            w="full"
            spacing="6"
            py="4"
            bg="blue.100"
            id="#other-articles"
        >
            <List
                listTitle="Artikel Lainnya"
                cards={articlesCard}
            />
            <Button
                leftIcon={
                    <CircularIcon
                        p="1"
                        icon={() => (
                            <House
                                weight="fill"
                                color="black"
                            />
                        )}
                    />
                }
                onClick={goHome}
            >
                Beranda
            </Button>
        </VStack>
    );
};

export default OtherArticlesSection;
