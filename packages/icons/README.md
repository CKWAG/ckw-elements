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
accepted by `<Icon name="…" />`, and are not part of `iconNames` or the Storybook index:

| Deprecated                   | Use                                       |
| ---------------------------- | ----------------------------------------- |
| `IconPlus` / `plus`          | `IconAdd` / `add`                         |
| `IconCheckBox` / `check-box` | `IconCheckBoxFilled` / `check-box-filled` |

Prefer named imports (`import { IconSearch } …`) over `<Icon name>` in apps: the by-name component references every
icon, so bundlers cannot drop the unused ones.

## Contributing icons

Do not edit `src/index.tsx` or the files in `svg/` by hand.

- `svg/*.svg` and `svg/manifest.json` are the source of truth, written by `import-svgs.mjs` from the Figma icon index
  (only icons with status "Ready"). See `.claude/skills/add-icons-to-figma`.
- `aliases.json` maps deprecated names to current icons.
- `pnpm icons:generate` rebuilds `src/index.tsx` from the SVGs and validates them (24px canvas, only `<path>`,
  `fill="currentColor"`). `pnpm icons:check` fails when the committed source is out of date (runs in CI).
