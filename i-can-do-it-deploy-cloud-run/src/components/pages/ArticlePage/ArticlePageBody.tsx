import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Article } from "../../../models/article";
import AudibleText from "../../AudibleText";
import ArticleBodyImage from "./ArticleBodyImage";

export interface ArticlePageBodyProps extends Pick<Article, "body"> {}

const ArticlePageBody = ({ body }: ArticlePageBodyProps) => {
    const [currentPlay, setCurrentPlay] = useState<HTMLAudioElement>();

    const bodyComponents = body.map((data, i) => {
        if ("audioSrc" in data) {
            return (
                <AudibleText
                    w="full"
                    audioUrl={data.audioSrc}
                    key={i}
                    onAudioPlay={newAudio => {
                        currentPlay &&
                            currentPlay !== newAudio &&
                            currentPlay.pause();
                        setCurrentPlay(newAudio);
                    }}
                >
                    {data.text}
                </AudibleText>
            );
        }

        return (
            <ArticleBodyImage
                key={i}
                alt={data.alt}
                src={data.src}
                title={data.title}
            />
        );
    });

    return (
        <VStack
            px={{ base: "5", lg: "0" }}
            maxW="600px"
            spacing="3"
        >
            {bodyComponents}
        </VStack>
    );
};

export default ArticlePageBody;
