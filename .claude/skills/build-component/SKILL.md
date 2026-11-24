---
name: build-component
description: Builds a new component for the CKW Elements design system, first in the CKW Elements Figma file, then as React code in packages/components, benchmarked against shadcn/ui and built best practice with CKW tokens only. Use when Janosch asks to build or add a component, e.g. "lass uns den Badge bauen", "neue Komponente Select", "bau mir eine Checkbox ins Design System", "add a Modal component".
---

# Build a CKW Elements component

Goal: the component is built **best practice** (not copied 1:1 from how MyCKW happens to draw it), uses **only CKW
tokens**, looks modern, and has been **compared with shadcn/ui** before it is built. Keep it lean: two stops where
Janosch decides, everything else runs through. Talk to Janosch in German.

Files: CKW Elements `wGx1Y74QZIsy40UATyN6bI` (design system), MyCKW Master `c9YVEJSeMNQpit3WcueMzj` (usage).
Reference section for structure and doc style: **Inline Message** (page `695:341`, frame `695:342`).

## 0. Consistency first

Before proposing anything, read the existing components in `packages/components/src/` and their Figma sections, and
the decisions log in memory (`project-component-decisions`). Reuse their naming, sizes, radii, focus ring, state
colours and doc structure. The design system must feel like one system; if a new component needs to break a shared
convention, say so and ask.

## 1. Benchmark and proposal (stop 1)

- Look at how MyCKW uses it (instances, states, edge cases) only to learn the **needs**, not the look.
- Compare with shadcn/ui (and its Radix primitive / the WAI-ARIA pattern for interactive components): anatomy,
  variants, sizes, states, keyboard and ARIA behaviour.
- Post a short comparison in chat: what MyCKW needs, what shadcn does, what we take over, what we do differently and
  why. Propose the API (variants and props, same names in Figma and code).
- Where a real choice exists (look, variant set), build 2–3 options **directly in Figma** on the
  `🧪 Explorations` page of the CKW Elements file, labelled A/B/C, tokens only. Ask Janosch which one to take.

## 2. Figma component (stop 2)

- Build the component set with clean properties (Variant, Boolean, Text, Instance swap) and semantic layer names.
- Tokens only: colour variables, bound spacing, radius, border and size variables. No hex, no unbound numbers. If no
  token fits, ask.
- Doc section like Inline Message (doc chrome in `Documentation/specs-*`, `Examples` on
  `Background/background-canvas`), then run `../cleanup-figma-section/scripts/normalize-doc-layout.js`.
- Add a Change Log entry, screenshot the section and let Janosch approve.

## 3. Code

- `packages/components/src/<Name>/`: `<Name>.tsx`, `<Name>.css`, `index.ts`, `<Name>.stories.tsx`,
  `<Name>.playground.stories.tsx`, `Overview.mdx`; export it from `src/index.ts`, add the node to
  `src/storybook/figmaLinks.ts`.
- Follow `AGENTS.md` (semantic tokens only, `import React`, interfaces for props, JSDoc).
- Accessibility as in the benchmark: native element where possible, full keyboard support, visible focus ring.
  For complex overlays (Select, Dialog, Popover, Tooltip) ask once whether to use a Radix primitive before writing
  focus management by hand.

## 4. Check

- Screenshot Storybook next to Figma, test keyboard and focus, run `pnpm format` and the package build.
- Report briefly: what was built, where it deviates from MyCKW and why. Do not commit unless asked.
- Record the decisions (chosen option, variants, deviations and why, any new shared convention) in the memory
  decisions log and mark the component as built in the roadmap memory.
