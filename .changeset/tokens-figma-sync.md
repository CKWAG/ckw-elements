---
'@ckwag/elements-tokens': minor
'@ckwag/elements': patch
---

Sync with the Figma variables, where three semantic tokens were renamed: `--background-default` → `--background-card`, `--border-soft` → `--border-light` and `--background-hover` → `--background-hover-medium`. `--background-hover-light` is new. The old names are still emitted for now and will be removed in a later major version, so switch to the new names. Components use the new names. `--status-warning-border` changes from Yellow 400 to Yellow 600, so the Inline Message warning accent is darker.
