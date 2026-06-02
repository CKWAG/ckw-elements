# ARCHITECTURE.md — CKW Elements Monorepo

> Last updated: March 2026
> Status: Token pipeline complete, Storybook active, Components scaffold ready

This document describes the full architecture of the CKW Elements design system monorepo:
how the workspace is structured, how design tokens flow from Figma into code, how Storybook
consumes the outputs, and what the step-by-step workflows are for common tasks.

---

## Table of Contents

1. [Workspace Overview](#1-workspace-overview)
2. [Token Pipeline](#2-token-pipeline)
3. [Two-Layer Token Architecture](#3-two-layer-token-architecture)
4. [Typography System](#4-typography-system)
5. [Storybook — Documentation Site](#5-storybook--documentation-site)
6. [Workflows](#6-workflows)
7. [Known Issues & Open Decisions](#7-known-issues--open-decisions)
8. [Dependency Map](#8-dependency-map)

---

## 1. Workspace Overview

### Monorepo Structure

```
ckw-elements/
│
├── package.json                  Root — pnpm workspaces, shared scripts
├── pnpm-workspace.yaml           Workspace definition (packages/* + apps/*)
├── pnpm-lock.yaml                Lock file
├── .gitignore                    Excludes node_modules/, dist/, .env, etc.
├── ARCHITECTURE.md               This file
│
├── packages/
│   │
│   ├── tokens/                   @ckw-elements/tokens .............. DONE
│   │   ├── tokens-raw.json         Verbatim Tokens Studio export (input)
│   │   ├── transform-tokens.mjs    Restructures raw → DTCG format
│   │   ├── tokens.json             Clean DTCG format (committed)
│   │   ├── build-tokens.mjs        Runs Style Dictionary
│   │   ├── style-dictionary.config.mjs   Custom transforms + formats
│   │   ├── package.json
│   │   └── dist/                   GENERATED — never edit manually
│   │       ├── tokens.css            CSS Custom Properties + Utility Classes
│   │       └── tokens.js            JavaScript named + default exports
│   │
│   ├── components/               @ckw-elements/components ......... ACTIVE
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts            React component exports
│   │       ├── react/              Explicit React subpath exports
│   │       ├── Button/             Button component, styles, stories, docs
│   │       ├── InputField/         Input field component, styles, stories, docs
│   │       └── SegmentedControl/   Segmented control component, styles, stories, docs
│   │
│   └── icons/                    @ckw-elements/icons .............. SCAFFOLD
│       ├── package.json
│       └── src/                    Empty (no icons yet)
│
├── apps/
│   └── storybook/                @ckw-elements/storybook .......... ACTIVE
│       ├── package.json
│       ├── .storybook/
│       │   ├── main.ts              Story discovery + addons + framework
│       │   ├── preview.ts           Global CSS imports + sidebar order
│       │   └── theme.ts             CKW-branded Storybook UI theme
│       ├── public/
│       │   ├── ckw-logo.svg         CKW corporate logo
│       │   └── fonts/
│       │       ├── Gotham-Book.otf   Weight 325
│       │       └── Gotham-Medium.otf Weight 500
│       └── src/
│           ├── docs.css             Master stylesheet (specs design language)
│           ├── data/
│           │   └── tokens.ts        Adapter: tokens.json → typed arrays
│           ├── components/
│           │   ├── TypographySample.tsx
│           │   ├── SpacingBar.tsx
│           │   ├── ColorSwatch.tsx
│           │   ├── ColorGrid.tsx
│           │   ├── ShadowCard.tsx
│           │   ├── BorderPreview.tsx
│           │   └── TokenTable.tsx
│           └── foundations/
│               ├── Typography.mdx
│               ├── Colors.mdx
│               ├── Spacings.mdx
│               ├── Borders.mdx
│               └── Shadows.mdx
│
└── .github/
    └── workflows/                Empty — CI/CD not yet configured
```

### Tech Stack

| Tool             | Version  | Purpose                                  |
| ---------------- | -------- | ---------------------------------------- |
| pnpm             | >= 10    | Monorepo package manager (workspaces)    |
| Node.js          | >= 20    | Runtime                                  |
| Style Dictionary | 4.x      | Token transformation (JSON → CSS/JS)     |
| Tokens Studio    | (Plugin) | Figma plugin — exports Variables as JSON |
| React            | 19       | Component library framework              |
| TypeScript       | 5.x      | Type safety (strict mode planned)        |
| Storybook        | 10.x     | Documentation site + component explorer  |
| Vite             | 6.x      | Build tool (via @storybook/react-vite)   |

### Package Status

| Package               | npm Scope                  | Status   | Published |
| --------------------- | -------------------------- | -------- | --------- |
| `packages/tokens`     | `@ckw-elements/tokens`     | Done     | Not yet   |
| `packages/components` | `@ckw-elements/components` | Active   | Not yet   |
| `packages/icons`      | `@ckw-elements/icons`      | Scaffold | Not yet   |
| `apps/storybook`      | `@ckw-elements/storybook`  | Active   | Private   |

---

## 2. Token Pipeline

The token pipeline is the backbone of the entire design system. It transforms design
decisions from Figma into consumable CSS and JavaScript outputs.

### Pipeline Flow

```
 ┌─────────────────────────────────────────────────────────────────────┐
 │                         FIGMA (Source of Truth)                     │
 │                                                                     │
 │   Figma Variables are structured in two layers:                     │
 │   • Primitive Tokens — raw values (Green/300 = #86bc46)            │
 │   • Semantic Tokens — references (text-primary = {Grey.800})       │
 │   • Typography has two modes: Desktop / Mobile                     │
 └──────────────────────────────┬──────────────────────────────────────┘
                                │
                         Manual Export
                       (Tokens Studio Plugin)
                                │
                                ▼
 ┌──────────────────────────────────────────────────────────────────────┐
 │  tokens-raw.json                                     3364 lines     │
 │  Verbatim Tokens Studio export. Committed to Git for traceability.  │
 │  Contains all token sets as nested objects with Figma references.   │
 └──────────────────────────────┬───────────────────────────────────────┘
                                │
                    node transform-tokens.mjs
                                │
                   ┌────────────┴────────────┐
                   │  What it does:          │
                   │  • Restructures paths   │
                   │  • Adds $type/$value    │
                   │  • Converts references  │
                   │  • Composes shadows     │
                   │  • Logs diff + counts   │
                   └────────────┬────────────┘
                                │
                                ▼
 ┌──────────────────────────────────────────────────────────────────────┐
 │  tokens.json                                         1236 lines     │
 │  Clean DTCG format (Design Token Community Group).                  │
 │  Committed to Git. Also published to npm for direct consumption.   │
 │                                                                     │
 │  Structure:                                                         │
 │  {                                                                  │
 │    "primitive": { "color": {...}, "spacing": {...}, ... },          │
 │    "semantic":  { "color": {...} },                                 │
 │    "typography": { "desktop": {...}, "mobile": {...} }              │
 │  }                                                                  │
 └──────────────────────────────┬───────────────────────────────────────┘
                                │
                     node build-tokens.mjs
                    (runs Style Dictionary v4)
                                │
                   ┌────────────┴────────────┐
                   │  What it does:          │
                   │  • Strip path prefixes  │
                   │  • Map font weights     │
                   │  • Generate CSS blocks  │
                   │  • Generate JS exports  │
                   │  • Preserve var() refs  │
                   └────────────┬────────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
 ┌──────────────────────────┐  ┌──────────────────────────┐
 │  dist/tokens.css         │  │  dist/tokens.js          │
 │  451 lines               │  │  591 lines               │
 │                          │  │                          │
 │  Contains:               │  │  Contains:               │
 │  • :root {} primitives   │  │  • Named exports         │
 │  • :root {} semantics    │  │    (camelCase)           │
 │  • :root {} typo desktop │  │  • Default export        │
 │  • @media {} typo mobile │  │    (kebab-case object)   │
 │  • [data-theme="dark"]   │  │  • Primitives            │
 │  • .text-* utilities     │  │  • Semantics (var refs)  │
 └──────────────────────────┘  │  • Typography desktop    │
                               │  • Typography mobile     │
                               └──────────────────────────┘
```

### Transform Mapping Rules

`transform-tokens.mjs` maps Tokens Studio sets to DTCG paths:

| Tokens Studio Set            | DTCG Path                     | Count |
| ---------------------------- | ----------------------------- | ----- |
| `Primitive Colors/Value`     | `primitive.color.*`           | 79    |
| `Semantic Colors/Light Mode` | `semantic.color.*`            | 76    |
| `Typography/Desktop`         | `typography.desktop.*`        | 48    |
| `Typography/Mobile`          | `typography.mobile.*`         | 48    |
| `Spacing/Value`              | `primitive.spacing.*`         | 15    |
| `Borders/Value`              | `primitive.border-radius.*`   | 7     |
| `Borders/Value`              | `primitive.border-weight.*`   | 4     |
| `Shadows/Value`              | `primitive.shadow.*`          | 3     |
| `Gradients/Value`            | `primitive.gradient.*`        | 1     |
| `Typography/Desktop`         | `primitive.font-family.brand` | 1     |
| `Specification/Value`        | SKIPPED (internal specs)      | —     |

### Style Dictionary Custom Transforms

| Transform Name          | What It Does                                                                                               |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `name/ckw-strip-prefix` | Strips `primitive.`, `semantic.color.`, `typography.{mode}.` from paths to create clean CSS variable names |
| `value/ckw-font-weight` | Converts `"Book"` → `"325"`, `"Medium"` → `"500"`                                                          |

### Style Dictionary Custom Formats

| Format Name      | Output File       | What It Generates                             |
| ---------------- | ----------------- | --------------------------------------------- |
| `ckw/tokens-css` | `dist/tokens.css` | Single CSS file with 12 structured blocks     |
| `ckw/tokens-js`  | `dist/tokens.js`  | JS module with named exports + default export |

### Token Count Summary (282 Total)

| Category           | Count   | CSS Variable Pattern                         |
| ------------------ | ------- | -------------------------------------------- |
| Primitive colors   | 79      | `--color-{group}-{step}`                     |
| Semantic colors    | 76      | `--{name}` (e.g. `--text-primary`)           |
| Spacing            | 15      | `--spacing-{size}`                           |
| Border radius      | 7       | `--border-radius-{size}`                     |
| Border weight      | 4       | `--border-weight-{size}`                     |
| Font family        | 1       | `--font-family-brand`                        |
| Shadows            | 3       | `--shadow-{size}`                            |
| Gradient           | 1       | `--gradient-brand`                           |
| Typography desktop | 48      | `--{style}-{prop}` (e.g. `--heading-l-size`) |
| Typography mobile  | 48      | Same names, inside `@media` block            |
| **Total**          | **282** |                                              |

### What Gets Committed vs. Generated

| File              | Committed | Generated | Published to npm |
| ----------------- | --------- | --------- | ---------------- |
| `tokens-raw.json` | Yes       | No        | No               |
| `tokens.json`     | Yes       | Yes\*     | Yes              |
| `dist/tokens.css` | No        | Yes       | Yes              |
| `dist/tokens.js`  | No        | Yes       | Yes              |

\*`tokens.json` is generated by `transform-tokens.mjs` but committed to Git
for traceability — every token change is visible in PR diffs.

---

## 3. Two-Layer Token Architecture

The design system uses a strict two-layer token architecture. This is the foundation
for theming, dark mode, and consistent component styling.

### Layer 1: Primitive Tokens (Raw Values)

Primitive tokens are the lowest level. They define the raw design values — colors, sizes,
weights — without any semantic meaning. They never change based on theme.

```css
:root {
  /* Colors — 8 groups with 11-step scales + 2 neutrals */
  --color-green-300: #86bc46; /* Brand color */
  --color-green-600: #365f10;
  --color-grey-800: #232623;
  --color-neutrals-white: #ffffff;

  /* Spacing — 15 steps from none to 8xl */
  --spacing-md: 16px;
  --spacing-xl: 24px;

  /* Border radius, weight, shadows, gradient, font-family */
  --border-radius-sm: 8px;
  --shadow-sm: 0px 2px 20px 0px rgba(0, 0, 0, 0.06);
  --font-family-brand: Gotham;
}
```

### Layer 2: Semantic Tokens (References)

Semantic tokens give meaning to primitives. They describe _purpose_, not appearance.
They reference primitives via `var()` — this is what enables theming.

```css
:root {
  /* Text */
  --text-primary: var(--color-grey-800);
  --text-on-interactive-primary: var(--color-neutrals-white);

  /* Interactive */
  --interactive-primary: var(--color-green-600);
  --interactive-primary-hover: var(--color-green-700);

  /* Background */
  --background-default: var(--color-neutrals-white);
  --background-canvas: var(--color-grey-50);

  /* Border */
  --border-medium: var(--color-grey-200);

  /* Status */
  --status-error-text: var(--color-orange-600);
}
```

### The Golden Rule

**Components NEVER use Primitive Tokens directly — only Semantic Tokens.**

```
WRONG:   background: var(--color-green-600)
CORRECT: background: var(--interactive-primary)
```

This ensures that when a theme changes (e.g. dark mode), only the semantic layer
needs to be updated — no component code changes required.

### Dark Mode Readiness

Dark mode is structurally prepared from day one, even though no dark mode exists yet:

```css
/* Light mode (default) — already filled with all 76 semantic tokens */
:root {
  --text-primary: var(--color-grey-800);
  --background-default: var(--color-neutrals-white);
  /* ... */
}

/* Dark mode — placeholder, will be filled when designed in Figma */
[data-theme='dark'] {
  /* When dark mode is designed:
     --text-primary: var(--color-grey-100);
     --background-default: var(--color-grey-900);
  */
}
```

When dark mode is eventually designed in Figma:

1. Export new token values via Tokens Studio
2. Run `pnpm tokens:sync`
3. The `[data-theme="dark"]` block fills automatically
4. Zero component code changes needed

### Semantic Color Categories (76 Tokens)

| Category    | Count | Examples                                          |
| ----------- | ----- | ------------------------------------------------- |
| Text        | 6     | `--text-primary`, `--text-on-interactive-primary` |
| Interactive | 7     | `--interactive-primary`, `--interactive-text`     |
| Background  | 8     | `--background-default`, `--background-canvas`     |
| Border      | 6     | `--border-soft`, `--border-active`                |
| Status      | 12    | `--status-error`, `--status-success-text`         |
| Chart       | 35    | `--chart-green-dark`, `--chart-blue-medium`       |
| Decorative  | 2     | `--decorative-light`, `--decorative-dark`         |

---

## 4. Typography System

### Overview

The typography system has **16 styles** across 5 categories, using **Gotham** as the
brand typeface with two weights:

| Weight Name | CSS Value | Usage                         |
| ----------- | --------- | ----------------------------- |
| Book        | 325       | Body text, Display, Lead      |
| Medium      | 500       | Headings, emphasized variants |

### Categories

| Category | Styles | Responsive | Description                                 |
| -------- | ------ | ---------- | ------------------------------------------- |
| Display  | 2      | Yes        | Hero headlines, use once per page           |
| Heading  | 4      | Yes        | Content structure (XL, L, M, S)             |
| Lead     | 2      | Yes        | Introductory copy below headings            |
| Body     | 6      | No         | Primary reading text (L, M, S + Emphasized) |
| Caption  | 2      | No         | Labels, metadata, footnotes                 |

### Three Output Layers

The pipeline generates typography tokens at three levels:

```
Layer 1: CSS Custom Properties (individual values)
────────────────────────────────────────────────────
:root {
  --heading-l-size: 36px;
  --heading-l-height: 48px;
  --heading-l-weight: 500;
}


Layer 2: Mobile Overrides (only values that differ)
────────────────────────────────────────────────────
@media (max-width: 767px) {
  :root {
    --heading-l-size: 26px;
    --heading-l-height: 34px;
    /* weight stays 500 — not repeated */
  }
}


Layer 3: Utility Classes (combine all properties)
────────────────────────────────────────────────────
.text-heading-l {
  font-family: var(--font-family-brand);
  font-size: var(--heading-l-size);
  line-height: var(--heading-l-height);
  font-weight: var(--heading-l-weight);
}
```

The utility classes are **automatically responsive** because they reference CSS
custom properties that change via `@media`. No JavaScript needed.

### Responsive Behavior

Display, Heading, and Lead categories have different values for Desktop and Mobile.
Body and Caption are identical across both modes.

Example — Heading L:

| Property    | Desktop | Mobile |
| ----------- | ------- | ------ |
| Font Size   | 36px    | 26px   |
| Line Height | 48px    | 34px   |
| Font Weight | 500     | 500    |

### Usage

```css
/* Option A: Utility class (recommended) */
.my-heading {
  /* Automatically responsive */
}
/* In JSX: <h2 className="text-heading-l">Title</h2> */

/* Option B: Individual tokens */
.my-heading {
  font-family: var(--font-family-brand);
  font-size: var(--heading-l-size);
  line-height: var(--heading-l-height);
  font-weight: var(--heading-l-weight);
}
```

---

## 5. Storybook — Documentation Site

Storybook is the **first consumer** of the token pipeline. It consumes all three
outputs from `@ckw-elements/tokens`:

### How Storybook Consumes Tokens

```
@ckw-elements/tokens (workspace dependency)
       │
       ├─── tokens.css ──────▶ .storybook/preview.ts
       │                        Global CSS import. Makes all CSS Custom Properties
       │                        and .text-* utility classes available.
       │
       ├─── tokens.json ─────▶ src/data/tokens.ts (Adapter)
       │                        Imports DTCG JSON, transforms into typed arrays
       │                        for documentation tables and components.
       │                              │
       │                              ├──▶ 5 MDX Pages (data for tables)
       │                              └──▶ 7 React Components (type definitions)
       │
       └─── tokens.js ───────▶ (available but not actively used yet)
                                Could be used in theme.ts for brand colors.
```

### The Adapter Pattern (`src/data/tokens.ts`)

This file is the single point where `tokens.json` enters Storybook. It:

1. Imports `tokens.json` from `@ckw-elements/tokens/tokens.json`
2. Transforms the nested DTCG structure into flat typed arrays
3. Exports the same interfaces that all 11 consumer files expect

```
tokens.json (DTCG)                    tokens.ts (Adapter)
─────────────────                     ───────────────────
{ "primitive": {                      primitiveColors: ColorGroup[]
    "color": {                        semanticColors: SemanticColorCategory[]
      "green": {                      typographyCategories: TypographyCategory[]
        "300": { "$value": "#86bc46" } spacingTokens: SpacingToken[]
      }                               shadowTokens: ShadowToken[]
    }                                 borderRadiusTokens: BorderRadiusToken[]
  },                                  borderWeightTokens: BorderWeightToken[]
  "semantic": { ... },                gradientToken: { name, cssVar, value }
  "typography": { ... }
}
```

When Figma tokens change and `pnpm tokens:sync` runs, `tokens.json` updates,
and the adapter automatically derives new values. No manual editing needed.

### Docs-Specific Design Language (`--specs-*`)

Storybook documentation pages have their own visual language, separate from the CKW
design system tokens. This is defined in `src/docs.css`:

```
CKW Design Tokens (--color-*, --text-*, etc.)
  → Used for: live token previews, color swatches, spacing bars

Specs Design Tokens (--specs-*, --specs-font, etc.)
  → Used for: page titles, descriptions, table headers, badges
  → Font: Roboto (400, 900) + JetBrains Mono (500)
  → Colors: Neutral gray scale (--specs-050 through --specs-900)
```

This separation ensures the documentation chrome never conflicts with the actual
design system being documented.

### Storybook CSS Specificity: `sb-unstyled`

Storybook's Docs addon applies its own styles to all content. To prevent these from
overriding the documentation's custom styling, all MDX page content is wrapped in:

```jsx
<div className="sb-unstyled">{/* All page content */}</div>
```

And CSS selectors in `docs.css` use `.sb-unstyled .class-name` with `!important`
on font properties. This is Storybook's official opt-out mechanism.

### Foundation Pages (5)

| Page       | Data Source (from adapter)                           | Components Used                          |
| ---------- | ---------------------------------------------------- | ---------------------------------------- |
| Typography | `typographyCategories`                               | `TypographySample`                       |
| Colors     | `primitiveColors`, `semanticColors`, `gradientToken` | `ColorGrid`, `ColorSwatch`, `TokenTable` |
| Spacings   | `spacingTokens`                                      | `SpacingBar`                             |
| Borders    | `borderRadiusTokens`, `borderWeightTokens`           | `BorderPreview`                          |
| Shadows    | `shadowTokens`                                       | `ShadowCard`, `TokenTable`               |

### Sidebar Order

```
Foundations/
├── Typography
├── Colors
├── Spacings
├── Borders
└── Shadows
```

Configured in `.storybook/preview.ts` via `storySort`.

---

## 6. Workflows

### A. "I changed a token value in Figma"

This is the most common workflow — a color, spacing, or typography value was updated.

```
Step 1    Open Figma → Open Tokens Studio plugin
          ↓
Step 2    Click "Export" → Export all token sets as single JSON
          ↓
Step 3    Save/overwrite as:
          packages/tokens/tokens-raw.json
          ↓
Step 4    Run in terminal:
          pnpm tokens:sync
          ↓
          This executes:
          ├── transform-tokens.mjs  → updates tokens.json
          └── build-tokens.mjs      → regenerates dist/tokens.css + dist/tokens.js
          ↓
Step 5    Verify the changes:
          • Check git diff on tokens.json — are the changes correct?
          • Check git diff on dist/tokens.css — do the CSS values match?
          ↓
Step 6    Start Storybook to visually verify:
          pnpm --filter @ckw-elements/storybook run dev
          ↓
Step 7    If everything looks good:
          git add -A && git commit -m "tokens: update [what changed]"
```

**What updates automatically:**

- `tokens.json` — new values from transform
- `dist/tokens.css` — regenerated CSS Custom Properties
- `dist/tokens.js` — regenerated JS exports
- Storybook documentation tables — adapter reads `tokens.json` at build time
- Storybook live previews — CSS Custom Properties update via `tokens.css`

**What does NOT update automatically:**

- `.storybook/theme.ts` — has hardcoded hex values for Storybook UI chrome
- Category descriptions in `data/tokens.ts` — editorial text, not from Figma

### B. "I added a new token in Figma"

Same as Workflow A, **plus** you may need to check:

```
Step 1-4  Same as Workflow A (export → overwrite → pnpm tokens:sync)
          ↓
Step 5    Check: does the new token appear in tokens.json?
          ↓
          YES → The transform script handles it. Continue to Step 6.
          NO  → The new token is in a set that transform-tokens.mjs
                does not recognize. You need to add a mapping rule
                in transform-tokens.mjs for the new set.
          ↓
Step 6    Check: does the new token appear in dist/tokens.css?
          ↓
          YES → Style Dictionary handles it. Continue to Step 7.
          NO  → The new token type needs a new block in
                style-dictionary.config.mjs (in the custom format).
          ↓
Step 7    Check: should this token appear in Storybook docs?
          ↓
          YES → Update the adapter (src/data/tokens.ts):
                • Add a build function for the new category
                • Export the new data array
                • Update or create an MDX page in src/foundations/
          ↓
Step 8    Verify in Storybook and commit.
```

### C. "I want to build a new component"

```
Step 1    Get the Figma link to the component
          (e.g. https://figma.com/design/wGx1Y74QZIsy40UATyN6bI/...?node-id=123-456)
          ↓
Step 2    Use Figma MCP to fetch the design context:
          figma_get_design_context(nodeId: "123:456")
          This returns all variants, states, dimensions, spacing, token references.
          ↓
Step 3    Create the component directory:
          packages/components/src/ComponentName/
          ├── ComponentName.tsx        React component
          ├── ComponentName.stories.tsx Storybook story + Code Connect
          └── ComponentName.mdx        Guidelines and documentation
          ↓
Step 4    Build the component:
          • Use ONLY Semantic Tokens (var(--interactive-primary), not var(--color-green-600))
          • TypeScript strict, props as interface
          • One component per file, PascalCase filenames
          ↓
Step 5    Write the Storybook story:
          • All variants and states as separate stories
          • Interactive controls via argTypes
          • Figma Code Connect parameters with the node URL
          ↓
Step 6    Export from barrel file:
          packages/components/src/index.ts
          export { ComponentName } from './ComponentName/ComponentName';
          ↓
Step 7    Verify in Storybook:
          pnpm --filter @ckw-elements/storybook run dev
```

### D. "I want to run Storybook locally"

```bash
# First time setup (or after pulling changes)
cd ckw-elements
pnpm install

# Start development server
pnpm --filter @ckw-elements/storybook run dev
# → Opens at http://localhost:6006

# Build for production
pnpm --filter @ckw-elements/storybook run build
# → Output in apps/storybook/storybook-static/
```

### E. Quick Reference — All Commands

| Command                                           | What It Does                       |
| ------------------------------------------------- | ---------------------------------- |
| `pnpm install`                                    | Install all workspace deps         |
| `pnpm tokens:sync`                                | Transform + build tokens           |
| `pnpm --filter @ckw-elements/tokens run build`    | Build tokens only (skip transform) |
| `pnpm --filter @ckw-elements/storybook run dev`   | Start Storybook dev server         |
| `pnpm --filter @ckw-elements/storybook run build` | Build Storybook for deployment     |
| `pnpm -r run build`                               | Build all workspace packages       |

---

## 7. Known Issues & Open Decisions

### Issues from Audit (March 2026)

#### Medium Priority

| #   | Location               | Issue                                                                                                                                                                     |
| --- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| M1  | `transform-tokens.mjs` | Gradient `$type` is `"color"` but value is a CSS `linear-gradient()`. Technically incorrect per DTCG spec, works in practice.                                             |
| M3  | `.storybook/theme.ts`  | All brand colors are hardcoded hex values. Could import from `tokens.js` to stay in sync with the pipeline. Storybook's `create()` API requires raw strings, not `var()`. |

#### Low Priority

| #   | Location             | Issue                                                                                                                                                                                                                                   |
| --- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| L3  | No `tsconfig.json`   | Entire repo has no TypeScript config. IDE type-checking depends on Storybook's internal Vite config. Adding `tsconfig.json` is a known future task.                                                                                     |
| L4  | `dist/tokens.js`     | No `.d.ts` TypeScript declarations. TS consumers get no autocomplete.                                                                                                                                                                   |
| L9  | All 7 TSX components | `import React from 'react'` is present. Required until `tsconfig.json` with `"jsx": "react-jsx"` is added — without it, the automatic JSX transform is not active and removing the import causes "React is not defined" runtime errors. |

### Open Decisions

| Question                   | Options                                          | Status        |
| -------------------------- | ------------------------------------------------ | ------------- |
| npm publishing             | Public npm vs. private GitHub Packages           | Not decided   |
| Figma Code Connect         | Requires Org/Enterprise plan — does CKW have it? | Not confirmed |
| GitHub repo visibility     | Public or private?                               | Not decided   |
| Figma API Token for CI/CD  | Needed for automated pipeline                    | Not created   |
| GitHub Pages for Storybook | Deploy docs site publicly?                       | Not decided   |

---

## 8. Dependency Map

### Workspace Dependencies

```
                  ┌─────────────────────────┐
                  │  @ckw-elements/tokens   │
                  │  (Source of Truth)       │
                  │                         │
                  │  Exports:               │
                  │  • tokens.css           │
                  │  • tokens.js            │
                  │  • tokens.json          │
                  └────────┬───────┬────────┘
                           │       │
              ┌────────────┘       └────────────┐
              ▼                                 ▼
┌──────────────────────────┐      ┌──────────────────────────┐
│ @ckw-elements/components │      │ @ckw-elements/storybook  │
│ (workspace:*)            │      │ (workspace:*)            │
│                          │      │                          │
│ Depends on:              │      │ Depends on:              │
│ • tokens (for CSS vars)  │      │ • tokens (CSS + JSON)    │
│ • react (peer dep)       │      │ • components (stories)   │
│                          │      │ • storybook 10           │
│ Status: Scaffold         │      │ • react 19               │
└──────────┬───────────────┘      │                          │
           │                      │ Status: Active           │
           └──────────────────────▶                          │
                  consumed by     └──────────────────────────┘

┌──────────────────────────┐
│ @ckw-elements/icons      │
│ (standalone)             │
│                          │
│ No dependencies          │
│ Status: Scaffold         │
└──────────────────────────┘
```

### External Dependencies (Key)

| Package                 | Used By               | Purpose                      |
| ----------------------- | --------------------- | ---------------------------- |
| `style-dictionary`      | tokens                | Token transformation engine  |
| `react` + `react-dom`   | components, storybook | UI framework                 |
| `typescript`            | components            | Type safety (dev dependency) |
| `storybook`             | storybook             | Documentation framework      |
| `@storybook/react-vite` | storybook             | Vite-based Storybook builder |

### Data Flow (End to End)

```
Figma Variables
     │
     ▼
Tokens Studio Plugin ──export──▶ tokens-raw.json
     │
     ▼
transform-tokens.mjs ──────────▶ tokens.json ◄─── Single Source of Truth
     │                                │
     ▼                                │
Style Dictionary v4                   │
     │                                │
     ├──▶ dist/tokens.css ────────────┼──▶ Storybook (global CSS)
     │                                │         │
     ├──▶ dist/tokens.js              │         ▼
     │                                │    Live previews use
     │                                │    CSS Custom Properties
     │                                │
     │                                └──▶ data/tokens.ts (Adapter)
     │                                          │
     │                                          ▼
     │                                     MDX Pages show
     │                                     token tables + metadata
     │
     └──▶ Future: MyCKW, other products
          install @ckw-elements/tokens
          import tokens.css
```

---

## Appendix: File Reference

Quick lookup for every file in the monorepo and its purpose.

### Root

| File                  | Purpose                           |
| --------------------- | --------------------------------- |
| `package.json`        | Workspace root, shared scripts    |
| `pnpm-workspace.yaml` | Defines workspace members         |
| `.gitignore`          | Excludes node_modules, dist, etc. |
| `ARCHITECTURE.md`     | This document                     |

### `packages/tokens/`

| File                          | Purpose                                       | Committed | Generated |
| ----------------------------- | --------------------------------------------- | --------- | --------- |
| `package.json`                | Package identity, exports, scripts            | Yes       | No        |
| `tokens-raw.json`             | Verbatim Tokens Studio export (3364 lines)    | Yes       | No        |
| `transform-tokens.mjs`        | Raw → DTCG transformation script (484 lines)  | Yes       | No        |
| `tokens.json`                 | Clean DTCG format (1236 lines)                | Yes       | Yes\*     |
| `build-tokens.mjs`            | Style Dictionary runner (26 lines)            | Yes       | No        |
| `style-dictionary.config.mjs` | Custom transforms + formats (504 lines)       | Yes       | No        |
| `dist/tokens.css`             | CSS Custom Properties + Utilities (451 lines) | No        | Yes       |
| `dist/tokens.js`              | JS named + default exports (591 lines)        | No        | Yes       |

### `apps/storybook/`

| File                                             | Purpose                                        |
| ------------------------------------------------ | ---------------------------------------------- |
| `.storybook/main.ts`                             | Story discovery, addons, framework config      |
| `.storybook/preview.ts`                          | Global CSS imports, sidebar order              |
| `.storybook/theme.ts`                            | CKW-branded Storybook UI theme                 |
| `public/ckw-logo.svg`                            | CKW corporate logo                             |
| `public/fonts/Gotham-Book.woff2`                 | Gotham Book WOFF2 (weight 325, primary)        |
| `public/fonts/Gotham-Medium.woff2`               | Gotham Medium WOFF2 (weight 500, primary)      |
| `public/fonts/Gotham-Book.otf`                   | Gotham Book OTF (fallback)                     |
| `public/fonts/Gotham-Medium.otf`                 | Gotham Medium OTF (fallback)                   |
| `public/fonts/Roboto-latin.woff2`                | Roboto variable font (specs UI text)           |
| `public/fonts/Roboto-latin-ext.woff2`            | Roboto latin-ext subset                        |
| `public/fonts/JetBrainsMono-500-latin.woff2`     | JetBrains Mono (specs code font)               |
| `public/fonts/JetBrainsMono-500-latin-ext.woff2` | JetBrains Mono latin-ext subset                |
| `.storybook/manager.ts`                          | Storybook Manager UI config (theme)            |
| `.storybook/manager-head.html`                   | Manager `<head>` injection (sidebar emoji CSS) |
| `src/docs.css`                                   | Master docs stylesheet (specs design lang.)    |
| `src/data/tokens.ts`                             | Adapter: tokens.json → typed arrays            |
| `src/components/*.tsx`                           | 7 React components for docs rendering          |
| `src/foundations/*.mdx`                          | 5 MDX documentation pages                      |
