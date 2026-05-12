import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button as ReactButton } from '../Button/Button';
import { InputField as ReactInputField } from '../InputField/InputField';
import { SegmentedControl as ReactSegmentedControl } from '../SegmentedControl/SegmentedControl';
import { Button as MuiButton } from '../mui/Button';
import { InputField as MuiInputField } from '../mui/InputField';
import { SegmentedControl as MuiSegmentedControl } from '../mui/SegmentedControl';

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

function SmallPlaceholderIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.83337 3.66634C2.83337 3.20611 3.20647 2.83301 3.66671 2.83301H20.3334C20.7936 2.83301 21.1667 3.20611 21.1667 3.66634V20.333C21.1667 20.7933 20.7936 21.1663 20.3334 21.1663H3.66671C3.20647 21.1663 2.83337 20.7933 2.83337 20.333V3.66634ZM4.50004 4.49967V19.4997H19.5V4.49967H4.50004ZM8.27349 5.84828C8.54446 5.70327 8.87324 5.71916 9.12896 5.88963L10.5605 6.84401L11.4108 5.99375C11.7362 5.66832 12.2639 5.66832 12.5893 5.99375L13.4395 6.84401L14.8711 5.88963C15.1269 5.71916 15.4556 5.70327 15.7266 5.84828C15.9975 5.99329 16.1667 6.27567 16.1667 6.58301V9.08301C16.1667 10.1881 15.7277 11.2479 14.9463 12.0293C14.3644 12.6113 13.6279 13.0033 12.8334 13.1655V16.0604C13.0003 15.8158 13.2029 15.5704 13.4371 15.3362C14.4456 14.3277 15.659 13.9058 16.147 14.394C16.6352 14.8822 16.2134 16.0954 15.2049 17.104C14.476 17.8328 13.8418 18.2558 13.25 18.2497L12.8334 18.2494L11.1667 18.2497H10.75C10.1583 18.2558 9.52412 17.8328 8.79522 17.104C7.78669 16.0954 7.36484 14.8822 7.853 14.394C8.34116 13.9058 9.55446 14.3277 10.563 15.3362C10.7972 15.5704 10.9998 15.8158 11.1667 16.0604V13.1655C10.3722 13.0033 9.63575 12.6113 9.05377 12.0293C8.27236 11.2479 7.83337 10.1881 7.83337 9.08301V6.58301C7.83337 6.27567 8.00252 5.99329 8.27349 5.84828ZM9.50004 8.14011V9.08301C9.50004 9.74605 9.76343 10.3819 10.2323 10.8508C10.7011 11.3196 11.337 11.583 12 11.583C12.663 11.583 13.299 11.3196 13.7678 10.8508C14.2366 10.3819 14.5 9.74605 14.5 9.08301V8.14011L13.7956 8.60972C13.4651 8.83007 13.025 8.78648 12.7441 8.5056L12 7.76152L11.256 8.5056C10.975 8.78648 10.535 8.83007 10.2045 8.60972L9.50004 8.14011Z"
        fill="currentColor"
      />
    </svg>
  );
}

const fixtureWrap: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  background: 'white',
};

const inputWrap: React.CSSProperties = {
  ...fixtureWrap,
  width: '280px',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

const segmentWrap: React.CSSProperties = {
  ...fixtureWrap,
  justifyContent: 'flex-start',
};

const meta: Meta = {
  title: 'Tests/Fixtures',
  tags: ['!autodocs', '!dev'],
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

type Story = StoryObj;

// --- Button: React ---

export const ReactButtonPrimaryLarge: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Primary" size="Large">
        Label
      </ReactButton>
    </div>
  ),
};

export const ReactButtonPrimaryMedium: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Primary" size="Medium">
        Label
      </ReactButton>
    </div>
  ),
};

export const ReactButtonPrimarySmall: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Primary" size="Small">
        Label
      </ReactButton>
    </div>
  ),
};

export const ReactButtonSecondaryLarge: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Secondary" size="Large">
        Label
      </ReactButton>
    </div>
  ),
};

