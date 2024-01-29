import { Box, Skeleton } from "@chakra-ui/react";
import Loading from "../../Progress/Loading";
import ArticlesSection, { ArticlesSectionProps } from "./ArticlesSection";
import CreditsSection, { CreditsSectionProps } from "./CreditsSection";
import GamesSection, { GamesSectionProps } from "./GamesSection";
import HomeHero from "./HomeHero";

export interface HomePageProps
    extends Partial<ArticlesSectionProps>,
        Partial<GamesSectionProps>,
        Partial<CreditsSectionProps> {}

const HomePage = ({ articles, quizzes, members }: HomePageProps) => {
    return (
        <>
            <HomeHero />
            <Box w="full">
                {articles?.length ? (
                    <ArticlesSection articles={articles} />
                ) : (
                    <Loading />
                )}
                {quizzes?.length ? <GamesSection quizzes={quizzes} /> : <Loading />}
            </Box>
            {members?.length ? <CreditsSection members={members} /> : <Loading />}
        </>
    );
};

export default HomePage;
