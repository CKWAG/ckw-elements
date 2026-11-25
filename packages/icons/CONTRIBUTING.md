# Adding and maintaining icons

How a new icon gets from a designer's Figma file into `@ckwag/elements-icons`, what every script in between does, and
which guarantees the pipeline gives you. Read this before you touch `svg/`, `aliases.json` or `src/index.tsx`.

**In one sentence:** designers drop icons into a Figma dropzone, a Claude skill checks and files them in the Figma icon
index and marks them _Ready_, a nightly GitHub Action (`icons-sync.yml`) copies the _Ready_ icons into `svg/` and opens
a pull request, and `pnpm icons:generate` turns those SVG files into the React components. A developer reviews and
merges. CI refuses any state where code and SVGs differ.

## 1. The big picture

```
Designer                     Figma "Icons" frame                         Repo (this package)
────────                     ───────────────────                         ───────────────────
exports SVG from        ┌──▶ Icon Dropzone ──▶ check ──▶ place ──▶ Icon index
Streamline Nova Line ───┘     (drop here)       │          │        Icon/<name> components, status Ready
                                                 ▼          ▼                │
                                          red / green    Change Log          │ GitHub Action "Icons sync"
                                          feedback list  entry               │ (nightly or on demand) opens a PR
                                                                             ▼
                                                                    svg/<name>.svg + svg/manifest.json
                                                                             │ pnpm icons:generate
                                                                             ▼
                                                                    src/index.tsx (generated, committed)
                                                                             │
                                          CI: pnpm icons:check ◀─────────────┤
                                                                             ▼
                                                              Storybook "Foundations/Icons" · npm package
```

Dropping an icon starts nothing: a person runs the skill to check and place it (see section 2). Once its row is
_Ready_, the sync to code is automatic: the next run of the "Icons sync" workflow opens or updates one pull request.

## 2. Who does what

| Step               | Who                         | How                                                                                 | Result                                                         |
| ------------------ | --------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Export and drop    | Designer                    | Export from Streamline Nova Line as SVG (20px, 2px padding), drop into the dropzone | Layers in the `Icon Dropzone` frame                            |
| Check, name, place | Icon maintainer + Claude    | Say "neue Icons sind in der Dropzone" in Claude Code                                | Icons in the Figma index with status _Ready_, Change Log entry |
| Sync to code       | GitHub Action or local Node | Nightly/manual workflow, or `pnpm icons:sync` locally                               | Pull request or updated SVGs, generated code and changeset     |
| Review and merge   | Developer                   | Review the pull request and "Needs attention" list; run CI before merging           | `main`                                                         |
| Publish            | Maintainer                  | Publish a GitHub Release `vX.Y.Z` (tag-driven, see `RELEASE.md`)                    | npm `@ckwag/elements-icons`                                    |

The Figma file is "CKW Elements" (key `wGx1Y74QZIsy40UATyN6bI`), page "Assets", frame **Icons**:
<https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/?node-id=164-2100>. The two Claude steps are one skill,
`.claude/skills/add-icons-to-figma` (see its `SKILL.md` for the exact procedure). The sync to code is
`packages/icons/sync-from-figma.mjs`, run by `.github/workflows/icons-sync.yml` or locally with `pnpm icons:sync`.

### Roles and setup

"Icon maintainer" is a role, not a person: anyone who can run the skill. Keep at least two people able to do it, so the
process does not depend on one person's machine or Claude setup.

A maintainer needs Claude Code in a checkout of this repository (the skill loads from `.claude/skills`), the Figma MCP
server connected with their own Figma account (edit access to the CKW Elements file), Node 20+, pnpm 10+, and write
access to this repository. The skill ends with no commit or push unless the maintainer asks.

The sync needs a Figma personal access token with scope `file_content:read` (read access to the CKW Elements file). In
GitHub it is the repository secret `FIGMA_ACCESS_TOKEN`. Locally, `pnpm icons:sync` reads the environment variable
`FIGMA_ACCESS_TOKEN` or, on macOS, the Keychain entry that `pnpm figma:token` stores (`ckw-figma-code-connect`).

Smoke test for a new maintainer (read-only): run `pnpm icons:sync --dry-run`. With no pending changes it reports
"No icon changes"; this proves that the token, the Figma node ids and the repo are in order. Without a token, run the
audit script and the `list` export from the skill and compare with `node packages/icons/import-svgs.mjs --hashes`
(see `SKILL.md`, "Roles and first-time setup").

## 3. The icon standard

Every icon, new or old, must satisfy all of these. The right column says where it is enforced.

