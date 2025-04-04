import { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    "../../src/next/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  framework: '@storybook/nextjs',
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true
  }
};

export default config;
