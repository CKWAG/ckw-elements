/**
 * Builds the React component package for npm consumers.
 *
 * TypeScript emits ESM JavaScript and declarations. CSS files stay as CSS
 * side effects and are copied into the same relative dist paths.
 */

import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDir = dirname(fileURLToPath(import.meta.url));
const srcDir = join(packageDir, 'src');
const distDir = join(packageDir, 'dist');

rmSync(distDir, { recursive: true, force: true });

const tsc = spawnSync('tsc', ['-p', 'tsconfig.build.json'], {
  cwd: packageDir,
  stdio: 'inherit',
});

if (tsc.status !== 0) {
  process.exit(tsc.status ?? 1);
}

const cssFiles = findCssFiles(srcDir);

for (const file of cssFiles) {
  const relativePath = relative(srcDir, file);
  const destination = join(distDir, relativePath);
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(file, destination);
}

const cssImports = cssFiles
  .map((file) => relative(srcDir, file).split(sep).join('/'))
  .sort()
  .map((file) => `@import './${file}';`);

writeFileSync(join(distDir, 'styles.css'), `${cssImports.join('\n')}\n`);

/**
 * Recursively finds component CSS files below a directory.
 */
function findCssFiles(dir) {
  const files = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findCssFiles(fullPath));
      continue;
    }

    if (entry.endsWith('.css')) {
      files.push(fullPath);
    }
  }

  return files;
}
