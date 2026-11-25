import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.badge),
    docs: {
      source: {
        transform: (code: string) => `import { Badge } from '@ckwag/elements';\n\n${code}`,
      },
    },
  },
  argTypes: {
    children: {
      name: 'Label',
      control: 'text',
      description: 'Short label, one or two words.',
    },
    status: {
      control: { type: 'inline-radio' },
      options: ['neutral', 'info', 'success', 'warning', 'error', 'brand'],
      description: 'Semantic status. Brand is the only filled variant.',
      table: { defaultValue: { summary: 'neutral' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['medium', 'small'],
      description: 'Badge size.',
      table: { defaultValue: { summary: 'medium' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Show the leading status icon.',
      table: { defaultValue: { summary: 'false' } },
    },
    icon: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    children: 'Bezahlt',
    status: 'success',
    size: 'medium',
    showIcon: false,
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: 'Playground',
  render: (args) => <Badge {...args} />,
};
