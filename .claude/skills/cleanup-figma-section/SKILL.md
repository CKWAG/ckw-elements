---
name: cleanup-figma-section
description: Cleans up a design system section in the CKW Elements Figma file so it is consistent with the others, covering semantic layer names, unnecessary wrapper frames, component layer names, typos in component properties and stale doc example instances, without changing how anything looks. Use when someone shares a CKW Elements Figma link and asks to tidy it up, e.g. "räum diese Section auf", "mach die Section sauber und konsistent", "Benamsung aufräumen", "unnötige Frames weg", "clean up this section".
---

# Clean up a CKW Elements design system section

Goal: every component section in the CKW Elements file (`wGx1Y74QZIsy40UATyN6bI`) has the same structure and the
same layer names, so designers and developers find things in the same place everywhere. **Cleanup never changes
the visual result.** If something looks wrong, report it and ask, do not redesign it as part of the cleanup.

Reference section (already cleaned up, copy its structure): **Inline Message**, page `695:341`, frame `695:342`.

## Workflow

1. `create_session` for the file, load the `figma-use` skill (`get_figma_skill skill://figma/figma-use/SKILL.md`).
2. **Inspect read-only**: dump the layer tree of the section frame (script below) and take a `get_screenshot` of
   the frame as the "before" reference.
3. **Plan the renames and removals** from the tables below. If the section deviates structurally from the reference
   (for example missing sidebar parts or a different doc layout), report it instead of rebuilding it.
4. **Apply in one `use_figma` call**: unwrap the unnecessary frames, rename, then do the component internals.
   Return a log of every `old → new`.
5. **Stale instances**: for every doc example instance, compare its child sizes with its main component. If they
   differ, Figma did not re-layout the instance. Replace it with a fresh `mainComponent.createInstance()` at the
   same index, copy its BOOLEAN/TEXT/INSTANCE_SWAP properties, keep `FIXED` width, then remove the old one. Do
   **not** use `swapComponent` back and forth or `resetOverrides()`: both lose nested colour overrides and widths.
6. **Verify**: take the "after" screenshot and compare it with "before". It must look identical, apart from fixed
   stale instances.
7. **Change Log**: add a bullet to today's entry in the sidebar's Change Log (or a new entry, see below).
8. **Report** to the user in their language: what was renamed or removed, anything you deliberately left alone,
   and the issues you found but did not fix.

## Section structure and names

```
<Component Name>                     section frame (horizontal)
├── Sidebar                          grey panel, left
│   ├── Sidebar Content
│   │   ├── Intro → Title, Description
│   │   ├── Status → Section Title, Status Row → Value, Badge
│   │   └── Change Log → Section Title, Entry · DD.MM.YYYY → Meta (Date, Author, Badge), Notes
│   └── Footer → Logo
├── Variants
│   ├── Heading
│   └── Group · <Property>           one per documented property (Status, Title, Icon, Breakpoint …)
│       ├── Group Title
│       └── Content
│           ├── Labels               text per row, the label's own text as its layer name
│           └── Examples             grey box, instances named "<Component> · <Label>"
└── Component
    ├── Heading
    └── Component Set → Label, <component set>
```

Rules:

- English, Title Case, the **role** of the layer, never its content (`Description`, not the sentence). Short text
  layers whose content _is_ the label (`Info`, `w/ Title`) may keep their auto name.
- No generic names left: `Frame 123`, `Group 4`, `Rectangle`, `Vector 2` (outside icons), `Copy` suffixes.
- Separator for "kind · instance" is `·` (middle dot), as in `Group · Status` and `Entry · 24.11.2026`. Do not use
  `/` outside component names, because Figma treats it as a folder path.

## Unnecessary frames

Unwrap a frame (move its child to the frame's index in the parent, then delete the frame) only if **all** of these hold:

- It has exactly one child and is not a component, instance or component set.
- It has no fills, strokes, effects, corner radius, padding or `clipsContent`, and no bound variables.
- Its alignment and sizing do nothing (for example it does not right-align or bottom-pin its child; `Footer`
  pins the logo, so it stays).

After unwrapping, give the child the sizing the wrapper had (usually `layoutSizingHorizontal = 'FILL'`). Load the
fonts of a text node before moving it. If you are unsure, keep the frame and give it a proper name.

## Component internals

Layer names inside the component set mirror the code's BEM elements (`packages/components/src/<Component>/`),
in Title Case: for Inline Message these are `Status Bar`, `Content`, `Icon`, `Text`, `Title`, `Body`. Every variant
uses the same names, including nested instances (no `Icon` here and `Icon/placeholder` there).

Renaming layers is safe, because overrides are tracked by node ID. Also fix typos in component **property** names
with `editComponentProperty(key, { name })`, since instances keep their values. **Ask first** before renaming
variant properties or variant values (`Breakpoint=Desktop`), because that can break Code Connect and the code API.

## Change Log

Every section has a Change Log in its sidebar. Today's entry is `Entry · DD.MM.YYYY` at index 1 (right after the
section title, newest first). If there is no entry for today, clone the newest entry, then set `Date`, `Author` (the
user's name) and `Notes`. Notes is a bulleted text with list formatting already applied, so do not type `•`. Keep
it to 1 to 3 English lines, with `textAutoResize = 'HEIGHT'` and FILL width. For a cleanup, the line is e.g.
"Layer names cleaned up and unnecessary frames removed".

## Hard rules

- Colours, spacing, radius and border only through the file's variables, never raw values.
- Never detach instances, never touch other pages or sections than the one asked for.
- Visual changes, restructuring or new doc content are out of scope: propose them and wait for a yes.

## Inspect script (read-only)

```js
const page = await figma.getNodeByIdAsync('<PAGE_ID>');
await figma.setCurrentPageAsync(page);
const root = await figma.getNodeByIdAsync('<SECTION_FRAME_ID>');
const lines = [];
const walk = (n, d) => {
  const lay = 'layoutMode' in n && n.layoutMode !== 'NONE' ? n.layoutMode[0] : '-';
  const fill = 'fills' in n && Array.isArray(n.fills) && n.fills.length ? 'F' : '';
  const pad =
    'paddingTop' in n
      ? `p${n.paddingTop}/${n.paddingRight}/${n.paddingBottom}/${n.paddingLeft}`
      : '';
  const txt = n.type === 'TEXT' ? ' "' + n.characters.slice(0, 30) + '"' : '';
  const kids = 'children' in n ? n.children.length : 0;
  lines.push(`${'  '.repeat(d)}${n.name} [${n.type} ${n.id} ${lay}${fill} ${pad} k${kids}]${txt}`);
  if (n.type === 'INSTANCE' || n.type === 'COMPONENT_SET') return;
  if ('children' in n) for (const c of n.children) walk(c, d + 1);
};
walk(root, 0);
return lines.join('\n');
```

Inspect the component set separately (one variant is enough to see the internal names, then check the other
variants for the same names).
