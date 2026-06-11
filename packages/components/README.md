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

## Usage

```tsx
import React from 'react';
import { Button, InlineMessage, InputField, SegmentedControl } from '@ckwag/elements';

export function Example() {
  return (
    <form>
      <InlineMessage status="Info" title="Statusmeldung">
        Hier steht eine kurze Erklaerung zum aktuellen Status oder zur naechsten Aktion.
      </InlineMessage>
      <InputField label="Name" placeholder="Enter name" />
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

| Export                       | Description             |
| ---------------------------- | ----------------------- |
| `@ckwag/elements`            | React component exports |
| `@ckwag/elements/styles.css` | Aggregate component CSS |

## Rules

- Import `@ckwag/elements-tokens/tokens.css` before rendering components.
- Use semantic tokens for custom product UI.
- Do not use primitive color tokens in product components.
- CKW primary actions are green through `var(--interactive-primary)`.
