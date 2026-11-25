---
'@ckwag/elements-tokens': major
'@ckwag/elements': patch
---

Sync with the Figma variables, where three semantic tokens were renamed. The old names are removed from `tokens.css`, `tokens.layered.css`, `tokens.js`, `tokens.d.ts` and `tokens.json`.

Migration:

- `--background-default` → `--background-card`
- `--border-soft` → `--border-light`
- `--background-hover` → `--background-hover-medium`

`--background-hover-light` (Grey 75) is new. `--status-warning-border` changes from Yellow 400 to Yellow 600, so the Inline Message warning accent is darker. Components use the new names.
