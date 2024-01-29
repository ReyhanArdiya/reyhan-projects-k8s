// use `mergeConfig` to recursively merge Vite options
const { mergeConfig } = require("vite");

module.exports = {
    async viteFinal(config, { configType }) {
        // return the customized config
        return mergeConfig(config, {
            // customize the Vite config here
            resolve: {
                alias: { foo: "bar" },
            },
        });
    },
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@chakra-ui/storybook-addon",
    ],
    framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-vite",
    },
    features: {
        storyStoreV7: true,
        emotionAlias: false,
    },
    staticDirs: ["../public"],
};
