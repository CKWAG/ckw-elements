---
'@ckwag/elements-icons': minor
---

Add 23 icons (`chevron-large-*`, `chevron-*-circle` and `-circle-filled`, `copy`, `drop`, `menu`, `more-horizontal`, `more-vertical`, `person`, `person-filled`, `history`, `peak-power`, `coins-filled`, `bar-graph-filled`) and refresh `close`, `list`, `megaphone`, `message` and `meter`.

`check-box` is now `check-box-filled` and `plus` is now `add`. The old names `IconCheckBox`, `IconPlus`, the `check-box` and `plus` names for `<Icon name>` and the `check-box` and `plus` keys of `iconComponents` keep working as deprecated aliases until the next major version.

The old names are no longer part of the `IconName` type, `iconNames` and `iconMetadata`. Code that types a value as `IconName` (for example `const icon: IconName = 'plus'`) or looks them up in `iconNames` or `iconMetadata` must switch to `add` and `check-box-filled`. `<Icon name>` accepts `IconName | DeprecatedIconName`, and `iconComponents` is keyed by both.

Icons are now generated from committed SVG sources in `packages/icons/svg`, so the build no longer depends on Figma exports.
