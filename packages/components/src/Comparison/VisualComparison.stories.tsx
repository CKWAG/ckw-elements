import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

// React (CSS-based) components
import { Button as ReactButton } from '../Button/Button';
import { InputField as ReactInputField } from '../InputField/InputField';
import { SegmentedControl as ReactSegmentedControl } from '../SegmentedControl/SegmentedControl';

// MUI-based components
import { Button as MuiButton } from '../mui/Button';
import { InputField as MuiInputField } from '../mui/InputField';
import { SegmentedControl as MuiSegmentedControl } from '../mui/SegmentedControl';

// ---------------------------------------------------------------------------
// Shared layout styles
// ---------------------------------------------------------------------------

const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
  padding: '24px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  color: 'var(--text-primary)',
  margin: 0,
  paddingBottom: '16px',
  borderBottom: '1px solid var(--border-soft)',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '100px auto auto',
  gap: '16px 24px',
  alignItems: 'start',
  width: 'fit-content',
};

const columnHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  textAlign: 'center',
  padding: '0 0 8px 0',
};

const rowLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: '13px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  paddingTop: '12px',
};

const cellStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
  borderRadius: '8px',
  backgroundColor: 'var(--background-default)',
  minHeight: '56px',
};

const subHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: 'var(--text-primary)',
  margin: '24px 0 12px 0',
};

// ---------------------------------------------------------------------------
// Placeholder icon
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Tests/Visual Comparison',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ---------------------------------------------------------------------------
// Button Comparison
// ---------------------------------------------------------------------------

