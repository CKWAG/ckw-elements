# @ckw-elements/icons

CKW Elements SVG icon set for React applications.

## Installation

```bash
npm install @ckw-elements/icons
```

## Usage

```tsx
import React from 'react';
import { Icon, IconPlaceholder, IconSearch } from '@ckw-elements/icons';

export function Example() {
  return (
    <>
      <IconSearch title="Search" />
      <IconPlaceholder aria-hidden="true" />
      <Icon name="warning-circle-filled" title="Warning" />
    </>
  );
}
```

All icons render on a 24px canvas, use `currentColor`, and accept normal SVG
props plus an optional `size` prop.
