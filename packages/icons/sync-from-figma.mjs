/**
 * Syncs the icon SVG sources in `svg/` with the CKW Elements Figma file through the Figma REST API.
 *
 * This is the automated version of the "Sync to code" flow of `.claude/skills/add-icons-to-figma`: it reads the
 * same Icons index, applies the same "only rows with status Ready" rule and the same normalisation as
 * `scripts/export-svgs.js`, and writes through `import-svgs.mjs`, so hashes match the plugin export.
 *
 * Usage (from the repo root):
 *
 *   pnpm icons:sync                      write new / changed SVGs, aliases for renames, regenerate, add a changeset
 *   pnpm icons:sync --dry-run            only print what would change
 *   pnpm icons:sync --summary out.md     also write the report as Markdown (used as the pull request body)
 *
 * Token: `FIGMA_ACCESS_TOKEN` (scope file_content:read). On macOS the script falls back to the Keychain entry
 * `ckw-figma-code-connect` (the same one `pnpm figma:token` stores).
 *
 * Exit codes: 0 = ok (with or without changes), 1 = error.
 */

import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  hashPaths,
  listIconNames,
  readManifest,
  readPaths,
  writeIcon,
  writeManifest,
} from './import-svgs.mjs';

const FILE_KEY = 'wGx1Y74QZIsy40UATyN6bI';
const INDEX_ID = '164:2822'; // alphabetical icon index inside the Icons frame 164:2100 (same as export-svgs.js)
const EXPECTED_FILL = '#232623'; // resolved value of Text/text-primary; anything else is reported
const READY_STATUS = 'Status=Ready';
const IMAGE_BATCH_SIZE = 50;
const DOWNLOAD_CONCURRENCY = 8;
const API = 'https://api.figma.com/v1';

const packageDir = dirname(fileURLToPath(import.meta.url));
const repoDir = join(packageDir, '..', '..');
const svgDir = join(packageDir, 'svg');
const aliasPath = join(packageDir, 'aliases.json');
const changesetPath = join(repoDir, '.changeset', 'icons-sync.md');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const summaryIndex = args.indexOf('--summary');
const summaryPath = summaryIndex >= 0 ? args[summaryIndex + 1] : null;

try {
  await main();
} catch (error) {
  process.stderr.write(`icons:sync failed: ${error.message}\n`);
  process.exit(1);
}

/**
 * Runs the sync.
 */
async function main() {
  const token = readToken();
  const figma = await readFigmaIcons(token);
  const plan = buildPlan(figma);
  const report = formatReport(plan, figma);

  process.stdout.write(`${report}\n`);

  if (summaryPath) {
    writeFileSync(summaryPath, `${report}\n`);
  }

  if (dryRun || !plan.hasChanges) {
    return;
  }

  applyPlan(plan, figma);
}

/**
 * Reads the Figma token from the environment or, on macOS, from the Keychain.
 */
function readToken() {
  if (process.env.FIGMA_ACCESS_TOKEN) {
    return process.env.FIGMA_ACCESS_TOKEN.trim();
  }

  if (process.platform === 'darwin') {
    try {
      const token = execFileSync(
        'security',
        ['find-generic-password', '-s', 'ckw-figma-code-connect', '-w'],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
      ).trim();

      if (token) {
        return token;
      }
    } catch {
      // fall through to the error below
    }
  }

  throw new Error(
    'No Figma token. Set FIGMA_ACCESS_TOKEN or store one in the Keychain with `pnpm figma:token` (macOS).',
  );
}

/**
 * Calls the Figma REST API and returns the parsed JSON. Retries on rate limits and server errors.
 */
async function figmaGet(token, path) {
  for (let attempt = 1; ; attempt += 1) {
    const response = await fetch(`${API}${path}`, { headers: { 'X-Figma-Token': token } });

    if (response.ok) {
      return response.json();
    }

    if ((response.status === 429 || response.status >= 500) && attempt < 5) {
      const retryAfter = Number(response.headers.get('retry-after')) || 2 ** attempt;

      await new Promise((resolve) => setTimeout(resolve, Math.min(retryAfter, 60) * 1000));
      continue;
    }

    throw new Error(
      `Figma API ${response.status} for ${path}: ${(await response.text()).slice(0, 200)}`,
    );
  }
}

/**
 * Lists the Ready icons of the Figma index and downloads their artwork.
 * Returns `{ candidates: string[], ready: Map<name, { id, paths, hash }>, notReady: Map<name, status>,
 * problems: string[] }`; `candidates` are all Ready names, `ready` only those whose SVG could be used.
 */
