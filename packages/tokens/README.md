# @ckwag/elements-tokens

Design tokens for CKW Elements, generated from Figma Variables through Tokens Studio and Style Dictionary.

## Install

```bash
npm install @ckwag/elements-tokens
```

## CSS Usage

Import tokens once in your application entry CSS:

```css
@import '@ckwag/elements-tokens/tokens.css';
```

Then use semantic tokens:

```css
.card {
  background: var(--background-default);
  color: var(--text-primary);
  border: var(--border-weight-s) solid var(--border-soft);
  border-radius: var(--border-radius-s);
  padding: var(--spacing-l);
}
```

CKW also emits `--ckw-*` aliases for semantic color and typography variables. Prefer the prefixed aliases in new application CSS when you want to avoid collisions with existing app-level tokens; the original unprefixed names remain supported for compatibility.

## Typography

The official CSS utility API is the prefixed `ckw-text-*` class set:

```html
<h1 class="ckw-text-heading-l">Dashboard</h1>
<p class="ckw-text-body-m">Description text</p>
<span class="ckw-text-caption">Helper text</span>
```

For custom CSS, use semantic typography recipe variables:

```css
.title {
  font-family: var(--text-heading-l-font-family);
  font-size: var(--text-heading-l-font-size);
  font-weight: var(--text-heading-l-font-weight);
  line-height: var(--text-heading-l-line-height);
}
```

Legacy `.text-*` utilities and piece tokens such as `--heading-l-size` remain available.

## Font contract

Gotham is licensed and is not bundled with this package. Applications must provide their own licensed Gotham files using the family name `Gotham`. The token `--font-family-brand` includes a safe fallback stack:

```css
--font-family-brand: Gotham, 'Helvetica Neue', Arial, system-ui, sans-serif;
```

Recommended normal weights are `325` (Book), `500` (Medium), and `700` (Bold) when metric-emphasized typography is used. Use `font-display: swap` for UI text.

## Cascade layers

Default imports preserve existing cascade behavior:

```css
@import '@ckwag/elements-tokens/tokens.css';
```

For apps that use cascade layers, opt in explicitly:

```css
@layer ckw-tokens, ckw-elements, app;
@import '@ckwag/elements-tokens/tokens.layered.css';
```

## JavaScript Usage

```ts
import tokens, { interactivePrimary, spacingM } from '@ckwag/elements-tokens';
import rawTokens from '@ckwag/elements-tokens/tokens.json';
```

## Exports

| Export                                      | Description                                          |
| ------------------------------------------- | ---------------------------------------------------- |
| `@ckwag/elements-tokens`                    | JavaScript named exports and default token map       |
| `@ckwag/elements-tokens/tokens.css`         | CSS custom properties and typography utilities       |
| `@ckwag/elements-tokens/tokens.layered.css` | CSS custom properties wrapped in `@layer ckw-tokens` |
| `@ckwag/elements-tokens/tokens.js`          | Explicit JavaScript token module                     |
| `@ckwag/elements-tokens/tokens.json`        | DTCG token source                                    |

## Rules

- Product components should use semantic tokens such as `--interactive-primary`.
- Primitive tokens such as `--color-green-600` are source values, not component styling APIs.
- Token output in `dist/` is generated. Do not edit generated files by hand.
