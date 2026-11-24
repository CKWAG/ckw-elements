import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconClock } from '@ckwag/elements-icons';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { Badge } from './Badge';
import type { BadgeSize, BadgeStatus } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['!autodocs'],
  parameters: {
    design: getFigmaDesignParameter(figmaReferences.badge),
    docs: { source: { type: 'dynamic' } },
  },
  argTypes: {
    children: {
      name: 'Label',
      control: 'text',
      description: 'Short label, one or two words.',
      table: { category: 'Content' },
    },
    status: {
      control: { type: 'inline-radio' },
      options: ['Neutral', 'Info', 'Success', 'Warning', 'Error', 'Brand'],
      description: 'Semantic status. Brand is the only filled variant.',
      table: { category: 'General', defaultValue: { summary: 'Neutral' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['Medium', 'Small'],
      description: 'Badge size.',
      table: { category: 'General', defaultValue: { summary: 'Medium' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Show the leading status icon.',
      table: { category: 'Icon', defaultValue: { summary: 'false' } },
    },
    icon: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    children: 'Bezahlt',
    status: 'Success',
    size: 'Medium',
    showIcon: false,
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

const statuses: { status: BadgeStatus; label: string }[] = [
  { status: 'Neutral', label: 'Offen' },
  { status: 'Info', label: 'Neu' },
  { status: 'Success', label: 'Bezahlt' },
  { status: 'Warning', label: 'Teilzahlung' },
  { status: 'Error', label: 'Überfällig' },
  { status: 'Brand', label: 'Aktuelles Produkt' },
];

const sizes: BadgeSize[] = ['Medium', 'Small'];

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  minWidth: '120px',
};

/** Basic badge with a success status. */
export const Basic: Story = {};

/** Status variants use the semantic status tokens; Brand is the filled highlight variant. */
export const Statuses: Story = {
  render: () => (
    <div style={rowStyle}>
      {statuses.map(({ status, label }) => (
        <Badge key={status} status={status}>
          {label}
        </Badge>
      ))}
    </div>
  ),
};

/** Medium uses label-s, Small uses caption-emphasized. */
export const Sizes: Story = {
  render: () => (
    <div style={sectionStyle}>
      {sizes.map((size) => (
        <div key={size} style={rowStyle}>
          <span style={labelStyle}>{size}</span>
          <Badge status="Success" size={size}>
            Bezahlt
          </Badge>
        </div>
      ))}
    </div>
  ),
};

/** Status icons are optional; the icon side gets less padding for optical balance. */
export const Icon: Story = {
  render: () => (
    <div style={sectionStyle}>
      {sizes.map((size) => (
        <div key={size} style={rowStyle}>
          <span style={labelStyle}>{size}</span>
          <Badge status="Success" size={size}>
            Bezahlt
          </Badge>
          <Badge status="Success" size={size} showIcon>
            Bezahlt
          </Badge>
          <Badge status="Error" size={size} showIcon>
            Überfällig
          </Badge>
          <Badge status="Neutral" size={size} showIcon icon={<IconClock />}>
            Offen
          </Badge>
        </div>
      ))}
    </div>
  ),
};

/** Complete matrix of status and size, with and without icon. */
export const AllVariants: Story = {
  render: () => (
    <div style={sectionStyle}>
      {sizes.map((size) =>
        [false, true].map((showIcon) => (
          <div key={`${size}-${showIcon}`} style={rowStyle}>
            <span style={labelStyle}>
              {size} {showIcon ? 'w/ Icon' : 'w/o Icon'}
            </span>
            {statuses.map(({ status, label }) => (
              <Badge
                key={status}
                status={status}
                size={size}
                showIcon={showIcon}
                icon={status === 'Neutral' || status === 'Brand' ? <IconClock /> : undefined}
              >
                {label}
              </Badge>
            ))}
          </div>
        )),
      )}
    </div>
  ),
};
