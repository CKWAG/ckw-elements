import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../../../packages/components/src/**/*.mdx',
    '../../../packages/components/src/**/*.stories.tsx',
  ],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
};

export default config;
