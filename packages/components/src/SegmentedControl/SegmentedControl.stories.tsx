import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconPlaceholder } from '@ckwag/elements-icons';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { SegmentedControl } from './SegmentedControl';

const defaultSegments = [
  { value: 'a', label: 'Label' },
  { value: 'b', label: 'Label' },
  { value: 'c', label: 'Label' },
];

const meta = {
  title: 'Components/Segmented Control',
  component: SegmentedControl,
  tags: ['!autodocs'],
  parameters: {
    design: getFigmaDesignParameter(figmaReferences.segmentedControl),
    docs: {
      source: {
        transform: (code: string) =>
          `import { SegmentedControl } from '@ckwag/elements';\n\n${code}`,
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['Default', 'Fill'],
      description: 'Layout type. Default = auto-width; Fill = equal-width stretch.',
      table: { defaultValue: { summary: 'Default' } },
    },
    contentMode: {
      control: 'radio',
      options: ['label', 'icon-label', 'icon-compact'],
      description: 'Content display mode for segments.',
      table: { defaultValue: { summary: 'label' } },
    },
    activeValue: {
      control: 'text',
      description: 'The currently active segment value.',
      table: { defaultValue: { summary: 'a' } },
    },
    segments: { control: false, table: { disable: true } },
    onChange: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    segments: defaultSegments,
    type: 'Default',
    contentMode: 'label',
    activeValue: 'a',
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Basic segmented control with three label-only segments. */
export const Basic: Story = {
  args: {
    segments: defaultSegments,
    activeValue: 'a',
  },
};

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
      { value: 'a', label: 'Label', icon: <IconPlaceholder /> },
      { value: 'b', label: 'Label', icon: <IconPlaceholder /> },
      { value: 'c', label: 'Label', icon: <IconPlaceholder /> },
    ];
    return (
      <div style={sectionStyle}>
        <div style={rowStyle}>
          <span style={labelStyle}>Label only</span>
          <SegmentedControl segments={segments} activeValue="a" contentMode="label" />
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Icon + Label</span>
          <SegmentedControl segments={segments} activeValue="a" contentMode="icon-label" />
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Icon compact</span>
          <SegmentedControl segments={segments} activeValue="a" contentMode="icon-compact" />
        </div>
      </div>
    );
  },
};

/** Controlled example showing how application state owns the active segment. */
export const Controlled: Story = {
  render: () => {
    const [activeValue, setActiveValue] = React.useState('list');
    const segments = [
      { value: 'list', label: 'List' },
      { value: 'grid', label: 'Grid' },
      { value: 'map', label: 'Map' },
    ];

    return (
      <SegmentedControl
        segments={segments}
        activeValue={activeValue}
        onChange={setActiveValue}
        type="Default"
      />
    );
  },
};

export const States: Story = {
  render: () => {
    const segmentBase: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'var(--spacing-2xl)',
      padding: 'var(--spacing-2xs) var(--spacing-m)',
      borderRadius: 'var(--border-radius-full)',
      border: 'var(--border-weight-s) solid transparent',
      background: 'none',
      fontFamily: 'var(--font-family-brand), sans-serif',
      fontSize: 'var(--label-m-size)',
      lineHeight: 'var(--label-m-height)',
      fontWeight: 'var(--label-m-weight)' as unknown as number,
      color: 'var(--text-secondary)',
      cursor: 'default',
    };

    const hoverStyle: React.CSSProperties = {
      ...segmentBase,
      backgroundColor: 'var(--background-hover)',
    };

    const activeStyle: React.CSSProperties = {
      ...segmentBase,
      backgroundColor: 'var(--background-active)',
      borderColor: 'var(--border-active)',
      color: 'var(--text-on-interactive-secondary)',
    };

    const focusVisibleStyle: React.CSSProperties = {
      ...segmentBase,
      outline: 'var(--border-weight-m) solid var(--border-active)',
      outlineOffset: '2px',
    };

    const disabledStyle: React.CSSProperties = {
      ...segmentBase,
      color: 'var(--text-tertiary)',
      backgroundColor: 'var(--background-canvas)',
      borderColor: 'var(--border-soft)',
      cursor: 'not-allowed',
    };

    return (
      <div style={sectionStyle}>
        <div style={rowStyle}>
          <span style={labelStyle}>Default</span>
          <span style={segmentBase}>Label</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Hover</span>
          <span style={hoverStyle}>Label</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Active</span>
          <span style={activeStyle}>Label</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Focus visible</span>
          <span style={focusVisibleStyle}>Label</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Disabled</span>
          <span style={disabledStyle}>Label</span>
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const segments3 = [
      { value: 'a', label: 'Label', icon: <IconPlaceholder /> },
      { value: 'b', label: 'Label', icon: <IconPlaceholder /> },
      { value: 'c', label: 'Label', icon: <IconPlaceholder /> },
    ];

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
              <SegmentedControl segments={segments3} activeValue="a" contentMode="label" />
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Icon + Label</span>
              <SegmentedControl segments={segments3} activeValue="a" contentMode="icon-label" />
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Icon compact</span>
              <SegmentedControl segments={segments3} activeValue="a" contentMode="icon-compact" />
            </div>
          </div>
        </div>

        <div>
          <div style={headerStyle}>Fill</div>
          <div style={groupStyle}>
            <div style={rowStyle}>
              <span style={labelStyle}>Label only</span>
              <div style={{ flex: 1 }}>
                <SegmentedControl
                  segments={segments3}
                  activeValue="a"
                  type="Fill"
                  contentMode="label"
                />
              </div>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Icon + Label</span>
              <div style={{ flex: 1 }}>
                <SegmentedControl
                  segments={segments3}
                  activeValue="a"
                  type="Fill"
                  contentMode="icon-label"
                />
              </div>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Icon compact</span>
              <div style={{ flex: 1 }}>
                <SegmentedControl
                  segments={segments3}
                  activeValue="a"
                  type="Fill"
                  contentMode="icon-compact"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
