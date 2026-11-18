// audit-icons.js — runs inside `use_figma`, READ-ONLY. Paste the whole file as the `code` of one call.
// Checks every icon component and the index against the standard in SKILL.md and returns a compact report.
// `problems` must be empty (and `index`, `similarNames`) for the set to count as clean.

const ASSETS_PAGE_ID = '2:77';
const INDEX_ID = '164:2822';
const COLOR_VAR = 'Text/text-primary';
const STROKE = 1.6667; // 1.67px, tolerance 0.12
const NAME_RE = /^Icon\/[a-z0-9]+(-[a-z0-9]+)*$/;

await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(ASSETS_PAGE_ID));
const idx = await figma.getNodeByIdAsync(INDEX_ID);
const colorVar = (await figma.variables.getLocalVariablesAsync('COLOR')).find((v) => v.name === COLOR_VAR);
const comps = idx.findAllWithCriteria({ types: ['COMPONENT'] });
const P = {}; const add = (k, v) => { (P[k] = P[k] || []).push(v); };

// ---- ray method for the stroke width of outlined artwork (same as place-icons.js) ----
const flattenPath = (d) => { const t = d.match(/[MLCQZ]|-?\d*\.?\d+(?:e-?\d+)?/g); const subs = []; let cur = null, i = 0, cx = 0, cy = 0; const num = () => parseFloat(t[i++]); while (i < t.length) { const c = t[i++]; if (c === 'M') { cx = num(); cy = num(); cur = [[cx, cy]]; subs.push(cur); } else if (c === 'L') { cx = num(); cy = num(); cur.push([cx, cy]); } else if (c === 'C') { const x1 = num(), y1 = num(), x2 = num(), y2 = num(), x = num(), y = num(); for (let k = 1; k <= 14; k++) { const u = k / 14, v = 1 - u; cur.push([v*v*v*cx + 3*v*v*u*x1 + 3*v*u*u*x2 + u*u*u*x, v*v*v*cy + 3*v*v*u*y1 + 3*v*u*u*y2 + u*u*u*y]); } cx = x; cy = y; } else if (c === 'Q') { const x1 = num(), y1 = num(), x = num(), y = num(); for (let k = 1; k <= 14; k++) { const u = k / 14, v = 1 - u; cur.push([v*v*cx + 2*v*u*x1 + u*u*x, v*v*cy + 2*v*u*y1 + u*u*y]); } cx = x; cy = y; } else if (c === 'Z') { cur.push(cur[0]); } } return subs; };
const raySamples = (geoms) => { const polys = geoms.map((g) => ({ subs: flattenPath(g.data), rule: g.windingRule })); const segs = []; for (const g of polys) for (const s of g.subs) for (let k = 0; k < s.length - 1; k++) segs.push([s[k][0], s[k][1], s[k+1][0], s[k+1][1]]);
  const inside = (x, y) => { for (const g of polys) { let w = 0, cross = 0; for (const s of g.subs) for (let k = 0; k < s.length - 1; k++) { const [x1, y1] = s[k], [x2, y2] = s[k+1]; if ((y1 <= y) !== (y2 <= y)) { const xi = x1 + (y - y1) / (y2 - y1) * (x2 - x1); if (xi > x) { cross++; w += y2 > y1 ? 1 : -1; } } } if (g.rule === 'EVENODD' ? cross % 2 === 1 : w !== 0) return true; } return false; };
  const out = []; for (const [x1, y1, x2, y2] of segs) { const len = Math.hypot(x2 - x1, y2 - y1); if (len < 0.05) continue; const ux = (x2 - x1) / len, uy = (y2 - y1) / len; for (let a = Math.min(0.2, len / 2); a < len; a += 0.45) { const px = x1 + ux * a, py = y1 + uy * a; let nx = -uy, ny = ux; const i1 = inside(px + nx * 0.04, py + ny * 0.04), i2 = inside(px - nx * 0.04, py - ny * 0.04); if (i1 === i2) continue; if (!i1) { nx = -nx; ny = -ny; } const ox = px + nx * 0.002, oy = py + ny * 0.002; let best = Infinity; for (const [sx1, sy1, sx2, sy2] of segs) { const ex = sx2 - sx1, ey = sy2 - sy1; const den = nx * ey - ny * ex; if (Math.abs(den) < 1e-9) continue; const t = ((sx1 - ox) * ey - (sy1 - oy) * ex) / den, u = ((sx1 - ox) * ny - (sy1 - oy) * nx) / den; if (t > 0 && u >= 0 && u <= 1 && t < best) best = t; } if (best < Infinity) out.push(best); } } return out; };
const measure = (l) => { const s = raySamples(l.fillGeometry); if (s.length < 12) return { u: true }; const bins = {}; for (const t of s) { const b = Math.round(t * 10) / 10; bins[b] = (bins[b] || 0) + 1; } const c = +Object.entries(bins).sort((a, b) => b[1] - a[1])[0][0]; const near = s.filter((t) => Math.abs(t - c) <= 0.25).sort((a, b) => a - b); const width = near[Math.floor(near.length / 2)], share = near.length / s.length; return { u: share < 0.3 || c >= 3, width: +width.toFixed(2) }; };

