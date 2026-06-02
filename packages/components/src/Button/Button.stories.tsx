import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/** Placeholder icon from Figma (Icon/placeholder — shield with checkmark). */
function PlaceholderIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.83337 3.66634C2.83337 3.20611 3.20647 2.83301 3.66671 2.83301H20.3334C20.7936 2.83301 21.1667 3.20611 21.1667 3.66634V20.333C21.1667 20.7933 20.7936 21.1663 20.3334 21.1663H3.66671C3.20647 21.1663 2.83337 20.7933 2.83337 20.333V3.66634ZM4.50004 4.49967V19.4997H19.5V4.49967H4.50004ZM8.27349 5.84828C8.54446 5.70327 8.87324 5.71916 9.12896 5.88963L10.5605 6.84401L11.4108 5.99375C11.7362 5.66832 12.2639 5.66832 12.5893 5.99375L13.4395 6.84401L14.8711 5.88963C15.1269 5.71916 15.4556 5.70327 15.7266 5.84828C15.9975 5.99329 16.1667 6.27567 16.1667 6.58301V9.08301C16.1667 10.1881 15.7277 11.2479 14.9463 12.0293C14.3644 12.6113 13.6279 13.0033 12.8334 13.1655V16.0604C13.0003 15.8158 13.2029 15.5704 13.4371 15.3362C14.4456 14.3277 15.659 13.9058 16.147 14.394C16.6352 14.8822 16.2134 16.0954 15.2049 17.104C14.476 17.8328 13.8418 18.2558 13.25 18.2497L12.8334 18.2494L11.1667 18.2497H10.75C10.1583 18.2558 9.52412 17.8328 8.79522 17.104C7.78669 16.0954 7.36484 14.8822 7.853 14.394C8.34116 13.9058 9.55446 14.3277 10.563 15.3362C10.7972 15.5704 10.9998 15.8158 11.1667 16.0604V13.1655C10.3722 13.0033 9.63575 12.6113 9.05377 12.0293C8.27236 11.2479 7.83337 10.1881 7.83337 9.08301V6.58301C7.83337 6.27567 8.00252 5.99329 8.27349 5.84828ZM9.50004 8.14011V9.08301C9.50004 9.74605 9.76343 10.3819 10.2323 10.8508C10.7011 11.3196 11.337 11.583 12 11.583C12.663 11.583 13.299 11.3196 13.7678 10.8508C14.2366 10.3819 14.5 9.74605 14.5 9.08301V8.14011L13.7956 8.60972C13.4651 8.83007 13.025 8.78648 12.7441 8.5056L12 7.76152L11.256 8.5056C10.975 8.78648 10.535 8.83007 10.2045 8.60972L9.50004 8.14011Z"
        fill="currentColor"
      />
    </svg>
  );
}

const meta = {
  title: 'Components/Button',
  parameters: {
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
        <Button leadingIcon={<PlaceholderIcon />}>Label</Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Trailing</span>
        <Button trailingIcon={<PlaceholderIcon />}>Label</Button>
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
