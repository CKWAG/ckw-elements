---
name: add-icons-to-figma
description: Adds new icons from the "Icon Dropzone" in the CKW Elements Figma file to the icon system (components, colour variable, naming, alphabetical index). Use when Janosch says new icons are in the dropzone, e.g. "neue Icons sind in der Dropzone", "pack die Icons ins Design System", "add the new icons", "Icons einsortieren". Can also sync the finished icons to the code repo (SVG sources in packages/icons/svg), when asked: "sync to code", "ins Repo uebernehmen".
---

# Add icons to the CKW Elements Figma file

The designer drops SVG icons into the **Icon Dropzone**. This skill checks them strictly, converts them to
`Icon/<name>` components and files them into the alphabetical icon index. Nothing wrong may get through, so
every rule below is enforced by `scripts/place-icons.js` (errors block, warnings are reported).

## Where things are

| What          | Where                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| File          | CKW Elements, key `wGx1Y74QZIsy40UATyN6bI`, page "🧩 Assets" (`2:77`), frame **Icons** (`164:2100`)                                                                                   |
| Dropzone      | `2162:400` "Icon Dropzone" (left column > "Add New Icons")                                                                                                                            |
| Feedback list | "Dropzone Feedback", sibling right below the dropzone. Created and rewritten by the script on every run: red row = rejected (name + reason), green row = ready/added. Empty = hidden. |
| Index         | `164:2822`: children are `Index`, then pairs of letter text + `Container` (A–W)                                                                                                       |
| Change Log    | `164:2112` (left column of the Icons frame): title, then one entry per day, newest first                                                                                              |
| Template row  | `164:3263` (`Row` of `account-tie`), cloned for every new icon                                                                                                                        |

The IDs are hardcoded in the script. If an anchor is missing the script throws: the section was restructured,
re-inspect it with a read-only `use_figma` and update the IDs in the script and in this table.

## The standard (measured on the existing 119 icons)

- Component `Icon/<name>`, 24x24, **no fill on the component frame** (not even an invisible one), exactly one
  `Vector` child (flattened, no strokes).
- Glyph max 20x20, inside a 2px safe area. Source: Streamline Nova Line, SVG.
- Stroke **1.67px**, round caps and joins. Live strokes are checked before outlining, already outlined artwork is
  measured from its geometry.
- Fill bound to variable **`Text/text-primary`** (this is what makes the colour switch work).
- Vector constraints `SCALE`/`SCALE`, so the icon scales with the component.
- Name: kebab-case, English, noun first, no `Icon/` prefix in the layer name.
  Pattern `<noun>[-modifier][-direction][-circle][-filled]`: `-circle` for a circle container, `-filled`
  for solid icons, `-filled` always last. Outline icons have no suffix (`arrow-left-circle` /
  `arrow-left-circle-filled`).
- Dropzone layers whose name starts with `_` (e.g. `_skip foo`) are ignored by the script. Use this to park artwork
  that must not be imported (duplicates, work in progress) instead of deleting it.
- Status token of every row is **Ready** once the icon passed the checks (variants: On Hold, In Progress, Ready).
  New rows are cloned from a Ready row, so a placed icon is Ready right away.
- Row: cloned from the template, date token = today as `DD.MM.YYYY`, filed alphabetically inside its letter
  container (a new letter section is created if needed).

## Workflow

The designer only exports from Streamline, drops the layer into the dropzone and tells Janosch, who then runs this
skill. The layer name is just a hint: the final name is decided here (step 3), the designer does not need to know the
naming pattern. Nova exports (20px, 2px padding) are placed correctly automatically; the 24px calibration guide is
only needed for custom-drawn icons.

1. **Load the Figma skills and open a session.** Load `figma-use` (via `get_figma_skill`
   `skill://figma/figma-use/SKILL.md`), call `create_session` for the file key, and pass `sessionId` and
   `skillNames` (`resource:figma-use`) on every `use_figma` call.
