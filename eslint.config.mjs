// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import nextConfig from "eslint-config-next";
import storybook from "eslint-plugin-storybook";

const config = [...nextConfig, ...storybook.configs["flat/recommended"]];

export default config;
