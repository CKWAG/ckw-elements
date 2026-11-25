# Release Process

Releases are tag-driven. Publishing a GitHub Release `vX.Y.Z` sets the version
of all three public packages and publishes them to npm. Release notes are
hand-written Markdown files in `.changeset/`; the Changesets CLI is not
installed.

## Public Packages

Only these packages are published:

- `@ckwag/elements-tokens`
- `@ckwag/elements-icons`
- `@ckwag/elements`

`@ckwag/elements-storybook` is private documentation.

## Pull Request Workflow

1. For public token, icon or component changes, add a note in
   `.changeset/<kebab-name>.md`:

   ```md
   ---
   '@ckwag/elements': minor
   ---

   What changed for consumers, and migration steps for breaking changes.
   ```

2. Choose the semver bump that matches the public contract change.
3. Run `pnpm release:validate` before opening or merging the pull request.

Documentation-only, Storybook-only and dev-dependency changes do not need a
note unless they affect package usage, exports, or release notes.

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

The `Release Packages` workflow (`.github/workflows/release-packages.yml`) runs
when a GitHub Release is published:

1. Pick the next version from the pending `.changeset/*.md` notes (highest
   bump wins; all three packages share one version).
2. Create a GitHub Release with tag `vX.Y.Z` on `main` and paste the notes
   into the release description.
3. The workflow sets `X.Y.Z` in all three `package.json` files (CI only, not
   committed), checks formatting and types, builds the packages, validates the
   release and publishes them to npm under `latest`.

## Trusted Publishing

Each public package must have a GitHub Actions trusted publisher configured on
npm for the workflow that publishes it. In each package's npm settings, add
the following publishers and enable **Allow npm publish**:

| Organization | Repository     | Workflow filename      | Environment |
| ------------ | -------------- | ---------------------- | ----------- |
| `CKWAG`      | `ckw-elements` | `publish-dev.yml`      | Leave empty |
| `CKWAG`      | `ckw-elements` | `release-packages.yml` | Leave empty |

New configurations expire unless their first publish succeeds within two days.
Set up the dev publishers shortly before merging a change to `main`, and the
stable publishers shortly before publishing a GitHub Release. GitHub Actions
publishes with npm provenance enabled; no npm publishing token is needed.

## Local Validation

| Command                 | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| `pnpm release:build`    | Build tokens, icons and components              |
| `pnpm release:check`    | Validate release metadata and generated outputs |
| `pnpm release:pack`     | Dry-run npm package contents                    |
| `pnpm release:validate` | Full local release validation                   |

Never publish generated `dist/` files manually. The release workflow builds the
package outputs before validation and npm publishing.