// ---- per component ----
const names = comps.map((c) => c.name);
const geo = new Map(); const widths = []; const solid = [];
for (const c of comps) {
  const n = c.name, short = n.replace(/^Icon\//, '');
  if (!NAME_RE.test(n)) add('name format', n);
  const tk = short.split('-');
  if (tk.includes('filled') && tk[tk.length - 1] !== 'filled') add('filled not last', n);
  if (tk.includes('circle') && tk.indexOf('circle') > tk.length - 1 - (tk.includes('filled') ? 1 : 0)) add('circle after other modifiers', n);
  if (tk.some((t) => ['outline', 'line', 'solid', 'icon', 'regular'].includes(t))) add('style word in name', n);
  if (c.parent && c.parent.type === 'COMPONENT_SET') add('is a variant', n);
  if (c.width !== 24 || c.height !== 24) add('size not 24x24', n + ' ' + c.width + 'x' + c.height);
  if (c.description) add('has description', n);
  if (c.fills.length) add('component frame has a fill (must be none)', n);
  if (c.children.length !== 1) { add('children != 1', n + ' (' + c.children.length + ')'); continue; }
  const v = c.children[0];
  if (v.type !== 'VECTOR') add('child is not a flat VECTOR', n + ' ' + v.type);
  if (v.name !== 'Vector') add('vector not named Vector', n + ' "' + v.name + '"');
  if (!v.visible || v.opacity !== 1 || (v.blendMode !== 'PASS_THROUGH' && v.blendMode !== 'NORMAL')) add('visibility/opacity/blend', n);
  if (v.strokes.length) add('has strokes (must be outlined)', n);
  if (v.effects.length) add('has effects', n);
  if (v.rotation) add('rotated', n);
  if (v.isMask) add('is a mask', n);
  if (v.fills.length !== 1 || v.fills[0].type !== 'SOLID') add('fill is not one solid', n);
  const b = v.boundVariables && v.boundVariables.fills && v.boundVariables.fills[0];
  if (!b || b.id !== colorVar.id) add('colour not bound to ' + COLOR_VAR, n);
  if (v.constraints.horizontal !== 'SCALE' || v.constraints.vertical !== 'SCALE') add('constraints not SCALE', n);
  if (v.x < 1.98 || v.y < 1.98 || v.x + v.width > 22.02 || v.y + v.height > 22.02) add('outside 2px safe area', n + ' ' + v.x.toFixed(2) + ',' + v.y.toFixed(2) + ' ' + v.width.toFixed(2) + 'x' + v.height.toFixed(2));
  const key = v.fillGeometry.map((g) => g.windingRule + g.data).join('|');
  if (geo.has(key)) add('identical geometry', geo.get(key) + ' = ' + n); else geo.set(key, n);
  const m = measure(v);
  if (m.u) solid.push(short); else { widths.push(m.width); if (Math.abs(m.width - STROKE) > 0.12) add('stroke width off', n + ' ' + m.width + 'px'); }
}
if (new Set(names).size !== names.length) add('duplicate names', names.filter((n, i) => names.indexOf(n) !== i).join(', '));

// ---- names that look like the same icon ----
const sing = (w) => (w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w);
const base = (n) => n.replace(/-filled$/, '');
const short = names.map((n) => n.replace(/^Icon\//, ''));
const sim = [];
for (let i = 0; i < short.length; i++) for (let j = i + 1; j < short.length; j++) {
  const a = short[i], b = short[j]; if (base(a) === base(b)) continue;
  const ta = a.split('-'), tb = b.split('-');
  if ([...ta].sort().join('-') === [...tb].sort().join('-')) sim.push(a + ' ~ ' + b + ' (word order)');
  else if (ta.map(sing).join('-') === tb.map(sing).join('-')) sim.push(a + ' ~ ' + b + ' (plural)');
}

// ---- index structure ----
const textIn = (row, parent) => row.findAll((n) => n.type === 'TEXT' && n.parent && n.parent.name === parent)[0];
const textOf = (r) => textIn(r, 'Text Container').characters;
const dateOf = (r) => textIn(r, '.Specs Token').characters;
const conts = idx.children.filter((c) => c.type === 'FRAME');
let rows = 0; const idxP = [];
for (const cont of conts) {
  const L = idx.children[idx.children.indexOf(cont) - 1].characters;
  const n = cont.children.map(textOf); const sorted = [...n].sort((a, b) => a.localeCompare(b));
  if (n.join() !== sorted.join()) idxP.push('order in ' + L);
  if (cont.children.length === 0) idxP.push('empty section ' + L);
  cont.children.forEach((r, i) => { rows++;
    if (r.strokeTopWeight !== (i === 0 ? 1 : 0) || r.strokeBottomWeight !== 1 || r.strokeLeftWeight || r.strokeRightWeight) idxP.push('divider ' + L + ':' + textOf(r));
    if (textOf(r)[0].toUpperCase() !== L) idxP.push('wrong section ' + textOf(r));
    const cs = r.findAllWithCriteria({ types: ['COMPONENT'] });
    if (cs.length !== 1) idxP.push('row components ' + textOf(r) + ' ' + cs.length); else if (cs[0].name !== 'Icon/' + textOf(r)) idxP.push('row text != component ' + textOf(r));
    if (!/^\d\d\.\d\d\.\d{4}$/.test(dateOf(r))) idxP.push('date ' + textOf(r) + ' ' + dateOf(r));
  });
}
const letters = idx.children.filter((c) => c.type === 'TEXT' && c.name !== 'Index').map((t) => t.characters);
if (letters.join('') !== [...letters].sort().join('')) idxP.push('letters unsorted');
if (rows !== comps.length) idxP.push('rows (' + rows + ') != components (' + comps.length + ')');

// status token of every row (Ready after a clean audit); informational, not a problem
const status = {};
for (const t of idx.findAll((n) => n.type === 'INSTANCE' && n.name === '.Specs Token')) { const m = await t.getMainComponentAsync(); status[m.name] = (status[m.name] || 0) + 1; }

return {
  total: comps.length, rows, status, problems: P, similarNames: sim, index: idxP, clean: !Object.keys(P).length && !sim.length && !idxP.length,
  stroke: { measured: widths.length, min: Math.min(...widths), max: Math.max(...widths), notMeasurable: solid },
};
