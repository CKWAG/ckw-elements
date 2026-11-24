import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { Badge } from '../Badge/Badge';
import { Card, CardContent } from '../Card/Card';
import { KeyValueItem, KeyValueList } from './KeyValueList';
import type { KeyValueListLayout } from './KeyValueList';

interface KeyValueListPlaygroundArgs {
  layout: KeyValueListLayout;
  showBadge: boolean;
  showTotal: boolean;
  totalLabel: string;
  totalValue: string;
}

const meta: Meta<KeyValueListPlaygroundArgs> = {
  title: 'Components/Key-Value List',
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    design: getFigmaDesignParameter(figmaReferences.keyValueList),
    docs: {
      source: {
        transform: (code: string) =>
          `import { KeyValueItem, KeyValueList } from '@ckwag/elements';\n\n${code}`,
      },
    },
  },
  argTypes: {
    layout: {
      control: { type: 'inline-radio' },
      options: ['inline', 'stacked'],
      description: 'Inline: value right-aligned on the same row. Stacked: label above value.',
      table: { defaultValue: { summary: 'inline' } },
    },
    showBadge: { control: 'boolean', description: 'First value is a Badge.' },
    showTotal: { control: 'boolean', description: 'Adds a KeyValueItem with `total`.' },
    totalLabel: { control: 'text', if: { arg: 'showTotal' } },
    totalValue: { control: 'text', if: { arg: 'showTotal' } },
  },
  args: {
    layout: 'inline',
    showBadge: true,
    showTotal: false,
    totalLabel: 'Rechnungsbetrag (inkl. MWST)',
    totalValue: "4'880.40",
  },
};

export default meta;

type Story = StoryObj<KeyValueListPlaygroundArgs>;

export const Playground: Story = {
  name: 'Playground',
  render: ({ layout, showBadge, showTotal, totalLabel, totalValue }) => (
    <div
      style={{
        padding: 'var(--spacing-3xl)',
        borderRadius: 'var(--border-radius-s)',
        backgroundColor: 'var(--background-canvas)',
      }}
    >
      <Card padding="large" style={{ maxWidth: '400px' }}>
        <CardContent>
          <KeyValueList layout={layout}>
            <KeyValueItem label="Status">
              {showBadge ? (
                <Badge status="success" size="small">
                  Bezahlt
                </Badge>
              ) : (
                'Bezahlt'
              )}
            </KeyValueItem>
            <KeyValueItem label="Zeitraum">01.07.2026 – 31.10.2026</KeyValueItem>
            <KeyValueItem label="Rechnungs-Nr.">640757383</KeyValueItem>
            <KeyValueItem label="Zahlbar bis">30.11.2026</KeyValueItem>
            {showTotal && (
              <KeyValueItem label={totalLabel} total>
                {totalValue}
              </KeyValueItem>
            )}
          </KeyValueList>
        </CardContent>
      </Card>
    </div>
  ),
};
