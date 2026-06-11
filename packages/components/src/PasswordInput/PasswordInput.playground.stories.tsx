import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { PasswordInput } from './PasswordInput';

const meta = {
  title: 'Components/Password Input',
  component: PasswordInput,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.inputField),
    docs: {
      source: {
        transform: (code: string) => `import { PasswordInput } from '@ckwag/elements';\n\n${code}`,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text above the password input.',
      table: { defaultValue: { summary: 'Label' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when empty.',
      table: { defaultValue: { summary: 'Placeholder' } },
    },
    value: {
      control: 'text',
      description: 'Current password value.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field and visibility toggle are disabled.',
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
    showInfo: {
      control: 'boolean',
      description: 'Show an info icon next to the label.',
      table: { defaultValue: { summary: 'false' } },
    },
    visible: {
      control: 'boolean',
      description: 'Controlled visibility state. True shows the password as plain text.',
    },
    defaultVisible: {
      control: 'boolean',
      description: 'Initial visibility state for uncontrolled usage.',
      table: { defaultValue: { summary: 'false' } },
    },
    onChange: { control: false, table: { disable: true } },
    onFocus: { control: false, table: { disable: true } },
    onBlur: { control: false, table: { disable: true } },
    onInfoClick: { control: false, table: { disable: true } },
    onVisibilityChange: { control: false, table: { disable: true } },
    visibilityToggleButtonProps: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    label: 'Passwort',
    placeholder: 'Passwort eingeben',
    value: '',
    disabled: false,
    optional: false,
    errorText: '',
    showInfo: false,
    defaultVisible: false,
    autoComplete: 'current-password',
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReactPlayground: Story = {
  name: 'React Playground',
  render: (args) => (
    <div style={{ maxWidth: '320px' }}>
      <PasswordInput {...args} />
    </div>
  ),
};
