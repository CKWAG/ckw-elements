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

## Distribution Channels

| Channel | npm dist-tag | Trigger                          | Install command                   |
| ------- | ------------ | -------------------------------- | --------------------------------- |
| Stable  | `latest`     | GitHub Release (`v*` tag)        | `npm install @ckwag/elements`     |
| Dev     | `dev`        | Push to `main` (package changes) | `npm install @ckwag/elements@dev` |

### Dev Channel

Every push to `main` that touches `packages/` automatically publishes a
pre-release version to npm under the `dev` dist-tag. The version format is
`<base>-dev.<short-sha>` (e.g. `0.1.0-dev.a3f7b2c`).

Install the latest development build:

```bash
npm install @ckwag/elements-tokens@dev @ckwag/elements-icons@dev @ckwag/elements@dev
```

The `dev` tag never overwrites `latest` — consumers using `npm install` without
an explicit tag always get the last stable release.

### Stable Channel

The `Release Packages` workflow runs when a GitHub Release is published.

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
