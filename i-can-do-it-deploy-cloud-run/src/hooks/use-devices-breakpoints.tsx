import { theme, useMediaQuery } from "@chakra-ui/react";

const useDevicesBreakpoints = () => {
    const [isMobile, isDesktop] = useMediaQuery([
        `(min-width: ${theme.breakpoints.sm})`,
        `(min-width: ${theme.breakpoints.lg})`,
    ]);

    return {
        isMobile,
        isDesktop,
    };
};

export default useDevicesBreakpoints;
