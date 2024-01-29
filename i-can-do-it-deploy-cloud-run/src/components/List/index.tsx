import { Text, VStack } from "@chakra-ui/react";
import ListCarousel, { ListCarouselProps } from "./ListCarousel";
import ListProgress from "./ListProgress";

export interface ListProps extends ListCarouselProps {
    listTitle: string;
}

const List = ({ cards, listTitle, stackProps }: ListProps) => {
    return (
        <VStack
            spacing="2"
            maxW="full"
            h="max"
            w="full"
        >
            <Text
                as="h2"
                textStyle="h2"
            >
                {listTitle}
            </Text>

            <ListCarousel
                cards={cards}
                stackProps={stackProps}
            />

            <ListProgress
                qty={cards.length}
                activeIndex={0}
            />
        </VStack>
    );
};

export default List;
