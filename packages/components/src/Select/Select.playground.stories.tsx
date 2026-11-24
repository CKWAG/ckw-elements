import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.select),
    docs: {
      source: {
        transform: (code: string) => `import { Select } from '@ckwag/elements';\n\n${code}`,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label text above the field.' },
    placeholder: {
      control: 'text',
      description: 'Text shown while nothing is selected.',
      table: { defaultValue: { summary: 'Bitte wählen' } },
    },
    description: { control: 'text', description: 'Help text below the field.' },
    errorText: { control: 'text', description: 'Error text; shows the error state when set.' },
    optional: { control: 'boolean', description: 'Show "(optional)" next to the label.' },
    showInfo: { control: 'boolean', description: 'Show an info button next to the label.' },
    disabled: { control: 'boolean', description: 'Disable the field.' },
    options: { control: 'object', description: 'Options: { value, label, disabled? }[]' },
    value: { control: false, table: { disable: true } },
    onValueChange: { control: false, table: { disable: true } },
    onOpenChange: { control: false, table: { disable: true } },
    onInfoClick: { control: false, table: { disable: true } },
    open: { control: false, table: { disable: true } },
    defaultOpen: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    label: 'Vertrag',
    placeholder: 'Bitte wählen',
    description: '',
    errorText: '',
    optional: false,
    showInfo: false,
    disabled: false,
    options: [
      { value: 'kreuzmatt', label: 'Kreuzmatt 10, 6242 Wauwil' },
      { value: 'zurlinden', label: 'Zurlindenstrasse 11, 1. OG' },
      { value: 'seestrasse', label: 'Seestrasse 3, 6006 Luzern' },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReactPlayground: Story = {
  name: 'React Playground',
  render: (args) => (
    <div style={{ maxWidth: '320px' }}>
      <Select {...args} />
    </div>
  ),
};
