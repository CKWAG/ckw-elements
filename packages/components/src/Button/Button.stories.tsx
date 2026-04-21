import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: {
      control: 'select',
      options: ['Primary', 'Secondary', 'Tertiary'],
    },
    size: {
      control: 'select',
      options: ['Large', 'Medium', 'Small'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Label',
    type: 'Primary',
    size: 'Large',
    disabled: false,
    fullWidth: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// --- Individual variants ---

export const Primary: Story = {
  args: { type: 'Primary' },
};

export const Secondary: Story = {
  args: { type: 'Secondary' },
};

export const Tertiary: Story = {
  args: { type: 'Tertiary' },
};

// --- Sizes ---

export const Large: Story = {
  args: { size: 'Large' },
};

export const Medium: Story = {
  args: { size: 'Medium' },
};

export const Small: Story = {
  args: { size: 'Small' },
};

// --- States ---

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

// --- Icons ---

/** Placeholder arrow icon for demos. */
function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <ArrowIcon />,
    children: 'Label',
  },
};

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: <ArrowIcon />,
    children: 'Label',
  },
};

// --- All variants overview ---

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {(['Primary', 'Secondary', 'Tertiary'] as const).map((type) => (
        <div key={type}>
          <div style={{ marginBottom: '12px', fontWeight: 600 }}>{type}</div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            {(['Large', 'Medium', 'Small'] as const).map((size) => (
              <Button key={size} type={type} size={size}>
                {size}
              </Button>
            ))}
            <Button type={type} disabled>
              Disabled
            </Button>
          </div>
        </div>
      ))}
    </div>
  ),
};
