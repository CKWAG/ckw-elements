import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingSpinner } from './LoadingSpinner';

const meta = {
  title: 'Components/Loading Spinner',
  component: LoadingSpinner,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        transform: (code: string) => `import { LoadingSpinner } from '@ckwag/elements';\n\n${code}`,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'number' },
      description: 'Width and height of the spinner in pixels.',
      table: { defaultValue: { summary: '20' } },
    },
    className: { control: false, table: { disable: true } },
  },
  args: {
    size: 40,
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: 'Playground',
  render: (args) => <LoadingSpinner {...args} />,
};
