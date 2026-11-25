import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconPlaceholder } from '@ckwag/elements-icons';
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
        transform: (code: string) => `import { Button } from '@ckwag/elements';\n\n${code}`,
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
    variant: {
      name: 'Variant',
      control: { type: 'inline-radio' },
      options: ['primary', 'secondary', 'tertiary'],
      description:
        'Visual style variant. Primary uses gradient background, Secondary is outlined, Tertiary is text-only.',
      table: { category: 'General', defaultValue: { summary: 'Primary' } },
    },
    size: {
      name: 'Size',
      control: { type: 'inline-radio' },
      options: ['large', 'medium', 'small'],
      description:
        'Button size. Large uses label-l typography (18/22), Medium and Small use label-m (16/20).',
      table: { category: 'General', defaultValue: { summary: 'large' } },
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
      name: 'disabled',
      control: { type: 'boolean' },
      description:
        'When set to true, makes the component appear inactive and disables its functionality.',
      table: { category: 'States', defaultValue: { summary: 'false' } },
    },
    loading: {
      name: 'Loading',
      control: { type: 'boolean' },
      description: 'Shows a spinner in the leading slot, sets aria-busy, and disables interaction.',
      table: { category: 'States', defaultValue: { summary: 'false' } },
    },
    href: {
      control: 'text',
      description: 'Renders the button as a link (<a href>) for navigation.',
      table: { category: 'Link' },
    },
    target: {
      control: 'select',
      options: [undefined, '_blank'],
      description: 'Link target; only used together with href.',
      if: { arg: 'href' },
      table: { category: 'Link' },
    },
    rel: { control: false, table: { disable: true } },
    onClick: { control: false, table: { disable: true } },
    type: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'large',
    disabled: false,
    fullWidth: false,
    leadingIcon: false,
    trailingIcon: false,
    loading: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: 'Playground',
  render: ({ leadingIcon, trailingIcon, href, ...args }) => {
    const showLeading = Boolean(leadingIcon);
    const showTrailing = Boolean(trailingIcon) && !showLeading;
    return (
      <Button
        {...args}
        href={href || undefined}
        leadingIcon={showLeading ? <IconPlaceholder /> : undefined}
        trailingIcon={showTrailing ? <IconPlaceholder /> : undefined}
      />
    );
  },
};
