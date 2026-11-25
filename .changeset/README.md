# Release Notes

This folder holds hand-written release notes for CKW Elements.

Add a `<kebab-name>.md` note for every pull request that changes the public
contract of `@ckwag/elements-tokens`, `@ckwag/elements-icons`, or
`@ckwag/elements`. The front matter names the package and the semver bump; the
body says what changed for consumers and how to migrate. The Changesets CLI is
not installed; see `RELEASE.md` for how notes become a release.

All three public packages share one version, set from the GitHub Release tag.
`@ckwag/elements-storybook` is private documentation and is never released.
