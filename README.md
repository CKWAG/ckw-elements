<div align="center">

<img src=".github/header_graphic_text.png" alt="CKW Elements – The CKW Design System for a harmonized and accessible user experience across digital touchpoints." width="100%" />

# CKW Elements

**Design tokens and component library for CKW AG**

[![License](https://img.shields.io/badge/license-Apache%202.0-green.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D10-orange.svg)](https://pnpm.io)
[![Storybook](https://img.shields.io/badge/docs-Storybook-ff4785.svg)](https://ckwag.github.io/ckw-elements/)

[Live Documentation](https://ckwag.github.io/ckw-elements/) · [Architecture](./ARCHITECTURE.md) · [Contributing](#contributing)

</div>

---

## Overview

CKW Elements is a design system that bridges Figma and code. Tokens are authored as Figma Variables, exported via Tokens Studio, and transformed into **CSS Custom Properties** and **JavaScript modules** through Style Dictionary v4.

The result: a single source of truth for colors, typography, spacing, borders, shadows, and components — consumed by any web project via a simple CSS import.

## What's Included

| Package                                             | Status         | Description                                                 |
| --------------------------------------------------- | -------------- | ----------------------------------------------------------- |
| [`@ckw-elements/tokens`](./packages/tokens)         | ✅ Active      | 282 design tokens (CSS + JS)                                |
| [`@ckw-elements/components`](./packages/components) | 🚧 In progress | React component library                                     |
| [`@ckw-elements/icons`](./packages/icons)           | 📋 Planned     | Icon set                                                    |
| [`@ckw-elements/storybook`](./apps/storybook)       | ✅ Active      | [Documentation site](https://ckwag.github.io/ckw-elements/) |

## Quick Start

```bash
git clone https://github.com/CKWAG/ckw-elements-design.git
cd ckw-elements-design
pnpm install
pnpm --filter @ckw-elements/storybook run dev
```

> **Prerequisites:** Node.js >= 20, pnpm >= 10

Storybook opens at [localhost:6006](http://localhost:6006) with the full token documentation.

## Usage

Import the token CSS file into your project:

```css
@import '@ckw-elements/tokens/tokens.css';
```

Then use semantic tokens in your styles:

```css
.card {
  background: var(--background-default);
  color: var(--text-primary);
  border: var(--border-weight-s) solid var(--border-soft);
  border-radius: var(--border-radius-s);
  padding: var(--spacing-l);
  box-shadow: var(--shadow-s);
}

.card:hover {
  border-color: var(--border-hover);
}
```

> **Rule:** Always use semantic tokens (`--interactive-primary`), never primitives (`--color-green-600`). This enables theming and ensures consistency.

## Token Architecture

```
Figma Variables
  └─ Tokens Studio ──▸ tokens-raw.json
                              │
                    transform-tokens.mjs
                              │
                              ▾
                        tokens.json (DTCG)
                              │
                     Style Dictionary v4
                              │
                  ┌───────────┴───────────┐
                  ▾                       ▾
            tokens.css              tokens.js
```

Tokens are organized in two layers:

- **Primitive** — Raw values (79 colors, 15 spacing, 7 radii, etc.)
- **Semantic** — Purpose-driven references (`--interactive-primary`, `--text-secondary`, etc.)

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full pipeline details.

## Scripts

| Command                                           | Description                             |
| ------------------------------------------------- | --------------------------------------- |
| `pnpm install`                                    | Install dependencies                    |
| `pnpm tokens:sync`                                | Full token pipeline (transform + build) |
| `pnpm format`                                     | Format code (Prettier)                  |
| `pnpm format:check`                               | Check formatting (CI)                   |
| `pnpm --filter @ckw-elements/storybook run dev`   | Start Storybook                         |
| `pnpm --filter @ckw-elements/storybook run build` | Build Storybook                         |
| `pnpm -r run build`                               | Build all packages                      |

## Tech Stack

| Tool                                                          | Purpose                  |
| ------------------------------------------------------------- | ------------------------ |
| [pnpm](https://pnpm.io)                                       | Monorepo package manager |
| [Style Dictionary 4](https://amzn.github.io/style-dictionary) | Token transformation     |
| [React 19](https://react.dev)                                 | Component framework      |
| [TypeScript 5](https://www.typescriptlang.org)                | Type safety              |
| [Storybook 8](https://storybook.js.org)                       | Documentation            |
| [Vite 6](https://vite.dev)                                    | Build tool               |
| [Prettier](https://prettier.io)                               | Code formatting          |

## Contributing

We welcome contributions! Here's how to get started:

1. Clone and install (see [Quick Start](#quick-start))
2. Create a feature branch from `main`
3. Make your changes — Prettier runs automatically on commit via Husky
4. Verify visually in Storybook
5. Open a Pull Request

### Adding a Component

```
packages/components/src/ComponentName/
├── ComponentName.tsx          # React component (semantic tokens only)
├── ComponentName.stories.tsx  # Interactive stories
└── ComponentName.mdx          # Documentation page
```

### Code Style

- 2-space indent, single quotes, semicolons, trailing commas
- `interface` for props (never `type`)
- Named exports, PascalCase filenames
- `import React from 'react'` required in all TSX files

### Token Changes

1. Export from Tokens Studio → save to `packages/tokens/tokens-raw.json`
2. Run `pnpm tokens:sync`
3. Verify in Storybook
4. Commit

## Project Structure

```
ckw-elements-design/
├── packages/
│   ├── tokens/              282 design tokens (CSS + JS output)
│   ├── components/          React component library
│   └── icons/               Icon set (planned)
├── apps/
│   └── storybook/           Documentation site
├── ARCHITECTURE.md          Full technical reference
├── PIPELINE.md              Designer-facing guide (German)
└── AGENTS.md                AI agent reference
```

## Further Reading

- **[Live Documentation](https://ckwag.github.io/ckw-elements/)** — Browse tokens and components interactively
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Pipeline spec, Style Dictionary config, data flow
- **[PIPELINE.md](./PIPELINE.md)** — Non-technical guide for designers (German)

## License

Licensed under the [Apache License, Version 2.0](./LICENSE).

**Excluded from the open-source license** (see [NOTICE](./NOTICE)):

| Asset                                  | Reason                                                                     |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `apps/storybook/public/ckw-logo.svg`   | CKW AG trademark                                                           |
| `apps/storybook/public/fonts/Gotham-*` | Commercial font ([Hoefler & Co.](https://www.typography.com/fonts/gotham)) |
