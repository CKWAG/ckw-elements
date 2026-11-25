import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconArrowLeft, IconArrowRight } from '@ckwag/elements-icons';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { TextLink } from './TextLink';

const meta = {
  title: 'Components/Text Link',
  component: TextLink,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.textLink),
    docs: {
      source: {
        transform: (code: string) => `import { TextLink } from '@ckwag/elements';\n\n${code}`,
      },
    },
  },
  argTypes: {
    children: {
      name: 'Label',
      control: 'text',
      description: 'Link text. Say where the link goes, not "hier klicken".',
      table: { category: 'Content' },
    },
    href: {
      control: 'text',
      description: 'Link target.',
      table: { category: 'Content' },
    },
    variant: {
      control: { type: 'inline-radio' },
      options: ['standalone', 'inline'],
      description:
        'Standalone for back links, arrow links and link lists; inline for links in running text.',
      table: { category: 'General', defaultValue: { summary: 'standalone' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['large', 'medium', 'small'],
      description: 'Size of a standalone link. Inline links take the paragraph font.',
      table: { category: 'General', defaultValue: { summary: 'large' } },
    },
    leadingIcon: {
      control: 'boolean',
      description: 'Show an icon before the label (arrow-left in this playground).',
      table: { category: 'Icon', defaultValue: { summary: 'false' } },
    },
    trailingIcon: {
      control: 'boolean',
      description: 'Show an icon after the label (arrow-right in this playground).',
      table: { category: 'Icon', defaultValue: { summary: 'false' } },
    },
    external: {
      control: 'boolean',
      description: 'Open in a new tab with the external-link icon and a screen reader hint.',
      table: { category: 'Link', defaultValue: { summary: 'false' } },
    },
    externalLabel: { control: false, table: { disable: true } },
    asChild: { control: false, table: { disable: true } },
    target: { control: false, table: { disable: true } },
    rel: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    children: 'Erklärung zu Ihrer Rechnung',
    href: '#',
    variant: 'standalone',
    size: 'large',
    leadingIcon: false,
    trailingIcon: true,
    external: false,
  },
} satisfies Meta<typeof TextLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: 'Playground',
  render: ({ leadingIcon, trailingIcon, ...args }) => (
    <TextLink
      {...args}
      leadingIcon={leadingIcon ? <IconArrowLeft /> : undefined}
      trailingIcon={trailingIcon ? <IconArrowRight /> : undefined}
    />
  ),
};
