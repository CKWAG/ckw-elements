import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.checkbox),
    docs: {
      source: {
        transform: (code: string) => `import { Checkbox } from '@ckwag/elements';\n\n${code}`,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label next to the box.' },
    checked: {
      control: 'inline-radio',
      options: [false, true, 'indeterminate'],
      description: 'Checked state (controlled): false, true or "indeterminate".',
    },
    description: { control: 'text', description: 'Help text below the label.' },
    errorText: { control: 'text', description: 'Error text; shows the error state when set.' },
    disabled: { control: 'boolean', description: 'Disable the checkbox.' },
    defaultChecked: { control: false, table: { disable: true } },
    onCheckedChange: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  args: {
    label: 'Ich akzeptiere die AGB',
    checked: false,
    description: '',
    errorText: '',
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: 'Playground',
  render: function PlaygroundStory(args) {
    const [checked, setChecked] = React.useState(args.checked);
    React.useEffect(() => setChecked(args.checked), [args.checked]);
    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};
