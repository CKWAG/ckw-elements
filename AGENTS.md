# AGENTS.md — ckw-elements Monorepo

Practical reference for AI coding agents. For full architecture details see `ARCHITECTURE.md`.

---

## Quick Reference

| What | Command |
|------|---------|
| Install deps | `pnpm install` |
| Token pipeline (transform + build) | `pnpm tokens:sync` |
| Build tokens only (from existing tokens.json) | `pnpm --filter @ckw-elements/tokens run build` |
| Start Storybook dev server | `pnpm --filter @ckw-elements/storybook run dev` |
| Build Storybook for deployment | `pnpm --filter @ckw-elements/storybook run build` |
| Build all packages | `pnpm -r run build` |

No linter, test runner, or formatter is configured yet. There is no `tsconfig.json`.

---

## Monorepo Structure

```
ckw-elements/                       # pnpm workspaces root ("type": "module")
├── packages/tokens/                # @ckw-elements/tokens (ACTIVE)
├── packages/components/            # @ckw-elements/components (scaffold)
├── packages/icons/                 # @ckw-elements/icons (scaffold)
├── apps/storybook/                 # @ckw-elements/storybook (ACTIVE)
├── pnpm-workspace.yaml             # packages: ['packages/*', 'apps/*']
└── ARCHITECTURE.md                 # Full architecture docs (870 lines)
```

---

## Token Pipeline

```
tokens-raw.json → transform-tokens.mjs → tokens.json → Style Dictionary → dist/tokens.css + dist/tokens.js
```

- `dist/` is generated, NEVER manually edit it. It is gitignored.
- `tokens-raw.json` (Tokens Studio export) and `tokens.json` (DTCG) are both committed.
- Style Dictionary collision warnings are **intentional** (desktop/mobile typography) — do not try to fix them.
- Token count: 282 total (79 primitive colors, 76 semantic colors, 15 spacing, 7 border-radius, 4 border-weight, 1 font-family, 3 shadows, 1 gradient, 48+48 typography desktop/mobile).

---

## Critical Rules

1. **Components use ONLY semantic tokens**, never primitives:
   ```css
   /* WRONG */  background: var(--color-green-600);
   /* RIGHT */  background: var(--interactive-primary);
   ```

2. **`import React from 'react'` is REQUIRED** in all TSX files. There is no `tsconfig.json`, so the automatic JSX transform is not active. Removing this import causes "React is not defined" runtime errors. Confirmed by testing.

3. **Do NOT introduce Turborepo, Nx, or similar** — pnpm workspaces only.

4. **Do NOT add `tsconfig.json`** unless explicitly asked — it is a known future task.

5. **Storybook uses a "specs" design language** for docs chrome (neutral grays, Roboto font) — NOT the CKW brand tokens. CKW brand tokens only appear inside content areas (swatches, previews).

6. **Brand color is GREEN** (`#86bc46`), not blue. Font is **Gotham** (Book=325, Medium=500).

---

## Code Style

No Prettier or ESLint configured. Follow existing conventions strictly.

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
import React from 'react';                          // 1. React (required)
import type { StorybookConfig } from '@storybook/…'; // 2. External type imports
import { usesReferences } from 'style-dictionary/…'; // 3. External value imports
import type { ColorToken } from '../data/tokens';    // 4. Local type imports
import { ColorSwatch } from './ColorSwatch';          // 5. Local value imports
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
- Use `node:fs`, `node:path`, `node:url` prefixed imports

### General
- No `console.log` in committed code (except token pipeline summary output)
- No Prettier — follow existing conventions exactly
- Accessibility: use `role`, `aria-label` where appropriate

---

## Storybook Conventions

### MDX Foundation Pages
All follow this pattern:
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
- `manager-head.html` — CSS injected into Manager `<head>` (sidebar emoji icons, fragile DOM selectors)
- Theme/manager changes require **server restart** (not hot-reloaded)

`apps/storybook/src/data/tokens.ts` bridges `tokens.json` and Storybook — all token data flows through this adapter, never hardcode values.

---

## Files You Should Never Modify

| Path | Reason |
|------|--------|
| `packages/tokens/dist/*` | Generated by Style Dictionary |
| `packages/tokens/tokens-raw.json` | Verbatim Figma export, only replaced via Tokens Studio |
| `apps/storybook/storybook-static/` | Generated build output |
| `node_modules/` | Package manager managed |

## Known Issues (Current)

| # | Issue |
|---|-------|
| M1 | Gradient `$type` is `"color"` but value is `linear-gradient()` — works in practice |
| M3 | `theme.ts` brand colors are hardcoded hex (Storybook `create()` needs raw strings) |
| L3 | No `tsconfig.json` — known future task |
| L4 | No `.d.ts` declarations for `dist/tokens.js` |
| L9 | React import required in all TSX until tsconfig is added |
