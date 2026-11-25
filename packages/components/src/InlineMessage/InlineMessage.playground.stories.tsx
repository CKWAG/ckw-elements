import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconArrowRight } from '@ckwag/elements-icons';
import { Button } from '../Button';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { InlineMessage } from './InlineMessage';

interface DemoLinkProps {
  children: React.ReactNode;
  small?: boolean;
}

/**
 * Story-only stand-in for the Text Link (standalone, trailing arrow) until the Text Link
 * component ships; it uses the same tokens.
 */
function DemoLink({ children, small = false }: DemoLinkProps) {
  const size = small ? 'label-s' : 'label-m';
  return (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs)',
        color: 'var(--interactive-text)',
        textDecoration: 'none',
        fontFamily: 'var(--font-family-brand), sans-serif',
        fontSize: `var(--${size}-size)`,
        lineHeight: `var(--${size}-height)`,
        fontWeight: `var(--${size}-weight)`,
      }}
    >
      {children}
      <IconArrowRight size={small ? 16 : 20} aria-hidden="true" />
    </a>
  );
}

const actionOptions = {
  none: undefined,
  'text link': <DemoLink>Mehr erfahren</DemoLink>,
  'two links': (
    <>
      <DemoLink>Zählerstand erfassen</DemoLink>
      <DemoLink>Mehr erfahren</DemoLink>
    </>
  ),
  button: (
    <Button variant="secondary" size="small">
      Jetzt erfassen
    </Button>
  ),
};

const meta = {
  title: 'Components/Inline Message',
  component: InlineMessage,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.inlineMessage),
    docs: {
      source: {
        transform: (code: string) => `import { InlineMessage } from '@ckwag/elements';\n\n${code}`,
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
    actions: {
      control: { type: 'select' },
      options: Object.keys(actionOptions),
      mapping: actionOptions,
      description:
        'Optional content below the body, in the text column (e.g. a Text Link or small Buttons).',
      table: { defaultValue: { summary: 'none' } },
    },
    status: {
      control: { type: 'inline-radio' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'Semantic status variant.',
      table: { defaultValue: { summary: 'info' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Show the icon area.',
      table: { defaultValue: { summary: 'true' } },
    },
    breakpoint: {
      control: { type: 'inline-radio' },
      options: ['auto', 'desktop', 'mobile'],
      description: 'Auto follows viewport width; Desktop/Mobile force a documented variant.',
      table: { defaultValue: { summary: 'auto' } },
    },
    icon: { control: false, table: { disable: true } },
    role: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    title: 'Statusmeldung',
    children: 'Hier steht eine kurze Erklärung zum aktuellen Status oder zur nächsten Aktion.',
    status: 'info',
    showIcon: true,
    breakpoint: 'auto',
  },
} satisfies Meta<typeof InlineMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: 'Playground',
  render: (args) => (
    <div style={{ maxWidth: args.breakpoint === 'mobile' ? '361px' : '720px' }}>
      <InlineMessage {...args} />
    </div>
  ),
};
