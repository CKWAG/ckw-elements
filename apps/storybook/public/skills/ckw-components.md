# CKW Elements — Component Building Skill

Build React components using CKW Elements tokens. Every visual property references a token.

## Setup

```tsx
import React from 'react'; // REQUIRED in all TSX files
```

```css
@import '@ckw-elements/tokens/tokens.css';
```

## Component File Pattern

```tsx
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'highlighted';
}

/** Displays content in a bordered container. */
export function Card({ title, children, variant = 'default' }: CardProps) {
  return (
    <div
      style={{
        background:
          variant === 'highlighted' ? 'var(--background-active)' : 'var(--background-default)',
        border: `var(--border-weight-s) solid ${
          variant === 'highlighted' ? 'var(--border-active)' : 'var(--border-soft)'
        }`,
        borderRadius: 'var(--border-radius-s)',
        padding: 'var(--spacing-l)',
        boxShadow: 'var(--shadow-s)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-family-brand), sans-serif',
          fontSize: 'var(--heading-s-size)',
          fontWeight: 'var(--heading-s-weight)',
          lineHeight: 'var(--heading-s-height)',
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-s)',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-family-brand), sans-serif',
          fontSize: 'var(--body-s-size)',
          fontWeight: 'var(--body-s-weight)',
          color: 'var(--text-secondary)',
          lineHeight: '1.5',
        }}
      >
        {children}
      </div>
    </div>
  );
}
```

## Rules

- `import React from 'react'` is **REQUIRED** in every TSX file
- Props: always `interface`, never `type`
- Named exports only (no `export default`)
- One component per file, PascalCase filename
- JSDoc comment above every exported function
- Styling: inline `style={{ }}` with token vars
- Never hardcode colors, spacing, radii, or shadows

## Token Mapping for UI Elements

| Element                | Background                    | Border                    | Text                              |
| ---------------------- | ----------------------------- | ------------------------- | --------------------------------- |
| Card                   | `--background-default`        | `--border-soft`           | `--text-primary`                  |
| Card (selected)        | `--background-active`         | `--border-active`         | `--text-primary`                  |
| Input                  | `--background-input`          | `--border-medium`         | `--text-primary`                  |
| Input (focused)        | `--background-input`          | `--border-active`         | `--text-primary`                  |
| Input (error)          | `--background-input`          | `--status-error-border`   | `--status-error-text`             |
| Button primary         | `--interactive-primary`       | none                      | `--text-on-interactive-primary`   |
| Button primary (hover) | `--interactive-primary-hover` | none                      | `--text-on-interactive-primary`   |
| Button secondary       | `--interactive-secondary`     | `--interactive-primary`   | `--text-on-interactive-secondary` |
| Nav item               | transparent                   | none                      | `--text-secondary`                |
| Nav item (active)      | `--background-active`         | `--border-active`         | `--text-primary`                  |
| Badge/Tag              | `--background-canvas`         | none                      | `--text-secondary`                |
| Tooltip                | `--background-info`           | none                      | `--text-inverted`                 |
| Error banner           | `--status-error`              | `--status-error-border`   | `--status-error-text`             |
| Success banner         | `--status-success`            | `--status-success-border` | `--status-success-text`           |
| Warning banner         | `--status-warning`            | `--status-warning-border` | `--status-warning-text`           |

## Spacing Guidelines

| Context                 | Token                                            |
| ----------------------- | ------------------------------------------------ |
| Inside buttons          | `--spacing-s` vertical, `--spacing-l` horizontal |
| Inside cards            | `--spacing-l` to `--spacing-xl`                  |
| Inside inputs           | `--spacing-s` vertical, `--spacing-m` horizontal |
| Between form fields     | `--spacing-l`                                    |
| Between sections        | `--spacing-2xl` to `--spacing-4xl`               |
| Between inline elements | `--spacing-xs` to `--spacing-s`                  |
| Page padding            | `--spacing-xl` to `--spacing-2xl`                |

## Typography by Context

| Context          | Size                | Weight                |
| ---------------- | ------------------- | --------------------- |
| Page title       | `--heading-xl-size` | `--heading-xl-weight` |
| Section title    | `--heading-m-size`  | `--heading-m-weight`  |
| Card title       | `--heading-s-size`  | `--heading-s-weight`  |
| Body text        | `--body-s-size`     | `--body-s-weight`     |
| Labels           | `--label-m-size`    | `--label-m-weight`    |
| Captions / hints | `--caption-size`    | `--caption-weight`    |
