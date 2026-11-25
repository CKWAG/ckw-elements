/**
 * normalize-doc-layout.js: run with use_figma (Figma Plugin API).
 *
 * Normalises the doc layout of ONE CKW Elements component section without touching the components:
 *  - binds every non-zero padding, gap and corner radius of the doc chrome to the matching Spacing/Radius variable
 *    (values without a matching token are reported, never changed)
 *  - Examples boxes: padding Spacing/3xl, gap Spacing/xl, radius Radius/s, fill Background/background-canvas
 *    (with the resolved colour as base, otherwise screenshots and exports render it white)
 *  - Examples boxes hug their content, nothing may overflow (overflowing instances are set to HUG width),
 *    and all boxes of the section get the same minimum width (the widest box)
 *  - the Labels column mirrors its Examples box: same top/bottom padding and gap variables, each label as tall
 *    as its example row and vertically centred, so labels and rows stay aligned whatever the component height
 *
 * Usage: replace PAGE_ID and SECTION_ID, then pass everything below this comment as `code` to use_figma.
 */
const PAGE_ID = '<PAGE_ID>';
const SECTION_ID = '<SECTION_ID>';

const page = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);
const root = await figma.getNodeByIdAsync(SECTION_ID);
const vars = await figma.variables.getLocalVariablesAsync('FLOAT');
const colors = await figma.variables.getLocalVariablesAsync('COLOR');
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const colName = Object.fromEntries(cols.map((c) => [c.id, c.name]));
const valueOf = (v) => v.valuesByMode[Object.keys(v.valuesByMode)[0]];
const spacingVars = vars.filter((v) => colName[v.variableCollectionId] === 'Spacing');
const spacing = new Map(spacingVars.map((v) => [valueOf(v), v]));
const sp = (name) => spacingVars.find((v) => v.name === name);
const radius = new Map(
  vars.filter((v) => v.name.startsWith('Radius/')).map((v) => [valueOf(v), v]),
);
const canvas = colors.find((v) => v.name === 'Background/background-canvas');
const report = { bound: 0, unmatched: [], overflowFixed: [], rowMismatch: [] };

const inComponent = (n) => {
  for (let p = n.parent; p && p.type !== 'PAGE'; p = p.parent) {
    if (['COMPONENT', 'COMPONENT_SET', 'INSTANCE'].includes(p.type)) return true;
  }
  return false;
};
const docFrames = [root, ...root.findAllWithCriteria({ types: ['FRAME'] })].filter(
  (f) => !inComponent(f),
);
// Accepted doc-chrome values without a token (agreed with the design system owner, leave them as they are):
// section corner radius 64, sidebar padding 56, sidebar corner radius 40.
const ACCEPTED_RAW = { radius: [64, 40], padding: [56] };
const isAccepted = (field, val) =>
  field.endsWith('Radius') ? ACCEPTED_RAW.radius.includes(val) : ACCEPTED_RAW.padding.includes(val);
const bind = (node, field, map) => {
  const val = node[field];
  if (!val || node.boundVariables?.[field] || (!map.has(val) && isAccepted(field, val))) return;
  const v = map.get(val);
  if (v) {
    node.setBoundVariable(field, v);
    report.bound++;
  } else report.unmatched.push(`${node.name} ${node.id} ${field}=${val}`);
};

// Variants rows: Content = [Labels (texts), Examples (filled box)]
const contents = docFrames.filter(
  (f) =>
    f.layoutMode === 'HORIZONTAL' &&
    f.children.length === 2 &&
    f.children[0].type === 'FRAME' &&
    f.children[0].children.every((c) => c.type === 'TEXT') &&
    f.children[1].type === 'FRAME' &&
    f.children[1].fills?.length,
);

for (const content of contents) {
  const [labels, examples] = content.children;
  content.parent.layoutSizingHorizontal = 'HUG';
  content.layoutSizingHorizontal = 'HUG';
  examples.minWidth = null;
  examples.layoutSizingHorizontal = 'HUG';
  examples.layoutSizingVertical = 'HUG';
  for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'])
    examples.setBoundVariable(k, sp('3xl'));
  examples.setBoundVariable('itemSpacing', sp('xl'));
  for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) {
    examples.setBoundVariable(k, radius.get(8));
  }
  const c = canvas.resolveForConsumer(examples).value;
  examples.fills = [
    figma.variables.setBoundVariableForPaint(
      { type: 'SOLID', color: { r: c.r, g: c.g, b: c.b } },
      'color',
      canvas,
    ),
  ];

  for (const child of examples.children) {
    // only stretched instances can be squeezed below their natural width; absolutely positioned parts
    // (flyouts, tooltips) are allowed to stick out and must not trigger this
    const overflowing =
      child.layoutSizingHorizontal === 'FILL' &&
      'children' in child &&
      child.children.some(
        (k) => k.visible && k.layoutPositioning !== 'ABSOLUTE' && k.x + k.width > child.width + 0.5,
      );
    if (overflowing && child.layoutMode && child.layoutMode !== 'NONE') {
      child.layoutSizingHorizontal = 'HUG';
      report.overflowFixed.push(`${child.name} ${child.id}`);
    }
  }

  labels.setBoundVariable('paddingTop', sp('3xl'));
  labels.setBoundVariable('paddingBottom', sp('3xl'));
  labels.setBoundVariable('itemSpacing', sp('xl'));
}

// equal width for all example boxes of the section
const maxW = Math.max(0, ...contents.map((c) => c.children[1].width));
for (const content of contents) content.children[1].minWidth = maxW;

// align labels with their rows (after all widths settled)
for (const content of contents) {
  const [labels, examples] = content.children;
  const rows = examples.children.filter((c) => c.visible);
  const texts = labels.children.filter((c) => c.visible);
  if (examples.layoutMode !== 'VERTICAL' || rows.length !== texts.length) {
    report.rowMismatch.push(`${content.id}: ${texts.length} labels vs ${rows.length} examples`);
    continue;
  }
  for (let i = 0; i < rows.length; i++) {
    const t = texts[i];
    for (const s of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName);
    t.layoutSizingHorizontal = 'FILL';
    t.textAutoResize = 'NONE';
    t.resize(t.width, rows[i].height);
    t.layoutSizingVertical = 'FIXED';
    t.textAlignVertical = 'CENTER';
  }
}

// tokens for everything else in the doc chrome
for (const f of docFrames) {
  if (f.layoutMode !== 'NONE') {
    for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing'])
      bind(f, k, spacing);
  }
  for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'])
    bind(f, k, radius);
}

return { section: root.name, rows: contents.length, exampleWidth: maxW, ...report };
