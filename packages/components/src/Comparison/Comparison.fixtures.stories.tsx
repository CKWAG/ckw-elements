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
        d="M2.83337 3.66634C2.83337 3.20611 3.20647 2.83301 3.66671 2.83301H20.3334C20.7936 2.83301 21.1667 3.20611 21.1667 3.66634V20.333C21.1667 20.7933 20.7936 21.1663 20.3334 21.1663H3.66671C3.20647 21.1663 2.83337 20.7933 2.83337 20.333V3.66634ZM4.50004 4.49967V19.4997H19.5V4.49967H4.50004Z"
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
        d="M2.83337 3.66634C2.83337 3.20611 3.20647 2.83301 3.66671 2.83301H20.3334C20.7936 2.83301 21.1667 3.20611 21.1667 3.66634V20.333C21.1667 20.7933 20.7936 21.1663 20.3334 21.1663H3.66671C3.20647 21.1663 2.83337 20.7933 2.83337 20.333V3.66634ZM4.50004 4.49967V19.4997H19.5V4.49967H4.50004Z"
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
