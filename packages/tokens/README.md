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

## JavaScript Usage

```ts
import tokens, { interactivePrimary, spacingM } from '@ckwag/elements-tokens';
import rawTokens from '@ckwag/elements-tokens/tokens.json';
```

## Exports

| Export                               | Description                                    |
| ------------------------------------ | ---------------------------------------------- |
| `@ckwag/elements-tokens`             | JavaScript named exports and default token map |
| `@ckwag/elements-tokens/tokens.css`  | CSS custom properties and typography utilities |
| `@ckwag/elements-tokens/tokens.js`   | Explicit JavaScript token module               |
| `@ckwag/elements-tokens/tokens.json` | DTCG token source                              |

## Rules

- Product components should use semantic tokens such as `--interactive-primary`.
- Primitive tokens such as `--color-green-600` are source values, not component styling APIs.
- Token output in `dist/` is generated. Do not edit generated files by hand.
