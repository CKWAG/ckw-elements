import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.tsx',
    '../../../packages/components/src/**/*.mdx',
    '../../../packages/components/src/**/*.stories.tsx',
  ],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  staticDirs: [
    '../public',
    {
      from: '../../../packages/tokens/dist',
      to: '/tokens',
    },
  ],
  viteFinal: async (config) => {
    if (process.env.STORYBOOK_BASE) {
      config.base = process.env.STORYBOOK_BASE;
    }
    return config;
  },
};

export default config;
