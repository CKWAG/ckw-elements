# svg/

Source of truth for the icon package: one flat SVG per icon plus `manifest.json` (icon name to Figma node id).

**Do not edit these files by hand.** They are written by `../import-svgs.mjs` from the Figma icon index (only icons
with status "Ready") through the `add-icons-to-figma` Claude skill. `../generate-icons.mjs` validates them and
generates `../src/index.tsx`; `pnpm icons:check` in CI fails if the two disagree.

Rules for every SVG: 24x24, only `<path>` elements, every path `fill="currentColor"`, no strokes. Renamed or removed
icons need an entry in `../aliases.json` first. Full guide: `../CONTRIBUTING.md`.
