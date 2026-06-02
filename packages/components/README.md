# @ckw-elements/components

React components for the CKW Elements design system.

## Install

```bash
npm install @ckw-elements/components @ckw-elements/tokens
```

## Setup

Import CKW token CSS once in your app entry point:

```css
@import '@ckw-elements/tokens/tokens.css';
```

Component CSS is imported as package side effects. If your bundler does not process package CSS side effects, import the aggregate stylesheet explicitly:

```css
@import '@ckw-elements/components/styles.css';
```

## Usage

```tsx
import React from 'react';
import { Button, InputField, SegmentedControl } from '@ckw-elements/components';

export function Example() {
  return (
    <form>
      <InputField label="Name" placeholder="Enter name" />
      <SegmentedControl
        segments={[
          { value: 'monthly', label: 'Monthly' },
          { value: 'yearly', label: 'Yearly' },
        ]}
        activeValue="monthly"
      />
      <Button type="Primary">Save</Button>
    </form>
  );
}
```

The explicit React subpath is also available:

```tsx
import { Button } from '@ckw-elements/components/react';
```

## Exports

| Export                                | Description                      |
| ------------------------------------- | -------------------------------- |
| `@ckw-elements/components`            | React component exports          |
| `@ckw-elements/components/react`      | Explicit React component exports |
| `@ckw-elements/components/styles.css` | Aggregate component CSS          |

## Rules

- Import `@ckw-elements/tokens/tokens.css` before rendering components.
- Use semantic tokens for custom product UI.
- Do not use primitive color tokens in product components.
- CKW primary actions are green through `var(--interactive-primary)`.
