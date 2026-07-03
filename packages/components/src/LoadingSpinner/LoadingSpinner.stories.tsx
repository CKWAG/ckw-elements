import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingSpinner } from './LoadingSpinner';

const meta = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['!autodocs'],
  argTypes: {
    size: {
      name: 'Size',
      control: { type: 'number' },
      description: 'Width and height of the spinner in pixels.',
      table: { category: 'General', defaultValue: { summary: '20' } },
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
