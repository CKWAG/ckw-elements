# @ckwag/elements

React components for the CKW Elements design system.

## Install

```bash
npm install @ckwag/elements @ckwag/elements-tokens
```

## Setup

Import CKW token CSS once in your app entry point:

```css
@import '@ckwag/elements-tokens/tokens.css';
```

Component CSS is imported as package side effects. If your bundler does not process package CSS side effects, import the aggregate stylesheet explicitly:

```css
@import '@ckwag/elements/styles.css';
```

For cascade-layered apps, opt in to layered package CSS instead of the default imports:

```css
@layer ckw-tokens, ckw-elements, app;
@import '@ckwag/elements-tokens/tokens.layered.css';
@import '@ckwag/elements/styles.layered.css';
```

Gotham is licensed and is not bundled. Provide licensed Gotham files in your app with the family name `Gotham`; CKW tokens fall back to `"Helvetica Neue", Arial, system-ui, sans-serif` when Gotham is unavailable.

## Usage

```tsx
import React from 'react';
import {
  Button,
  InlineMessage,
  InputField,
  PasswordInput,
  SegmentedControl,
} from '@ckwag/elements';

export function Example() {
  return (
    <form>
      <InlineMessage status="Info" title="Statusmeldung">
        Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
      </InlineMessage>
      <InputField label="Name" placeholder="Enter name" />
      <PasswordInput label="Password" name="password" required autoComplete="current-password" />
      <SegmentedControl
        segments={[
          { value: 'monthly', label: 'Monthly' },
          { value: 'yearly', label: 'Yearly' },
        ]}
        activeValue="monthly"
      />
      <Button variant="primary">Save</Button>
    </form>
  );
}
```

## Exports

| Export                               | Description                                      |
| ------------------------------------ | ------------------------------------------------ |
| `@ckwag/elements`                    | React component exports                          |
| `@ckwag/elements/react`              | React component subpath export                   |
| `@ckwag/elements/styles.css`         | Aggregate component CSS                          |
| `@ckwag/elements/styles.layered.css` | Aggregate component CSS in `@layer ckw-elements` |

## Rules

- Import `@ckwag/elements-tokens/tokens.css` before rendering components.
- Use semantic tokens for custom product UI.
- Use `ckw-text-*` typography utility classes for product text styles.
- Do not use primitive color tokens in product components.
- CKW primary actions are green through `var(--interactive-primary)`.
