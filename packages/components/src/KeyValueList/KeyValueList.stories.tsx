import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { Badge } from '../Badge/Badge';
import { Card, CardContent } from '../Card/Card';
import { KeyValueItem, KeyValueList } from './KeyValueList';

const meta = {
  title: 'Components/Key-Value List',
  component: KeyValueList,
  tags: ['!autodocs'],
  parameters: {
    design: getFigmaDesignParameter(figmaReferences.keyValueList),
    docs: { source: { type: 'dynamic' } },
  },
  args: {
    children: null,
  },
} satisfies Meta<typeof KeyValueList>;

export default meta;

type Story = StoryObj<typeof meta>;

const canvasStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-xl)',
  alignItems: 'flex-start',
  padding: 'var(--spacing-3xl)',
  borderRadius: 'var(--border-radius-s)',
  backgroundColor: 'var(--background-canvas)',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: 'var(--label-s-size)',
  fontWeight: 'var(--label-s-weight)',
  color: 'var(--text-secondary)',
  marginBottom: 'var(--spacing-xs)',
};

/** Invoice details: inline rows, values right-aligned, a Badge as value. */
export const Inline: Story = {
  render: () => (
    <div style={canvasStyle}>
      <Card padding="large" style={{ width: '360px' }}>
        <CardContent>
          <KeyValueList>
            <KeyValueItem label="Status">
              <Badge status="success" size="small">
                Bezahlt
              </Badge>
            </KeyValueItem>
            <KeyValueItem label="Zeitraum">01.07.2026 – 31.10.2026</KeyValueItem>
            <KeyValueItem label="Rechnungs-Nr.">640757383</KeyValueItem>
            <KeyValueItem label="Zahlbar bis">30.11.2026</KeyValueItem>
          </KeyValueList>
        </CardContent>
      </Card>
    </div>
  ),
};

/** Stacked puts the label above the value, for narrow cards such as the invoice cards. */
export const Stacked: Story = {
  render: () => (
    <div style={canvasStyle}>
      <Card style={{ width: '240px' }}>
        <CardContent>
          <KeyValueList layout="stacked">
            <KeyValueItem label="Rechnungsnummer">620955583</KeyValueItem>
            <KeyValueItem label="Zahlbar bis">30.11.2026</KeyValueItem>
            <KeyValueItem label="Status">
              <Badge status="error" size="small">
                Überfällig
              </Badge>
            </KeyValueItem>
          </KeyValueList>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * Cost breakdown with an emphasized total. Amounts use tabular figures so the digits line up;
 * credits keep the minus sign and no colour.
 */
export const Total: Story = {
  render: () => (
    <div style={canvasStyle}>
      <Card padding="large" style={{ width: '400px' }}>
        <CardContent>
          <KeyValueList>
            <KeyValueItem label="Total Bezug">5&apos;956.22</KeyValueItem>
            <KeyValueItem label="MWST Bezug 8.1%">482.45</KeyValueItem>
            <KeyValueItem label="Gutschriftsbetrag">-1&apos;441.50</KeyValueItem>
            <KeyValueItem label="MWST Gutschrift 8.1%">-116.76</KeyValueItem>
            <KeyValueItem label="Rundungsdifferenz">-0.01</KeyValueItem>
            <KeyValueItem label="Rechnungsbetrag (inkl. MWST)" total>
              4&apos;880.40
            </KeyValueItem>
          </KeyValueList>
        </CardContent>
      </Card>
    </div>
  ),
};

/** Both layouts side by side, with and without a total row. */
export const AllVariants: Story = {
  render: () => (
    <div style={canvasStyle}>
      {(['inline', 'stacked'] as const).map((layout) => (
        <div key={layout}>
          <div style={labelStyle}>{layout}</div>
          <Card style={{ width: '300px' }}>
            <CardContent>
              <KeyValueList layout={layout}>
                <KeyValueItem label="Status">
                  <Badge status="neutral" size="small">
                    Offen
                  </Badge>
                </KeyValueItem>
                <KeyValueItem label="Rechnungs-Nr.">640757383</KeyValueItem>
                <KeyValueItem label="Zahlbar bis">30.11.2026</KeyValueItem>
                <KeyValueItem label="Betrag" total>
                  CHF 91.70
                </KeyValueItem>
              </KeyValueList>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  ),
};
