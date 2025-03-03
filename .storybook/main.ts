import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/react/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  framework: {
    "name": "@storybook/react-vite",
    "options": {}
  },
  refs: {
    react: {
      title: 'Web components',
      url: 'http://localhost:6007',
    },
  },
};

export default config;