2. **Check (no icon is changed).** Read `scripts/place-icons.js`, set `MODE = 'check'`, paste the whole file as the
   `code` of one `use_figma` call. Do not edit the logic, only the PARAMS. The check also refreshes the
   feedback list under the dropzone, so the designer sees the same errors in Figma without opening the chat.
3. **Name the icons (when layers have generic names).** Exports often arrive as `20260409_Icons_Designsystem-04 1`
   or `Frame 12`. The script cannot know what they show, so identify them yourself:
   - Build a TEMPORARY contact sheet on the page (frame, white fill, each dropzone icon cloned at 5x with its number
     below), take a screenshot, read it, then DELETE the sheet.
   - Derive names from the existing pattern (see "The standard"). Look at the `family` list in the check report so new
     names sit next to related icons (`chevron-down-circle` next to `arrow-down-circle`).
   - Compare each icon with the existing set by name AND by content: same glyph size, same shape. For every existing
     icon with the same or a very similar look, read its instance count (`await comp.getInstancesAsync()`).
   - **Never decide duplicates or replacements alone.** Ask Janosch per group, with facts (sizes, instance counts):
     skip, add under a new name (e.g. `chevron-large-down` for a bigger version), or replace the existing geometry
     (only when instances are unaffected or Janosch accepts the change to them).
   - Rename the dropzone layers to the final names. Park icons that must not be imported by prefixing `_skip `.
     Then run the check again, so the report and the red/green feedback list use the final names.
4. **Review the report with Janosch (in German).**
   - `errors`: the icon is rejected until fixed. Say exactly what is wrong and how to fix it (e.g. stroke width
     1.5px instead of 1.67px: re-export at 20px). Do not fix artwork silently.
   - `conflicts` (naming): propose one harmonised name that follows the existing family (`family` lists related
     names, e.g. new `arrow-down-left` next to `arrow-up-right`). Typical cases: same words in a different order,
     singular/plural, near-duplicate spelling, missing `-filled`. A real duplicate is never placed.
   - `warnings`: mention them; they do not block (e.g. "mostly solid shapes, no stroke width to measure" for filled
     icons, or "glyph is 0.1px outside the safe area, it is moved inside when placed").
   - `existingDuplicatesInFile`: tell Janosch once, do not fix unasked.
5. **Apply the agreed names** by renaming the layers in the dropzone (`node.name = ...`) and run the check again
   until no errors and no unresolved conflicts remain. A name Janosch explicitly accepts despite a conflict goes
   into `ACKNOWLEDGED`.
6. **Place.** Set `MODE = 'place'` and `DATE` (today, `DD.MM.YYYY`), paste the file again. Placed icons are removed
   from the dropzone. Rejected ones stay and are listed in red in the feedback list. If nothing was rejected, the
   script also empties the dropzone (including `_` layers) and hides the feedback list, so nothing is left behind.
7. **Verify.** Every entry in `added` must have `verified: true`; `totalComponents` must equal the old count plus
   the number added. Take one screenshot of an added row (`rowId`) and compare it with the row above or below.
8. **Update the Change Log (mandatory, every run that changed something).** In the left column of the Icons frame
   (`164:2112`) add an entry for today, newest first, directly below the "Change Log" title: clone the latest entry
   (`Frame 42`), set the date (`DD.MM.YYYY`), keep the author, and write 1 to 3 bullet points (English, short):
   what was added (names, grouped, e.g. "19 icons added: ..."), what was cleaned up, what rules changed. Set the body
   text to `textAutoResize = 'HEIGHT'` and `layoutSizingHorizontal = 'FILL'`, otherwise long lines widen the whole
   column. Screenshot it and compare with the previous entry. Skip only runs that changed nothing.
9. **Report in German**: added icons (name, section), rejected icons with the reason, warnings, and that the Change Log
   is updated. Offer the code sync (next section) once the icons are Ready.

## Sync to code (when Janosch asks: "sync to code", "ins Repo uebernehmen")

