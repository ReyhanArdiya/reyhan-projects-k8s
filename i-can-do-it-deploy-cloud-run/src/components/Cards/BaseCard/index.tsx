import { StackProps, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface BaseCardProps extends StackProps {}

const BaseCard = (props: BaseCardProps) => {
    return (
        <VStack
            as={motion.section}
            whileHover={{
                scale: 1.05,
                transition: {
                    type: "spring",
                    bounce: 0.75,
                },
            }}
            bg="white"
            borderColor="black"
            borderStyle="solid"
            borderWidth="2px"
            p="2.5"
            rounded="base"
            shadow="1"
            spacing="1"
            w="60"
            {...props}
        />
    );
};

export default BaseCard;
