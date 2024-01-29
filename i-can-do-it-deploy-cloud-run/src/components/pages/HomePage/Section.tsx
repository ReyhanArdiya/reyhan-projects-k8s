import { Center, CenterProps } from "@chakra-ui/react";

export interface SectionProps extends CenterProps {}

const Section = (props: SectionProps) => (
    <Center
        as="section"
        gap="4"
        h="100vh"
        minH="568px"
        maxH="1500px"
        py="6"
        w="full"
        {...props}
    />
);

export default Section;
