import { ComponentStyleConfig } from "@chakra-ui/react";

export enum ButtonSizes {}

export enum ButtonVariants {}

const Button: ComponentStyleConfig = {
    baseStyle({ colorScheme }) {
        colorScheme = colorScheme === "gray" ? "yellow" : colorScheme;

        return {
            textStyle: "body",
            fontWeight: "bold",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: "base",
            bg: `${colorScheme}.500`,
            _hover: {
                bg: `${colorScheme}.300`,
            },
            _active: {
                bg: `${colorScheme}.500`,
            },
            color: "black",
        };
    },
    sizes: {
        md: {
            px: "6",
            py: "2.5",
            lineHeight: "6",
            minH: "44px",
        },
    },

    defaultProps: {
        variant: null,
    },
};

export default Button;
