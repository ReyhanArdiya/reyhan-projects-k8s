import { Stack, Text, VStack } from "@chakra-ui/react";
import MemberCard, { MemberCardProps } from "../../Cards/MemberCard";
import { ChubbsPhone } from "../../Chubbs";
import List from "../../List";
import Section from "./Section";

const CreditsSectionIntro = () => (
    <Stack
        align="center"
        as="header"
        direction={{ base: "column", lg: "row" }}
        justify="center"
        maxW="620px"
        px="5"
        spacing="2"
    >
        <ChubbsPhone alignSelf={{ base: "start", lg: "center" }} />
        <VStack spacing="2">
            <Text
                as="h2"
                textStyle="h2"
                textAlign={{ base: "right", lg: "left" }}
                w="full"
            >
                Kepo sama kita?
            </Text>
            <Text>
                Kepo engga sih sama kakak-kakak yang membangun website ini? Yuk,
                kenalan dengan mereka!
            </Text>
        </VStack>
    </Stack>
);

export interface CreditsSectionProps {
    members: MemberCardProps[];
}

const CreditsSection = ({ members }: CreditsSectionProps) => {
    const memberCards = members.map((member, i) => (
        <MemberCard
            key={i}
            quote={member.quote}
            socials={member.socials}
            name={member.name}
            picUrl={member.picUrl}
        />
    ));

    return (
        <Section
            bg="yellow.100"
            flexDirection="column"
            h={{ base: "max", lg: "100vh" }}
        >
            <CreditsSectionIntro />
            <List
                cards={memberCards}
                listTitle="Yuk kenalan!"
            />
        </Section>
    );
};

export default CreditsSection;