/** Side-by-side comparison of React and MUI Button across all variants, sizes, and states. */
export const ButtonComparison: StoryObj = {
  name: 'Button',
  render: () => {
    const variants = ['Primary', 'Secondary', 'Tertiary'] as const;
    const sizes = ['Large', 'Medium', 'Small'] as const;
    const forcedStateClassMap = {
      Hover: 'ckw-button--state-hover',
      Active: 'ckw-button--state-active',
      'Focus visible': 'ckw-button--state-focus-visible',
      Disabled: '',
    } as const;
    const getForcedStateSx = (
      variant: (typeof variants)[number],
      state: 'Hover' | 'Active' | 'Focus visible' | 'Disabled',
    ) => {
      if (state === 'Focus visible') {
        return {
          outline: 'var(--border-weight-m) solid var(--border-active)',
          outlineOffset: '2px',
        };
      }

      if (state === 'Disabled') {
        return {};
      }

      if (variant === 'Primary') {
        return {
          backgroundColor:
            state === 'Hover'
              ? 'var(--interactive-primary-hover)'
              : 'var(--interactive-primary-active)',
        };
      }

      if (variant === 'Secondary') {
        return {
          backgroundColor:
            state === 'Hover'
              ? 'var(--interactive-secondary-hover)'
              : 'var(--interactive-secondary-active)',
          borderColor: state === 'Active' ? 'var(--border-active)' : undefined,
          borderWidth: state === 'Active' ? 'var(--border-weight-m)' : undefined,
        };
      }

      return {
        backgroundColor:
          state === 'Hover'
            ? 'var(--interactive-secondary-hover)'
            : 'var(--interactive-secondary-active)',
      };
    };

    return (
      <div style={pageStyle}>
        <h2 style={sectionTitleStyle}>Button — React vs MUI</h2>

        {variants.map((variant) => (
          <div key={variant}>
            <div style={subHeadingStyle}>{variant}</div>
            <div style={gridStyle}>
              {/* Column headers */}
              <div />
              <div style={columnHeaderStyle}>React (CSS)</div>
              <div style={columnHeaderStyle}>MUI</div>

              {/* Default states */}
              {sizes.map((size) => (
                <React.Fragment key={`${variant}-${size}-default`}>
                  <span style={rowLabelStyle}>{size}</span>
                  <div style={cellStyle}>
                    <ReactButton type={variant} size={size}>
                      Label
                    </ReactButton>
                  </div>
                  <div style={cellStyle}>
                    <MuiButton variant={variant} size={size}>
                      Label
                    </MuiButton>
                  </div>
                </React.Fragment>
              ))}

              {/* Forced visual states (Large only) */}
              {(['Hover', 'Active', 'Focus visible', 'Disabled'] as const).map((state) => (
                <React.Fragment key={`${variant}-${state}`}>
                  <span style={rowLabelStyle}>
                    Large
                    <br />
                    <small style={{ opacity: 0.6 }}>{state}</small>
                  </span>
                  <div style={cellStyle}>
                    <ReactButton
                      type={variant}
                      size="Large"
                      className={forcedStateClassMap[state] || undefined}
                      disabled={state === 'Disabled'}
                    >
                      Label
                    </ReactButton>
                  </div>
                  <div style={cellStyle}>
                    <MuiButton
                      variant={variant}
                      size="Large"
                      disabled={state === 'Disabled'}
                      sx={getForcedStateSx(variant, state)}
                    >
                      Label
                    </MuiButton>
                  </div>
                </React.Fragment>
              ))}

              {/* With icons */}
              <React.Fragment>
                <span style={rowLabelStyle}>
                  Large
                  <br />
                  <small style={{ opacity: 0.6 }}>+ icon</small>
                </span>
                <div style={cellStyle}>
                  <ReactButton type={variant} size="Large" leadingIcon={<PlaceholderIcon />}>
                    Label
                  </ReactButton>
                </div>
                <div style={cellStyle}>
                  <MuiButton variant={variant} size="Large" startIcon={<PlaceholderIcon />}>
                    Label
                  </MuiButton>
                </div>
              </React.Fragment>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// InputField Comparison
// ---------------------------------------------------------------------------

/** Side-by-side comparison of React and MUI InputField across all states. */
export const InputFieldComparison: StoryObj = {
  name: 'Input Field',
  render: () => {
    const states: Array<{
      label: string;
      sharedProps: Record<string, unknown>;
      reactClassName?: string;
      muiSx?: Record<string, unknown>;
    }> = [
      { label: 'Default (empty)', sharedProps: {} },
      { label: 'Default (filled)', sharedProps: { value: 'Input text' } },
      {
        label: 'Hover',
        sharedProps: { value: 'Input text' },
        reactClassName: 'ckw-input-field--state-hover',
        muiSx: {
          '& .MuiOutlinedInput-root': {
            outline: 'var(--border-weight-m) solid var(--border-hover)',
            outlineOffset: '0px',
          },
        },
      },
      {
        label: 'Active',
        sharedProps: { value: 'Input text' },
        reactClassName: 'ckw-input-field--state-active',
        muiSx: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'var(--background-active)',
          },
          '& .MuiOutlinedInput-root fieldset': {
            borderColor: 'var(--border-active)',
            borderWidth: '2px',
          },
        },
      },
      {
        label: 'Focus visible',
        sharedProps: { value: 'Input text' },
        reactClassName: 'ckw-input-field--state-focus-visible',
        muiSx: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'var(--background-active)',
            outline: 'var(--border-weight-m) solid var(--border-hover)',
            outlineOffset: '0px',
            boxShadow: 'inset 0 0 0 1px var(--border-active)',
          },
          '& .MuiOutlinedInput-root fieldset': {
            borderColor: 'var(--border-active)',
            borderWidth: '2px',
          },
        },
      },
      { label: 'Error (empty)', sharedProps: { errorText: 'Error message' } },
      { label: 'Error (filled)', sharedProps: { value: 'Input text', errorText: 'Error message' } },
      { label: 'Disabled (empty)', sharedProps: { disabled: true } },
      { label: 'Disabled (filled)', sharedProps: { value: 'Input text', disabled: true } },
      { label: 'Optional', sharedProps: { value: 'Input text', optional: true } },
      { label: 'With icon', sharedProps: { value: 'Input text', icon: <SmallPlaceholderIcon /> } },
      { label: 'With info', sharedProps: { value: 'Input text', showInfo: true } },
    ];

    const fieldWidth = '240px';

    return (
      <div style={pageStyle}>
        <h2 style={sectionTitleStyle}>Input Field — React vs MUI</h2>
        <div style={gridStyle}>
          {/* Column headers */}
          <div />
          <div style={columnHeaderStyle}>React (CSS)</div>
          <div style={columnHeaderStyle}>MUI</div>

          {states.map(({ label, sharedProps, reactClassName, muiSx }) => (
            <React.Fragment key={label}>
              <span style={rowLabelStyle}>{label}</span>
              <div style={{ ...cellStyle, justifyContent: 'flex-start' }}>
                <div style={{ width: fieldWidth }}>
                  <ReactInputField {...sharedProps} className={reactClassName} />
                </div>
              </div>
              <div style={{ ...cellStyle, justifyContent: 'flex-start' }}>
                <div style={{ width: fieldWidth }}>
                  <MuiInputField {...sharedProps} sx={muiSx} />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// SegmentedControl Comparison
// ---------------------------------------------------------------------------

/** Side-by-side comparison of React and MUI SegmentedControl across types and modes. */
export const SegmentedControlComparison: StoryObj = {
  name: 'Segmented Control',
  render: () => {
    const segments3 = [
      { value: 'a', label: 'Label', icon: <PlaceholderIcon /> },
      { value: 'b', label: 'Label', icon: <PlaceholderIcon /> },
      { value: 'c', label: 'Label', icon: <PlaceholderIcon /> },
    ];
    const segmentsLabelOnly = [
      { value: 'a', label: 'Label' },
      { value: 'b', label: 'Label' },
      { value: 'c', label: 'Label' },
    ];

    const types = ['Default', 'Fill'] as const;
    const contentModes = ['label', 'icon-label'] as const;
    const stateRows: Array<{
      label: string;
      activeValue: string;
      reactClassName?: string;
      muiSx?: Record<string, unknown>;
    }> = [
      {
        label: 'Hover',
        activeValue: 'b',
        reactClassName: 'ckw-segmented-control--state-hover',
        muiSx: {
          '& .MuiToggleButtonGroup-grouped:first-of-type:not(.Mui-selected)': {
            backgroundColor: 'var(--background-hover)',
          },
        },
      },
      {
        label: 'Active',
        activeValue: 'b',
        muiSx: {},
      },
      {
        label: 'Focus visible',
        activeValue: 'a',
        reactClassName: 'ckw-segmented-control--state-focus-visible',
        muiSx: {
          '& .MuiToggleButtonGroup-grouped:first-of-type': {
            outline: 'var(--border-weight-m) solid var(--border-active)',
            outlineOffset: '2px',
          },
        },
      },
      {
        label: 'Disabled',
        activeValue: 'a',
        reactClassName: 'ckw-segmented-control--state-disabled',
        muiSx: {
          opacity: 0.4,
          pointerEvents: 'none',
        },
      },
    ] as const;

    return (
      <div style={pageStyle}>
        <h2 style={sectionTitleStyle}>Segmented Control — React vs MUI</h2>

        {types.map((type) => (
          <div key={type}>
            <div style={subHeadingStyle}>Type: {type}</div>
            <div style={gridStyle}>
              {/* Column headers */}
              <div />
              <div style={columnHeaderStyle}>React (CSS)</div>
              <div style={columnHeaderStyle}>MUI</div>

              {/* Active = first segment */}
              {contentModes.map((mode) => (
                <React.Fragment key={`${type}-${mode}-first`}>
                  <span style={rowLabelStyle}>
                    {mode}
                    <br />
                    <small style={{ opacity: 0.6 }}>active: 1st</small>
                  </span>
                  <div style={{ ...cellStyle, justifyContent: 'flex-start' }}>
                    <div style={{ width: type === 'Fill' ? '100%' : undefined }}>
                      <ReactSegmentedControl
                        segments={segments3}
                        activeValue="a"
                        type={type}
                        contentMode={mode}
                      />
                    </div>
                  </div>
                  <div style={{ ...cellStyle, justifyContent: 'flex-start' }}>
                    <div style={{ width: type === 'Fill' ? '100%' : undefined }}>
                      <MuiSegmentedControl
                        segments={mode === 'label' ? segmentsLabelOnly : segments3}
                        activeValue="a"
                        type={type}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}

              {stateRows.map((stateRow) => (
                <React.Fragment key={`${type}-${stateRow.label}`}>
                  <span style={rowLabelStyle}>
                    label
                    <br />
                    <small style={{ opacity: 0.6 }}>{stateRow.label}</small>
                  </span>
                  <div style={{ ...cellStyle, justifyContent: 'flex-start' }}>
                    <div style={{ width: type === 'Fill' ? '100%' : undefined }}>
                      <ReactSegmentedControl
                        segments={segments3}
                        activeValue={stateRow.activeValue}
                        type={type}
                        contentMode="label"
                        className={stateRow.reactClassName}
                      />
                    </div>
                  </div>
                  <div style={{ ...cellStyle, justifyContent: 'flex-start' }}>
                    <div style={{ width: type === 'Fill' ? '100%' : undefined }}>
                      <MuiSegmentedControl
                        segments={segmentsLabelOnly}
                        activeValue={stateRow.activeValue}
                        type={type}
                        sx={stateRow.muiSx}
                      />
                    </div>
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
