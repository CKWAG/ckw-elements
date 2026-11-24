import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['!autodocs'],
  parameters: {
    design: getFigmaDesignParameter(figmaReferences.checkbox),
    docs: { source: { type: 'dynamic' } },
  },
  args: {
    label: 'Wärmepumpe',
  },
} satisfies Meta<typeof Checkbox>;

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
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  minWidth: '160px',
  paddingTop: '2px',
};

const groupsStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '48px',
};

/** Single checkbox; click the box or the label, or press Space when it has focus. */
export const Basic: Story = {};

/** Unchecked, checked and indeterminate (only for a parent that selects all children). */
export const CheckedStates: Story = {
  name: 'Checked',
  render: () => (
    <div style={sectionStyle}>
      {[
        { name: 'Unchecked', props: {} },
        { name: 'Checked', props: { defaultChecked: true } },
        { name: 'Indeterminate', props: { defaultChecked: 'indeterminate' as const } },
      ].map(({ name, props }) => (
        <div key={name} style={rowStyle}>
          <span style={labelStyle}>{name}</span>
          <Checkbox label={name === 'Indeterminate' ? 'Alle Geräte' : 'Wärmepumpe'} {...props} />
        </div>
      ))}
    </div>
  ),
};

/** States. Hover and focus are forced for documentation. */
export const States: Story = {
  render: () => (
    <div style={sectionStyle}>
      {[
        { name: 'Default', props: {} },
        { name: 'Hover', props: { className: 'ckw-checkbox--state-hover' } },
        { name: 'Focus', props: { defaultChecked: true, className: 'ckw-checkbox--state-focus' } },
        {
          name: 'Error',
          props: { label: 'Ich akzeptiere die AGB', errorText: 'Bitte akzeptieren Sie die AGB.' },
        },
        { name: 'Disabled', props: { disabled: true } },
        { name: 'Disabled · Checked', props: { disabled: true, defaultChecked: true } },
      ].map(({ name, props }) => (
        <div key={name} style={rowStyle}>
          <span style={labelStyle}>{name}</span>
          <Checkbox label="Wärmepumpe" {...props} />
        </div>
      ))}
    </div>
  ),
};

/** Help text below the label, linked with aria-describedby. */
export const WithDescription: Story = {
  name: 'Description',
  args: {
    label: 'Newsletter abonnieren',
    description: 'Höchstens einmal pro Monat, jederzeit abbestellbar.',
  },
};

/** Checkbox Group: one question, several answers, one error text for the group. */
export const Group: Story = {
  render: () => (
    <div style={groupsStyle}>
      <CheckboxGroup label="Mit was kochen Sie?">
        <Checkbox label="Elektroherd" defaultChecked />
        <Checkbox label="Gasherd" />
        <Checkbox label="Keines dieser Geräte" />
      </CheckboxGroup>
      <CheckboxGroup label="Mit was kochen Sie?" description="Mehrfachauswahl möglich.">
        <Checkbox label="Elektroherd" defaultChecked />
        <Checkbox label="Gasherd" />
        <Checkbox label="Keines dieser Geräte" />
      </CheckboxGroup>
      <CheckboxGroup
        label="Mit was kochen Sie?"
        errorText="Bitte wählen Sie mindestens eine Option."
      >
        <Checkbox label="Elektroherd" />
        <Checkbox label="Gasherd" />
        <Checkbox label="Keines dieser Geräte" />
      </CheckboxGroup>
      <CheckboxGroup label="Mit was kochen Sie?" disabled>
        <Checkbox label="Elektroherd" defaultChecked />
        <Checkbox label="Gasherd" />
        <Checkbox label="Keines dieser Geräte" />
      </CheckboxGroup>
    </div>
  ),
};

const appliances = ['Wärmepumpe', 'Elektroauto', 'Batteriespeicher'];

/** "Select all" parent: indeterminate while only some children are checked (controlled). */
export const SelectAll: Story = {
  name: 'Select all',
  render: function SelectAllStory() {
    const [selected, setSelected] = React.useState<string[]>(['Wärmepumpe']);
    const all = selected.length === appliances.length;
    const parent = all ? true : selected.length ? 'indeterminate' : false;
    return (
      <CheckboxGroup label="Welche Geräte haben Sie?">
        <Checkbox
          label="Alle Geräte"
          checked={parent}
          onCheckedChange={() => setSelected(all ? [] : appliances)}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-s)',
            paddingLeft: 'calc(var(--spacing-l) + var(--spacing-xs))',
          }}
        >
          {appliances.map((item) => (
            <Checkbox
              key={item}
              label={item}
              checked={selected.includes(item)}
              onCheckedChange={(on) =>
                setSelected((prev) => (on ? [...prev, item] : prev.filter((x) => x !== item)))
              }
            />
          ))}
        </div>
      </CheckboxGroup>
    );
  },
};
