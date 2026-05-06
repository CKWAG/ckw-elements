import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

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

const meta: Meta<typeof Button> = {
  title: 'Components/MUI/Button',
  component: Button,
  tags: ['!autodocs', '!dev'],
  argTypes: {
    children: {
      name: 'Text',
      description: 'Text content within the button.',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    variant: {
      name: 'Variant',
      description:
        'Visual style variant. Primary → MUI contained, Secondary → MUI outlined, Tertiary → MUI text.',
      control: { type: 'inline-radio' },
      options: ['Primary', 'Secondary', 'Tertiary'],
      table: { category: 'General', defaultValue: { summary: 'Primary' } },
    },
    size: {
      name: 'Size',
      description: 'Button size. Large and Medium are 48px height, Small is 40px.',
      control: { type: 'inline-radio' },
      options: ['Large', 'Medium', 'Small'],
      table: { category: 'General', defaultValue: { summary: 'Large' } },
    },
    fullWidth: {
      name: 'Full width',
      description: 'Stretch to fill the parent container width.',
      control: { type: 'boolean' },
      table: { category: 'General', defaultValue: { summary: 'false' } },
    },
    startIcon: {
      name: 'Start icon',
      description: 'Show an icon before the label.',
      control: { type: 'boolean' },
      table: { category: 'Icon', defaultValue: { summary: 'false' } },
    },
    endIcon: {
      name: 'End icon',
      description: 'Show an icon after the label.',
      control: { type: 'boolean' },
      table: { category: 'Icon', defaultValue: { summary: 'false' } },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to true, makes the component appear inactive and disables its functionality.',
      control: { type: 'boolean' },
      table: { category: 'States', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    children: 'Button',
    variant: 'Primary',
    size: 'Large',
    disabled: false,
    fullWidth: false,
    startIcon: false,
    endIcon: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: ({ startIcon, endIcon, ...args }) => {
    const showStart = Boolean(startIcon);
    const showEnd = Boolean(endIcon) && !showStart;
    return (
      <Button
        {...args}
        startIcon={showStart ? <PlaceholderIcon /> : undefined}
        endIcon={showEnd ? <PlaceholderIcon /> : undefined}
      />
    );
  },
};

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

export const Variants: Story = {
  render: () => (
    <div style={sectionStyle}>
      {(['Primary', 'Secondary', 'Tertiary'] as const).map((variant) => (
        <div key={variant} style={rowStyle}>
          <span style={labelStyle}>{variant}</span>
          <Button variant={variant}>Button</Button>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={sectionStyle}>
      {(['Large', 'Medium', 'Small'] as const).map((size) => (
        <div key={size} style={rowStyle}>
          <span style={labelStyle}>{size}</span>
          <Button size={size}>Button</Button>
        </div>
      ))}
    </div>
  ),
};

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
        {(['Primary', 'Secondary', 'Tertiary'] as const).map((variant) => (
          <div key={variant}>
            <div style={headingStyle}>{variant}</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 1fr',
                gap: '0',
                alignItems: 'center',
              }}
            >
              <div />
              <div style={headerStyle}>Default</div>
              <div style={headerStyle}>Disabled</div>

              {(['Large', 'Medium', 'Small'] as const).map((size) => (
                <React.Fragment key={size}>
                  <span style={labelStyle}>{size}</span>
                  <div style={cellStyle}>
                    <Button variant={variant} size={size}>
                      Button
                    </Button>
                  </div>
                  <div style={cellStyle}>
                    <Button variant={variant} size={size} disabled>
                      Button
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

export const FullWidth: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Button variant="Primary" fullWidth>
        Primary full width
      </Button>
      <Button variant="Secondary" fullWidth>
        Secondary full width
      </Button>
      <Button variant="Tertiary" fullWidth>
        Tertiary full width
      </Button>
    </div>
  ),
};
