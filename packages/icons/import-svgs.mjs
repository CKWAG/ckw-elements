/**
 * Writes icon SVG sources from the compact Figma export format and keeps `svg/manifest.json` in sync.
 *
 * The SVG files in `svg/` are the source of truth for the icon package. `generate-icons.mjs` turns them into React
 * components. This script is the only writer of those files, so their format stays identical.
 *
 * Usage (input on stdin, tab separated, produced by `.claude/skills/add-icons-to-figma/scripts/export-svgs.js`):
 *
 *   node import-svgs.mjs                 # export lines: name <TAB> figmaNodeId <TAB> "<rule>:<d>" ...
 *   node import-svgs.mjs --hashes        # print "name <TAB> hash" for every SVG in svg/ (compare with Figma list mode)
 *   node import-svgs.mjs --prune         # list lines: name <TAB> figmaNodeId <TAB> hash. Removes SVGs not in the list
 *
 * `<rule>` is `e` (evenodd) or `n` (nonzero). The hash is FNV-1a over "<rule>:<d>|<rule>:<d>".
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const packageDir = dirname(fileURLToPath(import.meta.url));
const svgDir = join(packageDir, 'svg');
const manifestPath = join(svgDir, 'manifest.json');
const NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * FNV-1a (32 bit) hash. Must stay identical to the one in the Figma export script.
 */
export function hashPaths(paths) {
  const text = paths.join('|');
  let hash = 0x811c9dc5;

  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }

  return hash.toString(16).padStart(8, '0');
}

/**
 * Builds the SVG source for one icon from `<rule>:<d>` path descriptors.
 */
export function toSvg(paths) {
  const body = paths
    .map((descriptor) => {
      const rule = descriptor.slice(0, 1);
      const d = descriptor.slice(2);
      const ruleAttributes = rule === 'e' ? 'fill-rule="evenodd" clip-rule="evenodd" ' : '';

      return `  <path ${ruleAttributes}d="${d}" fill="currentColor"/>`;
    })
    .join('\n');

  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n${body}\n</svg>\n`;
}

/**
 * Reads `<rule>:<d>` path descriptors back from an SVG source.
 */
export function readPaths(svg) {
  return [...svg.matchAll(/<path\b([^>]*?)\/?>/g)].map((match) => {
    const attributes = match[1];
    const d = attributes.match(/\bd="([^"]*)"/)?.[1];

    if (!d) {
      throw new Error('SVG path without d attribute');
    }

    return `${/fill-rule="evenodd"/.test(attributes) ? 'e' : 'n'}:${d}`;
  });
}

/**
 * Reads the manifest (list of `{ name, figmaNodeId }`), or an empty list.
 */
export function readManifest() {
  return existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : [];
}

/**
 * Writes the manifest sorted by name.
 */
export function writeManifest(entries) {
  const sorted = [...entries].sort((left, right) => left.name.localeCompare(right.name));

  mkdirSync(svgDir, { recursive: true });
  writeFileSync(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);
}

/**
 * Writes one icon SVG and returns the manifest entry.
 */
export function writeIcon(name, figmaNodeId, paths) {
  if (!NAME_PATTERN.test(name)) {
    throw new Error(`Invalid icon name "${name}": use kebab-case`);
  }

  mkdirSync(svgDir, { recursive: true });
  writeFileSync(join(svgDir, `${name}.svg`), toSvg(paths));

  return { name, figmaNodeId };
}

/**
 * Lists SVG icon names currently in svg/.
 */
export function listIconNames() {
  return readdirSync(svgDir)
    .filter((file) => file.endsWith('.svg'))
    .map((file) => file.slice(0, -4))
    .sort((left, right) => left.localeCompare(right));
}

function readStdinLines() {
  return readFileSync(0, 'utf8')
    .split('\n')
    .map((line) => line.replace(/\r$/, ''))
    .filter((line) => line.trim().length > 0);
}

function importFromExport() {
  const entries = new Map(readManifest().map((entry) => [entry.name, entry]));
  const written = [];

  for (const line of readStdinLines()) {
    const [name, figmaNodeId, ...paths] = line.split('\t');

    if (
      !name ||
      !figmaNodeId ||
      paths.length === 0 ||
      paths.some((path) => !/^[en]:M/.test(path))
    ) {
      throw new Error(`Malformed export line for "${name}"`);
    }

    entries.set(name, writeIcon(name, figmaNodeId, paths));
    written.push(name);
  }

  writeManifest([...entries.values()]);
  process.stdout.write(`Wrote ${written.length} icon(s): ${written.join(', ')}\n`);
}

function printHashes() {
  for (const name of listIconNames()) {
    const hash = hashPaths(readPaths(readFileSync(join(svgDir, `${name}.svg`), 'utf8')));

    process.stdout.write(`${name}\t${hash}\n`);
  }
}

function prune() {
  const keep = new Set(readStdinLines().map((line) => line.split('\t')[0]));
  const removed = listIconNames().filter((name) => !keep.has(name));

  for (const name of removed) {
    rmSync(join(svgDir, `${name}.svg`));
  }

  writeManifest(readManifest().filter((entry) => keep.has(entry.name)));
  process.stdout.write(
    `Removed ${removed.length} icon(s)${removed.length ? `: ${removed.join(', ')}` : ''}\n`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = process.argv[2];

  if (mode === '--hashes') {
    printHashes();
  } else if (mode === '--prune') {
    prune();
  } else if (!mode) {
    importFromExport();
  } else {
    process.stderr.write(`Unknown option ${mode}. See the header of import-svgs.mjs.\n`);
    process.exit(1);
  }
}
