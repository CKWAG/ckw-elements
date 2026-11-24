import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconBarGraph } from '@ckwag/elements-icons';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { KeyValueItem, KeyValueList } from '../KeyValueList/KeyValueList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import type { CardPadding } from './Card';

interface CardPlaygroundArgs {
  padding: CardPadding;
  interactive: boolean;
  showChevron: boolean;
  showHeader: boolean;
  showIcon: boolean;
  title: string;
  showDescription: boolean;
  description: string;
}

const meta: Meta<CardPlaygroundArgs> = {
  title: 'Components/Card',
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.card),
    docs: {
      source: {
        transform: (code: string) =>
          `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ckwag/elements';\n\n${code}`,
      },
    },
  },
  argTypes: {
    padding: {
      control: { type: 'inline-radio' },
      options: ['medium', 'large'],
      description: 'Inner padding: medium 16px, large 24px.',
      table: { defaultValue: { summary: 'medium' } },
    },
    interactive: {
      control: 'boolean',
      description: 'Sets `href`, which makes the whole card a link.',
      table: { defaultValue: { summary: 'false' } },
    },
    showChevron: {
      control: 'boolean',
      description: 'Chevron in the header of an interactive card.',
      table: { defaultValue: { summary: 'true' } },
      if: { arg: 'interactive' },
    },
    showHeader: { control: 'boolean', description: 'Renders CardHeader.' },
    showIcon: {
      control: 'boolean',
      description: 'Leading icon tile in the header (`CardHeader icon`).',
      table: { defaultValue: { summary: 'false' } },
      if: { arg: 'showHeader' },
    },
    title: { control: 'text', description: 'CardTitle text.', if: { arg: 'showHeader' } },
    showDescription: {
      control: 'boolean',
      description: 'Renders CardDescription.',
      if: { arg: 'showHeader' },
    },
    description: {
      control: 'text',
      description: 'CardDescription text.',
      if: { arg: 'showDescription' },
    },
  },
  args: {
    padding: 'medium',
    interactive: false,
    showChevron: true,
    showHeader: true,
    showIcon: false,
    title: 'Rechnung',
    showDescription: true,
    description: '01.07.2026 – 31.10.2026',
  },
};

export default meta;

type Story = StoryObj<CardPlaygroundArgs>;

export const Playground: Story = {
  name: 'Playground',
  render: ({
    padding,
    interactive,
    showChevron,
    showHeader,
    showIcon,
    title,
    showDescription,
    description,
  }) => (
    <div
      style={{
        padding: 'var(--spacing-3xl)',
        borderRadius: 'var(--border-radius-s)',
        backgroundColor: 'var(--background-canvas)',
      }}
    >
      <Card
        padding={padding}
        href={interactive ? '#' : undefined}
        showChevron={showChevron}
        style={{ maxWidth: '360px' }}
      >
        {showHeader && (
          <CardHeader icon={showIcon ? <IconBarGraph /> : undefined}>
            <CardTitle>{title}</CardTitle>
            {showDescription && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>
          <KeyValueList>
            <KeyValueItem label="Rechnungs-Nr.">640757383</KeyValueItem>
            <KeyValueItem label="Zahlbar bis">30.11.2026</KeyValueItem>
            <KeyValueItem label="Betrag">CHF 91.70</KeyValueItem>
          </KeyValueList>
        </CardContent>
      </Card>
    </div>
  ),
};
