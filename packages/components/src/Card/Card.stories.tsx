import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { KeyValueItem, KeyValueList } from '../KeyValueList/KeyValueList';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';
import type { CardPadding } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['!autodocs'],
  parameters: {
    design: getFigmaDesignParameter(figmaReferences.card),
    docs: { source: { type: 'dynamic' } },
  },
  args: {
    children: null,
  },
} satisfies Meta<typeof Card>;

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

const cardWidth: React.CSSProperties = { width: '320px' };

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: 'var(--label-s-size)',
  fontWeight: 'var(--label-s-weight)',
  color: 'var(--text-secondary)',
  marginBottom: 'var(--spacing-xs)',
};

const amountStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 'var(--spacing-2xs)',
};

const metricStyle: React.CSSProperties = {
  fontSize: 'var(--text-metric-s-emphasized-font-size)',
  fontWeight: 'var(--text-metric-s-emphasized-font-weight)',
  lineHeight: 'var(--text-metric-s-emphasized-line-height)',
};

const unitStyle: React.CSSProperties = {
  fontSize: 'var(--caption-size)',
  color: 'var(--text-secondary)',
};

/** Invoice details from the invoice detail page: a static card with a Key-Value List. */
function InvoiceInfoCard() {
  return (
    <Card padding="large" style={cardWidth}>
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
  );
}

interface KpiCardProps {
  title: string;
  value: string;
  unit: string;
  unitBefore?: boolean;
}

/** KPI card from the overview page: the whole card links to the detail page. */
function KpiCard({ title, value, unit, unitBefore = false }: KpiCardProps) {
  return (
    <Card href="#" style={cardWidth}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Okt. 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={amountStyle}>
          {unitBefore && <span style={unitStyle}>{unit}</span>}
          <span style={metricStyle}>{value}</span>
          {!unitBefore && <span style={unitStyle}>{unit}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

/** A static card bundles content; it has no hover and is not focusable. */
export const Static: Story = {
  render: () => (
    <div style={canvasStyle}>
      <InvoiceInfoCard />
    </div>
  ),
};

/**
 * With `href` the whole card is one link: shadow-s, hover shadow-m, focus ring and a
 * chevron in the header. Tab to a card to see the focus ring.
 */
export const Interactive: Story = {
  render: () => (
    <div style={canvasStyle}>
      <KpiCard title="Verbrauch" value="123.45" unit="kWh" />
      <KpiCard title="Kosten" value="19.25" unit="CHF" unitBefore />
    </div>
  ),
};

const paddings: CardPadding[] = ['medium', 'large'];

/** Medium (16px) for compact cards, Large (24px) for content-heavy cards. */
export const Padding: Story = {
  render: () => (
    <div style={canvasStyle}>
      {paddings.map((padding) => (
        <div key={padding}>
          <div style={labelStyle}>{padding}</div>
          <Card padding={padding} style={cardWidth}>
            <CardHeader>
              <CardTitle>Wohnprofil</CardTitle>
              <CardDescription>Zurlindenstrasse 11, 1. OG</CardDescription>
            </CardHeader>
            <CardContent>
              <KeyValueList>
                <KeyValueItem label="Wohnfläche">120 m²</KeyValueItem>
                <KeyValueItem label="Personen im Haushalt">3</KeyValueItem>
              </KeyValueList>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  ),
};

/** Full composition with header, content and footer actions on a static card. */
export const Composition: Story = {
  render: () => (
    <div style={canvasStyle}>
      <Card padding="large" style={{ width: '360px' }}>
        <CardHeader>
          <CardTitle as="h2">Offene Rechnung</CardTitle>
          <CardDescription>01.07.2026 – 31.10.2026</CardDescription>
        </CardHeader>
        <CardContent>
          <KeyValueList>
            <KeyValueItem label="Rechnungsnummer">620955583</KeyValueItem>
            <KeyValueItem label="Zahlbar bis">30.11.2026</KeyValueItem>
            <KeyValueItem label="Betrag" total>
              CHF 91.70
            </KeyValueItem>
          </KeyValueList>
        </CardContent>
        <CardFooter>
          <Button size="small" variant="secondary">
            Rechnung herunterladen
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
