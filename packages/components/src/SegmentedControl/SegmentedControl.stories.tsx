import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

/** Placeholder icon for demos (24×24 shield). */
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
  title: 'Components/Segmented Control/React',
  component: SegmentedControl,
  tags: ['!autodocs', '!dev'],
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
      description: 'The value of the currently active segment.',
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
    contentMode: 'label',
    activeValue: 'a',
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

// ---------------------------------------------------------------------------
// Shared layout styles
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

/** Wrapper component so hooks and segment references stay stable across re-renders. */
function PlaygroundRenderer({
  type,
  contentMode,
  segmentCount,
  labels,
}: {
  type: 'Default' | 'Fill';
  contentMode: 'label' | 'icon-label' | 'icon-compact';
  segmentCount: number;
  labels: string[];
}) {
  const showIcons = contentMode !== 'label';
  const values = ['a', 'b', 'c', 'd', 'e'];

  const segments = React.useMemo(() => {
    const icon = showIcons ? <PlaceholderIcon /> : undefined;
    return values.slice(0, segmentCount).map((v, i) => ({
      value: v,
      label: labels[i] || `Segment ${i + 1}`,
      ...(icon ? { icon } : {}),
    }));
  }, [segmentCount, showIcons, labels[0], labels[1], labels[2], labels[3], labels[4]]);

  const [active, setActive] = React.useState('a');

  // Reset active if it falls outside the new count
  React.useEffect(() => {
    const validValues = values.slice(0, segmentCount);
    if (!validValues.includes(active)) {
      setActive(validValues[0]);
    }
  }, [segmentCount, active]);

  return (
    <div style={{ maxWidth: '600px' }}>
      <SegmentedControl
        type={type}
        contentMode={contentMode}
        segments={segments}
        activeValue={active}
        onChange={setActive}
      />
    </div>
  );
}

interface PlaygroundArgs {
  type: 'Default' | 'Fill';
  contentMode: 'label' | 'icon-label' | 'icon-compact';
  segmentCount: number;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
  label5: string;
}

/** Interactive playground — use the controls panel to change props. */
export const Playground: StoryObj<PlaygroundArgs> = {
  argTypes: {
    segmentCount: {
      control: { type: 'range', min: 2, max: 5, step: 1 },
      description: 'Number of segments to display.',
      table: { defaultValue: { summary: '3' }, category: 'Segments' },
    },
    label1: {
      control: 'text',
      description: 'Label for segment 1.',
      table: { category: 'Segments' },
    },
    label2: {
      control: 'text',
      description: 'Label for segment 2.',
      table: { category: 'Segments' },
    },
    label3: {
      control: 'text',
      description: 'Label for segment 3.',
      table: { category: 'Segments' },
    },
    label4: {
      control: 'text',
      description: 'Label for segment 4.',
      table: { category: 'Segments' },
    },
    label5: {
      control: 'text',
      description: 'Label for segment 5.',
      table: { category: 'Segments' },
    },
    segments: { control: false, table: { disable: true } },
    onChange: { control: false, table: { disable: true } },
    activeValue: { control: false, table: { disable: true } },
  } as Record<string, unknown>,
  args: {
    segmentCount: 3,
    label1: 'Label',
    label2: 'Label',
    label3: 'Label',
    label4: 'Label',
    label5: 'Label',
  } as Record<string, unknown>,
  render: (args) => (
    <PlaygroundRenderer
      type={(args.type as 'Default' | 'Fill') || 'Default'}
      contentMode={(args.contentMode as 'label' | 'icon-label' | 'icon-compact') || 'label'}
      segmentCount={(args.segmentCount as number) || 3}
      labels={[
        args.label1 as string,
        args.label2 as string,
        args.label3 as string,
        args.label4 as string,
        args.label5 as string,
      ]}
    />
  ),
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Default (auto-width) and Fill (equal-width stretch) layout types. */
export const Types: Story = {
  render: () => {
    const segments5 = [
      { value: 'a', label: 'Label' },
      { value: 'b', label: 'Label' },
      { value: 'c', label: 'Label' },
      { value: 'd', label: 'Label' },
      { value: 'e', label: 'Label' },
    ];
    const segments3 = segments5.slice(0, 3);
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

// ---------------------------------------------------------------------------
// Icon Variants
// ---------------------------------------------------------------------------

/** Label only, Icon + Label, and Icon compact content modes. */
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

// ---------------------------------------------------------------------------
// States
// ---------------------------------------------------------------------------

/**
 * Individual segment states: Default, Hover, Active.
 * Renders standalone segments (not full controls) to isolate each state.
 * Hover is force-applied via inline background-color.
 */
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
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// All Variants
// ---------------------------------------------------------------------------

/** Complete matrix showing all type × content mode combinations. */
export const AllVariants: Story = {
  render: () => {
    const segments5 = [
      { value: 'a', label: 'Label', icon: <PlaceholderIcon /> },
      { value: 'b', label: 'Label', icon: <PlaceholderIcon /> },
      { value: 'c', label: 'Label', icon: <PlaceholderIcon /> },
      { value: 'd', label: 'Label', icon: <PlaceholderIcon /> },
      { value: 'e', label: 'Label', icon: <PlaceholderIcon /> },
    ];
    const segments3 = segments5.slice(0, 3);

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
        {/* Default type */}
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

        {/* Fill type */}
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
