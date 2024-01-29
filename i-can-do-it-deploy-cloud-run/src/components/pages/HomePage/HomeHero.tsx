import { Stack, StackItem, Text, VStack } from "@chakra-ui/react";
import { ChubbsGreet } from "../../Chubbs";
import Section from "./Section";

const HomeHero = () => (
    <Section
        gap="2"
        px="5"
        bg="yellow.100"
    >
        <Stack
            direction={{ base: "column", lg: "row-reverse" }}
            maxW="620px"
            align="center"
            justify="center"
        >
            <ChubbsGreet alignSelf={{ base: "end", lg: "center" }} />
            <VStack spacing="2">
                <Text
                    as="h1"
                    textStyle="h1"
                    textAlign="left"
                    w="full"
                >
                    Halo!
                </Text>
                <Text>
                    Selamat datang ke “I Can Do It”! Disini, kamu bisa mempelajari
                    berbagai ilmu serta keterampilan yang tentunya akan super berguna
                    dalam kehidupan sehari-hari!
                </Text>
            </VStack>
        </Stack>
    </Section>
);

export default HomeHero;
