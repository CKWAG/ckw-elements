import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconArrowLeft, IconArrowRight, IconSettings } from '@ckwag/elements-icons';
import { figmaReferences, getFigmaDesignParameter } from '../storybook/figmaLinks';
import { TextLink } from './TextLink';
import type { TextLinkSize } from './TextLink';

const meta = {
  title: 'Components/Text Link',
  component: TextLink,
  tags: ['!autodocs'],
  parameters: {
    design: getFigmaDesignParameter(figmaReferences.textLink),
    docs: { source: { type: 'dynamic' } },
  },
  args: {
    children: 'Erklärung zu Ihrer Rechnung',
    href: '#',
  },
} satisfies Meta<typeof TextLink>;

export default meta;

type Story = StoryObj<typeof meta>;

const sizes: TextLinkSize[] = ['large', 'medium', 'small'];

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '32px',
  alignItems: 'center',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  minWidth: '160px',
};

const paragraphStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-brand), sans-serif',
  fontSize: 'var(--body-m-size)',
  lineHeight: 'var(--body-m-height)',
  fontWeight: 'var(--body-m-weight)',
  color: 'var(--text-primary)',
  maxWidth: '480px',
  margin: 0,
};

/** Standalone arrow link, the most common use in MyCKW. */
export const Basic: Story = {
  render: (args) => <TextLink {...args} trailingIcon={<IconArrowRight />} />,
};

/** Standalone for navigation outside text, inline inside running text. */
export const Variants: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Standalone</span>
        <TextLink href="#" trailingIcon={<IconArrowRight />}>
          Erklärung zu Ihrer Rechnung
        </TextLink>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Inline</span>
        <p style={paragraphStyle}>
          Alle Positionen finden Sie in der{' '}
          <TextLink href="#" variant="inline">
            Rechnungserklärung
          </TextLink>
          .
        </p>
      </div>
    </div>
  ),
};

/** Standalone sizes use the label tokens; the icon scales with the text (24 / 20 / 16). */
export const Sizes: Story = {
  render: () => (
    <div style={sectionStyle}>
      {sizes.map((size) => (
        <div key={size} style={rowStyle}>
          <span style={{ ...labelStyle, textTransform: 'capitalize' }}>{size}</span>
          <TextLink href="#" size={size} trailingIcon={<IconArrowRight />}>
            Erklärung zu Ihrer Rechnung
          </TextLink>
        </div>
      ))}
    </div>
  ),
};

/** Hover darkens the colour and underlines (standalone) or thickens the underline (inline). */
export const States: Story = {
  render: () => (
    <div style={sectionStyle}>
      {(['default', 'hover', 'focus'] as const).map((state) => {
        const stateClass =
          state === 'hover'
            ? 'ckw-text-link--state-hover'
            : state === 'focus'
              ? 'ckw-text-link--state-focus-visible'
              : undefined;
        return (
          <div key={state} style={rowStyle}>
            <span style={{ ...labelStyle, textTransform: 'capitalize' }}>{state}</span>
            <TextLink href="#" className={stateClass} trailingIcon={<IconArrowRight />}>
              Erklärung zu Ihrer Rechnung
            </TextLink>
            <p style={{ ...paragraphStyle, maxWidth: 'none' }}>
              In der{' '}
              <TextLink href="#" variant="inline" className={stateClass}>
                Rechnungserklärung
              </TextLink>
              .
            </p>
          </div>
        );
      })}
    </div>
  ),
};

/** Back link, arrow link, link with a leading icon and external link. */
export const Icons: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Back</span>
        <TextLink href="#" size="medium" leadingIcon={<IconArrowLeft />}>
          Rechnungen
        </TextLink>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Arrow</span>
        <TextLink href="#" trailingIcon={<IconArrowRight />}>
          Zur Tagesansicht
        </TextLink>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Leading icon</span>
        <TextLink href="#" leadingIcon={<IconSettings />}>
          Rechnungseinstellungen
        </TextLink>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>External</span>
        <TextLink href="https://www.ckw.ch" external>
          Hilfe-Center
        </TextLink>
      </div>
    </div>
  ),
};

/** Inline links in running text, also with the external indicator. */
export const InText: Story = {
  render: () => (
    <p style={paragraphStyle}>
      Ihre Rechnung wird monatlich erstellt. Alle Positionen finden Sie in der{' '}
      <TextLink href="#" variant="inline">
        Rechnungserklärung
      </TextLink>
      . Bei Fragen hilft Ihnen das{' '}
      <TextLink href="https://www.ckw.ch" variant="inline" external>
        Hilfe-Center
      </TextLink>
      .
    </p>
  ),
};

/** Stand-in for a router link component such as React Router's or Next.js' Link. */
const RouterLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<'a'> & { to: string }>(
  function RouterLink({ to, ...props }, ref) {
    return <a ref={ref} href={to} {...props} />;
  },
);

/** With `asChild` the styling goes to your router link; TextLink renders no extra element. */
export const AsChild: Story = {
  render: () => (
    <TextLink asChild size="medium" leadingIcon={<IconArrowLeft />}>
      <RouterLink to="#">Rechnungen</RouterLink>
    </TextLink>
  ),
};

/** Complete matrix of standalone sizes and inline links. */
export const AllVariants: Story = {
  render: () => (
    <div style={sectionStyle}>
      {sizes.map((size) => (
        <div key={size} style={rowStyle}>
          <span style={{ ...labelStyle, textTransform: 'capitalize' }}>Standalone {size}</span>
          <TextLink href="#" size={size} leadingIcon={<IconArrowLeft />}>
            Rechnungen
          </TextLink>
          <TextLink href="#" size={size} trailingIcon={<IconArrowRight />}>
            Zur Tagesansicht
          </TextLink>
          <TextLink href="#" size={size} external>
            Hilfe-Center
          </TextLink>
        </div>
      ))}
      <div style={rowStyle}>
        <span style={labelStyle}>Inline</span>
        <p style={paragraphStyle}>
          Mehr in der{' '}
          <TextLink href="#" variant="inline">
            Rechnungserklärung
          </TextLink>{' '}
          und im{' '}
          <TextLink href="https://www.ckw.ch" variant="inline" external>
            Hilfe-Center
          </TextLink>
          .
        </p>
      </div>
    </div>
  ),
};
