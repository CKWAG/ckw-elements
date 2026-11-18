---
'@ckwag/elements-icons': minor
---

Add 23 icons (`chevron-large-*`, `chevron-*-circle` and `-circle-filled`, `copy`, `drop`, `menu`, `more-horizontal`, `more-vertical`, `person`, `person-filled`, `history`, `peak-power`, `coins-filled`, `bar-graph-filled`) and refresh `close`, `list`, `megaphone`, `message` and `meter`.

`check-box` is now `check-box-filled` and `plus` is now `add`. The old names `IconCheckBox`, `IconPlus` and the `check-box` and `plus` names for `<Icon name>` keep working as deprecated aliases until the next major version.

Icons are now generated from committed SVG sources in `packages/icons/svg`, so the build no longer depends on Figma exports.
