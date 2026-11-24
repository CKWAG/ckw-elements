import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { Select } from './Select';
import type { SelectOption } from './Select';

const contracts: SelectOption[] = [
  { value: 'kreuzmatt', label: 'Kreuzmatt 10, 6242 Wauwil' },
  { value: 'zurlinden', label: 'Zurlindenstrasse 11, 1. OG' },
  { value: 'seestrasse', label: 'Seestrasse 3, 6006 Luzern' },
  { value: 'archiv', label: 'Alter Vertrag (beendet)', disabled: true },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['!autodocs'],
  parameters: {
    design: getFigmaDesignParameter(figmaReferences.select),
    docs: { source: { type: 'dynamic' } },
  },
  args: {
    label: 'Vertrag',
    options: contracts,
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
  alignItems: 'flex-start',
};

const labelStyle: React.CSSProperties = {
  textTransform: 'capitalize',
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  minWidth: '120px',
  paddingTop: '32px',
};

const fieldWidth: React.CSSProperties = { width: '320px' };

/** Basic select with placeholder; open it with a click or Space / Enter / arrow keys. */
export const Basic: Story = {
  render: (args) => (
    <div style={fieldWidth}>
      <Select {...args} />
    </div>
  ),
};

/** States share their look with Input Field. Hover and focus are forced for documentation. */
export const States: Story = {
  render: () => (
    <div style={sectionStyle}>
      {[
        { name: 'empty', props: {} },
        { name: 'filled', props: { defaultValue: 'kreuzmatt' } },
        {
          name: 'hover',
          props: { defaultValue: 'kreuzmatt', className: 'ckw-input-field--state-hover' },
        },
        {
          name: 'focus',
          props: { defaultValue: 'kreuzmatt', className: 'ckw-input-field--state-active' },
        },
        { name: 'error', props: { errorText: 'Bitte wählen Sie einen Vertrag.' } },
        { name: 'disabled', props: { defaultValue: 'kreuzmatt', disabled: true } },
      ].map(({ name, props }) => (
        <div key={name} style={rowStyle}>
          <span style={labelStyle}>{name}</span>
          <div style={fieldWidth}>
            <Select label="Vertrag" options={contracts} {...props} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/** Optional hint, info button and help text, as in Input Field. */
export const Specials: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Optional</span>
        <div style={fieldWidth}>
          <Select label="Vertrag" options={contracts} optional />
        </div>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Info</span>
        <div style={fieldWidth}>
          <Select label="Vertrag" options={contracts} showInfo />
        </div>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Description</span>
        <div style={fieldWidth}>
          <Select
            label="Vertrag"
            options={contracts}
            description="Wählen Sie den Vertrag, für den die Rechnung gilt."
          />
        </div>
      </div>
    </div>
  ),
};

/** Controlled example: the application owns the selected value. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('zurlinden');

    return (
      <div style={{ ...fieldWidth, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Select label="Vertrag" options={contracts} value={value} onValueChange={setValue} />
        <span style={{ fontFamily: 'var(--font-family-brand)', color: 'var(--text-secondary)' }}>
          Ausgewählt: {value}
        </span>
      </div>
    );
  },
};

/**
 * The list opened, to compare with the Figma Active variant. Rendered in its own iframe in the docs,
 * because an open Radix Select locks scrolling and pointer events on the whole page.
 */
export const Open: Story = {
  parameters: {
    docs: { story: { inline: false, height: '320px' } },
  },
  render: () => (
    <div style={{ ...fieldWidth, height: '280px' }}>
      <Select label="Vertrag" options={contracts} defaultValue="kreuzmatt" defaultOpen />
    </div>
  ),
};
