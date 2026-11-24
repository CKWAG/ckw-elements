import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.segmentedControl),
    docs: {
      source: {
        transform: (code: string) =>
          `import { SegmentedControl } from '@ckwag/elements';\n\n${code}`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'fill'],
      description: 'Layout variant. default = auto-width; fill = equal-width stretch.',
      table: { defaultValue: { summary: 'default' } },
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
    variant: 'default',
    contentMode: 'label',
    activeValue: 'a',
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: 'Playground',
  render: ({ variant, contentMode, activeValue }) => {
    const [currentValue, setCurrentValue] = React.useState(activeValue);
    const showIcons = contentMode !== 'label';
    const segments = [
      { value: 'a', label: 'Label', ...(showIcons ? { icon: <IconPlaceholder /> } : {}) },
      { value: 'b', label: 'Label', ...(showIcons ? { icon: <IconPlaceholder /> } : {}) },
      { value: 'c', label: 'Label', ...(showIcons ? { icon: <IconPlaceholder /> } : {}) },
    ];

    React.useEffect(() => {
      setCurrentValue(activeValue);
    }, [activeValue]);

    return (
      <div style={{ maxWidth: '600px' }}>
        <SegmentedControl
          variant={variant}
          contentMode={contentMode}
          segments={segments}
          activeValue={currentValue}
          onChange={setCurrentValue}
        />
      </div>
    );
  },
};
