# AGENTS.md — ckw-elements Monorepo

Practical reference for AI coding agents. Read this first, then the doc that matches your task:

| Task                             | Read                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| Architecture, build internals    | `ARCHITECTURE.md`                                            |
| Token pipeline (German, non-dev) | `PIPELINE.md`                                                |
| Design identity and key tokens   | `DESIGN.md`                                                  |
| Known bugs and constraints       | `KNOWN_ISSUES.md`                                            |
| Publishing and release channels  | `RELEASE.md`                                                 |
| Consumer-facing agent docs       | `llms.txt`, `apps/storybook/public/llms*.txt`, `skills/*.md` |

When docs disagree, the code wins: `packages/*/src`, `package.json` files and `.github/workflows/*`.
Fix the stale doc in the same pull request (see [Keeping Docs in Sync](#keeping-docs-in-sync)).

---

## Commands

| What                                         | Command                                                     |
| -------------------------------------------- | ----------------------------------------------------------- |
| Install deps                                 | `pnpm install`                                              |
| Token pipeline (transform + build)           | `pnpm tokens:sync` (root shortcut)                          |
| Token transform only                         | `pnpm --filter @ckwag/elements-tokens run tokens:transform` |
| Token build only (from existing tokens.json) | `pnpm --filter @ckwag/elements-tokens run build`            |
| Check component CSS vars exist as tokens     | `pnpm tokens:check` (after the token build)                 |
| Build icons                                  | `pnpm --filter @ckwag/elements-icons run build`             |
| Build components (also builds icons)         | `pnpm --filter @ckwag/elements run build`                   |
| Typecheck icons, components and Storybook    | `pnpm typecheck`                                            |
| Format code                                  | `pnpm format`                                               |
| Check formatting (CI)                        | `pnpm format:check`                                         |
| Start Storybook dev server                   | `pnpm --filter @ckwag/elements-storybook run dev`           |
| Build Storybook for deployment               | `pnpm --filter @ckwag/elements-storybook run build`         |
| Full release validation                      | `pnpm release:validate`                                     |
| Validate Figma Code Connect templates        | `pnpm figma:parse`                                          |
| Build all packages                           | `pnpm -r run build`                                         |

Engine requirements: **Node >= 22** (Style Dictionary 5 needs it for the token build), **pnpm >= 10**.
CI runs Node 22. The pnpm version is pinned by `packageManager` in the root `package.json`; newer
global pnpm versions switch to it automatically.

**Prettier** is configured (`.prettierrc.json`) and enforced by:

- **Pre-commit hook** — Husky runs lint-staged (Prettier on staged files) and `pnpm typecheck`.
- **CI** — `.github/workflows/ci.yml` on push/PR to `main`.

No ESLint or test runner is configured. The `lint` scripts are placeholders. Do not add either
unless explicitly asked.

### Definition of Done

Run what CI runs before you open a pull request. The full set, in CI order:

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm typecheck
pnpm --filter @ckwag/elements-tokens run build
pnpm tokens:check
pnpm --filter @ckwag/elements run build
pnpm --filter @ckwag/elements-storybook run build
pnpm release:check
pnpm release:pack
```

For a docs-only change, `pnpm format:check` is enough. For component work, also open the
component in Storybook and check every story renders.

---

## Monorepo Structure

```
ckw-elements/                       # pnpm workspaces root ("type": "module")
├── packages/tokens/                # @ckwag/elements-tokens — design tokens (CSS, JS, DTCG JSON)
├── packages/icons/                 # @ckwag/elements-icons — React SVG icon set
├── packages/components/            # @ckwag/elements — React components
├── apps/storybook/                 # @ckwag/elements-storybook — private docs site
├── token-drop/                     # Drop folder for Tokens Studio JSON exports
├── scripts/                        # Repo scripts (release validation, CSS var check)
├── .changeset/                     # Hand-written release notes for consumer-facing changes
├── .claude/skills/, .agents/skills/  # Agent skills (build-component, cleanup-figma-section, storybook)
├── tsconfig.base.json              # Shared strict TS settings, extended by package tsconfigs
└── pnpm-workspace.yaml             # packages: ['packages/*', 'apps/*']
```

Dependency direction: `components` → `icons` + `tokens`; `storybook` → all three. Component
source must not import Storybook code. `packages/components/src/storybook/` holds Storybook-only
helpers (Figma links, design reference) used by stories; it is not part of the build output.

**Git remote:** `origin` → `https://github.com/CKWAG/ckw-elements.git`

---

## Token Pipeline

```
tokens-raw.json → transform-tokens.mjs → tokens.json → Style Dictionary v5 → dist/tokens.{css,layered.css,js,d.ts,json}
```

- `dist/` outputs are generated, NEVER manually edit them.
- `tokens-raw.json` (Tokens Studio export) and `tokens.json` (DTCG) are both committed.
- Style Dictionary collision warnings are **intentional** (desktop/mobile typography) — do not fix them.
- Token groups: `primitive` (colors, font family, spacing, radius, border weight, shadow, gradient),
  `semantic` (colors), `typography` (desktop + mobile). Do not hardcode token counts in docs; they
  change with every Figma export. Count from `packages/tokens/tokens.json` if you need a number.

---

## Critical Rules

1. **Components use ONLY semantic tokens**, never primitives:

   ```css
   /* WRONG */
   background: var(--color-green-600);
   /* RIGHT */
   background: var(--interactive-primary);
   ```

   `pnpm tokens:check` fails CI when a component CSS file uses a `var(--…)` that is neither a
   token nor defined in the same file (Radix `--radix-*` variables are allowed).

2. **`import React from 'react'` is REQUIRED** in all TSX files. `tsconfig.base.json` uses the
   classic `"jsx": "react"` transform, so removing this import breaks the build.

3. **Do NOT introduce Turborepo, Nx, or similar** — pnpm workspaces only.

4. **Do NOT add a root `tsconfig.json`** unless explicitly asked. Package configs extend
   `tsconfig.base.json`.

5. **Brand color is GREEN** (`#86bc46`), not blue. Font is **Gotham** (Book=325, Medium=500).

6. **Storybook docs chrome** uses the CKW design system throughout — Gotham font,
   green accent colors, CKW semantic tokens for all UI surfaces (sidebar, toolbar, docs pages).
   No separate "specs" design language.

7. **Public API changes are breaking changes.** Renaming or removing a prop, a prop value, an
   export, or a CSS class used by consumers needs a `.changeset/` note with migration steps.

---

## Component Conventions

### File anatomy

Each component lives in `packages/components/src/<Component>/`:

| File                                 | Purpose                                                          |
| ------------------------------------ | ---------------------------------------------------------------- |
| `<Component>.tsx`                    | Implementation, exported props interface and value unions        |
| `<Component>.css`                    | Styles, imported by the TSX (`import './<Component>.css'`)       |
| `index.ts`                           | Re-exports component and types                                   |
| `<Component>.stories.tsx`            | Documented stories (states, variants, examples)                  |
| `<Component>.playground.stories.tsx` | Interactive playground with controls                             |
| `Overview.mdx`                       | Storybook docs page                                              |
| `<Component>.figma.ts`               | Figma Code Connect template (Title Case ↔ lowercase prop values) |

When adding a component, also:

- Export it and its types from **both** `src/index.ts` and `src/react/index.ts`.
- Add its Figma node to `src/storybook/figmaLinks.ts`.
- Update the agent docs listed in [Keeping Docs in Sync](#keeping-docs-in-sync).
- Follow `.claude/skills/build-component/SKILL.md` for the full Figma → code workflow.

### API design

- Prop names match Figma property names (`Show Icon` → `showIcon`). Prop values are lowercase in
  code (`size="large"`, `status="error"`); Figma keeps Title Case and the `*.figma.ts` templates
  map between them.
- Extend the native element props (`React.ComponentProps<'button'>`, etc.) and spread the rest
  onto the element, so consumers can pass `aria-*`, `data-*`, `name`, `id` and event handlers.
- Form controls and buttons use `React.forwardRef`.
- Support controlled and uncontrolled usage for stateful components (`value`/`defaultValue`,
  `open`/`defaultOpen`, plus an `on…Change` callback).
- Accept `className` on the root element; never require consumers to override internals.
- For complex interactive primitives (select, popover, dialog), build on Radix and follow the
  WAI-ARIA pattern. Document Radix constraints in `KNOWN_ISSUES.md`.

### CSS

- Class names use the `ckw-<component>` prefix with BEM-style elements/modifiers.
- Component-level custom properties use `--ckw-<component>-*` and are set from semantic tokens.
- Provide visible focus styles (`:focus-visible`) and check `@media (forced-colors: active)` and
  `prefers-reduced-motion` for anything that relies on color, borders or animation.
- Never hardcode hex colors, spacing, radii or shadows — always `var(--token-name)`.

### Accessibility

- Every interactive element needs an accessible name (label, `aria-label` or visible text).
- Meaning must never depend on color alone (status components show text and/or an icon).
- Decorative icons are `aria-hidden`; meaningful icons get a `title`.
- Keyboard: everything reachable and operable with Tab, Enter/Space and arrow keys where the
  WAI-ARIA pattern requires them.

---

## Code Style

### Formatting

- 2-space indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multiline arrays/objects

### TypeScript / React

- `strict: true` (set in `tsconfig.base.json`)
- Props: always `interface`, never `type`
- Variant unions: `export type ButtonVariant = 'primary' | 'secondary'` — no `enum`
- Type-only imports: `import type { Foo } from './bar'`
- In `index.ts` barrels and new component code, write relative imports with the `.js` extension
  (`from './Badge.js'`) so the emitted ESM resolves in Node
- Named exports, not default exports (except Storybook config files)
- One component per file, PascalCase filenames
- Destructured props in function signature: `({ token }: Props)`
- JSDoc comment above every exported function and every prop

### Import Order

```tsx
import React from 'react'; // 1. React (always first, required)
import type { StorybookConfig } from '@storybook/…'; // 2. External type imports
import { usesReferences } from 'style-dictionary/…'; // 3. External value imports
import type { ColorToken } from '../data/tokens'; // 4. Local type imports
import { ColorSwatch } from './ColorSwatch'; // 5. Local value imports
```

### Styling (Storybook docs)

- Inline `style={{ }}` for token references: `style={{ color: 'var(--text-primary)' }}`
- CSS class names from `docs.css` for docs layout: `className="docs-section"`
- No Tailwind in the monorepo

### Scripts (.mjs files)

- ESM (`import`/`export`), not CommonJS
- `const` for variables
- JSDoc block comments for documentation
- Use `node:` prefixed imports (`node:fs`, `node:path`, `node:url`)

### Error Handling

- No `console.log` in committed code (except token pipeline and check script summary output)
- Guard against missing data with early returns, not try/catch around rendering
- Validate token references exist before using them

---

## Storybook Conventions

Storybook 10 with `@storybook/react-vite`. Stories are loaded from `apps/storybook/src` and
`packages/components/src`.

### MDX Foundation Pages

```mdx
import { Meta } from '@storybook/addon-docs/blocks';
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
- `manager.ts` — uses `addons.setConfig()` from `storybook/manager-api`
- `theme.ts` — uses `create()` from `storybook/theming`
- `manager-head.html` — CSS injected into Manager `<head>` (fragile DOM selectors)
- Theme/manager changes require **server restart** (not hot-reloaded)
- `apps/storybook/public/` is served as-is; `packages/tokens/dist` is served at `/tokens`

`apps/storybook/src/data/tokens.ts` bridges `tokens.json` and Storybook — all token
data flows through this adapter, never hardcode values.

Only these title CSS classes exist in `docs.css`: `specs-title-4xl`, `specs-title-3xl`,
`specs-title-2xl`, `specs-title-xl`. There is NO `specs-title-m`.

---

## Dependencies and Upgrades

- Use pnpm only. Never commit `package-lock.json` or `yarn.lock`.
- CI installs with `--frozen-lockfile`: always commit `pnpm-lock.yaml` together with
  `package.json` changes.
- In-range updates: `pnpm update -r`, then run the full [Definition of Done](#definition-of-done).
- Major upgrades (Vite, Style Dictionary, TypeScript, React, Storybook): one per pull request,
  after checking the changelog and peer dependency ranges. For Style Dictionary, diff
  `packages/tokens/dist/*` before and after; the output must not change unintentionally.
- Keep all Storybook packages (`storybook`, `@storybook/*`) on the same version.
- TypeScript 7 (`tsc`) ships no JavaScript compiler API. Before adding a tool that does
  `import 'typescript'`, read the TypeScript 7 entry in `KNOWN_ISSUES.md`.
- Published packages: keep `peerDependencies` (`react`, `react-dom` `>=18 <20`) wide; only
  narrow them with a breaking changeset. Do not add runtime `dependencies` without a reason.
- pnpm settings (`onlyBuiltDependencies`, `overrides`) live in the root `package.json` `pnpm`
  field while the repo is on pnpm 10. Security overrides there must stay until upstream fixes land.

---

## Releases

Releases are tag-driven: publishing a GitHub Release `vX.Y.Z` sets the version of all three
public packages and publishes them to npm (`.github/workflows/release-packages.yml`). Pushes to
`main` that touch `packages/` publish a `-dev.<sha>` build under the `dev` dist-tag.

For consumer-facing changes to `@ckwag/elements-tokens`, `@ckwag/elements-icons` or
`@ckwag/elements`, add a hand-written note in `.changeset/<kebab-name>.md`:

```md
---
'@ckwag/elements': minor
---

What changed for consumers, and migration steps for breaking changes.
```

Dev-dependency bumps, Storybook-only and docs-only changes do not need a note.

---

## Keeping Docs in Sync

Agent docs are part of the product. Update them in the same pull request as the code change:

| When you…                                  | Update                                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Add, rename or remove a component          | `llms.txt`, `apps/storybook/public/llms.txt`, `apps/storybook/public/llms-full.txt`, `README.md` |
| Change a prop, prop value or default       | `apps/storybook/public/llms-full.txt`, component `Overview.mdx`, `.changeset/` note              |
| Change package names, exports or CSS files | All `llms*.txt`, `README.md`, package `README.md`, `apps/storybook/src/getting-started/*.mdx`    |
| Change design identity or key tokens       | `DESIGN.md` **and** its copy `apps/storybook/public/DESIGN.md` (keep identical)                  |
| Change commands, scripts, CI or rules      | This file (`AGENTS.md`)                                                                          |
| Find a library limitation or workaround    | `KNOWN_ISSUES.md`                                                                                |

Rules for agent-facing docs:

- Copy examples from real code and verify prop names against the `*Props` interfaces.
- Use real package names: `@ckwag/elements-tokens`, `@ckwag/elements-icons`, `@ckwag/elements`.
- Avoid numbers that drift (token counts, line counts, versions); point to the source instead.
- Before finishing, search for stale references, e.g.
  `git grep -nE '@ckwag/(tokens|components)([^-]|$)|="(Primary|Large|Info|Error)"'`. Old values
  in `.changeset/` migration notes are expected.

---

## Git and Pull Requests

- Branch from `main`; keep pull requests small and focused (one component or one upgrade).
- Conventional commit messages: `feat(button): …`, `fix(a11y): …`, `docs: …`, `chore: …`, `ci: …`.
  Mark breaking changes with `!` (`feat!: …`).
- Never commit secrets. `pnpm figma:publish` reads the Figma token from `FIGMA_ACCESS_TOKEN` or
  the macOS Keychain (store it once with `pnpm figma:token`).

---

## Files You Should Never Modify

| Path                              | Reason                                                 |
| --------------------------------- | ------------------------------------------------------ |
| `packages/tokens/dist/*`          | Generated by Style Dictionary                          |
| `packages/icons/dist/*`           | Generated by the icon package build                    |
| `packages/components/dist/*`      | Generated by the component package build               |
| `apps/storybook/storybook-static` | Generated by the Storybook build                       |
| `packages/tokens/tokens-raw.json` | Verbatim Figma export, only replaced via Tokens Studio |
| `node_modules/`                   | Package manager managed                                |

---

## Known Issues

See `KNOWN_ISSUES.md` for component and tooling constraints (e.g. `Select` options cannot use an empty
string value).

| #   | Issue                                                                              |
| --- | ---------------------------------------------------------------------------------- |
| M1  | Gradient `$type` is `"color"` but value is `linear-gradient()` — works in practice |
| M3  | `theme.ts` brand colors are hardcoded hex (Storybook `create()` needs raw strings) |
| L3  | No root `tsconfig.json` — package configs extend `tsconfig.base.json`              |
| L9  | React import required in all TSX until the JSX runtime is changed                  |
