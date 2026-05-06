import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

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

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/Segmented Control/MUI',
  component: SegmentedControl,
  tags: ['!autodocs', '!dev'],
  argTypes: {
    type: {
      name: 'Type',
      description: 'Layout type. Default = auto-width segments; Fill = equal-width stretch.',
      control: { type: 'inline-radio' },
      options: ['Default', 'Fill'],
      table: { category: 'General', defaultValue: { summary: 'Default' } },
    },
    activeValue: {
      name: 'Active value',
      description: 'The value of the currently active segment.',
      control: { type: 'text' },
      table: { category: 'General' },
    },
    segments: {
      control: false,
      table: { disable: true },
    },
    onChange: {
      control: false,
      table: { disable: true },
    },
  },
  args: {
    type: 'Default',
    activeValue: 'a',
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
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
  minWidth: '100px',
};

function PlaygroundRenderer({ type }: { type: 'Default' | 'Fill' }) {
  const [active, setActive] = React.useState('a');

  const segments = [
    { value: 'a', label: 'Label' },
    { value: 'b', label: 'Label' },
    { value: 'c', label: 'Label' },
  ];

  return (
    <div style={{ maxWidth: '600px' }}>
      <SegmentedControl type={type} segments={segments} activeValue={active} onChange={setActive} />
    </div>
  );
}

interface PlaygroundArgs {
  type: 'Default' | 'Fill';
}

export const Playground: StoryObj<PlaygroundArgs> = {
  render: (args) => <PlaygroundRenderer type={(args.type as 'Default' | 'Fill') || 'Default'} />,
};

export const Types: Story = {
  render: () => {
    const segments3 = [
      { value: 'a', label: 'Label' },
      { value: 'b', label: 'Label' },
      { value: 'c', label: 'Label' },
    ];
    return (
      <div style={sectionStyle}>
        <div style={rowStyle}>
          <span style={labelStyle}>Default</span>
          <SegmentedControl segments={segments3} activeValue="a" />
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Fill</span>
          <div style={{ width: '396px' }}>
            <SegmentedControl segments={segments3} activeValue="a" type="Fill" />
          </div>
        </div>
      </div>
    );
  },
};

export const Icons: Story = {
  render: () => {
    const segments = [
      { value: 'a', label: 'Label', icon: <PlaceholderIcon /> },
      { value: 'b', label: 'Label', icon: <PlaceholderIcon /> },
      { value: 'c', label: 'Label', icon: <PlaceholderIcon /> },
    ];
    return (
      <div style={sectionStyle}>
        <div style={rowStyle}>
          <span style={labelStyle}>Label only</span>
          <SegmentedControl segments={segments.map(({ icon: _icon, ...s }) => s)} activeValue="a" />
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Icon + Label</span>
          <SegmentedControl segments={segments} activeValue="a" />
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const segments3 = [
      { value: 'a', label: 'Label', icon: <PlaceholderIcon /> },
      { value: 'b', label: 'Label', icon: <PlaceholderIcon /> },
      { value: 'c', label: 'Label', icon: <PlaceholderIcon /> },
    ];
    const segments3NoIcon = segments3.map(({ icon: _icon, ...s }) => s);

    const headerStyle: React.CSSProperties = {
      fontFamily: 'var(--font-family-brand), sans-serif',
      fontSize: '13px',
      fontWeight: 500,
      color: 'var(--text-secondary)',
      padding: '0 0 4px 0',
    };

    const groupStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <div style={headerStyle}>Default</div>
          <div style={groupStyle}>
            <div style={rowStyle}>
              <span style={labelStyle}>Label only</span>
              <SegmentedControl segments={segments3NoIcon} activeValue="a" />
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Icon + Label</span>
              <SegmentedControl segments={segments3} activeValue="a" />
            </div>
          </div>
        </div>

        <div>
          <div style={headerStyle}>Fill</div>
          <div style={groupStyle}>
            <div style={rowStyle}>
              <span style={labelStyle}>Label only</span>
              <div style={{ flex: 1 }}>
                <SegmentedControl segments={segments3NoIcon} activeValue="a" type="Fill" />
              </div>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Icon + Label</span>
              <div style={{ flex: 1 }}>
                <SegmentedControl segments={segments3} activeValue="a" type="Fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