| Rule                                                                                       | Enforced by                                                            |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| 24x24 canvas, glyph at most 20x20, 2px safe area on every side                             | check phase (Figma), audit, `generate-icons.mjs` (viewBox)             |
| Stroke width 1.67px with round caps and joins (outline icons)                              | check phase: live strokes are read, outlined artwork is measured       |
| One flat vector, no strokes left, no text, masks, gradients, images or effects             | check phase, audit, `generate-icons.mjs` (only `<path>` allowed)       |
| One colour, bound to the Figma variable `Text/text-primary`; `fill="currentColor"` in code | place phase, audit, `generate-icons.mjs`                               |
| Name is kebab-case: `<noun>[-modifier][-direction][-circle][-filled]`                      | check phase (harmonises), audit, `generate-icons.mjs`                  |
| `-filled` is always last, `-circle` before it, outline icons have no suffix                | check phase, audit                                                     |
| No duplicate names, no same-icon variants (word order, plural, near spelling)              | check phase, audit (the file system rules out two files with one name) |
| Only icons with status _Ready_ reach the repo                                              | export script                                                          |
| Rows in the Figma index are alphabetical, one per component                                | place phase, audit                                                     |

Examples: `arrow-left-circle`, `arrow-left-circle-filled`, `chevron-large-down`, `shopping-cart`, `more-horizontal`.
Counter-examples: `ArrowLeft`, `arrow_left`, `filled-arrow-left`, `icon-search`, `search-outline`.

## 4. Step by step

### 4.1 Designer

1. Export the icon from Streamline Nova Line as SVG (20px icon, 2px padding). Custom-drawn icons are drawn on a copy of
   the "Size Calibration Guide" in Figma (24px canvas).
2. Drop the layer into the **Icon Dropzone** (or select the frame and paste with ⌘V). The layer name is only a hint.
3. Tell the icon maintainer. Nothing else is needed: names, strokes and sizes are checked later.

### 4.2 Check and place in Figma (Claude skill)

The maintainer asks Claude to add the new icons. The skill runs two phases with `scripts/place-icons.js`:

- **check** changes no icon. It measures every dropped layer and writes a red/green feedback list under the dropzone
  (rejected icons stay with their reason). Typical rejections: stroke 1.5px instead of 1.67px, glyph larger than 20px,
  name already exists or looks like an existing icon, text or gradient inside the layer.
- **place** (after the maintainer agreed on names and on duplicates) flattens each icon into one vector, binds the colour
  variable, sets scaling constraints, files a clone of the template row alphabetically (new letter sections are created),
  and sets today's date and the status _Ready_ (the template row is already _Ready_). If nothing was rejected, the
  dropzone is emptied. As a last step Claude adds an entry to the Change Log in Figma (step 8 of the skill).

Claude never decides duplicates, replacements or renames on its own. It asks, with sizes and instance counts.

### 4.3 Sync to code (automatic)

The GitHub Action **Icons sync** (`.github/workflows/icons-sync.yml`) runs every night and can be started by hand under
Actions › Icons sync › Run workflow (tick _dry-run_ to only see the report). It runs `pnpm icons:sync`, which:

1. Reads the Figma icon index through the REST API (`GET /v1/files/:key/nodes`) and keeps the components whose row has
   status _Ready_ (same rule as `export-svgs.js`).
2. Exports their artwork as SVG (`GET /v1/images/:key?format=svg`, in batches) and normalises it exactly like
   `export-svgs.js`, so the hash of an unchanged icon equals the hash of its file in `svg/`.
3. Compares by name and hash: **new** (name not in the repo), **changed** (other hash), **renamed** (a repo icon is gone
   from Figma and a new name has its Figma node id or its artwork). Renames are written to `aliases.json`, so the old
   name keeps working.
4. Never deletes an icon on its own. An icon that is gone from Figma without a rename, or whose row is no longer
   _Ready_, stays in the repo and is listed under "Needs attention" in the pull request.
5. Writes the SVGs and the manifest through `import-svgs.mjs`, runs `pnpm icons:generate`, and writes
   `.changeset/icons-sync.md` (`minor` for new or renamed icons, `patch` for changed artwork only).

If anything changed, the workflow opens one pull request from the branch `chore/icons-sync` (or updates the open one)
with the list of new, changed and renamed icons. It never pushes to `main` and never merges.

Locally the same runs with `pnpm icons:sync` (writes files, commits nothing) or `pnpm icons:sync --dry-run` (prints the
report, changes nothing). The skill's manual path through the Figma plugin still exists as a fallback (`SKILL.md`,
"Sync to code").

### 4.4 Review and release

