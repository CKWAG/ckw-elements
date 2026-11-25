import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/Radio Group',
  component: RadioGroup,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.radioGroup),
    docs: {
      source: {
        transform: (code: string) => `import { RadioGroup } from '@ckwag/elements';\n\n${code}`,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Group label, usually the question.' },
    description: { control: 'text', description: 'Help text below the label.' },
    errorText: { control: 'text', description: 'Error text; shows the error state when set.' },
    optional: { control: 'boolean', description: 'Show "(optional)" next to the label.' },
    showInfo: { control: 'boolean', description: 'Show an info button next to the label.' },
    disabled: { control: 'boolean', description: 'Disable all options.' },
    options: {
      control: 'object',
      description: 'Options: { value, label, description?, disabled? }[]',
    },
    defaultValue: { control: 'text', description: 'Initially selected value.' },
    value: { control: false, table: { disable: true } },
    onValueChange: { control: false, table: { disable: true } },
    onInfoClick: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    label: 'Wie wohnen Sie?',
    description: '',
    errorText: '',
    optional: false,
    showInfo: false,
    disabled: false,
    defaultValue: 'wohnung',
    options: [
      { value: 'wohnung', label: 'Wohnung' },
      { value: 'einfamilienhaus', label: 'Einfamilienhaus' },
      { value: 'mehrfamilienhaus', label: 'Mehrfamilienhaus' },
    ],
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: 'Playground',
  render: (args) => <RadioGroup key={args.defaultValue} {...args} />,
};
