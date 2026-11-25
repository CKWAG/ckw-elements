# @ckwag/elements-icons

CKW Elements SVG icon set for React applications.

## Installation

```bash
npm install @ckwag/elements-icons
```

## Usage

```tsx
import React from 'react';
import { Icon, IconPlaceholder, IconSearch } from '@ckwag/elements-icons';

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

## Deprecated names

Renamed or merged icons keep working until the next major version. They are exported with a `@deprecated` tag, are
accepted by `<Icon name="…" />` and still present in `iconComponents`, but are not part of the `IconName` type,
`iconNames`, `iconMetadata` or the Storybook index. Code that types a value as `IconName` must use the new name:

| Deprecated                   | Use                                       |
| ---------------------------- | ----------------------------------------- |
| `IconPlus` / `plus`          | `IconAdd` / `add`                         |
| `IconCheckBox` / `check-box` | `IconCheckBoxFilled` / `check-box-filled` |

Prefer named imports (`import { IconSearch } …`) over `<Icon name>` in apps: the by-name component references every
icon, so bundlers cannot drop the unused ones.

## Contributing icons

The full guide is in [CONTRIBUTING.md](./CONTRIBUTING.md): the icon standard, how icons get from Figma into this
package, what each script does, file formats, the rename and deprecation policy and troubleshooting.

In short: do not edit `src/index.tsx` or the files in `svg/` by hand. `svg/*.svg` and `svg/manifest.json` are the
source of truth (written from the Figma icon index by the `add-icons-to-figma` Claude skill, only icons with status
"Ready"). `pnpm icons:generate` rebuilds `src/index.tsx` and validates the SVGs, `pnpm icons:check` fails when the
committed source is out of date (runs in CI).
