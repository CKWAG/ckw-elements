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
      options: ['Neutral', 'Info', 'Success', 'Warning', 'Error', 'Brand'],
      description: 'Semantic status. Brand is the only filled variant.',
      table: { defaultValue: { summary: 'Neutral' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['Medium', 'Small'],
      description: 'Badge size.',
      table: { defaultValue: { summary: 'Medium' } },
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
    status: 'Success',
    size: 'Medium',
    showIcon: false,
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReactPlayground: Story = {
  name: 'React Playground',
  render: (args) => <Badge {...args} />,
};
