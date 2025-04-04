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
  framework: "@storybook/react-vite",
  refs: {
    "next": {
      title: "Next",
      url: "http://localhost:6008"
    },
    "web-components": {
        title: "Web components",
        url: "http://localhost:6009"
    }
  },
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true
  }
};

export default config;
