/**
 * Checks that every CSS custom property used by a component exists.
 *
 * A var(--name) that is not defined resolves to nothing (e.g. a transparent
 * background) without any error, so this script fails when a component uses
 * a token that is not in packages/tokens/dist/tokens.css and not defined in
 * the component's own CSS. Runtime variables set by Radix (--radix-*) are allowed.
 *
 * Usage: node scripts/check-css-vars.mjs (run after the token build)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const tokensCss = join(root, 'packages/tokens/dist/tokens.css');
const componentsDir = join(root, 'packages/components/src');
const allowedPrefixes = ['--radix-'];

const definedIn = (css) => new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
const tokens = definedIn(readFileSync(tokensCss, 'utf8'));

/**
 * Recursively lists CSS files below a directory.
 */
function cssFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return cssFiles(path);
    return path.endsWith('.css') ? [path] : [];
  });
}

const problems = [];
for (const file of cssFiles(componentsDir)) {
  const css = readFileSync(file, 'utf8');
  const local = definedIn(css);
  for (const [, name] of css.matchAll(/var\(\s*(--[\w-]+)/g)) {
    if (tokens.has(name) || local.has(name)) continue;
    if (allowedPrefixes.some((prefix) => name.startsWith(prefix))) continue;
    problems.push(`${relative(root, file)}: ${name}`);
  }
}

if (problems.length) {
  console.error(
    `Undefined CSS variables (not in tokens.css):\n${[...new Set(problems)].join('\n')}`,
  );
  process.exit(1);
}
console.log(`CSS variables OK (${tokens.size} tokens checked).`);
