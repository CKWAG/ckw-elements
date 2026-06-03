/**
 * Validates release readiness for the public CKW Elements npm packages.
 *
 * The script checks metadata, Changesets configuration, generated build output,
 * changelogs, and publish-time authentication before CI publishes to npm.
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootDir = dirname(scriptDir);
const publishMode = process.argv.includes('--publish');
const errors = [];

const publicPackages = [
  {
    name: '@ckw-elements/tokens',
    directory: 'packages/tokens',
    requiredFiles: [
      'CHANGELOG.md',
      'README.md',
      'dist/tokens.css',
      'dist/tokens.d.ts',
      'dist/tokens.js',
      'dist/tokens.json',
      'tokens.json',
    ],
    requiredExports: ['.', './tokens.css', './tokens.js', './tokens.json', './package.json'],
    requiredFilesEntries: ['dist/', 'CHANGELOG.md', 'README.md', 'tokens.json'],
  },
  {
    name: '@ckw-elements/components',
    directory: 'packages/components',
    requiredFiles: [
      'CHANGELOG.md',
      'README.md',
      'dist/index.d.ts',
      'dist/index.js',
      'dist/react/index.d.ts',
      'dist/react/index.js',
      'dist/styles.css',
    ],
    requiredExports: ['.', './react', './styles.css', './package.json'],
    requiredFilesEntries: ['dist/', 'CHANGELOG.md', 'README.md'],
  },
];

const privatePackages = [
  { name: '@ckw-elements/storybook', directory: 'apps/storybook' },
  { name: '@ckw-elements/icons', directory: 'packages/icons' },
];

const rootPackage = readJson('package.json');
const changesetConfig = readJson('.changeset/config.json');

if (rootPackage.private !== true) {
  errors.push('Root package.json must stay private.');
}

if (!String(rootPackage.packageManager ?? '').startsWith('pnpm@10.')) {
  errors.push('Root packageManager must stay pinned to pnpm 10.x.');
}

if (changesetConfig.access !== 'public') {
  errors.push('.changeset/config.json must publish public packages with access "public".');
}

for (const ignoredPackage of privatePackages) {
  if (!changesetConfig.ignore?.includes(ignoredPackage.name)) {
    errors.push(`Changesets must ignore ${ignoredPackage.name}.`);
  }

  const packageJson = readJson(join(ignoredPackage.directory, 'package.json'));
  if (packageJson.private !== true) {
    errors.push(`${ignoredPackage.name} must stay private until it has a real build output.`);
  }
}

for (const releasePackage of publicPackages) {
  validatePublicPackage(releasePackage);
}

if (publishMode) {
  const hasNpmToken = Boolean(process.env.NPM_TOKEN || process.env.NODE_AUTH_TOKEN);
  if (!hasNpmToken) {
    errors.push('NPM_TOKEN or NODE_AUTH_TOKEN is required when publishing.');
  }

  if (process.env.GITHUB_ACTIONS === 'true' && process.env.NPM_CONFIG_PROVENANCE !== 'true') {
    errors.push('NPM_CONFIG_PROVENANCE=true is required for GitHub Actions npm provenance.');
  }
}

if (errors.length > 0) {
  process.stderr.write(
    `Release validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}\n`,
  );
  process.exit(1);
}

process.stdout.write('Release validation passed.\n');

/**
 * Validates one public npm package.
 */
function validatePublicPackage(releasePackage) {
  const packageJsonPath = join(releasePackage.directory, 'package.json');
  const packageJson = readJson(packageJsonPath);
  const packageLabel = releasePackage.name;

  if (packageJson.name !== releasePackage.name) {
    errors.push(`${packageJsonPath} must be named ${releasePackage.name}.`);
  }

  if (packageJson.private === true) {
    errors.push(`${packageLabel} must not be private.`);
  }

  if (!isSemver(packageJson.version)) {
    errors.push(`${packageLabel} must use a valid semver version.`);
  }

  if (packageJson.license !== 'Apache-2.0') {
    errors.push(`${packageLabel} must keep the Apache-2.0 license.`);
  }

  if (packageJson.publishConfig?.access !== 'public') {
    errors.push(`${packageLabel} must set publishConfig.access to public.`);
  }

  if (!packageJson.repository?.url || !packageJson.repository?.directory) {
    errors.push(`${packageLabel} must include repository metadata with a package directory.`);
  }

  if (!packageJson.homepage || !packageJson.bugs?.url) {
    errors.push(`${packageLabel} must include homepage and bugs metadata.`);
  }

  if (!packageJson.scripts?.prepack?.includes('build')) {
    errors.push(`${packageLabel} must build during prepack.`);
  }

  for (const fileEntry of releasePackage.requiredFilesEntries) {
    if (!packageJson.files?.includes(fileEntry)) {
      errors.push(`${packageLabel} package.json files must include ${fileEntry}.`);
    }
  }

  for (const exportName of releasePackage.requiredExports) {
    if (!(exportName in packageJson.exports)) {
      errors.push(`${packageLabel} must export ${exportName}.`);
    }
  }

  for (const requiredFile of releasePackage.requiredFiles) {
    if (!existsSync(join(rootDir, releasePackage.directory, requiredFile))) {
      errors.push(
        `${packageLabel} is missing ${requiredFile}. Run the package build before release validation.`,
      );
    }
  }

  const changelog = readFile(join(releasePackage.directory, 'CHANGELOG.md'));
  if (!changelog.includes(`## ${packageJson.version}`)) {
    errors.push(`${packageLabel} CHANGELOG.md must include a section for ${packageJson.version}.`);
  }
}

/**
 * Reads and parses JSON relative to the repository root.
 */
function readJson(relativePath) {
  return JSON.parse(readFile(relativePath));
}

/**
 * Reads a UTF-8 file relative to the repository root.
 */
function readFile(relativePath) {
  return readFileSync(join(rootDir, relativePath), 'utf8');
}

/**
 * Checks npm-compatible semantic versions.
 */
function isSemver(version) {
  return /^\d+\.\d+\.\d+(?:-[0-9A-Za-z-.]+)?(?:\+[0-9A-Za-z-.]+)?$/.test(version);
}
