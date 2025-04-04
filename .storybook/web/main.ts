import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../../src/web/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  framework: "@storybook/web-components-vite",
  core: {
    disableTelemetry: true
  },
  staticDirs: ['../public'],
};

export default config;
