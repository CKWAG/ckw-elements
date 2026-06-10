# Release Process

CKW Elements uses Changesets for package versioning, changelog generation, and
npm publishing.

## Public Packages

Only these packages are published:

- `@ckwag/elements-tokens`
- `@ckwag/elements-icons`
- `@ckwag/elements`

`@ckwag/elements-storybook` is private documentation.

## Pull Request Workflow

1. For public token or component changes, run `pnpm changeset`.
2. Choose the semver bump that matches the public contract change.
3. Write a concise release note for consumers.
4. Run `pnpm release:validate` before opening or merging the pull request.

Documentation-only changes do not need a changeset unless they affect package
usage, exports, or release notes.

## Main Branch Workflow

The `Release Packages` workflow runs on `main`.

If unreleased changesets exist, Changesets opens or updates a release pull
request with package version bumps and generated changelogs. Review that pull
request like any other code change.

When the release pull request is merged, the same workflow builds the packages,
validates release metadata, dry-runs npm packing, publishes the public packages
to npm, and creates GitHub releases.

## Required Secret

The repository must define `NPM_TOKEN` with publish permission for the
`@ckwag` npm scope. GitHub Actions publishes with npm provenance enabled.

## Local Validation

| Command                 | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| `pnpm changeset`        | Add release intent for a package change         |
| `pnpm version:packages` | Apply pending changesets locally                |
| `pnpm release:check`    | Validate release metadata and generated outputs |
| `pnpm release:pack`     | Dry-run npm package contents                    |
| `pnpm release:validate` | Full local release validation                   |

Never publish generated `dist/` files manually. The release workflow builds the
package outputs before validation and npm publishing.