async function readFigmaIcons(token) {
  const data = await figmaGet(
    token,
    `/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(INDEX_ID)}`,
  );
  const entry = data.nodes?.[INDEX_ID];

  if (!entry?.document) {
    throw new Error(
      `Anchor node missing: icon index ${INDEX_ID}. The Figma Icons frame was restructured, update INDEX_ID.`,
    );
  }

  const components = entry.components ?? {};
  const candidates = [];
  const notReady = new Map();
  const problems = [];

  // Same lookup as export-svgs.js: the status is the first ".Specs Token" instance inside the nearest "Row" ancestor.
  const visit = (node, ancestors) => {
    if (node.type === 'COMPONENT') {
      const name = node.name.replace(/^Icon\//, '');
      const row = [...ancestors].reverse().find((ancestor) => ancestor.name === 'Row');
      const tokenNode =
        row && findFirst(row, (n) => n.type === 'INSTANCE' && n.name === '.Specs Token');
      const status = tokenNode ? components[tokenNode.componentId]?.name : undefined;

      if (status === READY_STATUS) {
        candidates.push({ name, id: node.id });
      } else {
        notReady.set(name, status ? status.replace(/^Status=/, '') : 'no status');
      }
    }

    for (const child of node.children ?? []) {
      visit(child, [...ancestors, node]);
    }
  };

  visit(entry.document, []);
  candidates.sort((left, right) => left.name.localeCompare(right.name));

  const urls = {};

  for (let start = 0; start < candidates.length; start += IMAGE_BATCH_SIZE) {
    const ids = candidates.slice(start, start + IMAGE_BATCH_SIZE).map((icon) => icon.id);
    const images = await figmaGet(
      token,
      `/images/${FILE_KEY}?ids=${encodeURIComponent(ids.join(','))}&format=svg`,
    );

    if (images.err) {
      throw new Error(`Figma image export failed: ${images.err}`);
    }

    Object.assign(urls, images.images);
  }

  const ready = new Map();
  let next = 0;

  const worker = async () => {
    while (next < candidates.length) {
      const icon = candidates[next];

      next += 1;

      if (!urls[icon.id]) {
        problems.push(`${icon.name}: Figma returned no SVG`);
        continue;
      }

      const response = await fetch(urls[icon.id]);

      if (!response.ok) {
        problems.push(`${icon.name}: SVG download failed (${response.status})`);
        continue;
      }

      const paths = normalise(icon.name, await response.text(), problems);

      if (paths) {
        ready.set(icon.name, { id: icon.id, paths, hash: hashPaths(paths) });
      }
    }
  };

  await Promise.all(Array.from({ length: DOWNLOAD_CONCURRENCY }, worker));

  return {
    candidates: candidates.map((icon) => icon.name),
    ready,
    notReady,
    problems: problems.sort(),
  };
}

/**
 * Depth-first pre-order search, like Figma's `findAll(...)[0]`.
 */
function findFirst(node, predicate) {
  for (const child of node.children ?? []) {
    if (predicate(child)) {
      return child;
    }

    const found = findFirst(child, predicate);

    if (found) {
      return found;
    }
  }

  return undefined;
}

/**
 * Turns an exported SVG into `<rule>:<d>` descriptors exactly like export-svgs.js. Returns null when unusable.
 */
function normalise(name, svg, problems) {
  const tags = [...svg.matchAll(/<path\b([^>]*?)\/?>/g)].map((match) => match[1]);
  const extra = svg
    .replace(/<path\b[^>]*?\/?>/g, '')
    .replace(/<\/?svg\b[^>]*>/g, '')
    .trim();

  if (!tags.length) {
    problems.push(`${name}: no <path> in export`);
    return null;
  }

  if (extra) {
    problems.push(`${name}: unsupported SVG content (${extra.slice(0, 60)})`);
    return null;
  }

  const paths = [];

  for (const attributes of tags) {
    const d = attributes.match(/\bd="([^"]*)"/)?.[1];
    const rule = /fill-rule="evenodd"/.test(attributes) ? 'e' : 'n';
    const fill = attributes.match(/\bfill="([^"]*)"/)?.[1];

    if (!d) {
      problems.push(`${name}: path without d`);
      continue;
    }

    if (fill && fill.toLowerCase() !== EXPECTED_FILL) {
      problems.push(`${name}: unexpected fill ${fill}`);
    }

    paths.push(`${rule}:${d}`);
  }

  return paths;
}

/**
 * Compares Figma with the repo and decides what to do.
 */
