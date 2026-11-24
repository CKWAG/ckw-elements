import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { RadioGroup } from './RadioGroup';
import type { RadioGroupOption } from './RadioGroup';

const housing: RadioGroupOption[] = [
  { value: 'wohnung', label: 'Wohnung' },
  { value: 'einfamilienhaus', label: 'Einfamilienhaus' },
  { value: 'mehrfamilienhaus', label: 'Mehrfamilienhaus' },
];

const meta = {
  title: 'Components/Radio Group',
  component: RadioGroup,
  tags: ['!autodocs'],
  parameters: {
    design: getFigmaDesignParameter(figmaReferences.radioGroup),
    docs: { source: { type: 'dynamic' } },
  },
  args: {
    label: 'Wie wohnen Sie?',
    options: housing,
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const groupsStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '48px',
};

/** Basic group; Tab moves into the group, the arrow keys move and select. */
export const Basic: Story = {
  args: { defaultValue: 'wohnung' },
};

/** States. Hover and focus are forced for documentation (on all options / the checked one). */
export const States: Story = {
  render: () => (
    <div style={groupsStyle}>
      <RadioGroup label="Default" options={housing} defaultValue="wohnung" />
      <RadioGroup
        label="Hover"
        options={housing}
        defaultValue="wohnung"
        className="ckw-radio-group--state-hover"
      />
      <RadioGroup
        label="Focus"
        options={housing}
        defaultValue="wohnung"
        className="ckw-radio-group--state-focus"
      />
      <RadioGroup label="Error" options={housing} errorText="Bitte wählen Sie eine Option." />
      <RadioGroup label="Disabled" options={housing} defaultValue="wohnung" disabled />
    </div>
  ),
};

/** Group help text below the question and help text per option. */
export const WithDescription: Story = {
  name: 'Description',
  args: {
    description: 'Wählen Sie die Wohnform, die am besten passt.',
    options: [
      { value: 'wohnung', label: 'Wohnung', description: 'Miete oder Stockwerkeigentum.' },
      {
        value: 'einfamilienhaus',
        label: 'Einfamilienhaus',
        description: 'Freistehend, ohne weitere Wohnungen.',
      },
      { value: 'mehrfamilienhaus', label: 'Mehrfamilienhaus', disabled: true },
    ],
  },
};

/** Optional hint and info button, exactly like Input Field. */
export const Specials: Story = {
  args: { optional: true, showInfo: true },
};

/** Controlled: the selected value lives in the parent. */
export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = React.useState('einfamilienhaus');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioGroup {...args} value={value} onValueChange={setValue} />
        <span style={{ fontFamily: 'var(--font-family-brand), sans-serif', fontSize: '14px' }}>
          Gewählt: {value}
        </span>
      </div>
    );
  },
};
