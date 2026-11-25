// place-icons.js — runs inside `use_figma` (Figma Plugin API, top-level await, `return` = output).
// Two phases, always in this order:
//   MODE = 'check' : changes no icons. Returns normalised name, naming conflicts, similar existing icons, artwork errors.
//                    Only refreshes the red/green feedback list under the dropzone.
//   MODE = 'place' : converts + files every icon from the dropzone into the Icons index.
// Replace the PARAMS, then paste the whole file as the `code` of ONE use_figma call.

// ---------------- PARAMS ----------------
const MODE = 'check'; // 'check' | 'place'
const DROPZONE_ID = '2162:400'; // frame "Icon Dropzone"
const DATE = 'DD.MM.YYYY'; // place only: today, goes into the status token of each new row
const ACKNOWLEDGED = []; // place only: final names the user accepted although check reported a conflict
// ----------------------------------------

const ASSETS_PAGE_ID = '2:77';
const INDEX_ID = '164:2822'; // right column of "Icons": Index, letters, containers
const TEMPLATE_ROW_ID = '164:3263'; // first Row (account-tie), cloned for every new icon
const COLOR_VAR = 'Text/text-primary';
const CANVAS = 24;
const GLYPH = 20; // 2px padding on each side
const VECTOR_TYPES = ['VECTOR', 'BOOLEAN_OPERATION', 'RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR', 'LINE'];
const STROKE = 1.6667; // measured on the existing set: 1.67px at 20px glyph size, round caps + joins
const TOL = 0.1;

await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(ASSETS_PAGE_ID));
const dz = await figma.getNodeByIdAsync(DROPZONE_ID);
const index = await figma.getNodeByIdAsync(INDEX_ID);
const tpl = await figma.getNodeByIdAsync(TEMPLATE_ROW_ID);
if (!dz || !index || !tpl) throw new Error('Anchor node missing: the Icons section was restructured. Re-inspect it before continuing.');
const colorVar = (await figma.variables.getLocalVariablesAsync('COLOR')).find((v) => v.name === COLOR_VAR);
if (!colorVar) throw new Error('Variable ' + COLOR_VAR + ' not found');

