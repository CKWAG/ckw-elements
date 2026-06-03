import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { iconNames } from '@ckw-elements/icons';
import type { IconName } from '@ckw-elements/icons';
import { IconPlayground } from '../components/IconCopyGrid';

interface IconStoryProps {
  name: IconName;
  size: number;
  ariaLabel: string;
}

/**
 * Storybook wrapper for the CKW Elements Icon API.
 */
function IconPlaygroundStory({ name, size, ariaLabel }: IconStoryProps) {
  return (
    <div className="sb-unstyled">
      <IconPlayground name={name} size={size} ariaLabel={ariaLabel} showControls={false} />
    </div>
  );
}

const meta = {
  title: 'Components/Icon',
  component: IconPlaygroundStory,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: {
      name: 'Icon',
      control: { type: 'select' },
      options: iconNames,
      description: 'Icon name from @ckw-elements/icons.',
      table: { category: 'General', defaultValue: { summary: 'search' } },
    },
    size: {
      name: 'Size',
      control: { type: 'number', min: 12, max: 64, step: 4 },
      description: 'Rendered icon size in pixels.',
      table: { category: 'General', defaultValue: { summary: '24' } },
    },
    ariaLabel: {
      name: 'ARIA label',
      control: { type: 'text' },
      description: 'Accessible label. Leave empty for decorative icons.',
      table: { category: 'Accessibility' },
    },
  },
  args: {
    name: 'search',
    size: 24,
    ariaLabel: '',
  },
} satisfies Meta<typeof IconPlaygroundStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReactPlayground: Story = {
  name: 'React Playground',
};
