---
'@ckwag/elements': patch
---

`SegmentedControl` re-measures its selection indicator when segment sizes change, so the indicator
keeps the correct width when web fonts load after the first render or the container resizes.
