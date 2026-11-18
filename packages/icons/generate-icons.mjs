/**
 * Generates the React icon components from the SVG sources in `svg/`.
 *
 * Inputs (all committed, no network and no Figma token needed):
 * - `svg/*.svg`       one file per icon, written by `import-svgs.mjs` from the Figma export
 * - `svg/manifest.json`  Figma node id per icon
 * - `aliases.json`    deprecated icon names that still resolve to a current icon (`{ "old-name": "new-name" }`)
 *
 * Outputs: `src/index.tsx` and `src/react/index.ts` (both generated, never edit by hand).
 *
 * Usage:
 *   node generate-icons.mjs           writes the generated source
 *   node generate-icons.mjs --check   fails when the committed source differs from what would be generated
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';

const packageDir = dirname(fileURLToPath(import.meta.url));
const svgDir = join(packageDir, 'svg');
const indexPath = join(packageDir, 'src', 'index.tsx');
const reactIndexPath = join(packageDir, 'src', 'react', 'index.ts');
const reactIndexSource = "export * from '../index.js';\n";
const NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ALLOWED_PATH_ATTRIBUTES = new Set(['d', 'fill', 'fill-rule', 'clip-rule']);
const checkOnly = process.argv.includes('--check');
const errors = [];

const icons = readIcons();
const aliases = readAliases(icons);

if (errors.length > 0) {
  process.stderr.write(
    `Icon sources are invalid:\n${errors.map((error) => `  - ${error}`).join('\n')}\n`,
  );
  process.exit(1);
}

const indexSource = await format(buildIndexSource(icons, aliases), indexPath);

if (checkOnly) {
  const current = existsSync(indexPath) ? readFileSync(indexPath, 'utf8') : '';
  const currentReact = existsSync(reactIndexPath) ? readFileSync(reactIndexPath, 'utf8') : '';

  if (current !== indexSource || currentReact !== reactIndexSource) {
    process.stderr.write(
      'packages/icons/src is out of date with packages/icons/svg. Run `pnpm icons:generate` and commit the result.\n',
    );
    process.exit(1);
  }

  process.stdout.write(
    `Icon sources are in sync (${icons.length} icons, ${aliases.length} deprecated aliases).\n`,
  );
} else {
  mkdirSync(dirname(reactIndexPath), { recursive: true });
  writeFileSync(indexPath, indexSource);
  writeFileSync(reactIndexPath, reactIndexSource);
  process.stdout.write(
    `Generated ${icons.length} CKW icon components and ${aliases.length} deprecated aliases.\n`,
  );
}

/**
 * Reads and validates every SVG in svg/ together with its manifest entry.
 */
function readIcons() {
  const manifestPath = join(svgDir, 'manifest.json');
  const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : [];
  const nodeIds = new Map(manifest.map((entry) => [entry.name, entry.figmaNodeId]));
  const files = existsSync(svgDir)
    ? readdirSync(svgDir).filter((file) => file.endsWith('.svg'))
    : [];
  const result = [];

  for (const file of files) {
    const name = file.slice(0, -4);

    if (!NAME_PATTERN.test(name)) {
      errors.push(`${file}: icon names must be kebab-case (a-z, 0-9, hyphens)`);
      continue;
    }

    if (!nodeIds.has(name)) {
      errors.push(`${file}: missing entry in svg/manifest.json`);
    }

    const paths = readPaths(file, readFileSync(join(svgDir, file), 'utf8'));

    result.push({
      name,
      componentName: `Icon${toPascal(name)}`,
      figmaNodeId: nodeIds.get(name) ?? '',
      paths,
    });
  }

  for (const name of nodeIds.keys()) {
    if (!files.includes(`${name}.svg`)) {
      errors.push(`svg/manifest.json lists "${name}" but svg/${name}.svg does not exist`);
    }
  }

  return result.sort((left, right) => left.name.localeCompare(right.name));
}