Moves the finished icons from Figma into the repo as SVG sources. Only icons whose index row has status **Ready**
are exported. Everything runs from the repo root `/Users/janosch/Documents/CKW/ckw-elements`. The repo pipeline is
described for humans in `packages/icons/CONTRIBUTING.md` (keep it in sync when you change this skill or the scripts)
and in `ARCHITECTURE.md` ("D3. I added or changed icons in Figma").

1. **List what Figma has.** Run `scripts/export-svgs.js` with `MODE = 'list'` through `use_figma` (it returns `tsv`:
   `name`, `figmaNodeId`, `hash` per line). Save the `tsv` text to a scratch file, tabs preserved.
2. **Find what differs.** `node packages/icons/import-svgs.mjs --hashes` prints the hashes of the repo SVGs. Diff the
   two lists by name and hash: names missing in the repo are new, same name with another hash is changed, names only
   in the repo are removed or renamed in Figma.
3. **Export the new and changed icons.** Run `scripts/export-svgs.js` with `MODE = 'export'` and `NAMES = [...]`
   (batches of about 30; `SLICE` also works). Write the `tsv` text of each batch to a scratch file (tabs preserved!)
   and pipe it in: `node packages/icons/import-svgs.mjs < batch.tsv`. Never type paths from memory.
4. **Renames and removals.** For every icon that was renamed or merged in Figma, add the old name to
   `packages/icons/aliases.json` (`"old-name": "new-name"`) BEFORE pruning, because the old name was published and
   consumers may use it. Then `node packages/icons/import-svgs.mjs --prune < list.tsv` removes SVGs that are no longer
   in the Ready list. Ask Janosch before removing an icon without an alias.
5. **Generate and verify.**
   - `pnpm icons:generate`, then `pnpm icons:check`, `pnpm format:check`, `pnpm typecheck`.
   - Compare the hash lists again: `--hashes` of the repo must equal the Figma list for every name. A mismatch means a
     transcription error, redo that batch.
6. **Changeset.** Add `.changeset/<short-name>.md` for `@ckwag/elements-icons`: `minor` for new icons or aliases,
   list the names, mention renames and the alias that keeps the old name working.
7. **Report in German** and do NOT commit or push unless Janosch asks. Show `git status` and the list of new,
   changed and aliased icons.

## Audit of the whole set (run on request, and after bigger changes)

`scripts/audit-icons.js` is read-only. Paste it as the `code` of one `use_figma` call. It checks all components and the
index (names, structure, colour binding, constraints, size, safe area, stroke width, identical geometry, similar
names, order, dividers, row texts, dates) and returns `clean: true` only when `problems`, `similarNames` and `index`
are all empty. Fix every finding (ask Janosch before deleting or renaming anything that has instances), run it again,
and only then set the status. Typical judgement calls it cannot make for you: two names for one shape (keep the one
that fits the family, e.g. `add` next to `add-circle`), and solid icons named without `-filled`.

## Design rules for the Icons section (binding, also when you only change a detail)

Everything this skill creates or changes in the Figma file must look like the existing documentation. Janosch
rejected earlier versions for exactly these reasons, so check every point before you call it done.

**Doc elements (dropzone block, steps, feedback list)**

- Text: only `.Specs/...` text styles (`specs-title-xl`, `specs-text-l`, `specs-text-m`, `specs-text-s`). Body and
  title colour is `Documentation/specs-900`, secondary text `specs-500`. Never pure black, never `specs-black`.
- Every auto-layout frame you create gets `fills = []`: `figma.createAutoLayout()` adds a white fill by default.
  The only filled frames are the dropzone (`specs-050`, dashed `specs-300` border), tags and badges.
- Spacing, padding and radii are bound to the Spacing / Borders variables (`xs`, `m`, `xl`, `Radius/xs`, ...), colours
  to the Specification variables. No hardcoded numbers or hex values where a variable exists.
- Real UI, not text lines: numbered steps use a 20px round badge (`specs-900` fill, white digit, `specs-text-s`) next
  to the text; hints such as "Custom icons only" are tags (`specs-200` fill, `specs-700` text, `Radius/xs`), placed
  UNDER the text so the badge stays on the first text line. Feedback rows use green/red tags from the `Status/...`
  variables.
