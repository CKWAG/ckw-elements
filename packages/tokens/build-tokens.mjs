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
import config from './style-dictionary.config.mjs';

const sd = new StyleDictionary(config);

try {
  await sd.buildAllPlatforms();
} catch (err) {
  console.error(`  Error: Style Dictionary build failed: ${err.message}`);
  process.exit(1);
}

console.log('  Generated dist/tokens.css');
console.log('  Generated dist/tokens.js\n');
