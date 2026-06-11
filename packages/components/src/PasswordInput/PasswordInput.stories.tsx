import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { PasswordInput } from './PasswordInput';

const meta = {
  title: 'Components/Password Input',
  component: PasswordInput,
  tags: ['!autodocs'],
  parameters: {
    design: getFigmaDesignParameter(figmaReferences.inputField),
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Basic password input with hidden value by default. */
export const Basic: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    autoComplete: 'current-password',
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
  width: '260px',
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
          ['Error', { errorText: 'Password is required' }],
          ['Disabled', { disabled: true }],
        ] as const
      ).map(([stateLabel, props]) => (
        <div key={stateLabel} style={rowStyle}>
          <span style={labelStyle}>{stateLabel}</span>
          <div style={fieldWidth}>
            <PasswordInput label="Password" placeholder="Enter password" {...props} />
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
          ['Hidden', { defaultValue: 'correct-horse-battery-staple' }],
          ['Visible', { defaultValue: 'correct-horse-battery-staple', defaultVisible: true }],
          ['Error', { defaultValue: 'short', errorText: 'Use at least 12 characters' }],
          ['Disabled', { defaultValue: 'locked-password', disabled: true }],
        ] as const
      ).map(([stateLabel, props]) => (
        <div key={stateLabel} style={rowStyle}>
          <span style={labelStyle}>{stateLabel}</span>
          <div style={fieldWidth}>
            <PasswordInput label="Password" {...props} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/** Controlled example showing how application state can own both value and visibility. */
export const Controlled: Story = {
  render: () => {
    const [password, setPassword] = React.useState('Initial value');
    const [visible, setVisible] = React.useState(false);

    return (
      <div style={{ width: '320px' }}>
        <PasswordInput
          label="Controlled password"
          placeholder="Enter password"
          name="password"
          required
          autoComplete="current-password"
          value={password}
          visible={visible}
          onChange={(event) => setPassword(event.target.value)}
          onVisibilityChange={setVisible}
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
      ['Error', { errorText: 'Password is required' }],
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
          <div style={headerStyle}>Hidden</div>
          <div style={headerStyle}>Visible</div>

          {states.map(([stateLabel, props]) => (
            <React.Fragment key={stateLabel}>
              <span style={labelStyle}>{stateLabel}</span>
              <div style={cellStyle}>
                <div style={fieldWidth}>
                  <PasswordInput label="Password" defaultValue="Password" {...props} />
                </div>
              </div>
              <div style={cellStyle}>
                <div style={fieldWidth}>
                  <PasswordInput
                    label="Password"
                    defaultValue="Password"
                    defaultVisible
                    {...props}
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
};
