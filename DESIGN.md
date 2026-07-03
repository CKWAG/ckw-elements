---
version: 'alpha'
name: CKW Elements
description: 'Energy utility design system — clean, trustworthy, nature-forward. Green brand identity with Gotham typeface across digital touchpoints.'
colors:
  primary: '#365f10'
  primary-hover: '#21420b'
  primary-active: '#53821f'
  secondary: '#ffffff'
  secondary-hover: '#e4f3d3'
  secondary-active: '#c8e6a4'
  brand: '#86bc46'
  text-primary: '#232623'
  text-secondary: '#4f544f'
  text-tertiary: '#8d968d'
  text-on-primary: '#ffffff'
  background-default: '#ffffff'
  background-canvas: '#fafafa'
  background-active: '#f1f9e8'
  background-hover: '#eff0ef'
  border-soft: '#eff0ef'
  border-medium: '#d5d8d5'
  border-strong: '#8d968d'
  border-active: '#53821f'
  status-error: '#d73d19'
  status-success: '#21420b'
  status-warning: '#785c01'
  status-info: '#014f70'
typography:
  display-l:
    fontFamily: Gotham
    fontSize: 72px
    fontWeight: 325
    lineHeight: 72px
  display-s:
    fontFamily: Gotham
    fontSize: 56px
    fontWeight: 325
    lineHeight: 58px
  heading-xl:
    fontFamily: Gotham
    fontSize: 48px
    fontWeight: 325
    lineHeight: 52px
  heading-l:
    fontFamily: Gotham
    fontSize: 36px
    fontWeight: 500
    lineHeight: 44px
  heading-m:
    fontFamily: Gotham
    fontSize: 28px
    fontWeight: 500
    lineHeight: 36px
  heading-s:
    fontFamily: Gotham
    fontSize: 24px
    fontWeight: 500
    lineHeight: 32px
  body-l:
    fontFamily: Gotham
    fontSize: 18px
    fontWeight: 325
    lineHeight: 28px
  body-m:
    fontFamily: Gotham
    fontSize: 16px
    fontWeight: 325
    lineHeight: 24px
  body-s:
    fontFamily: Gotham
    fontSize: 14px
    fontWeight: 325
    lineHeight: 20px
  label-l:
    fontFamily: Gotham
    fontSize: 18px
    fontWeight: 500
    lineHeight: 22px
  label-m:
    fontFamily: Gotham
    fontSize: 16px
    fontWeight: 500
    lineHeight: 20px
  label-s:
    fontFamily: Gotham
    fontSize: 14px
    fontWeight: 500
    lineHeight: 18px
  caption:
    fontFamily: Gotham
    fontSize: 12px
    fontWeight: 325
    lineHeight: 16px
rounded:
  none: 0px
  xs: 2px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  full: 99999px
spacing:
  none: 0px
  3xs: 2px
  2xs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  2xl: 32px
  3xl: 40px
  4xl: 48px
  5xl: 64px
  6xl: 80px
  7xl: 96px
  8xl: 120px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.text-on-primary}'
    typography: '{typography.label-m}'
    rounded: '{rounded.sm}'
    padding: 12px 24px
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
  button-primary-active:
    backgroundColor: '{colors.primary-active}'
  button-secondary:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.primary}'
    typography: '{typography.label-m}'
    rounded: '{rounded.sm}'
    padding: 12px 24px
  button-secondary-hover:
    backgroundColor: '{colors.secondary-hover}'
  input-field:
    backgroundColor: '{colors.background-default}'
    textColor: '{colors.text-primary}'
    typography: '{typography.body-s}'
    rounded: '{rounded.sm}'
    padding: 12px 16px
  card:
    backgroundColor: '{colors.background-default}'
    rounded: '{rounded.sm}'
    padding: 24px
---

## Overview

CKW Elements is the design system for CKW AG, a Swiss energy utility. The visual identity
communicates trust, sustainability, and clarity. Green is the brand color — it represents
energy from nature. The UI is clean and functional, built for dashboards, portals, and
customer-facing applications.

The system uses a two-layer token model: primitives define raw values, semantics define
purpose. Components consume only semantic tokens.

## Colors

The palette is anchored by a deep forest green for interaction and a neutral grey scale
for text and structure. Accent hues (blue, yellow, orange, violet, khaki) are reserved
for data visualization and status indicators.

