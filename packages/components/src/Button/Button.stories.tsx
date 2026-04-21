import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Buttons allow users to trigger actions within the interface. They are used to submit forms, confirm choices, or initiate processes. Buttons communicate the importance and hierarchy of actions through visual styles such as Primary, Secondary, and Tertiary variants.\n\nUse buttons to guide users toward the next step in a flow or to perform clear, immediate actions. The component supports different sizes, states, and container behaviors to adapt to various layouts while maintaining consistent interaction patterns across the product.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['Primary', 'Secondary', 'Tertiary'],
      description: 'Visual style variant.',
      table: { defaultValue: { summary: 'Primary' } },
    },
    size: {
      control: 'select',
      options: ['Large', 'Medium', 'Small'],
      description: 'Size of the button. Large uses label-l typography, Medium and Small use label-m.',
      table: { defaultValue: { summary: 'Large' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch to fill the parent width.',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      control: 'text',
      description: 'The visible button label.',
    },
    leadingIcon: {
      control: false,
      description: 'Icon rendered before the label.',
    },
    trailingIcon: {
      control: false,
      description: 'Icon rendered after the label.',
    },
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

// --- Playground (default story, interactive controls) ---

/** Interactive playground — use the controls panel to change props. */
export const Playground: Story = {};

// --- All Variants (visual overview) ---

/** Placeholder arrow icon for demos. */
function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  marginBottom: '48px',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  minWidth: '80px',
};

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: '20px',
  fontWeight: 500,
  color: 'var(--text-primary)',
  marginBottom: '8px',
};

/**
 * Overview of all button types, sizes, and states — matches the Figma component spec.
 */
export const Types: Story = {
  render: () => (
    <div style={sectionStyle}>
      {(['Primary', 'Secondary', 'Tertiary'] as const).map((type) => (
        <div key={type} style={rowStyle}>
          <span style={labelStyle}>{type}</span>
          <Button type={type}>Label</Button>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'The three visual types communicate hierarchy: Primary for the main action, Secondary for alternative actions, Tertiary for low-emphasis actions.' },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={sectionStyle}>
      {(['Large', 'Medium', 'Small'] as const).map((size) => (
        <div key={size} style={rowStyle}>
          <span style={labelStyle}>{size}</span>
          <Button size={size}>Label</Button>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Large uses label-l (18/22), Medium and Small use label-m (16/20). Small has a reduced height of 40px.' },
    },
  },
};

export const States: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Default</span>
        <Button>Label</Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Disabled</span>
        <Button disabled>Label</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Hover and Active states are applied via CSS pseudo-classes. Disabled reduces opacity to 0.4 and removes interactivity.' },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Leading</span>
        <Button leadingIcon={<ArrowIcon />}>Label</Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Trailing</span>
        <Button trailingIcon={<ArrowIcon />}>Label</Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Both</span>
        <Button leadingIcon={<ArrowIcon />} trailingIcon={<ArrowIcon />}>Label</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Icons are 24×24 and placed before (leading) or after (trailing) the label. Icon color inherits from the button text color.' },
    },
  },
};

export const Container: Story = {
  render: () => (
    <div style={{ ...sectionStyle, maxWidth: '400px' }}>
      <div style={rowStyle}>
        <span style={labelStyle}>Hugging</span>
        <Button>Label</Button>
      </div>
      <div>
        <span style={labelStyle}>Full width</span>
        <div style={{ marginTop: '8px' }}>
          <Button fullWidth>Label</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'By default the button hugs its content with a minimum width. Set `fullWidth` to stretch to the parent container.' },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {(['Primary', 'Secondary', 'Tertiary'] as const).map((type) => (
        <div key={type}>
          <div style={headingStyle}>{type}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(['Large', 'Medium', 'Small'] as const).map((size) => (
              <div key={size} style={rowStyle}>
                <span style={labelStyle}>{size}</span>
                <Button type={type} size={size}>Label</Button>
                <Button type={type} size={size} disabled>Label</Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Complete matrix of all types × sizes showing default and disabled states. Hover and active states are visible on interaction.' },
    },
  },
};
