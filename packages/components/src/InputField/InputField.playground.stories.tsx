import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconPlaceholder } from '@ckw-elements/icons';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { InputField } from './InputField';

const meta = {
  title: 'Components/Input Field',
  component: InputField,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.inputField),
    docs: {
      source: {
        transform: (code: string) =>
          `import { InputField } from '@ckw-elements/components';\n\n${code}`,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text above the input.',
      table: { defaultValue: { summary: 'Label' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when empty.',
      table: { defaultValue: { summary: 'Placeholder' } },
    },
    value: {
      control: 'text',
      description: 'Current input value.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
    optional: {
      control: 'boolean',
      description: 'Show "(optional)" next to the label.',
      table: { defaultValue: { summary: 'false' } },
    },
    errorText: {
      control: 'text',
      description: 'Error text below the input. Shows error state when non-empty.',
    },
    icon: {
      control: 'boolean',
      description: 'Show a trailing icon inside the input.',
      table: { defaultValue: { summary: 'false' } },
    },
    showInfo: {
      control: 'boolean',
      description: 'Show an info icon next to the label.',
      table: { defaultValue: { summary: 'false' } },
    },
    onChange: { control: false, table: { disable: true } },
    onFocus: { control: false, table: { disable: true } },
    onBlur: { control: false, table: { disable: true } },
    onInfoClick: { control: false, table: { disable: true } },
    type: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    value: '',
    disabled: false,
    optional: false,
    errorText: '',
    icon: false,
    showInfo: false,
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReactPlayground: Story = {
  name: 'React Playground',
  render: ({ icon, ...args }) => (
    <div style={{ maxWidth: '320px' }}>
      <InputField {...args} icon={icon ? <IconPlaceholder size={20} /> : undefined} />
    </div>
  ),
};
