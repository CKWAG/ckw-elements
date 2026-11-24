---
'@ckwag/elements': minor
---

`LoadingSpinner` gets a `variant` prop: `brand` (default, unchanged) and the new `inline`, a single rotating line in the current text colour (360° in 800 ms, linear, slower with `prefers-reduced-motion`). `Button` now uses it for `loading`: the button stays focusable (`aria-disabled` instead of `disabled`), ignores clicks and keeps full opacity. Matches the new `State=Loading` variants and the Inline Spinner component in Figma.