A developer reviews the sync pull request: the SVG diff, the icons in the Storybook preview, and the "Needs attention"
list. Pull requests opened with the workflow's `GITHUB_TOKEN` do not trigger other workflows, so CI does not start on
its own: close and reopen the pull request (or push a commit to it) to run CI before merging. After the merge,
`publish-dev` publishes a `dev` build; a stable version is published by creating a GitHub Release, see `RELEASE.md`.

## 5. What each tool does

| Tool                                                       | Runs where                      | Reads                            | Writes                                           |
| ---------------------------------------------------------- | ------------------------------- | -------------------------------- | ------------------------------------------------ |
| `.claude/skills/add-icons-to-figma/scripts/place-icons.js` | Figma (`use_figma`, via Claude) | Icon Dropzone                    | Icon index rows, feedback list                   |
| `.claude/skills/add-icons-to-figma/scripts/audit-icons.js` | Figma, read-only                | Icon index                       | Report only                                      |
| `.claude/skills/add-icons-to-figma/scripts/export-svgs.js` | Figma, read-only                | Icon index (status _Ready_ only) | Compact text on stdout                           |
| `packages/icons/sync-from-figma.mjs` (`pnpm icons:sync`)   | GitHub Action or local Node     | Figma REST API (status _Ready_)  | via `import-svgs.mjs`, `aliases.json`, changeset |
| `.github/workflows/icons-sync.yml`                         | GitHub Actions, nightly/manual  | `pnpm icons:sync`                | Pull request `chore/icons-sync`                  |
| `packages/icons/import-svgs.mjs`                           | Local Node                      | Export text on stdin             | `svg/*.svg`, `svg/manifest.json`                 |
| `packages/icons/generate-icons.mjs`                        | Local Node and CI               | `svg/`, `aliases.json`           | `src/index.tsx`, `src/react/index.ts`            |

`import-svgs.mjs` options: no option imports export lines from stdin, `--hashes` prints `name<TAB>hash` for every SVG,
`--prune` removes SVGs that are not in the list passed on stdin. `generate-icons.mjs --check` writes nothing and fails
when the committed source differs from what would be generated.

## 6. File formats

**`svg/<name>.svg`** is written only by `import-svgs.mjs`. Flat, one `<path>` per shape, always `currentColor`:

```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.66667 12C…Z" fill="currentColor"/>
</svg>
```

**`svg/manifest.json`** lists every icon with the Figma component node id, sorted by name:
`[{ "name": "add", "figmaNodeId": "491:588" }, …]`. The id links an icon back to its component in Figma.

**`aliases.json`** maps deprecated names to current icons: `{ "plus": "add", "check-box": "check-box-filled" }`.

**Export text** (what `export-svgs.js` returns): one icon per line, tab separated:
`name<TAB>figmaNodeId<TAB><rule>:<d>[<TAB><rule>:<d>…]` where `<rule>` is `e` (evenodd) or `n` (nonzero).
In list mode the third field is the hash.

**Hash:** FNV-1a (32 bit, hex) over the path descriptors joined with `|`, for example `n:M…|e:M…`. The same function is
in `export-svgs.js` and `import-svgs.mjs`. Equal hashes mean identical artwork, which is how the sync knows what to
transfer and how it proves that nothing was altered on the way.

## 7. Guarantees and how they are enforced

- **Code always matches the SVGs.** `pnpm icons:check` runs in CI and in `pnpm release:validate`.
- **No invalid icon enters the package.** `generate-icons.mjs` fails the build for: names that are not kebab-case; an
  SVG without manifest entry (or the other way round); a canvas other than 24x24; anything but `<path>` inside the
  `<svg>`; path attributes other than `d`, `fill`, `fill-rule`, `clip-rule`; any fill other than `currentColor`; aliases
  that point to a missing icon or share a name with a current icon.
- **Nothing is lost or altered during a sync.** The hash comparison after an import covers every icon.
- **Old names keep working.** See the next section.
- **Figma stays the design source.** The manifest keeps the Figma node id of every icon.

## 8. Renaming, merging and removing icons

An icon name is public API: apps import `IconPlus` or write `<Icon name="plus" />`. A Figma instance count of 0 says
nothing about code in other apps. Therefore:

1. **Never delete or rename an icon without an alias.** Add `"old-name": "new-name"` to `aliases.json`.
2. `pnpm icons:generate` then exports `IconOldName` as a `@deprecated` constant, accepts `<Icon name="old-name">`, and
   keeps the name out of `iconNames` and the Storybook index.
3. Ship it as a `minor` changeset that names the alias.
4. Remove the alias in the next **major** version, with a `major` changeset that lists the removed names.

The automatic sync follows these rules: a rename in Figma (same component, new name) becomes an alias by itself. An icon
that disappears without a rename is never deleted; it is reported under "Needs attention" until someone adds an alias
or removes it by hand in a pull request. If an icon is moved back from _Ready_ to _In Progress_ in Figma, the sync keeps
the current SVG. (In the manual path, `--prune` treats it as removed: ask before pruning.)

