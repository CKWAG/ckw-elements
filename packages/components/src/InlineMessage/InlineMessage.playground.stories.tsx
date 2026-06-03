import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { InlineMessage } from './InlineMessage';

const meta = {
  title: 'Components/Inline Message',
  component: InlineMessage,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.inlineMessage),
    docs: {
      source: {
        transform: (code: string) =>
          `import { InlineMessage } from '@ckw-elements/components';\n\n${code}`,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Optional headline shown above the body text.',
      table: { defaultValue: { summary: 'Statusmeldung' } },
    },
    children: {
      name: 'Description',
      control: 'text',
      description: 'Message body text.',
    },
    status: {
      control: { type: 'inline-radio' },
      options: ['Info', 'Success', 'Error'],
      description: 'Semantic status variant.',
      table: { defaultValue: { summary: 'Info' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Show the icon area.',
      table: { defaultValue: { summary: 'true' } },
    },
    breakpoint: {
      control: { type: 'inline-radio' },
      options: ['Auto', 'Desktop', 'Mobile'],
      description: 'Auto follows viewport width; Desktop/Mobile force a documented variant.',
      table: { defaultValue: { summary: 'Auto' } },
    },
    icon: { control: false, table: { disable: true } },
    role: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    title: 'Statusmeldung',
    children: 'Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.',
    status: 'Info',
    showIcon: true,
    breakpoint: 'Auto',
  },
} satisfies Meta<typeof InlineMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReactPlayground: Story = {
  name: 'React Playground',
  render: (args) => (
    <div style={{ maxWidth: args.breakpoint === 'Mobile' ? '361px' : '720px' }}>
      <InlineMessage {...args} />
    </div>
  ),
};
