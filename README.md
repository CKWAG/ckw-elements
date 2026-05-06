# CKW Elements Design System

Design token pipeline and component library for CKW AG, built as a pnpm workspaces monorepo. Tokens are authored in Figma, exported via Tokens Studio, and transformed into CSS Custom Properties and JavaScript modules via Style Dictionary v4.

## Quick Start

**Prerequisites:** Node.js >= 20, pnpm >= 10

```bash
git clone https://github.com/CKWAG/ckw-elements-design.git
cd ckw-elements-design
pnpm install
pnpm --filter @ckw-elements/storybook run dev
```

Storybook opens at [http://localhost:6006](http://localhost:6006) and serves the full token documentation (colors, typography, spacing, borders, shadows).

## Monorepo Structure

```
ckw-elements-design/
├── packages/
│   ├── tokens/          @ckw-elements/tokens        Active — 282 design tokens
│   ├── components/      @ckw-elements/components     Scaffold
│   └── icons/           @ckw-elements/icons           Scaffold
├── apps/
│   └── storybook/       @ckw-elements/storybook      Active — documentation site
├── token-drop/          Drop folder for Tokens Studio JSON exports
├── ARCHITECTURE.md      Full architecture reference (870 lines)
├── PIPELINE.md          Non-technical pipeline guide (German)
└── AGENTS.md            AI agent coding reference
```

Workspaces are defined in `pnpm-workspace.yaml` — `packages/*` and `apps/*`.

## Available Scripts

| Command                                                   | Description                                     |
| --------------------------------------------------------- | ----------------------------------------------- |
| `pnpm install`                                            | Install all workspace dependencies              |
| `pnpm tokens:sync`                                        | Run full token pipeline (transform + build)     |
| `pnpm --filter @ckw-elements/tokens run tokens:transform` | Transform only: raw JSON to DTCG format         |
| `pnpm --filter @ckw-elements/tokens run build`            | Build only: DTCG to CSS/JS via Style Dictionary |
| `pnpm --filter @ckw-elements/storybook run dev`           | Start Storybook dev server on port 6006         |
| `pnpm --filter @ckw-elements/storybook run build`         | Build Storybook for static deployment           |
| `pnpm -r run build`                                       | Build all workspace packages                    |

## Token Pipeline

Tokens flow from Figma through a two-step transformation into consumable outputs:

```
Figma Variables
  └─ Tokens Studio export ──> tokens-raw.json    (committed, verbatim)
                                    │
                          transform-tokens.mjs
                                    │
                                    v
                              tokens.json          (committed, DTCG format)
                                    │
                           Style Dictionary v4
                                    │
                        ┌───────────┴───────────┐
                        v                       v
                  dist/tokens.css         dist/tokens.js
                  (CSS Custom Props)      (JS named exports)
```

The `dist/` directory is generated and gitignored. After pulling changes that touch `tokens.json`, run `pnpm --filter @ckw-elements/tokens run build` to regenerate it.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full pipeline specification, custom transforms, token categories, and output format details.

### Two-Layer Token Architecture

Tokens are organized in two layers:

- **Primitive tokens** define raw values (colors, spacing, radii, etc.)
- **Semantic tokens** reference primitives and describe purpose (`--interactive-primary`, `--text-primary`, etc.)

Components must only use semantic tokens. This separation enables future theming (dark mode is structurally prepared).

```css
/* Wrong — primitive token */
background: var(--color-green-600);

/* Correct — semantic token */
background: var(--interactive-primary);
```

## Tech Stack

| Tool             | Version | Purpose                    |
| ---------------- | ------- | -------------------------- |
| pnpm             | >= 10   | Monorepo package manager   |
| Node.js          | >= 20   | Runtime                    |
| Style Dictionary | 4.x     | Token transformation       |
| React            | 19      | Component framework        |
| TypeScript       | 5.x     | Type safety                |
| Storybook        | 8.6     | Documentation site         |
| Vite             | 6.x     | Build tool (via Storybook) |

**Note:** There is no `tsconfig.json`, ESLint, Prettier, or test runner configured. Code style is enforced by convention. Adding these is a planned future task.

## Contributing

### Setup

1. Clone the repo and install dependencies (see Quick Start above).
2. If working on tokens, ensure `dist/` is built: `pnpm tokens:sync`.
3. Run Storybook to verify changes visually.

### Code Style

- 2-space indentation, single quotes, semicolons, trailing commas
- `interface` for props, never `type`
- String literal unions for variants, never `enum`
- Named exports (except Storybook config files which use `export default`)
- One component per file, PascalCase filenames

### React Import Requirement

`import React from 'react'` is **required** in every TSX file. There is no `tsconfig.json`, so the automatic JSX transform is not active. Removing this import causes runtime errors.

### Import Order

```tsx
import React from 'react'; // 1. React (always first)
import type { StorybookConfig } from '@storybook/…'; // 2. External type imports
import { usesReferences } from 'style-dictionary/…'; // 3. External value imports
import type { ColorToken } from '../data/tokens'; // 4. Local type imports
import { ColorSwatch } from './ColorSwatch'; // 5. Local value imports
```

### Styling

- Inline `style={{ }}` for token references: `style={{ color: 'var(--text-primary)' }}`
- CSS class names from `docs.css` for documentation layout: `className="docs-section"`
- No Tailwind in this project
- Never hardcode hex colors — always use `var(--token-name)`

### Adding a Component

```
packages/components/src/ComponentName/
├── ComponentName.tsx          React component (semantic tokens only)
├── ComponentName.stories.tsx  Storybook stories
└── ComponentName.mdx          Documentation page (optional)
```

Export from the barrel: `packages/components/src/index.ts`.

### Token Changes

When Figma tokens are updated:

1. Export from Tokens Studio, save to `packages/tokens/tokens-raw.json`
2. Run `pnpm tokens:sync`
3. Verify changes via `git diff` on `tokens.json` and `dist/tokens.css`
4. Check Storybook visually
5. Commit

### Commit Messages

Follow the pattern visible in the repo history:

```
Add [Component] component: brief description of what it includes
Fix [area]: what was wrong and what changed
Refine [area]: what was improved
```

## Brand Reference

| Property      | Value                             |
| ------------- | --------------------------------- |
| Primary color | Green `#86bc46`                   |
| Font family   | Gotham (Book = 325, Medium = 500) |
| Design tool   | Figma with Tokens Studio plugin   |

## Files You Should Not Edit

| Path                              | Reason                                                  |
| --------------------------------- | ------------------------------------------------------- |
| `packages/tokens/dist/*`          | Generated by Style Dictionary                           |
| `packages/tokens/tokens-raw.json` | Verbatim Figma export — only replaced via Tokens Studio |
| `node_modules/`                   | Package manager managed                                 |

## Further Reading

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Full architecture reference: token pipeline, Style Dictionary config, Storybook adapter pattern, data flow diagrams, file-by-file reference.
- **[PIPELINE.md](./PIPELINE.md)** — Non-technical pipeline explanation for designers (German).

## License

Licensed under the [Apache License, Version 2.0](./LICENSE).

**Excluded from the open-source license** (see [NOTICE](./NOTICE)):

| Asset                                  | Reason                                                      |
| -------------------------------------- | ----------------------------------------------------------- |
| `apps/storybook/public/ckw-logo.svg`   | CKW trademark                                               |
| `apps/storybook/public/fonts/Gotham-*` | Commercial font (Hoefler & Co.) — redistribution prohibited |

The CKW name, logo, and brand identity are trademarks of CKW AG.
The Gotham font files are included for documentation rendering only and require
a separate license from [Hoefler & Co.](https://www.typography.com/fonts/gotham)
for any other use.
