import { Circle, Link } from "@chakra-ui/react";
import { ArrowDown } from "phosphor-react";

const ScrollToBottomButton = () => {
    return (
        <Circle
            bg="white"
            size="8"
            pos="fixed"
            right="4"
            bottom="4"
            shadow="1"
        >
            <Link href="#other-articles">
                <ArrowDown
                    weight="bold"
                    color="black"
                    size="19.2px"
                />
            </Link>
        </Circle>
    );
};

export default ScrollToBottomButton;
