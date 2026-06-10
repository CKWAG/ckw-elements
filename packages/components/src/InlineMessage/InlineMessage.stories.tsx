import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconPlaceholder } from '@ckwag/elements-icons';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { InlineMessage } from './InlineMessage';

const meta = {
  title: 'Components/Inline Message',
  component: InlineMessage,
  tags: ['!autodocs'],
  parameters: {
    design: getFigmaDesignParameter(figmaReferences.inlineMessage),
    docs: { source: { type: 'dynamic' } },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Optional headline shown above the body text.',
      table: { category: 'Content' },
    },
    children: {
      name: 'Description',
      control: 'text',
      description: 'Message body text.',
      table: { category: 'Content' },
    },
    status: {
      control: { type: 'inline-radio' },
      options: ['Info', 'Success', 'Error'],
      description: 'Semantic status variant.',
      table: { category: 'General', defaultValue: { summary: 'Info' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Show the icon area.',
      table: { category: 'Icon', defaultValue: { summary: 'true' } },
    },
    breakpoint: {
      control: { type: 'inline-radio' },
      options: ['Auto', 'Desktop', 'Mobile'],
      description: 'Auto follows viewport width; Desktop/Mobile force a documented variant.',
      table: { category: 'General', defaultValue: { summary: 'Auto' } },
    },
    icon: {
      control: false,
      table: { disable: true },
    },
    role: {
      control: false,
      table: { disable: true },
    },
    className: {
      control: false,
      table: { disable: true },
    },
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

/** Basic inline message with info status, title, body, and icon. */
export const Basic: Story = {};

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
  alignItems: 'flex-start',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  minWidth: '88px',
  paddingTop: '16px',
};

const desktopFrameStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '720px',
};

const mobileFrameStyle: React.CSSProperties = {
  width: '361px',
  maxWidth: '100%',
};

/** Status variants use semantic status border tokens for the rail and icon color. */
export const Statuses: Story = {
  render: () => (
    <div style={sectionStyle}>
      {(['Info', 'Success', 'Error'] as const).map((status) => (
        <div key={status} style={rowStyle}>
          <span style={labelStyle}>{status}</span>
          <div style={desktopFrameStyle}>
            <InlineMessage status={status} title="Statusmeldung">
              Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
            </InlineMessage>
          </div>
        </div>
      ))}
    </div>
  ),
};

/** The title can be omitted when the message body is enough context. */
export const Title: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>With title</span>
        <div style={desktopFrameStyle}>
          <InlineMessage title="Statusmeldung">
            Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
          </InlineMessage>
        </div>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Without</span>
        <div style={desktopFrameStyle}>
          <InlineMessage>
            Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
          </InlineMessage>
        </div>
      </div>
    </div>
  ),
};

/** The icon can be hidden or replaced by a product-specific React node. */
export const Icon: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Default</span>
        <div style={desktopFrameStyle}>
          <InlineMessage title="Statusmeldung">
            Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
          </InlineMessage>
        </div>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Custom</span>
        <div style={desktopFrameStyle}>
          <InlineMessage title="Statusmeldung" icon={<IconPlaceholder size={28} />}>
            Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
          </InlineMessage>
        </div>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Without</span>
        <div style={desktopFrameStyle}>
          <InlineMessage title="Statusmeldung" showIcon={false}>
            Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
          </InlineMessage>
        </div>
      </div>
    </div>
  ),
};

/** Breakpoint variants match the Figma Desktop and Mobile component variants. */
export const Breakpoints: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Desktop</span>
        <div style={desktopFrameStyle}>
          <InlineMessage breakpoint="Desktop" title="Statusmeldung">
            Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
          </InlineMessage>
        </div>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Mobile</span>
        <div style={mobileFrameStyle}>
          <InlineMessage breakpoint="Mobile" title="Statusmeldung">
            Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
          </InlineMessage>
        </div>
      </div>
    </div>
  ),
};

/** Complete matrix of status, title visibility, icon visibility, and breakpoint examples. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={sectionStyle}>
        {(['Info', 'Success', 'Error'] as const).map((status) => (
          <InlineMessage key={status} status={status} title="Statusmeldung">
            Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
          </InlineMessage>
        ))}
      </div>
      <div style={sectionStyle}>
        <InlineMessage title="Statusmeldung" showIcon={false}>
          Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
        </InlineMessage>
        <InlineMessage>
          Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
        </InlineMessage>
      </div>
      <div style={mobileFrameStyle}>
        <InlineMessage breakpoint="Mobile" status="Error" title="Statusmeldung">
          Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
        </InlineMessage>
      </div>
    </div>
  ),
};
