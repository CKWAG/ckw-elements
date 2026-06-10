# Changesets

This folder holds release intent for CKW Elements.

Run `pnpm changeset` for every pull request that changes the public contract of
`@ckwag/elements-tokens`, `@ckwag/elements-icons`, or `@ckwag/elements`.
Changesets then generates package version bumps and package changelogs in the
release pull request.

The active public packages are linked so a design-system release keeps token and
component versions aligned. `@ckwag/elements-storybook` is ignored because it is
private documentation.
