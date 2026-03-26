# AGENTS.md — ckw-elements Monorepo

Practical reference for AI coding agents. For full architecture details see `ARCHITECTURE.md`.

---

## Build / Lint / Test Commands

| What | Command |
|------|---------|
| Install deps | `pnpm install` |
| Token pipeline (transform + build) | `pnpm tokens:sync` (root shortcut) |
| Token transform only | `pnpm --filter @ckw-elements/tokens run tokens:transform` |
| Token build only (from existing tokens.json) | `pnpm --filter @ckw-elements/tokens run build` |
| Start Storybook dev server | `pnpm --filter @ckw-elements/storybook run dev` |
| Build Storybook for deployment | `pnpm --filter @ckw-elements/storybook run build` |
| Build all packages | `pnpm -r run build` |

**No linter, test runner, or formatter is configured.** There is no `tsconfig.json`, no
ESLint, no Prettier, no Vitest/Jest. Code style is enforced by convention only.

Engine requirements: **Node >= 20**, **pnpm >= 10**.

---

## Monorepo Structure

```
ckw-elements/                       # pnpm workspaces root ("type": "module")
├── packages/tokens/                # @ckw-elements/tokens (ACTIVE — 282 tokens)
├── packages/components/            # @ckw-elements/components (scaffold)
├── packages/icons/                 # @ckw-elements/icons (scaffold)
├── apps/storybook/                 # @ckw-elements/storybook (ACTIVE)
├── token-drop/                     # Drop folder for Tokens Studio JSON exports
├── pnpm-workspace.yaml             # packages: ['packages/*', 'apps/*']
├── ARCHITECTURE.md                 # Full architecture docs (870 lines)
└── PIPELINE.md                     # German non-technical pipeline docs (~170 lines)
```

**Git remote:** `origin` → `https://github.com/CKWAG/ckw-elements-design.git`

---

## Token Pipeline

```
tokens-raw.json → transform-tokens.mjs → tokens.json → Style Dictionary v4 → dist/tokens.css + dist/tokens.js
```

- `dist/` is generated, NEVER manually edit it. It is gitignored.
- `tokens-raw.json` (Tokens Studio export) and `tokens.json` (DTCG) are both committed.
- Style Dictionary collision warnings are **intentional** (desktop/mobile typography) — do not fix them.
- Token count: 282 total (79 primitive colors, 76 semantic colors, 15 spacing, 7 border-radius,
  4 border-weight, 1 font-family, 3 shadows, 1 gradient, 48+48 typography desktop/mobile).

---

## Critical Rules

1. **Components use ONLY semantic tokens**, never primitives:
   ```css
   /* WRONG */  background: var(--color-green-600);
   /* RIGHT */  background: var(--interactive-primary);
   ```

2. **`import React from 'react'` is REQUIRED** in all TSX files. No `tsconfig.json` means
   the automatic JSX transform is not active. Removing this import causes runtime errors.

3. **Do NOT introduce Turborepo, Nx, or similar** — pnpm workspaces only.

4. **Do NOT add `tsconfig.json`** unless explicitly asked — it is a known future task.

5. **Brand color is GREEN** (`#86bc46`), not blue. Font is **Gotham** (Book=325, Medium=500).

6. **Storybook docs chrome** uses a "specs" design language (neutral grays, Roboto font) —
   NOT the CKW brand tokens. Brand tokens only appear inside content areas (swatches, previews).

---

## Code Style

### Formatting
- 2-space indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multiline arrays/objects

### TypeScript / React
- `strict: true` intent (no tsconfig yet, but write as if strict)
- Props: always `interface`, never `type`
- Variant unions: `export type ButtonType = 'Primary' | 'Secondary'` — no `enum`
- Type-only imports: `import type { Foo } from './bar'`
- Named exports, not default exports (except Storybook config files)
- One component per file, PascalCase filenames
- Destructured props in function signature: `({ token }: Props)`
- JSDoc comment above every exported function

### Import Order
```tsx
import React from 'react';                            // 1. React (always first, required)
import type { StorybookConfig } from '@storybook/…';  // 2. External type imports
import { usesReferences } from 'style-dictionary/…';  // 3. External value imports
import type { ColorToken } from '../data/tokens';     // 4. Local type imports
import { ColorSwatch } from './ColorSwatch';           // 5. Local value imports
```

### Styling
- Inline `style={{ }}` for token references: `style={{ color: 'var(--text-primary)' }}`
- CSS class names from `docs.css` for docs layout: `className="docs-section"`
- No Tailwind in the monorepo
- Never hardcode hex colors — always use `var(--token-name)`

### Scripts (.mjs files)
- ESM (`import`/`export`), not CommonJS
- `const` for variables
- JSDoc block comments for documentation
- Use `node:` prefixed imports (`node:fs`, `node:path`, `node:url`)

### Error Handling
- No `console.log` in committed code (except token pipeline summary output)
- Guard against missing data with early returns, not try/catch around rendering
- Validate token references exist before using them

---

## Storybook Conventions

### MDX Foundation Pages
```mdx
import { Meta } from '@storybook/blocks';
import { MyComponent } from '../components/MyComponent';
import { myData } from '../data/tokens';

<Meta title="Foundations/PageName" />

<div className="sb-unstyled">
  <div className="docs-page-title">Page Title</div>
  <div className="docs-description">Description text.</div>
  <div className="docs-section">
    <div className="docs-section-title">Section</div>
    {/* Content */}
  </div>
</div>
```

### Config Files
- `main.ts`, `preview.ts`, `theme.ts` — use `export default`
- `manager.ts` — uses `addons.setConfig()` from `@storybook/manager-api`
- `manager-head.html` — CSS injected into Manager `<head>` (fragile DOM selectors)
- Theme/manager changes require **server restart** (not hot-reloaded)

`apps/storybook/src/data/tokens.ts` bridges `tokens.json` and Storybook — all token
data flows through this adapter, never hardcode values.

Only these title CSS classes exist in `docs.css`: `specs-title-4xl`, `specs-title-3xl`,
`specs-title-2xl`, `specs-title-xl`. There is NO `specs-title-m`.

---

## Files You Should Never Modify

| Path | Reason |
|------|--------|
| `packages/tokens/dist/*` | Generated by Style Dictionary |
| `packages/tokens/tokens-raw.json` | Verbatim Figma export, only replaced via Tokens Studio |
| `node_modules/` | Package manager managed |

---

## Known Issues

| # | Issue |
|---|-------|
| M1 | Gradient `$type` is `"color"` but value is `linear-gradient()` — works in practice |
| M3 | `theme.ts` brand colors are hardcoded hex (Storybook `create()` needs raw strings) |
| L3 | No `tsconfig.json` — known future task |
| L4 | No `.d.ts` declarations for `dist/tokens.js` |
| L9 | React import required in all TSX until tsconfig is added |
