import { HStack, Circle as ChakraCircle } from "@chakra-ui/react";

export interface CircleProps {
    isActive: boolean;
}

const Circle = ({ isActive }: CircleProps) => {
    return (
        <ChakraCircle
            size="2"
            border="1px solid black"
            borderColor="black"
            bg={isActive ? "yellow.500" : "yellow.100"}
        />
    );
};

export interface ListProgressProps {
    qty: number;
    activeIndex: number;
}

const ListProgress = ({ activeIndex, qty }: ListProgressProps) => {
    const circles = [];
    for (let i = 0; i < qty; i++) {
        circles.push(
            <Circle
                key={i}
                isActive={i === activeIndex}
            />
        );
    }

    return <HStack spacing="2">{circles}</HStack>;
};

export default ListProgress;
