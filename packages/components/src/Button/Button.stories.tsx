import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconPlaceholder } from '@ckwag/elements-icons';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  parameters: {
    design: getFigmaDesignParameter(figmaReferences.button),
    docs: { source: { type: 'dynamic' } },
  },
  component: Button,
  tags: ['!autodocs'],
  argTypes: {
    children: {
      name: 'Text',
      control: { type: 'text' },
      description: 'Text content within the button.',
      table: { category: 'Content' },
    },
    type: {
      name: 'Type',
      control: { type: 'inline-radio' },
      options: ['Primary', 'Secondary', 'Tertiary'],
      description:
        'Visual style variant. Primary uses gradient background, Secondary is outlined, Tertiary is text-only.',
      table: { category: 'General', defaultValue: { summary: 'Primary' } },
    },
    size: {
      name: 'Size',
      control: { type: 'inline-radio' },
      options: ['Large', 'Medium', 'Small'],
      description:
        'Button size. Large uses label-l typography (18/22), Medium and Small use label-m (16/20).',
      table: { category: 'General', defaultValue: { summary: 'Large' } },
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
      name: 'Disabled',
      control: { type: 'boolean' },
      description:
        'When set to true, makes the component appear inactive and disables its functionality.',
      table: { category: 'States', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    children: 'Button',
    type: 'Primary',
    size: 'Large',
    disabled: false,
    fullWidth: false,
    leadingIcon: false,
    trailingIcon: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Basic button with default type and size. */
export const Basic: Story = {
  args: {
    children: 'Button',
  },
};

// ---------------------------------------------------------------------------
// Embedded examples — rendered inside the Docs page via Overview.mdx
// ---------------------------------------------------------------------------

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
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

/** The three visual types communicate hierarchy: Primary for the main action, Secondary for alternative actions, Tertiary for low-emphasis actions. */
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
};

/** Large uses label-l (18/22), Medium and Small use label-m (16/20). Small has a reduced height of 40px. */
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
};

/** Hover and Active states are applied via CSS pseudo-classes. Disabled reduces opacity to 0.4 and removes interactivity. */
export const States: Story = {
  args: {
    children: 'Buttonads asd asd as',
    disabled: true,
    leadingIcon: true,
    trailingIcon: true,
  },

  render: () => (
    <div style={sectionStyle}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '80px repeat(5, 1fr)',
          gap: '0',
          alignItems: 'center',
        }}
      >
        <div />
        <div style={{ ...labelStyle, textAlign: 'center', minWidth: '0' }}>Default</div>
        <div style={{ ...labelStyle, textAlign: 'center', minWidth: '0' }}>Hover</div>
        <div style={{ ...labelStyle, textAlign: 'center', minWidth: '0' }}>Active</div>
        <div style={{ ...labelStyle, textAlign: 'center', minWidth: '0' }}>Focus visible</div>
        <div style={{ ...labelStyle, textAlign: 'center', minWidth: '0' }}>Disabled</div>

        {(['Primary', 'Secondary', 'Tertiary'] as const).map((type) => (
          <React.Fragment key={type}>
            <span style={labelStyle}>{type}</span>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
              <Button type={type}>Label</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
              <Button type={type} className="ckw-button--state-hover">
                Label
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
              <Button type={type} className="ckw-button--state-active">
                Label
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
              <Button type={type} className="ckw-button--state-focus-visible">
                Label
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
              <Button type={type} disabled>
                Label
              </Button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  ),
};

/** Icons are 24x24 and placed before (leading) or after (trailing) the label. Icon color inherits from the button text color. */
export const Icons: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Leading</span>
        <Button leadingIcon={<IconPlaceholder />}>Label</Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Trailing</span>
        <Button trailingIcon={<IconPlaceholder />}>Label</Button>
      </div>
    </div>
  ),
};

/** By default the button hugs its content with a minimum width. Set `fullWidth` to stretch to the parent container. */
export const Container: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Hugging</span>
        <Button>Label</Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '400px' }}>
        <span style={labelStyle}>Full width</span>
        <Button fullWidth>Label</Button>
      </div>
    </div>
  ),
};

/** Complete matrix of all types x sizes showing default and disabled states. Hover and active states are visible on interaction. */
export const AllVariants: Story = {
  render: () => {
    const cellStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 0',
    };
    const headerStyle: React.CSSProperties = {
      fontFamily: 'var(--font-family-brand), sans-serif',
      fontSize: '13px',
      fontWeight: 500,
      color: 'var(--text-secondary)',
      textAlign: 'center',
      padding: '0 0 8px 0',
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {(['Primary', 'Secondary', 'Tertiary'] as const).map((type) => (
          <div key={type}>
            <div style={headingStyle}>{type}</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 1fr',
                gap: '0',
                alignItems: 'center',
              }}
            >
              {/* Header row */}
              <div />
              <div style={headerStyle}>Default</div>
              <div style={headerStyle}>Disabled</div>

              {(['Large', 'Medium', 'Small'] as const).map((size) => (
                <React.Fragment key={size}>
                  <span style={labelStyle}>{size}</span>
                  <div style={cellStyle}>
                    <Button type={type} size={size}>
                      Label
                    </Button>
                  </div>
                  <div style={cellStyle}>
                    <Button type={type} size={size} disabled>
                      Label
                    </Button>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
