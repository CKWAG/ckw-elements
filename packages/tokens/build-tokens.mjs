/**
 * build-tokens.mjs
 *
 * Runs Style Dictionary to transform tokens.json into distributable output:
 *   dist/tokens.css  — CSS Custom Properties + Typography Utility Classes
 *   dist/tokens.js   — JavaScript exports (all tokens: primitives, semantics, typography)
 *
 * Configuration lives in style-dictionary.config.mjs.
 *
 * Usage:
 *   node build-tokens.mjs
 *
 * Full pipeline:
 *   node transform-tokens.mjs && node build-tokens.mjs
 *   (or: pnpm tokens:sync)
 */

import StyleDictionary from 'style-dictionary';
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import config from './style-dictionary.config.mjs';

const sd = new StyleDictionary(config);

try {
  await sd.buildAllPlatforms();
} catch (err) {
  console.error(`  Error: Style Dictionary build failed: ${err.message}`);
  process.exit(1);
}

const js = readFileSync('dist/tokens.js', 'utf8');
const namedExports = (js.match(/^export const \w+/gm) ?? [])
  .map((m) => `${m.replace('export const', 'export declare const')}: string;`)
  .join('\n');
const defaultExport = [
  '',
  'declare const tokens: Record<string, string>;',
  'export default tokens;',
  '',
].join('\n');
writeFileSync('dist/tokens.d.ts', namedExports + defaultExport);
copyFileSync('tokens.json', 'dist/tokens.json');

console.log('  Generated dist/tokens.css');
console.log('  Generated dist/tokens.js');
console.log('  Generated dist/tokens.d.ts');
console.log('  Generated dist/tokens.json\n');