export const ReactButtonSecondaryMedium: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Secondary" size="Medium">
        Label
      </ReactButton>
    </div>
  ),
};

export const ReactButtonSecondarySmall: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Secondary" size="Small">
        Label
      </ReactButton>
    </div>
  ),
};

export const ReactButtonTertiaryLarge: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Tertiary" size="Large">
        Label
      </ReactButton>
    </div>
  ),
};

export const ReactButtonTertiaryMedium: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Tertiary" size="Medium">
        Label
      </ReactButton>
    </div>
  ),
};

export const ReactButtonTertiarySmall: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Tertiary" size="Small">
        Label
      </ReactButton>
    </div>
  ),
};

export const ReactButtonPrimaryDisabled: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Primary" size="Large" disabled>
        Label
      </ReactButton>
    </div>
  ),
};

export const ReactButtonSecondaryDisabled: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Secondary" size="Large" disabled>
        Label
      </ReactButton>
    </div>
  ),
};

export const ReactButtonTertiaryDisabled: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Tertiary" size="Large" disabled>
        Label
      </ReactButton>
    </div>
  ),
};

export const ReactButtonWithIcon: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <ReactButton type="Primary" size="Large" leadingIcon={<PlaceholderIcon />}>
        Label
      </ReactButton>
    </div>
  ),
};

// --- Button: MUI ---

export const MuiButtonPrimaryLarge: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Primary" size="Large">
        Label
      </MuiButton>
    </div>
  ),
};

export const MuiButtonPrimaryMedium: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Primary" size="Medium">
        Label
      </MuiButton>
    </div>
  ),
};

export const MuiButtonPrimarySmall: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Primary" size="Small">
        Label
      </MuiButton>
    </div>
  ),
};

export const MuiButtonSecondaryLarge: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Secondary" size="Large">
        Label
      </MuiButton>
    </div>
  ),
};

export const MuiButtonSecondaryMedium: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Secondary" size="Medium">
        Label
      </MuiButton>
    </div>
  ),
};

export const MuiButtonSecondarySmall: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Secondary" size="Small">
        Label
      </MuiButton>
    </div>
  ),
};

export const MuiButtonTertiaryLarge: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Tertiary" size="Large">
        Label
      </MuiButton>
    </div>
  ),
};

export const MuiButtonTertiaryMedium: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Tertiary" size="Medium">
        Label
      </MuiButton>
    </div>
  ),
};

export const MuiButtonTertiarySmall: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Tertiary" size="Small">
        Label
      </MuiButton>
    </div>
  ),
};

export const MuiButtonPrimaryDisabled: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Primary" size="Large" disabled>
        Label
      </MuiButton>
    </div>
  ),
};

export const MuiButtonSecondaryDisabled: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Secondary" size="Large" disabled>
        Label
      </MuiButton>
    </div>
  ),
};

export const MuiButtonTertiaryDisabled: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Tertiary" size="Large" disabled>
        Label
      </MuiButton>
    </div>
  ),
};

export const MuiButtonWithIcon: Story = {
  render: () => (
    <div style={fixtureWrap}>
      <MuiButton variant="Primary" size="Large" startIcon={<PlaceholderIcon />}>
        Label
      </MuiButton>
    </div>
  ),
};

// --- InputField: React ---

export const ReactInputDefault: Story = {
  render: () => (
    <div style={inputWrap}>
      <ReactInputField />
    </div>
  ),
};

export const ReactInputFilled: Story = {
  render: () => (
    <div style={inputWrap}>
      <ReactInputField value="Input text" />
    </div>
  ),
};

export const ReactInputError: Story = {
  render: () => (
    <div style={inputWrap}>
      <ReactInputField value="Input text" errorText="Error message" />
    </div>
  ),
};

export const ReactInputDisabled: Story = {
  render: () => (
    <div style={inputWrap}>
      <ReactInputField value="Input text" disabled />
    </div>
  ),
};

