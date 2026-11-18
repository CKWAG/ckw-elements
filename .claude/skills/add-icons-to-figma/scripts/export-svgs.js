// export-svgs.js — runs inside `use_figma`, READ-ONLY. Exports icon artwork from Figma in a compact text format that
// `packages/icons/import-svgs.mjs` turns into SVG files. Only icons whose index row has status "Ready" are exported.
//
//   MODE = 'list'   : one line per icon: name <TAB> figmaNodeId <TAB> hash
//   MODE = 'export' : one line per icon: name <TAB> figmaNodeId <TAB> path ... where every path is "<rule>:<d>"
//                     (rule e = evenodd, n = nonzero). NAMES = [] exports all, otherwise only the listed names.
//
// Workflow: run 'list', compare the hashes with `node packages/icons/import-svgs.mjs --hashes`, then run 'export'
// with the differing / new names (batches of about 30 icons keep the answer small).

// ---------------- PARAMS ----------------
const MODE = 'list'; // 'list' | 'export'
const NAMES = []; // export only: icon names without the "Icon/" prefix, [] = all
const SLICE = null; // export only: [from, to) on the alphabetical list of Ready icons, e.g. [0, 35] for batches
// ----------------------------------------

const ASSETS_PAGE_ID = '2:77';
const INDEX_ID = '164:2822';
const EXPECTED_FILL = '#232623'; // resolved value of Text/text-primary; anything else is reported

await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(ASSETS_PAGE_ID));
const idx = await figma.getNodeByIdAsync(INDEX_ID);

// same hash as import-svgs.mjs (FNV-1a, 32 bit) over "rule:d|rule:d"
const fnv = (s) => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };
const rowOf = (c) => { let p = c; while (p && p.name !== 'Row') p = p.parent; return p; };

const lines = [], skipped = [], problems = [];
const comps = idx.findAllWithCriteria({ types: ['COMPONENT'] }).sort((a, b) => a.name.localeCompare(b.name));
let position = -1; // index in the alphabetical list of ALL components, used by SLICE
for (const c of comps) {
  position++;
  if (MODE === 'export' && SLICE && (position < SLICE[0] || position >= SLICE[1])) continue;
  const name = c.name.replace(/^Icon\//, '');
  const row = rowOf(c);
  const token = row && row.findAll((n) => n.type === 'INSTANCE' && n.name === '.Specs Token')[0];
  const main = token && (await token.getMainComponentAsync());
  if (!main || main.name !== 'Status=Ready') { skipped.push(name + ' (' + (main ? main.name : 'no status') + ')'); continue; }
  if (MODE === 'export' && NAMES.length && !NAMES.includes(name)) continue;

  const svg = await c.exportAsync({ format: 'SVG_STRING' });
  const tags = [...svg.matchAll(/<path\b([^>]*?)\/?>/g)].map((m) => m[1]);
  const extra = svg.replace(/<path\b[^>]*?\/?>/g, '').replace(/<\/?svg\b[^>]*>/g, '').trim();
  if (!tags.length) { problems.push(name + ': no <path> in export'); continue; }
  if (extra) { problems.push(name + ': unsupported SVG content (' + extra.slice(0, 60) + ')'); continue; }
  const paths = [];
  for (const attrs of tags) {
    const d = (attrs.match(/\bd="([^"]*)"/) || [])[1];
    const rule = /fill-rule="evenodd"/.test(attrs) ? 'e' : 'n';
    const fill = (attrs.match(/\bfill="([^"]*)"/) || [])[1];
    if (!d) { problems.push(name + ': path without d'); continue; }
    if (fill && fill.toLowerCase() !== EXPECTED_FILL) problems.push(name + ': unexpected fill ' + fill);
    paths.push(rule + ':' + d);
  }
  const hash = fnv(paths.join('|'));
  lines.push(MODE === 'list' ? [name, c.id, hash].join('\t') : [name, c.id, ...paths].join('\t'));
}

return { mode: MODE, count: lines.length, skippedNotReady: skipped, problems, bytes: lines.join('\n').length, tsv: lines.join('\n') };