- **Primary (#365f10):** Deep forest green — all interactive elements (buttons, links, focus rings).
- **Brand (#86bc46):** CKW brand green — logo, marketing accents, gradient endpoints. Never used as a button color.
- **Text Primary (#232623):** Near-black with green undertone for body text.
- **Text Secondary (#4f544f):** Mid-grey for supporting text, captions, metadata.
- **Background Default (#ffffff):** Pure white surface for content areas.
- **Background Canvas (#fafafa):** Off-white for page-level canvas behind cards.
- **Border Soft (#eff0ef):** Subtle divider between sections.
- **Status Error (#d73d19):** Orange-red for destructive actions and error states.
- **Status Success (#21420b):** Dark green for confirmations.
- **Status Warning (#785c01):** Dark amber for caution.
- **Status Info (#014f70):** Dark blue for informational messages.

### Primitive Color Scales

Seven hue ramps (green, grey, khaki, blue, yellow, orange, violet) each with 11 stops
(50–900). Components never reference primitives directly — semantic tokens resolve to them.

### Chart Colors

Each hue provides a 5-step luminance ramp (very-light, light, medium, dark, very-dark)
designed for accessible data visualization with sufficient contrast between adjacent series.

## Typography

The typeface is **Gotham** — a geometric sans-serif that balances technical precision with
approachability. Two weights cover the entire system:

- **Book (325):** Body text, display sizes, captions. Calm and readable.
- **Medium (500):** Headings, labels, emphasis. Clear hierarchy without heaviness.

Font fallback stack: `Gotham, "Helvetica Neue", Arial, system-ui, sans-serif`.

### Scale

| Role       | Size | Weight | Line Height |
| ---------- | ---- | ------ | ----------- |
| Display L  | 72px | Book   | 72px        |
| Display S  | 56px | Book   | 58px        |
| Heading XL | 48px | Book   | 52px        |
| Heading L  | 36px | Medium | 44px        |
| Heading M  | 28px | Medium | 36px        |
| Heading S  | 24px | Medium | 32px        |
| Body L     | 18px | Book   | 28px        |
| Body M     | 16px | Book   | 24px        |
| Body S     | 14px | Book   | 20px        |
| Label L    | 18px | Medium | 22px        |
| Label M    | 16px | Medium | 20px        |
| Label S    | 14px | Medium | 18px        |
| Caption    | 12px | Book   | 16px        |

Desktop and mobile share the same type styles — responsive sizing is not part of the
token system (handled at layout level).

## Layout

The spacing scale is linear with intentional gaps for visual rhythm:

| Token | Value | Use                   |
| ----- | ----- | --------------------- |
| none  | 0px   | Reset                 |
| 3xs   | 2px   | Hairline gaps         |
| 2xs   | 4px   | Icon padding          |
| xs    | 8px   | Tight element spacing |
| sm    | 12px  | Form field padding    |
| md    | 16px  | Default content gap   |
| lg    | 20px  | Section padding       |
| xl    | 24px  | Card padding          |
| 2xl   | 32px  | Between sections      |
| 3xl   | 40px  | Major section breaks  |
| 4xl   | 48px  | Page-level margins    |
| 5xl   | 64px  | Hero spacing          |
| 6xl   | 80px  | Large decorative gaps |
| 7xl   | 96px  | Full-bleed sections   |
| 8xl   | 120px | Maximum spacing       |

## Elevation & Depth

Five shadow levels provide consistent elevation:

| Level | Value                          | Use                       |
| ----- | ------------------------------ | ------------------------- |
| XS    | `0 1px 2px rgba(0,0,0,0.04)`   | Subtle lift (inputs)      |
| S     | `0 2px 20px rgba(0,0,0,0.06)`  | Cards at rest             |
| M     | `0 4px 24px rgba(0,0,0,0.08)`  | Elevated cards, dropdowns |
| L     | `0 8px 32px rgba(0,0,0,0.1)`   | Modals, popovers          |
| XL    | `0 16px 48px rgba(0,0,0,0.14)` | Full-screen overlays      |

A brand gradient (`linear-gradient(210deg, #9ab20f 0%, #4e7818 100%)`) is used
sparingly for decorative hero sections.

## Shapes

Border radius uses a compact scale:

| Token | Value   | Use                                   |
| ----- | ------- | ------------------------------------- |
| none  | 0px     | Sharp edges (tables, dividers)        |
| xs    | 2px     | Subtle rounding (tags, badges)        |
| sm    | 8px     | Default for cards, buttons, inputs    |
| md    | 16px    | Prominent rounding (modals, callouts) |
| lg    | 24px    | Pill-shaped containers                |
| xl    | 32px    | Large decorative shapes               |
| full  | 99999px | Perfect circles, pill buttons         |

Border weights: `1px` (default), `2px` (emphasis), `3px` (active indicators).

## Components

### Button Primary

The primary action. Deep green background, white text, `sm` radius.

- **Default:** `#365f10` bg, white text
- **Hover:** `#21420b` bg (darker)
- **Active:** `#53821f` bg (lighter)

### Button Secondary

The secondary action. White background, green text, green border on hover.

- **Default:** white bg, `#365f10` text
- **Hover:** `#e4f3d3` bg (light green tint)
- **Active:** `#c8e6a4` bg (stronger green tint)

### Input Field

White background, `sm` radius, `1px` medium border. Focus state uses `border-active`.

### Card

White background, `sm` radius, `xl` padding (24px). Elevation via shadow-s.

## Do's and Don'ts

### Do

- Use semantic tokens exclusively in components (`--interactive-primary`, not `--color-green-600`).
- Use the `ckw-text-*` CSS utility classes for typography in React apps.
- Keep interactive green for actionable elements only (buttons, links, focus).
- Use status colors only for their designated meaning (error, success, warning, info).
- Provide Gotham font files with `font-display: swap` for UI text.

### Don't

- Don't use `#86bc46` (brand green) for buttons — it fails WCAG contrast on white text.
- Don't reference primitive tokens in component styles.
- Don't introduce additional typefaces — the system is single-family.
- Don't use shadows heavier than `M` for inline elements.
- Don't mix spacing tokens arbitrarily — follow the scale progression.
