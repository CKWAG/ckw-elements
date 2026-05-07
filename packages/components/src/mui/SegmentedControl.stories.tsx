import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

function PlaygroundRenderer({ type }: { type: 'Default' | 'Fill' }) {
  const [active, setActive] = React.useState('a');

  const segments = [
    { value: 'a', label: 'Label' },
    { value: 'b', label: 'Label' },
    { value: 'c', label: 'Label' },
  ];

  return (
    <div style={{ maxWidth: '600px' }}>
      <SegmentedControl type={type} segments={segments} activeValue={active} onChange={setActive} />
    </div>
  );
}

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/Segmented Control',
  component: SegmentedControl,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        transform: (code: string) => {
          const indent = code.replace(/^/gm, '  ');
          return `import { ThemeProvider } from '@mui/material/styles';\nimport { ckwTheme } from '@ckw-elements/components/mui/theme';\nimport { SegmentedControl } from '@ckw-elements/components/mui';\n\n<ThemeProvider theme={ckwTheme}>\n${indent}\n</ThemeProvider>`;
        },
      },
    },
  },
  argTypes: {
    type: {
      name: 'Type',
      description: 'Layout type. Default = auto-width segments; Fill = equal-width stretch.',
      control: { type: 'inline-radio' },
      options: ['Default', 'Fill'],
      table: { category: 'General', defaultValue: { summary: 'Default' } },
    },
    activeValue: {
      name: 'Active value',
      description: 'The value of the currently active segment.',
      control: { type: 'text' },
      table: { category: 'General' },
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
    activeValue: 'a',
  },
};

export default meta;

interface PlaygroundArgs {
  type: 'Default' | 'Fill';
}

export const MUIPlayground: StoryObj<PlaygroundArgs> = {
  name: 'MUI Playground',
  render: (args) => <PlaygroundRenderer type={(args.type as 'Default' | 'Fill') || 'Default'} />,
};
