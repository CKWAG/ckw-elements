/**
 * Keeps files that must exist twice in sync.
 *
 * Storybook serves `apps/storybook/public/` as static files, so some repository documents are published from a copy
 * there. The root file is the only place to edit; the copy is produced by this script and must never be edited by hand.
 *
 * Usage:
 *   node scripts/sync-public-docs.mjs           copies every source to its target
 *   node scripts/sync-public-docs.mjs --check   fails when a copy differs (used by CI and release:validate)
 *
 * Not listed here on purpose: `llms.txt`, which intentionally differs between the repository root and the deployed
 * Storybook.
 */

import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const checkOnly = process.argv.includes('--check');

/** Source of truth and its published copy, both relative to the repository root. */
const syncedFiles = [{ source: 'DESIGN.md', target: 'apps/storybook/public/DESIGN.md' }];

/**
 * Returns true when the target exists and is byte-identical to the source.
 */
function isInSync({ source, target }) {
  const targetPath = join(rootDir, target);

  return (
    existsSync(targetPath) && readFileSync(join(rootDir, source)).equals(readFileSync(targetPath))
  );
}

const outdated = syncedFiles.filter((file) => !isInSync(file));

if (checkOnly) {
  if (outdated.length > 0) {
    const list = outdated
      .map(({ source, target }) => `  - ${target} differs from ${source}`)
      .join('\n');

    process.stderr.write(
      `Published copies are out of date:\n${list}\nEdit only the source file, then run \`pnpm docs:sync\` and commit the result.\n`,
    );
    process.exit(1);
  }

  process.stdout.write(`Published copies are in sync (${syncedFiles.length} file(s)).\n`);
} else {
  for (const { source, target } of outdated) {
    copyFileSync(join(rootDir, source), join(rootDir, target));
    process.stdout.write(`Updated ${target} from ${source}\n`);
  }

  if (outdated.length === 0) {
    process.stdout.write('Nothing to update, published copies are already in sync.\n');
  }
}
