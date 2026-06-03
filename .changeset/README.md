# Changesets

This folder holds release intent for CKW Elements.

Run `pnpm changeset` for every pull request that changes the public contract of
`@ckw-elements/tokens` or `@ckw-elements/components`. Changesets then generates
package version bumps and package changelogs in the release pull request.

The active public packages are linked so a design-system release keeps token and
component versions aligned. `@ckw-elements/storybook` and `@ckw-elements/icons`
are ignored because Storybook is private and the icon package is still a
scaffold.
