/**
 * build-tokens.mjs
 *
 * Runs Style Dictionary to transform tokens.json into distributable output:
 *   dist/tokens.css  — CSS Custom Properties + Typography Utility Classes
 *   dist/tokens.js   — JavaScript exports (primitive values)
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
import config from './style-dictionary.config.mjs';

const sd = new StyleDictionary(config);

await sd.buildAllPlatforms();

console.log('  Generated dist/tokens.css');
console.log('  Generated dist/tokens.js\n');