export const ReactInputOptional: Story = {
  render: () => (
    <div style={inputWrap}>
      <ReactInputField value="Input text" optional />
    </div>
  ),
};

export const ReactInputWithIcon: Story = {
  render: () => (
    <div style={inputWrap}>
      <ReactInputField value="Input text" icon={<SmallPlaceholderIcon />} />
    </div>
  ),
};

// --- InputField: MUI ---

export const MuiInputDefault: Story = {
  render: () => (
    <div style={inputWrap}>
      <MuiInputField />
    </div>
  ),
};

export const MuiInputFilled: Story = {
  render: () => (
    <div style={inputWrap}>
      <MuiInputField value="Input text" />
    </div>
  ),
};

export const MuiInputError: Story = {
  render: () => (
    <div style={inputWrap}>
      <MuiInputField value="Input text" errorText="Error message" />
    </div>
  ),
};

export const MuiInputDisabled: Story = {
  render: () => (
    <div style={inputWrap}>
      <MuiInputField value="Input text" disabled />
    </div>
  ),
};

export const MuiInputOptional: Story = {
  render: () => (
    <div style={inputWrap}>
      <MuiInputField value="Input text" optional />
    </div>
  ),
};

export const MuiInputWithIcon: Story = {
  render: () => (
    <div style={inputWrap}>
      <MuiInputField value="Input text" icon={<SmallPlaceholderIcon />} />
    </div>
  ),
};

// --- SegmentedControl: React ---

const segments3 = [
  { value: 'a', label: 'Label', icon: <PlaceholderIcon /> },
  { value: 'b', label: 'Label', icon: <PlaceholderIcon /> },
  { value: 'c', label: 'Label', icon: <PlaceholderIcon /> },
];

export const ReactSegmentDefault: Story = {
  render: () => (
    <div style={segmentWrap}>
      <ReactSegmentedControl
        segments={segments3}
        activeValue="a"
        type="Default"
        contentMode="label"
      />
    </div>
  ),
};

export const ReactSegmentFill: Story = {
  render: () => (
    <div style={{ ...segmentWrap, width: '400px' }}>
      <ReactSegmentedControl segments={segments3} activeValue="a" type="Fill" contentMode="label" />
    </div>
  ),
};

export const ReactSegmentIconLabel: Story = {
  render: () => (
    <div style={segmentWrap}>
      <ReactSegmentedControl segments={segments3} activeValue="a" contentMode="icon-label" />
    </div>
  ),
};

export const ReactSegmentIconCompact: Story = {
  render: () => (
    <div style={segmentWrap}>
      <ReactSegmentedControl segments={segments3} activeValue="a" contentMode="icon-compact" />
    </div>
  ),
};

export const ReactSegmentMiddleActive: Story = {
  render: () => (
    <div style={segmentWrap}>
      <ReactSegmentedControl
        segments={segments3}
        activeValue="b"
        type="Default"
        contentMode="label"
      />
    </div>
  ),
};

// --- SegmentedControl: MUI ---

export const MuiSegmentDefault: Story = {
  render: () => (
    <div style={segmentWrap}>
      <MuiSegmentedControl segments={segments3} activeValue="a" type="Default" />
    </div>
  ),
};

export const MuiSegmentFill: Story = {
  render: () => (
    <div style={{ ...segmentWrap, width: '400px' }}>
      <MuiSegmentedControl segments={segments3} activeValue="a" type="Fill" />
    </div>
  ),
};

export const MuiSegmentIconLabel: Story = {
  render: () => (
    <div style={segmentWrap}>
      <MuiSegmentedControl segments={segments3} activeValue="a" />
    </div>
  ),
};

export const MuiSegmentIconCompact: Story = {
  render: () => (
    <div style={segmentWrap}>
      <MuiSegmentedControl segments={segments3} activeValue="a" />
    </div>
  ),
};

export const MuiSegmentMiddleActive: Story = {
  render: () => (
    <div style={segmentWrap}>
      <MuiSegmentedControl segments={segments3} activeValue="b" type="Default" />
    </div>
  ),
};