// ---------- naming ----------
// Pattern: <noun>[-modifier][-direction][-circle][-filled]   ("-filled" always LAST, outline has no suffix)
const DROP_TOKENS = ['icon', 'outline', 'line', 'regular', 'stroke'];
const harmonise = (raw) => {
  const notes = [];
  let s = raw.trim().replace(/^icon\//i, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[\s_/]+/g, '-')
    .toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
  let t = s.split('-').filter(Boolean).map((x) => (x === 'solid' || x === 'fill' ? 'filled' : x));
  const dropped = t.filter((x) => DROP_TOKENS.includes(x));
  if (dropped.length) notes.push('removed style words: ' + dropped.join(', '));
  t = t.filter((x) => !DROP_TOKENS.includes(x));
  const filled = t.includes('filled');
  t = t.filter((x) => x !== 'filled');
  const circle = t.includes('circle');
  const hadOrderIssue = (filled && s.split('-').indexOf('filled') !== s.split('-').length - 1) || (circle && t.indexOf('circle') !== t.length - 1);
  if (circle) t = [...t.filter((x) => x !== 'circle'), 'circle'];
  if (filled) t.push('filled');
  if (hadOrderIssue) notes.push('moved -circle / -filled to the end');
  return { name: t.join('-'), notes };
};
const lev = (a, b) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
const sing = (w) => (w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w);
const base = (n) => n.replace(/-filled$/, '');
const existingList = index.findAllWithCriteria({ types: ['COMPONENT'] }).map((c) => c.name.trim().replace(/^Icon\//, ''));
const existing = new Set(existingList);
const analyse = (name) => {
  const conflicts = [], family = [];
  const toks = name.split('-');
  for (const e of new Set(existingList)) {
    if (e === name) { conflicts.push({ with: e, why: 'duplicate' }); continue; }
    const et = e.split('-');
    if (base(e) === base(name)) continue; // outline/filled pair of the same icon is normal
    if ([...toks].sort().join('-') === [...et].sort().join('-')) conflicts.push({ with: e, why: 'same words, different order' });
    else if (toks.map(sing).join('-') === et.map(sing).join('-')) conflicts.push({ with: e, why: 'singular/plural variant' });
    else if (lev(base(name), base(e)) <= (Math.min(base(name).length, base(e).length) >= 8 ? 2 : Math.min(base(name).length, base(e).length) >= 5 ? 1 : 0)) conflicts.push({ with: e, why: 'very similar spelling' });
    else if (toks.some((t) => t.length > 2 && et.includes(t))) family.push(e);
  }
  return { conflicts, family: family.slice(0, 14) };
};

const setText = async (t, s) => {
  for (const seg of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(seg.fontName);
  t.characters = s;
};
// NOTE: findOne() does not descend into instances (the date token is one), findAll() does. Always use findAll()[0] here.
const textIn = (row, parentName) => row.findAll((n) => n.type === 'TEXT' && n.parent && n.parent.name === parentName)[0];
const rowName = (row) => textIn(row, 'Text Container').characters;
const visibleFill = (n) => n.fills !== figma.mixed && n.fills.some((f) => f.visible !== false);
const visibleStroke = (n) => n.strokes.length > 0 && n.strokeWeight > 0;


// ---------- stroke width of OUTLINED artwork (ray method) ----------
// Strokes that arrive already outlined cannot be read from strokeWeight. Instead, from every boundary sample a ray is
// cast into the ink; its length to the opposite edge is the local stroke width. The most common length is the stroke
// width. Validated on all 117 existing outline icons (1.64 to 1.71px, no false alarms) and on 1.25/1.5/2px test shapes.
const flattenPath = (d) => {
  const t = d.match(/[MLCQZ]|-?\d*\.?\d+(?:e-?\d+)?/g); const subs = []; let cur = null, i = 0, cx = 0, cy = 0;
  const num = () => parseFloat(t[i++]);
  while (i < t.length) {
    const c = t[i++];
    if (c === 'M') { cx = num(); cy = num(); cur = [[cx, cy]]; subs.push(cur); }
    else if (c === 'L') { cx = num(); cy = num(); cur.push([cx, cy]); }
    else if (c === 'C') { const x1 = num(), y1 = num(), x2 = num(), y2 = num(), x = num(), y = num(); for (let k = 1; k <= 14; k++) { const u = k / 14, v = 1 - u; cur.push([v*v*v*cx + 3*v*v*u*x1 + 3*v*u*u*x2 + u*u*u*x, v*v*v*cy + 3*v*v*u*y1 + 3*v*u*u*y2 + u*u*u*y]); } cx = x; cy = y; }
    else if (c === 'Q') { const x1 = num(), y1 = num(), x = num(), y = num(); for (let k = 1; k <= 14; k++) { const u = k / 14, v = 1 - u; cur.push([v*v*cx + 2*v*u*x1 + u*u*x, v*v*cy + 2*v*u*y1 + u*u*y]); } cx = x; cy = y; }
    else if (c === 'Z') { cur.push(cur[0]); }
  }
  return subs;
};
const raySamples = (geoms) => {
  const polys = geoms.map((g) => ({ subs: flattenPath(g.data), rule: g.windingRule }));
  const segs = []; for (const g of polys) for (const s of g.subs) for (let k = 0; k < s.length - 1; k++) segs.push([s[k][0], s[k][1], s[k+1][0], s[k+1][1]]);
  const inside = (x, y) => {
    for (const g of polys) { let w = 0, cross = 0; for (const s of g.subs) for (let k = 0; k < s.length - 1; k++) { const [x1, y1] = s[k], [x2, y2] = s[k+1]; if ((y1 <= y) !== (y2 <= y)) { const xi = x1 + (y - y1) / (y2 - y1) * (x2 - x1); if (xi > x) { cross++; w += y2 > y1 ? 1 : -1; } } } if (g.rule === 'EVENODD' ? cross % 2 === 1 : w !== 0) return true; }
    return false;
  };
  const out = [];
  for (const [x1, y1, x2, y2] of segs) {
    const len = Math.hypot(x2 - x1, y2 - y1); if (len < 0.05) continue;
    const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
    for (let a = Math.min(0.2, len / 2); a < len; a += 0.45) {
      const px = x1 + ux * a, py = y1 + uy * a; let nx = -uy, ny = ux;
      const i1 = inside(px + nx * 0.04, py + ny * 0.04), i2 = inside(px - nx * 0.04, py - ny * 0.04);
      if (i1 === i2) continue; if (!i1) { nx = -nx; ny = -ny; }
      const ox = px + nx * 0.002, oy = py + ny * 0.002; let best = Infinity;
      for (const [sx1, sy1, sx2, sy2] of segs) {
        const ex = sx2 - sx1, ey = sy2 - sy1; const den = nx * ey - ny * ex; if (Math.abs(den) < 1e-9) continue;
        const t = ((sx1 - ox) * ey - (sy1 - oy) * ex) / den, u = ((sx1 - ox) * ny - (sy1 - oy) * nx) / den;
        if (t > 0 && u >= 0 && u <= 1 && t < best) best = t;
      }
      if (best < Infinity) out.push(best);
    }
  }
  return out;
};
// returns { status: 'ok' | 'wrong' | 'unmeasurable', width, share }. 'unmeasurable' = mostly solid shapes (filled icons, dots)
const measureOutline = (leaves) => {
  const s = []; for (const l of leaves) { const g = l.fillGeometry; if (g && g.length) s.push(...raySamples(g)); }
  if (s.length < 12) return { status: 'unmeasurable' };
  const bins = {}; for (const t of s) { const b = Math.round(t * 10) / 10; bins[b] = (bins[b] || 0) + 1; }
  const c = +Object.entries(bins).sort((a, b) => b[1] - a[1])[0][0];
  const near = s.filter((t) => Math.abs(t - c) <= 0.25).sort((a, b) => a - b);
  const width = near[Math.floor(near.length / 2)], share = near.length / s.length;
  if (share < 0.3 || c >= 3) return { status: 'unmeasurable', width: +width.toFixed(2), share: +share.toFixed(2) };
  return { status: Math.abs(width - STROKE) <= 0.12 ? 'ok' : 'wrong', width: +width.toFixed(2), share: +share.toFixed(2) };
};

// ---------- inspection: ERRORS block placement, WARNINGS are reported ----------
const inspect = (node, name) => {
  const errors = [], warns = [], m = {};
  const okTypes = ['FRAME', 'GROUP', 'INSTANCE', ...VECTOR_TYPES];
  if (!okTypes.includes(node.type)) return { errors: ['unsupported layer type ' + node.type + ' (use frame, group or vector)'], warns, m };
  if (Math.abs(node.rotation || 0) > 0.01) errors.push('layer is rotated by ' + Math.round(node.rotation) + ' deg, reset the rotation');
  const isLeaf = VECTOR_TYPES.includes(node.type);
  const all = isLeaf ? [node] : node.findAll(() => true);
  if (all.some((n) => n.type === 'TEXT')) errors.push('contains live text, outline it first');
  if (all.some((n) => n.isMask)) errors.push('contains a mask, flatten it first');
  const hidden = all.filter((n) => !n.visible).length;
  if (hidden) warns.push(hidden + ' hidden layer(s) are dropped');
  const art = all.filter((n) => VECTOR_TYPES.includes(n.type) && n.visible && (visibleFill(n) || visibleStroke(n)));
  if (!art.length) { errors.push('no visible vector content'); return { errors, warns, m }; }
  const weights = new Set();
  let colours = new Set(), stroked = false, filledOnly = false;
  for (const l of art) {
    if (l.fills !== figma.mixed) for (const f of l.fills) {
      if (f.visible === false) continue;
      if (f.type === 'IMAGE') errors.push('contains a raster image fill');
      else if (f.type.startsWith('GRADIENT')) errors.push('contains a gradient, icons must be one flat colour');
      else if (f.type === 'SOLID') colours.add(JSON.stringify(f.color));
    }
    if (l.effects.some((e) => e.visible !== false)) errors.push('has effects (shadow/blur)');
    if (l.opacity < 1 || (l.blendMode !== 'NORMAL' && l.blendMode !== 'PASS_THROUGH')) warns.push('opacity/blend mode is reset');
    if (visibleStroke(l)) {
      stroked = true;
      const w = Math.round(l.strokeWeight * 1000) / 1000;
      weights.add(w);
      if (Math.abs(w - STROKE) > TOL) errors.push('stroke width is ' + w + 'px, must be 1.67px (re-export at 20px)');
      if ('strokeCap' in l && l.strokeCap !== 'ROUND' && l.strokeCap !== figma.mixed) errors.push('stroke caps are ' + l.strokeCap + ', must be ROUND');
      if ('strokeJoin' in l && l.strokeJoin !== 'ROUND') errors.push('stroke joins are ' + l.strokeJoin + ', must be ROUND');
      if (l.dashPattern && l.dashPattern.length) errors.push('stroke is dashed');
      if (l.strokeAlign !== 'CENTER') warns.push('stroke alignment is ' + l.strokeAlign + ', expected CENTER');
      if (l.strokes.some((p) => p.visible !== false && p.type !== 'SOLID')) errors.push('stroke is not a flat colour');
    } else filledOnly = true;
  }
  if (colours.size > 1) warns.push('uses ' + colours.size + ' colours, all become ' + COLOR_VAR);
  if (!stroked) {
    const ms = measureOutline(art); m.outline = ms;
    if (ms.status !== 'unmeasurable') weights.add(ms.width);
    if (ms.status === 'wrong') errors.push('stroke width is measured at ' + ms.width + 'px, must be 1.67px (re-export at 20px)');
    else if (ms.status === 'ok' && name.endsWith('-filled')) warns.push('named -filled but the artwork looks like outline strokes (' + ms.width + 'px)');
    else if (ms.status === 'unmeasurable' && !name.endsWith('-filled')) warns.push('mostly solid shapes, no stroke width to measure. If it is a filled icon, rename it to ' + name + '-filled');
  }
  if (stroked && filledOnly) warns.push('mixes stroked and filled shapes');
  const isFilledName = name.endsWith('-filled');
  if (isFilledName && stroked && !filledOnly) errors.push('named -filled but the artwork is only strokes');
  // glyph bounds incl. stroke
  const bs = art.map((n) => n.absoluteRenderBounds || n.absoluteBoundingBox);
  const gx0 = Math.min(...bs.map((b) => b.x)), gy0 = Math.min(...bs.map((b) => b.y));
  const gx1 = Math.max(...bs.map((b) => b.x + b.width)), gy1 = Math.max(...bs.map((b) => b.y + b.height));
  const gw = Math.round((gx1 - gx0) * 100) / 100, gh = Math.round((gy1 - gy0) * 100) / 100;
  m.glyph = [gw, gh]; m.strokes = [...weights];
  if (Math.max(gw, gh) > GLYPH + TOL) errors.push('glyph is ' + gw + 'x' + gh + 'px, must fit 20x20px (2px padding)');
  if (Math.max(gw, gh) < 12) warns.push('glyph is only ' + Math.max(gw, gh) + 'px, looks undersized');
  const rb = node.absoluteBoundingBox;
  m.canvas = isLeaf ? null : [Math.round(rb.width * 100) / 100, Math.round(rb.height * 100) / 100];
  if (!isLeaf) {
    const is24 = Math.abs(rb.width - CANVAS) < TOL && Math.abs(rb.height - CANVAS) < TOL;
    const is20 = Math.abs(rb.width - GLYPH) < TOL && Math.abs(rb.height - GLYPH) < TOL;
    if (!is24 && !is20) warns.push('frame is ' + m.canvas.join('x') + ', not 24x24 or 20x20: the glyph will be centred on the 24px canvas');
    const inset = Math.min(gx0 - rb.x, gy0 - rb.y, rb.x + rb.width - gx1, rb.y + rb.height - gy1);
    if (is24 && inset < 2 - TOL - 0.01) errors.push('glyph leaves the 2px safe area by ' + Math.round((2 - inset) * 100) / 100 + 'px');
    else if (is24 && inset < 2 - 0.01) warns.push('glyph is ' + Math.round((2 - inset) * 100) / 100 + 'px outside the safe area, it is moved inside when placed');
  }
  return { errors: [...new Set(errors)], warns: [...new Set(warns)], m };
};

// ---------- feedback list under the dropzone (rewritten on every run) ----------
// Lives OUTSIDE the dropzone so it is never mistaken for an icon. Red = rejected, green = ok.
const writeFeedback = async (items) => {
  const vars = {};
  for (const v of await figma.variables.getLocalVariablesAsync()) vars[v.name] = v;
  const styles = {};
  for (const st of await figma.getLocalTextStylesAsync()) styles[st.name] = st;
  for (const k of ['.Specs/.specs-text-s', '.Specs/.specs-text-m']) await figma.loadFontAsync(styles[k].fontName);
  const paint = (n) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', vars[n]);
  const text = (chars, style, colour, name) => {
    const t = figma.createText(); t.textStyleId = styles[style].id; t.characters = chars; t.fills = [paint(colour)]; t.name = name; return t;
  };
  const block = dz.parent;
  let fb = block.children.find((c) => c.name === 'Dropzone Feedback');
  if (!fb) {
    fb = figma.createAutoLayout('VERTICAL'); fb.name = 'Dropzone Feedback'; fb.fills = [];
    fb.setBoundVariable('itemSpacing', vars['xs']);
    block.insertChild(block.children.indexOf(dz) + 1, fb);
    fb.layoutSizingHorizontal = 'FILL';
  }
  for (const c of [...fb.children]) c.remove();
  fb.visible = items.length > 0;
  for (const it of items) {
    const row = figma.createAutoLayout('HORIZONTAL'); row.name = 'Feedback Row'; row.fills = [];
    row.setBoundVariable('itemSpacing', vars['xs']);
    fb.appendChild(row); row.layoutSizingHorizontal = 'FILL';
    const tag = figma.createAutoLayout('HORIZONTAL'); tag.name = 'Tag';
    tag.setBoundVariable('paddingTop', vars['2xs']); tag.setBoundVariable('paddingBottom', vars['2xs']);
    tag.setBoundVariable('paddingLeft', vars['xs']); tag.setBoundVariable('paddingRight', vars['xs']);
    for (const r of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) tag.setBoundVariable(r, vars['Radius/xs']);
    tag.fills = [paint(it.ok ? 'Status/specs-status-success' : 'Status/specs-status-error')];
    tag.appendChild(text(it.name, '.Specs/.specs-text-s', it.ok ? 'Status/specs-status-success-text' : 'Status/specs-status-error-text', 'Name'));
    row.appendChild(tag);
    const why = text(it.text, '.Specs/.specs-text-m', 'Documentation/specs-900', 'Reason');
    row.appendChild(why); why.textAutoResize = 'HEIGHT'; why.layoutSizingHorizontal = 'FILL';
  }
  return fb.id;
};

// Layers whose name starts with "_" are ignored (use it for skipped or work-in-progress artwork).
const candidates = dz.children.filter((c) => !c.name.startsWith('_'));

// ---------- CHECK (read-only) ----------
if (MODE === 'check') {
  const names = new Map();
  const report = candidates.map((node) => {
    const { name, notes } = harmonise(node.name);
    names.set(name, (names.get(name) || 0) + 1);
    const r = inspect(node, name);
    return { layer: node.name, name, notes, type: node.type, errors: r.errors, warnings: r.warns, measured: r.m, ...analyse(name) };
  });
  for (const r of report) if (names.get(r.name) > 1) r.conflicts.push({ with: '(another icon in the dropzone)', why: 'duplicate' });
  const dupsExisting = existingList.filter((n, i) => existingList.indexOf(n) !== i);
  await writeFeedback(report.map((r) => {
    const problems = [...r.errors, ...r.conflicts.map((c) => 'name conflict with ' + c.with + ' (' + c.why + ')')];
    return { name: r.name || r.layer, ok: problems.length === 0, text: problems.length ? problems.join('; ') : 'ready to add' + (r.warnings.length ? ' (' + r.warnings.length + ' warning(s))' : '') };
  }));
  return { mode: 'check', report, existingDuplicatesInFile: [...new Set(dupsExisting)], total: existingList.length };
}

// ---------- PLACE ----------
const added = [], skipped = [], warnings = [];
const seen = new Set();

for (const node of candidates) {
  const original = node.name;
  const { name, notes } = harmonise(original);
  if (!name) { skipped.push({ original, reason: 'name is empty after normalising' }); continue; }
  if (existing.has(name) || seen.has(name)) { skipped.push({ original, name, reason: 'duplicate' }); continue; }
  const a = analyse(name);
  if (a.conflicts.length && !ACKNOWLEDGED.includes(name)) { skipped.push({ original, name, reason: 'unresolved naming conflict: ' + a.conflicts.map((c) => c.with + ' (' + c.why + ')').join(', ') }); continue; }
  if (node.type === 'COMPONENT') { skipped.push({ original, name, reason: 'is already a component, unwrap it first' }); continue; }
  const insp = inspect(node, name);
  if (insp.errors.length) { skipped.push({ original, name, reason: 'artwork errors: ' + insp.errors.join('; ') }); continue; }
  notes.forEach((n) => warnings.push(name + ': ' + n));
  insp.warns.forEach((w) => warnings.push(name + ': ' + w));

  // 1. flatten to ONE filled vector (strokes are outlined) ---------------------------------
  const root = node.type === 'INSTANCE' ? node.detachInstance() : node;
  const rb = root.absoluteBoundingBox;
  const isLeaf = VECTOR_TYPES.includes(root.type);
  let leaves = (isLeaf ? [root] : root.findAll((n) => VECTOR_TYPES.includes(n.type))).filter((n) => n.visible);
  leaves = leaves.filter((n) => visibleFill(n) || visibleStroke(n)); // drop invisible helper shapes
  if (!leaves.length) { skipped.push({ original, name, reason: 'no visible vector content' }); continue; }
  const parts = [];
  for (const l of leaves) {
    if (visibleStroke(l)) {
      const o = l.outlineStroke();
      if (o) { l.parent.insertChild(l.parent.children.indexOf(l) + 1, o); parts.push(o); }
      if (visibleFill(l)) { l.strokes = []; parts.push(l); } else l.remove();
    } else parts.push(l);
  }
  const v = parts.length === 1 && parts[0].type === 'VECTOR' ? parts[0] : figma.flatten(parts);
  v.strokes = [];
  // 2. the colour comes from the variable, so the colour switch keeps working ----------------
  v.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', colorVar)];

  // 3. fit into the 20px glyph area, keep the source position inside the 24px canvas ---------
  const vb = v.absoluteBoundingBox;
  let x, y;
  if (!isLeaf && Math.abs(rb.width - CANVAS) < 0.01 && Math.abs(rb.height - CANVAS) < 0.01) { x = vb.x - rb.x; y = vb.y - rb.y; }
  else if (!isLeaf && Math.abs(rb.width - GLYPH) < 0.01 && Math.abs(rb.height - GLYPH) < 0.01) { x = vb.x - rb.x + 2; y = vb.y - rb.y + 2; }
  else { x = (CANVAS - v.width) / 2; y = (CANVAS - v.height) / 2; }
  x = Math.min(Math.max(x, 2), CANVAS - 2 - v.width);
  y = Math.min(Math.max(y, 2), CANVAS - 2 - v.height);

  // 4. clone the template row, swap in the vector -------------------------------------------
  const row = tpl.clone();
  const comp = row.findOne((n) => n.type === 'COMPONENT');
  for (const c of [...comp.children]) c.remove();
  comp.appendChild(v);
  v.name = 'Vector'; v.x = x; v.y = y;
  v.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }; // scales with the component
  comp.name = 'Icon/' + name;
  comp.description = '';
  await setText(textIn(row, 'Text Container'), name);
  await setText(textIn(row, '.Specs Token'), DATE);

  // 5. file alphabetically, create the letter section if missing ----------------------------
  const L = name[0].toUpperCase();
  const letters = index.children.filter((c) => c.type === 'TEXT' && c.name !== 'Index');
  let letter = letters.find((t) => t.characters === L), container;
  if (letter) container = index.children[index.children.indexOf(letter) + 1];
  else {
    letter = letters[0].clone(); await setText(letter, L); letter.name = L;
    container = tpl.parent.clone(); for (const c of [...container.children]) c.remove();
    const next = letters.find((t) => t.characters > L);
    const at = next ? index.children.indexOf(next) : index.children.length;
    index.insertChild(at, letter); index.insertChild(at + 1, container);
    warnings.push(name + ': created new letter section ' + L);
  }
  const before = container.children.find((r) => rowName(r).localeCompare(name) > 0);
  container.insertChild(before ? container.children.indexOf(before) : container.children.length, row);
  row.layoutSizingHorizontal = tpl.layoutSizingHorizontal;
  // dividers: bottom line on every row, top line only on the first row of the section
  container.children.forEach((r, i) => { r.strokeTopWeight = i === 0 ? 1 : 0; r.strokeBottomWeight = 1; r.strokeLeftWeight = 0; r.strokeRightWeight = 0; });
  if (root.parent) root.remove();

  // 6. verify -------------------------------------------------------------------------------
  const bound = v.boundVariables && v.boundVariables.fills && v.boundVariables.fills[0] && v.boundVariables.fills[0].id === colorVar.id;
  const ok = comp.width === CANVAS && comp.height === CANVAS && comp.children.length === 1 && v.type === 'VECTOR' && v.strokes.length === 0 && !!bound
    && v.constraints.horizontal === 'SCALE' && v.constraints.vertical === 'SCALE' && Math.abs(v.width - insp.m.glyph[0]) < 0.2 && Math.abs(v.height - insp.m.glyph[1]) < 0.2 && v.x >= 2 - 0.02 && v.y >= 2 - 0.02 && v.x + v.width <= 22.02 && v.y + v.height <= 22.02;
  seen.add(name);
  added.push({ original, name, componentId: comp.id, rowId: row.id, section: L, glyph: [Math.round(v.width * 100) / 100, Math.round(v.height * 100) / 100], verified: ok });
}

// Clean-up: only REJECTED icons stay (red row + the artwork, so the designer sees what to fix).
// A clean run leaves nothing behind: dropzone (including "_" layers) is emptied and the feedback list is hidden.
await writeFeedback(skipped.map((x) => ({ name: x.name || x.original, ok: false, text: x.reason })));
if (!skipped.length) for (const c of [...dz.children]) c.remove();
return {
  mode: 'place', added, skipped, warnings,
  dropzoneLeft: dz.children.map((c) => c.name),
  totalComponents: index.findAllWithCriteria({ types: ['COMPONENT'] }).length,
};
