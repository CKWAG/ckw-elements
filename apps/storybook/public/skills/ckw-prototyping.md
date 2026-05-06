# CKW Elements — Prototyping Skill

Use CKW design tokens for all UI output. Never hardcode colors, spacing, or radii.

## Setup

```css
@import '@ckw-elements/tokens/tokens.css';
```

## Rules

- ONLY use `var(--token-name)` from the token system. Zero hardcoded values.
- Use SEMANTIC tokens (`--interactive-primary`), never primitives (`--color-green-600`).
- Brand color is **GREEN**. Primary actions = `--interactive-primary`.
- Font: `font-family: var(--font-family-brand), sans-serif` (Gotham).

## Semantic Color Tokens

| Purpose                         | Token                           |
| ------------------------------- | ------------------------------- |
| Primary text                    | `--text-primary`                |
| Secondary text                  | `--text-secondary`              |
| Muted text                      | `--text-tertiary`               |
| Light text on buttons           | `--text-on-interactive-primary` |
| Primary action (buttons, links) | `--interactive-primary`         |
| Primary action hover            | `--interactive-primary-hover`   |
| Primary action pressed          | `--interactive-primary-active`  |
| Page background                 | `--background-default`          |
| Subtle background               | `--background-canvas`           |
| Hover state background          | `--background-hover`            |
| Selected/active background      | `--background-active`           |
| Input field background          | `--background-input`            |
| Subtle border                   | `--border-soft`                 |
| Default border                  | `--border-medium`               |
| Strong border                   | `--border-strong`               |
| Focused/selected border         | `--border-active`               |
| Error background                | `--status-error`                |
| Error text                      | `--status-error-text`           |
| Error border                    | `--status-error-border`         |
| Success background              | `--status-success`              |
| Success text                    | `--status-success-text`         |
| Success border                  | `--status-success-border`       |
| Warning background              | `--status-warning`              |
| Warning text                    | `--status-warning-text`         |
| Info background                 | `--status-info`                 |
| Info text                       | `--status-info-text`            |

## Spacing Scale

| Token           | Value |
| --------------- | ----- |
| `--spacing-3xs` | 2px   |
| `--spacing-2xs` | 4px   |
| `--spacing-xs`  | 8px   |
| `--spacing-s`   | 12px  |
| `--spacing-m`   | 16px  |
| `--spacing-l`   | 20px  |
| `--spacing-xl`  | 24px  |
| `--spacing-2xl` | 32px  |
| `--spacing-3xl` | 40px  |
| `--spacing-4xl` | 48px  |
| `--spacing-5xl` | 64px  |

## Border Radius

| Token                  | Value   | Use                    |
| ---------------------- | ------- | ---------------------- |
| `--border-radius-xs`   | 2px     | Subtle rounding        |
| `--border-radius-s`    | 8px     | Cards, inputs, buttons |
| `--border-radius-m`    | 16px    | Modals, large cards    |
| `--border-radius-l`    | 24px    | Feature sections       |
| `--border-radius-full` | 99999px | Pills, avatars         |

## Shadows (Elevation)

| Token         | Use                 |
| ------------- | ------------------- |
| `--shadow-xs` | Subtle lift         |
| `--shadow-s`  | Cards               |
| `--shadow-m`  | Dropdowns, popovers |
| `--shadow-l`  | Dialogs             |
| `--shadow-xl` | Modals, overlays    |

## Typography Pattern

Tokens follow: `--{style}-{property}`

- Styles: `heading-xl`, `heading-l`, `heading-m`, `heading-s`, `body-l`, `body-m`, `body-s`, `label-m`, `label-s`, `caption`
- Properties: `size`, `weight`, `height`

Example: `font-size: var(--heading-xl-size); font-weight: var(--heading-xl-weight); line-height: var(--heading-xl-height);`
