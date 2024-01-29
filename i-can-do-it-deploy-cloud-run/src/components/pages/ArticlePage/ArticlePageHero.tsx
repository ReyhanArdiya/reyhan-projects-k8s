import { AspectRatio, Box, HStack, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Article } from "../../../models/article";
import UserAvatar from "../../UserAvatar";

export interface ArticlePageHeroProps
    extends Pick<Article, "author" | "title" | "created" | "headerVideoUrl"> {}

const ArticlePageHero = ({
    author,
    created,
    title,
    headerVideoUrl,
}: ArticlePageHeroProps) => {
    return (
        <VStack
            spacing="3"
            w="full"
            px={{ base: "5", lg: "0" }}
            maxW="600px"
        >
            <Text
                textAlign="left"
                w="full"
                as="h1"
                textStyle="h1"
            >
                {title}
            </Text>

            <HStack
                w="full"
                justify="space-between"
            >
                <Text
                    as="small"
                    textStyle="small"
                >
                    {dayjs(created).format("DD MMMM YYYY")}
                </Text>
                <HStack spacing="1">
                    <Text
                        textStyle="small"
                        color="gray.600"
                    >
                        oleh{" "}
                        <Box
                            as="span"
                            color="sienna.500"
                            fontWeight="bold"
                        >
                            {author.name}
                        </Box>
                    </Text>
                    <UserAvatar
                        boxSize="1rem"
                        src={author.picUrl}
                    />
                </HStack>
            </HStack>

            <AspectRatio
                ratio={7 / 4}
                minW="280px"
                w="full"
                rounded="base"
                border="2px solid "
                borderColor="black"
            >
                <video controls>
                    <source src={headerVideoUrl} />
                </video>
            </AspectRatio>
        </VStack>
    );
};

export default ArticlePageHero;