/**
 * Validates one SVG source and returns its path attributes.
 * Icons must be flat: 24px canvas, only `<path>` elements, filled with currentColor.
 */
function readPaths(file, svg) {
  const root = svg.match(/<svg\b([^>]*)>/)?.[1] ?? '';

  for (const [attribute, expected] of [
    ['width', '24'],
    ['height', '24'],
    ['viewBox', '0 0 24 24'],
  ]) {
    if (root.match(new RegExp(`\\b${attribute}="([^"]*)"`))?.[1] !== expected) {
      errors.push(`${file}: <svg> ${attribute} must be "${expected}"`);
    }
  }

  const remainder = svg.replace(/<\/?svg\b[^>]*>/g, '').replace(/<path\b[^>]*?\/?>/g, '');

  if (remainder.trim().length > 0) {
    errors.push(`${file}: only <path> elements are allowed inside <svg>`);
  }

  const pathTags = [...svg.matchAll(/<path\b([^>]*?)\/?>/g)].map((match) => match[1]);

  if (pathTags.length === 0) {
    errors.push(`${file}: no <path> found`);
  }

  return pathTags.map((rawAttributes) => {
    const attributes = parsePathAttributes(rawAttributes);

    for (const [name, value] of attributes) {
      if (!ALLOWED_PATH_ATTRIBUTES.has(name)) {
        errors.push(`${file}: attribute "${name}" is not allowed on <path>`);
      }

      if (name === 'fill' && value !== 'currentColor') {
        errors.push(`${file}: path fill must be "currentColor", found "${value}"`);
      }
    }

    if (!attributes.some(([name]) => name === 'd')) {
      errors.push(`${file}: <path> without d attribute`);
    }

    if (!attributes.some(([name, value]) => name === 'fill' && value === 'currentColor')) {
      errors.push(`${file}: <path> must have fill="currentColor"`);
    }

    return attributes.map(([name, value]) => [toJsxAttribute(name), value]);
  });
}

/**
 * Reads and validates aliases.json against the icon list.
 */
function readAliases(iconList) {
  const aliasPath = join(packageDir, 'aliases.json');
  const raw = existsSync(aliasPath) ? JSON.parse(readFileSync(aliasPath, 'utf8')) : {};
  const names = new Set(iconList.map((icon) => icon.name));
  const result = [];

  for (const [name, target] of Object.entries(raw)) {
    if (!NAME_PATTERN.test(name)) {
      errors.push(`aliases.json: "${name}" must be kebab-case`);
    } else if (names.has(name)) {
      errors.push(`aliases.json: "${name}" is a current icon and cannot also be an alias`);
    }

    if (!names.has(target)) {
      errors.push(`aliases.json: "${name}" points to "${target}", which is not a current icon`);
    }

    result.push({
      name,
      target,
      componentName: `Icon${toPascal(name)}`,
      targetComponentName: `Icon${toPascal(target)}`,
    });
  }

  return result.sort((left, right) => left.name.localeCompare(right.name));
}

/**
 * Converts a kebab-case icon name to a PascalCase component suffix.
 */
function toPascal(name) {
  return name
    .split('-')
    .map((part) => (part.length === 0 ? '' : `${part[0].toUpperCase()}${part.slice(1)}`))
    .join('');
}

/**
 * Converts a kebab-case icon name to prose for generated JSDoc.
 */
function humanize(name) {
  return name.replace(/-/g, ' ');
}

/**
 * Parses SVG path attributes into name/value pairs.
 */