## 9. Without Claude (manual path)

The generator does not care how a file got into `svg/`, so a developer can add an icon by hand:

1. Create `svg/<name>.svg` in exactly the format of section 6 (24px canvas, only `<path>`, `fill="currentColor"`).
2. Add `{ "name": "<name>", "figmaNodeId": "<id>" }` to `svg/manifest.json` (copy the node id from Figma).
3. Run `pnpm icons:generate` and `pnpm icons:check`.
4. Add a changeset.

Do this only if the icon also exists in the Figma icon index with the same name. Otherwise Figma and code drift apart
and the next sync will remove or rename the icon again. Prefer the skill whenever possible: it also checks stroke width,
size and naming against the existing set.

## 10. Troubleshooting

| Message or symptom                                                                 | Cause                                    | Fix                                                      |
| ---------------------------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------- |
| `packages/icons/src is out of date with packages/icons/svg`                        | SVGs changed without regenerating        | `pnpm icons:generate`, commit `src/`                     |
| `<name>.svg: missing entry in svg/manifest.json`                                   | SVG added by hand without manifest entry | Add the entry or use the import script                   |
| `attribute "stroke" is not allowed on <path>` / `path fill must be "currentColor"` | SVG exported straight from a design tool | Outline strokes, flatten, fill with `currentColor`       |
| `aliases.json: "x" points to "y", which is not a current icon`                     | Alias target renamed or removed          | Point the alias at the current name                      |
| Check phase: `stroke width is measured at 1.25px`                                  | Icon exported at another size            | Re-export at 20px                                        |
| Check phase: `unresolved naming conflict`                                          | Name too close to an existing icon       | Pick the family name or confirm it explicitly            |
| Anchor node missing (skill script throws)                                          | The Figma Icons frame was restructured   | Update the node ids in the skill scripts and `SKILL.md`  |
| Hash lists differ after a sync                                                     | Transfer error                           | Re-export and re-import that batch                       |
| `icons:sync failed: No Figma token`                                                | Token missing                            | Set `FIGMA_ACCESS_TOKEN` or run `pnpm figma:token`       |
| `icons:sync failed: Figma API 403`                                                 | Token expired or without file access     | Create a new token, update the repository secret         |
| `icons:sync failed: Anchor node missing`                                           | The Figma icon index was restructured    | Update `INDEX_ID` in `sync-from-figma.mjs` and the skill |
| Sync PR lists an icon under "Needs attention"                                      | Removed in Figma without rename          | Add an alias or remove the SVG by hand in the PR         |

## 11. Design decisions and known limitations

**Why SVG files in the repo?** They are the interface between design and code: reviewable in diffs, usable without Figma
or a token, and the single input of the generator. The generated React file is committed so that consumers and
Storybook never depend on a build-time Figma call.

**Why a skill for Figma and a GitHub Action for the sync?** Checking and placing icons needs judgement (duplicates,
names, replacements), so it stays with a person and the skill. Copying _Ready_ icons into the repo needs none, so it is
automated like at GitHub Primer or Atlassian: the action opens a pull request and a developer still decides by merging.
It uses the Figma REST file and image endpoints, which work on the Professional plan (the Variables API does not).

**Why a custom generator instead of SVGR?** The icons are tiny, flat and strictly validated; the generator is about
300 lines and gives typed names, metadata and aliases. It can be replaced by SVGR without touching `svg/`.

Known limitations:

- The skill needs Claude Code with the Figma MCP connection; there is no standalone command for the Figma side.
- The skill scripts and `sync-from-figma.mjs` contain fixed Figma node ids (index frame, template row, dropzone).
- The sync runs nightly, not on a Figma webhook, so a _Ready_ icon reaches the repo within a day (or at once with
  "Run workflow").
- Stroke width of already outlined artwork is measured from its geometry. Mostly solid shapes (filled icons, dots) have no
  stroke width and are not measurable; a stroke of 3px or more looks like a solid shape.
- A dropped icon waits until someone runs the skill; only the step from _Ready_ to the repo is automatic.
- The published npm package contains the React components only, not the raw SVG files.
- There is no automated visual regression test for icons; Storybook is the review tool.

## 12. Possible next steps

- Publish `svg/` with the package (`files` and an `exports` entry) for non-React consumers.
- Optional SVG optimisation (SVGO) with a size budget, if the bundle size of the icon file becomes an issue.
- A pull request template with an icon checklist (alias present, changeset present, `icons:check` green).
- A Figma webhook (`FILE_UPDATE`) that starts the workflow right after a change instead of nightly.