function buildPlan(figma) {
  const repoHashes = new Map(
    listIconNames().map((name) => [
      name,
      hashPaths(readPaths(readFileSync(join(svgDir, `${name}.svg`), 'utf8'))),
    ]),
  );
  const nodeIds = new Map(readManifest().map((entry) => [entry.name, entry.figmaNodeId]));
  const aliases = readAliases();
  const added = [];
  const changed = [];
  const renamed = [];
  const notReady = [];
  const blocked = [];
  const removedWithoutAlias = [];

  for (const [name, icon] of figma.ready) {
    if (aliases[name]) {
      blocked.push(`${name}: is a deprecated alias of "${aliases[name]}" in aliases.json`);
    } else if (!repoHashes.has(name)) {
      added.push(name);
    } else if (repoHashes.get(name) !== icon.hash) {
      changed.push(name);
    }
  }

  const unexported = new Set(figma.candidates.filter((name) => !figma.ready.has(name)));
  const freeAdded = () => added.filter((name) => !renamed.some((rename) => rename.to === name));

  for (const name of repoHashes.keys()) {
    if (figma.ready.has(name) || unexported.has(name)) {
      continue; // unchanged, changed, or reported under export problems
    }

    if (figma.notReady.has(name)) {
      notReady.push(`${name} (${figma.notReady.get(name)})`);
      continue;
    }

    // A rename keeps the Figma node id; a re-created component usually keeps the artwork.
    const target =
      freeAdded().find((candidate) => figma.ready.get(candidate).id === nodeIds.get(name)) ??
      freeAdded().find((candidate) => figma.ready.get(candidate).hash === repoHashes.get(name));

    if (target) {
      renamed.push({ from: name, to: target });
    } else {
      removedWithoutAlias.push(name);
    }
  }

  const finalAdded = freeAdded();

  return {
    added: finalAdded,
    changed,
    renamed,
    notReady,
    blocked,
    removedWithoutAlias,
    hasChanges: finalAdded.length + changed.length + renamed.length > 0,
  };
}

/**
 * Reads aliases.json (`{ "old-name": "new-name" }`).
 */
function readAliases() {
  return existsSync(aliasPath) ? JSON.parse(readFileSync(aliasPath, 'utf8')) : {};
}

/**
 * Formats the plan as Markdown (also used as the pull request body).
 */
function formatReport(plan, figma) {
  const code = (name) => `\`${name}\``;
  const section = (title, items) =>
    items.length
      ? [`### ${title} (${items.length})`, '', ...items.map((item) => `- ${item}`), '']
      : [];
  const lines = [
    `## Icon sync from Figma${dryRun ? ' (dry run)' : ''}`,
    '',
    `${figma.ready.size} Ready icons in Figma, ${listIconNames().length} icons in the repo.`,
    '',
    ...section('New', plan.added.map(code)),
    ...section('Changed artwork', plan.changed.map(code)),
    ...section(
      'Renamed (old name kept as deprecated alias)',
      plan.renamed.map((rename) => `${code(rename.from)} → ${code(rename.to)}`),
    ),
    ...section(
      'Needs attention: in the repo but no longer in Figma (kept, add an alias or remove by hand)',
      plan.removedWithoutAlias.map(code),
    ),
    ...section('Needs attention: skipped', plan.blocked),
    ...section('Needs attention: Figma export problems (icon skipped or flagged)', figma.problems),
    ...section('In the repo, but the Figma row is not Ready (kept unchanged)', plan.notReady),
  ];

  if (!plan.hasChanges) {
    lines.push('No icon changes.');
  }

  return lines.join('\n').trimEnd();
}

/**
 * Writes SVGs, aliases, the manifest, the generated components and a changeset.
 */
function applyPlan(plan, figma) {
  const entries = new Map(readManifest().map((entry) => [entry.name, entry]));

  for (const name of [...plan.added, ...plan.changed]) {
    const icon = figma.ready.get(name);

    entries.set(name, writeIcon(name, icon.id, icon.paths));
  }

  if (plan.renamed.length) {
    const aliases = readAliases();

    for (const { from, to } of plan.renamed) {
      const icon = figma.ready.get(to);

      entries.set(to, writeIcon(to, icon.id, icon.paths));
      entries.delete(from);
      rmSync(join(svgDir, `${from}.svg`));

      // Existing aliases that pointed to the old name follow the rename.
      for (const [alias, target] of Object.entries(aliases)) {
        if (target === from) {
          aliases[alias] = to;
        }
      }

      aliases[from] = to;
    }

    writeFileSync(aliasPath, `${JSON.stringify(aliases, null, 2)}\n`);
  }

  writeManifest([...entries.values()]);

  const generate = spawnSync(process.execPath, [join(packageDir, 'generate-icons.mjs')], {
    stdio: 'inherit',
  });

  if (generate.status !== 0) {
    throw new Error('generate-icons.mjs failed, see above');
  }

  writeChangeset(plan);
}

/**
 * Writes `.changeset/icons-sync.md`: minor for new icons and renames, patch for changed artwork only.
 */
function writeChangeset(plan) {
  const code = (names) => names.map((name) => `\`${name}\``).join(', ');
  const bump = plan.added.length || plan.renamed.length ? 'minor' : 'patch';
  const sentences = [];

  if (plan.added.length) {
    sentences.push(
      `Add ${plan.added.length === 1 ? 'the icon' : `${plan.added.length} icons:`} ${code(plan.added)}.`,
    );
  }

  if (plan.changed.length) {
    sentences.push(`Update the artwork of ${code(plan.changed)}.`);
  }

  for (const { from, to } of plan.renamed) {
    sentences.push(
      `\`${from}\` is now \`${to}\`; the old name keeps working as a deprecated alias until the next major version.`,
    );
  }

  writeFileSync(
    changesetPath,
    `---\n'@ckwag/elements-icons': ${bump}\n---\n\n${sentences.join('\n\n')}\n`,
  );
}
