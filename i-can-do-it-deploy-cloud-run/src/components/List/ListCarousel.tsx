import { HStack, StackProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface ListCarouselProps {
    cards: ReactNode[];
    stackProps?: StackProps;
}

const ListCarousel = ({ cards, stackProps }: ListCarouselProps) => {
    return (
        <HStack
            spacing="3"
            h="max"
            maxW="full"
            w="full"
            overflowX="auto"
            py="2.5"
            px="2"
            sx={{
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            }}
            justify={{ lg: "center" }}
            {...stackProps}
        >
            {cards}
        </HStack>
    );
};

export default ListCarousel;
