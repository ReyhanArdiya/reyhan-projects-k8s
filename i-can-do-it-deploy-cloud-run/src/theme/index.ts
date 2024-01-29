import { extendTheme } from "@chakra-ui/react";
import breakpoints from "./breakpoints";
import colors from "./colors";
import Button from "./components/Button";
import fonts from "./fonts";
import radii from "./radii";
import shadows from "./shadows";
import textStyles from "./text-styles";

const theme = extendTheme({
    colors,
    textStyles,
    shadows,
    components: {
        Button,
    },
    radii,
    breakpoints,
    fonts,
});

export default theme;
