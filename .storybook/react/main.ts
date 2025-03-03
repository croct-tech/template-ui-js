import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../../src/react/**/*.stories.@(js|jsx|mjs|ts|tsx)"
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
    "web-components": {
        title: "Web Components",
        url: "http://localhost:6008"
    }
  }
};

export default config;
