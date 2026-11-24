import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingSpinner } from './LoadingSpinner';

const meta = {
  title: 'Components/Loading Spinner',
  component: LoadingSpinner,
  tags: ['!autodocs'],
  argTypes: {
    variant: {
      name: 'Variant',
      control: { type: 'inline-radio' },
      options: ['brand', 'inline'],
      description:
        'Brand: official orbiting dots for content and pages. Inline: single rotating line in the text colour for components.',
      table: { category: 'General', defaultValue: { summary: 'brand' } },
    },
    size: {
      name: 'Size',
      control: { type: 'number' },
      description: 'Width and height of the spinner in pixels.',
      table: { category: 'General', defaultValue: { summary: '20 (brand), 24 (inline)' } },
    },
  },
  args: {
    size: 40,
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default loading spinner at 40px. */
export const Default: Story = {};

/** Inline variant: one rotating line in the current text colour, used inside components such as Button. */
export const Inline: Story = {
  args: { variant: 'inline', size: 24 },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <span style={{ color: 'var(--text-primary)' }}>
        <LoadingSpinner {...args} />
      </span>
      <span style={{ color: 'var(--text-on-interactive-secondary)' }}>
        <LoadingSpinner {...args} />
      </span>
      <span
        style={{
          background: 'var(--interactive-primary)',
          color: 'var(--text-on-interactive-primary)',
          padding: '12px',
          borderRadius: '8px',
          display: 'inline-flex',
        }}
      >
        <LoadingSpinner {...args} />
      </span>
    </div>
  ),
};

/** Multiple sizes side by side. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <LoadingSpinner size={16} />
      <LoadingSpinner size={24} />
      <LoadingSpinner size={40} />
      <LoadingSpinner size={64} />
    </div>
  ),
};

/** On a dark background to show contrast. */
export const OnDark: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        borderRadius: '8px',
        background: 'var(--interactive-primary-hover)',
      }}
    >
      <LoadingSpinner size={48} />
    </div>
  ),
};
