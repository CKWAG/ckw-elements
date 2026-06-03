import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconPlaceholder } from '@ckw-elements/icons';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.button),
    docs: {
      source: {
        transform: (code: string) =>
          `import { Button } from '@ckw-elements/components';\n\n${code}`,
      },
    },
  },
  argTypes: {
    children: {
      name: 'Text',
      control: { type: 'text' },
      description: 'Text content within the button.',
      table: { category: 'Content' },
    },
    type: {
      name: 'Type',
      control: { type: 'inline-radio' },
      options: ['Primary', 'Secondary', 'Tertiary'],
      description:
        'Visual style variant. Primary uses gradient background, Secondary is outlined, Tertiary is text-only.',
      table: { category: 'General', defaultValue: { summary: 'Primary' } },
    },
    size: {
      name: 'Size',
      control: { type: 'inline-radio' },
      options: ['Large', 'Medium', 'Small'],
      description:
        'Button size. Large uses label-l typography (18/22), Medium and Small use label-m (16/20).',
      table: { category: 'General', defaultValue: { summary: 'Large' } },
    },
    fullWidth: {
      name: 'Full width',
      control: { type: 'boolean' },
      description: 'Stretch to fill the parent container width.',
      table: { category: 'General', defaultValue: { summary: 'false' } },
    },
    leadingIcon: {
      name: 'Leading icon',
      control: { type: 'boolean' },
      description: 'Show an icon before the label.',
      table: { category: 'Icon', defaultValue: { summary: 'false' } },
    },
    trailingIcon: {
      name: 'Trailing icon',
      control: { type: 'boolean' },
      description: 'Show an icon after the label.',
      table: { category: 'Icon', defaultValue: { summary: 'false' } },
    },
    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
      description:
        'When set to true, makes the component appear inactive and disables its functionality.',
      table: { category: 'States', defaultValue: { summary: 'false' } },
    },
    onClick: { control: false, table: { disable: true } },
    htmlType: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    children: 'Button',
    type: 'Primary',
    size: 'Large',
    disabled: false,
    fullWidth: false,
    leadingIcon: false,
    trailingIcon: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReactPlayground: Story = {
  name: 'React Playground',
  render: ({ leadingIcon, trailingIcon, ...args }) => {
    const showLeading = Boolean(leadingIcon);
    const showTrailing = Boolean(trailingIcon) && !showLeading;
    return (
      <Button
        {...args}
        leadingIcon={showLeading ? <IconPlaceholder /> : undefined}
        trailingIcon={showTrailing ? <IconPlaceholder /> : undefined}
      />
    );
  },
};