- Keep the designer instructions to three short steps: export from Streamline (20px, 2px padding), custom icons only
  draw on the calibration guide, drop into the dropzone and tell Janosch. Naming, stroke and size are checked by this
  skill and must NOT be explained to designers again.
- The caption sits above the dropzone, the drop area stays empty. The feedback list sits below it and is never
  inside the dropzone.

**Icon index**

- Alphabetical by `localeCompare` on the row name, rows only inside their own letter section.
- Dividers: 1px bottom line on every row, top line only on the first row of a section.
- Rows are always clones of the template row, never hand-built.

**After every change:** take a screenshot of the changed block, compare it with a neighbouring block (for example
"Size Calibration Guide" or an existing section), and fix differences before reporting. Remove all test data you
created (test icons, test rows, extra sections) and confirm the icon count is unchanged.

## Gotchas (learned the hard way)

- `findOne()` does **not** descend into instances (the date token is one), use `findAll(...)[0]`.
- `node.clone()` puts the clone on the **page**, not next to the original. Always `insertChild` it afterwards.
- A failed `use_figma` call is rolled back, but check for strays on the page before retrying.
- Load the font of every text before changing `characters` (`getStyledTextSegments(['fontName'])`).
- Large check reports are hard to read: when pasting the script, return a compact summary (one line per icon with
  errors, conflicts, warning count, glyph size, plus the unique warnings) instead of the full report.
- Float edge cases: a glyph that is 20.01px is placed 0.01px into the safe area. Verification therefore allows 0.02px,
  and a safe-area overshoot of up to 0.1px is a warning, not an error.
- Never hand-patch the feedback list. It is only written by the script (`writeFeedback`); a manually edited row once
  lost its colour variables and showed a black tag. If it looks wrong, rerun the script instead.
- Same-looking icons can still differ in size (e.g. an existing `chevron-down` is 12.9x7.3px, a new one 20x10.8px).
  Compare glyph sizes before calling something a duplicate or a variant.
- Temporary nodes (contact sheets, test icons) must be deleted, and the icon count must equal the old count plus the
  number added.
- **Changing the status token resets its date text.** `token.setProperties({ Status: 'Ready' })` replaces the date
  with the variant's default text ("READY"). Order: set the status first, then write the date again. Before bulk
  status changes, save the dates (a name -> date map) in your own notes, a `use_figma` call forgets everything.
- **Never copy SVG paths by eye.** The export format keeps the exact path strings, and the hash comparison after the
  import proves that every icon arrived unchanged. For a big first import, icons that are already identical to the
  committed source can be extracted from the repo instead of transcribed.
- **A renamed or removed icon is a breaking change for consumers** of the published package, even with 0 instances in
  Figma. Always add the alias first.
- Dividers: every row has a 1px bottom line, only the FIRST row of a section also has a top line. The script
  re-applies this to the whole container after every insert, because a moved row would otherwise keep its old top line
  (double lines in the middle, none on top).
- Never touch existing icons unless asked. The file was cleaned on 2026-11-18 (names, safe area, alphabetical
  order); after that every icon passes the same rules as new ones.
- The script never rescales artwork. Wrong size or stroke is an error the designer fixes at the source.
- **Artwork that is already outlined** (fills only) goes through the same pipeline: flattened into ONE vector, colour
  variable bound, constraints set. Its stroke width is MEASURED, not trusted: rays are cast from the outline into the
  ink and the most common length is the stroke width (`measureOutline` in the script). Validated on all 117 existing
  outline icons (1.64 to 1.71px, zero false alarms) and rejects 1.25, 1.5 and 2px test shapes. Tolerance 1.67px
  +/- 0.12. Mostly solid artwork (filled icons, dots) has no stroke to measure and is reported as such, never as an
  error. Limit: a stroke of 3px or more looks like a solid shape and is not measurable.
- Sorting uses `localeCompare` on the row name, the same comparator for placing and for the cleanup check. If the
  index ever looks unsorted, re-sort every `Container` with it and verify each row sits in its letter section.