function parsePathAttributes(rawAttributes) {
  return [...rawAttributes.matchAll(/([:\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]);
}

/**
 * Converts an SVG attribute name to its React prop name.
 */
function toJsxAttribute(name) {
  if (name === 'fill-rule') {
    return 'fillRule';
  }

  if (name === 'clip-rule') {
    return 'clipRule';
  }

  return name;
}

/**
 * Builds the unformatted source of src/index.tsx.
 */
function buildIndexSource(iconList, aliasList) {
  const iconNames = iconList.map((icon) => `  ${JSON.stringify(icon.name)},`).join('\n');
  const metadata = iconList
    .map(
      (icon) =>
        `  { name: ${JSON.stringify(icon.name)}, componentName: ${JSON.stringify(
          icon.componentName,
        )}, figmaNodeId: ${JSON.stringify(icon.figmaNodeId)} },`,
    )
    .join('\n');
  const functions = iconList.map(toIconFunction).join('\n\n');
  const componentMap = iconList
    .map((icon) => `  ${JSON.stringify(icon.name)}: ${icon.componentName},`)
    .join('\n');
  const aliasMap = aliasList
    .map((alias) => `  ${JSON.stringify(alias.name)}: ${JSON.stringify(alias.target)},`)
    .join('\n');
  const aliasComponents = aliasList
    .map(
      (alias) =>
        `/** @deprecated Renamed to ${alias.targetComponentName}. Will be removed in the next major version. */\nexport const ${alias.componentName}: IconComponent = ${alias.targetComponentName};`,
    )
    .join('\n\n');
  const aliasComponentMap = aliasList
    .map((alias) => `  ${JSON.stringify(alias.name)}: ${alias.targetComponentName},`)
    .join('\n');

  return `import React from 'react';

export const iconNames = [
${iconNames}
] as const;

export type IconName = (typeof iconNames)[number];

export interface IconMetadata {
  name: IconName;
  componentName: string;
  figmaNodeId: string;
}

export const iconMetadata = [
${metadata}
] as const satisfies readonly IconMetadata[];

/**
 * Icon names that were renamed or merged. They still work but are not part of \`iconNames\`.
 * Maps the deprecated name to the current icon name.
 */
export const deprecatedIconAliases = {
${aliasMap}
} as const satisfies Record<string, IconName>;

export type DeprecatedIconName = keyof typeof deprecatedIconAliases;

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  /** Accessible label. Omit for decorative icons. */
  title?: string;
  /** Icon width and height. Defaults to 24. */
  size?: number | string;
}

export type IconComponent = (props: IconProps) => React.ReactElement;

export interface IconByNameProps extends IconProps {
  /** Icon name from the CKW Elements icon set. Deprecated names keep working until the next major version. */
  name: IconName | DeprecatedIconName;
}

function getAccessibilityProps(title: string | undefined): React.SVGProps<SVGSVGElement> {
  return title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
}

${functions}

${aliasComponents}

export const iconComponents = {
${componentMap}
} satisfies Record<IconName, IconComponent>;

const deprecatedIconComponents = {
${aliasComponentMap}
} satisfies Record<DeprecatedIconName, IconComponent>;

/** Renders a CKW Elements icon by name. */
export function Icon({ name, ...props }: IconByNameProps) {
  const IconComponent: IconComponent =
    name in deprecatedIconComponents
      ? deprecatedIconComponents[name as DeprecatedIconName]
      : iconComponents[name as IconName];

  return <IconComponent {...props} />;
}
`;
}

/**
 * Generates one exported React function for an icon.
 */
function toIconFunction(icon) {
  const paths = icon.paths
    .map((attributes) => {
      const body = attributes
        .map(([name, value]) => `        ${name}=${JSON.stringify(value)}`)
        .join('\n');

      return `      <path\n${body}\n      />`;
    })
    .join('\n');

  return `/** Renders the ${humanize(icon.name)} icon from the CKW Elements Figma icon set. */
export function ${icon.componentName}({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
${paths}
    </svg>
  );
}`;
}

/**
 * Formats generated source with the repository Prettier config so `pnpm format:check` stays green.
 */
async function format(source, filePath) {
  const config = (await prettier.resolveConfig(filePath)) ?? {};

  return prettier.format(source, { ...config, filepath: filePath });
}
