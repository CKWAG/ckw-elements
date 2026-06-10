import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconPlaceholder } from '@ckwag/elements-icons';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { InputField } from './InputField';

const meta = {
  title: 'Components/Input Field',
  component: InputField,
  tags: ['!autodocs'],
  parameters: {
    design: getFigmaDesignParameter(figmaReferences.inputField),
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Basic input field with default label and placeholder. */
export const Basic: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
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
  alignItems: 'flex-start',
  flexWrap: 'wrap',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  minWidth: '80px',
  paddingTop: '12px',
};

const fieldWidth: React.CSSProperties = {
  width: '220px',
};

export const Empty: Story = {
  render: () => (
    <div style={sectionStyle}>
      {(
        [
          ['Default', {}],
          ['Hover', { className: 'ckw-input-field--state-hover' }],
          ['Active', { className: 'ckw-input-field--state-active' }],
          ['Focus visible', { className: 'ckw-input-field--state-focus-visible' }],
          ['Error', { errorText: 'Error text' }],
          ['Disabled', { disabled: true }],
        ] as const
      ).map(([stateLabel, props]) => (
        <div key={stateLabel} style={rowStyle}>
          <span style={labelStyle}>{stateLabel}</span>
          <div style={fieldWidth}>
            <InputField {...props} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Filled: Story = {
  render: () => (
    <div style={sectionStyle}>
      {(
        [
          ['Default', { value: 'Input' }],
          ['Hover', { value: 'Input', className: 'ckw-input-field--state-hover' }],
          ['Active', { value: 'Input', className: 'ckw-input-field--state-active' }],
          ['Focus visible', { value: 'Input', className: 'ckw-input-field--state-focus-visible' }],
          ['Error', { value: 'Input', errorText: 'Error text' }],
          ['Disabled', { value: 'Input', disabled: true }],
        ] as const
      ).map(([stateLabel, props]) => (
        <div key={stateLabel} style={rowStyle}>
          <span style={labelStyle}>{stateLabel}</span>
          <div style={fieldWidth}>
            <InputField {...props} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Specials: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Icon</span>
        <div style={fieldWidth}>
          <InputField value="Input" icon={<IconPlaceholder size={20} />} />
        </div>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Optional</span>
        <div style={fieldWidth}>
          <InputField value="Input" optional />
        </div>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Info</span>
        <div style={fieldWidth}>
          <InputField value="Input" showInfo />
        </div>
      </div>
    </div>
  ),
};

/** Controlled example showing how application state owns the input value. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('Initial value');

    return (
      <div style={{ width: '320px' }}>
        <InputField
          label="Controlled input"
          placeholder="Type something"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const states: Array<[string, Record<string, unknown>]> = [
      ['Default', {}],
      ['Hover', { className: 'ckw-input-field--state-hover' }],
      ['Active', { className: 'ckw-input-field--state-active' }],
      ['Focus visible', { className: 'ckw-input-field--state-focus-visible' }],
      ['Error', { errorText: 'Error text' }],
      ['Disabled', { disabled: true }],
    ];

    const cellStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '8px 0',
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 1fr',
            gap: '12px 24px',
            alignItems: 'start',
          }}
        >
          <div />
          <div style={headerStyle}>Empty</div>
          <div style={headerStyle}>Filled</div>

          {states.map(([stateLabel, props]) => (
            <React.Fragment key={stateLabel}>
              <span style={labelStyle}>{stateLabel}</span>
              <div style={cellStyle}>
                <div style={fieldWidth}>
                  <InputField {...props} />
                </div>
              </div>
              <div style={cellStyle}>
                <div style={fieldWidth}>
                  <InputField value="Input" {...props} />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
};
