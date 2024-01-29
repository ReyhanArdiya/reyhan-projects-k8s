import theme from "../src/theme";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    chakra: {
        theme,
    },
    layout: "centered",
    viewport: {
        viewports: {
            mobile: {
                name: "mobile",
                styles: {
                    width: "320px",
                    height: "568px",
                },
            },

            desktop: {
                name: "desktop",
                styles: {
                    width: "1024px",
                    height: "768px",
                },
            },
        },
    },
    backgrounds: {
        default: "yellow",
        values: [
            {
                name: "yellow",
                value: theme.colors.yellow[100],
            },
            {
                name: "blue",
                value: theme.colors.blue[100],
            },
            {
                name: "sienna",
                value: theme.colors.sienna[100],
            },
        ],
    },
};
