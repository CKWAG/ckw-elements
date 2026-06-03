/**
 * Generates React icon components from a Figma icon node export.
 *
 * Inputs are intentionally local files so the Figma token is never committed:
 * - node JSON from `/v1/files/:file_key/nodes`
 * - manifest JSON produced while exporting SVG images
 * - directory of downloaded SVG files
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDir = dirname(fileURLToPath(import.meta.url));
const [nodeJsonPath, manifestPath, svgDir] = process.argv.slice(2);

if (!nodeJsonPath || !manifestPath || !svgDir) {
  process.stderr.write(
    'Usage: node generate-icons.mjs <figma-node-json> <manifest-json> <svg-dir>\n',
  );
  process.exit(1);
}

const figmaRoot = JSON.parse(readFileSync(nodeJsonPath, 'utf8')).nodes['164:2100'].document;
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const parentById = new Map();

walkTree(figmaRoot);

const icons = manifest
  .map((entry) => {
    const name = getRowText(entry.id) ?? entry.slug;
    const svg = readFileSync(join(svgDir, `${entry.slug}.svg`), 'utf8');

    return {
      name,
      componentName: `Icon${toPascal(name)}`,
      figmaNodeId: entry.id,
      paths: toPathJsx(svg),
    };
  })
  .sort((left, right) => left.name.localeCompare(right.name));

writeGeneratedSource(icons);
process.stdout.write(`Generated ${icons.length} CKW icon components.\n`);

/**
 * Walks the Figma tree and records parent nodes for row-label lookup.
 */
function walkTree(node, parentNode = null) {
  if (parentNode) {
    parentById.set(node.id, parentNode);
  }

  for (const child of node.children ?? []) {
    walkTree(child, node);
  }
}

/**
 * Returns the first text label in the icon index row for a component node.
 */
function getRowText(id) {
  let nodeId = id;

  while (parentById.has(nodeId)) {
    const parentNode = parentById.get(nodeId);

    if (parentNode.name === 'Row') {
      const textNodes = [];
      collectText(parentNode, textNodes);
      return textNodes[0];
    }

    nodeId = parentNode.id;
  }

  return null;
}

/**
 * Collects text content below a Figma node.
 */
function collectText(node, textNodes) {
  if (node.type === 'TEXT') {
    textNodes.push(node.characters || node.name);
  }

  for (const child of node.children ?? []) {
    collectText(child, textNodes);
  }
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
 * Converts exported Figma path tags to JSX path tags.
 */
function toPathJsx(svg) {
  const pathTags = [...svg.matchAll(/<path\b([^>]*)\/>/g)].map((match) => match[1]);

  return pathTags
    .map((rawAttributes) => {
      const attributes = parsePathAttributes(rawAttributes);
      const body = attributes
        .map(([name, value]) => `        ${name}=${JSON.stringify(value)}`)
        .join('\n');

      return `      <path\n${body}\n      />`;
    })
    .join('\n');
}

/**
 * Parses and normalizes SVG path attributes for React.
 */
function parsePathAttributes(rawAttributes) {
  const attributes = [];

  for (const match of rawAttributes.matchAll(/([:\w-]+)="([^"]*)"/g)) {
    let [, name, value] = match;

    if (name === 'fill-rule') {
      name = 'fillRule';
    }

    if (name === 'clip-rule') {
      name = 'clipRule';
    }

    if (name === 'fill' && value === '#232623') {
      value = 'currentColor';
    }

    attributes.push([name, value]);
  }

  return attributes;
}

/**
 * Writes the generated icon source and React subpath re-export.
 */
function writeGeneratedSource(generatedIcons) {
  const iconNames = generatedIcons.map((icon) => `  ${JSON.stringify(icon.name)},`).join('\n');
  const metadata = generatedIcons
    .map(
      (icon) =>
        `  { name: ${JSON.stringify(icon.name)}, componentName: ${JSON.stringify(
          icon.componentName,
        )}, figmaNodeId: ${JSON.stringify(icon.figmaNodeId)} },`,
    )
    .join('\n');
  const functions = generatedIcons.map(toIconFunction).join('\n\n');
  const componentMap = generatedIcons
    .map((icon) => `  ${JSON.stringify(icon.name)}: ${icon.componentName},`)
    .join('\n');
  const source = `import React from 'react';

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

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  /** Accessible label. Omit for decorative icons. */
  title?: string;
  /** Icon width and height. Defaults to 24. */
  size?: number | string;
}

export type IconComponent = (props: IconProps) => React.ReactElement;

export interface IconByNameProps extends IconProps {
  /** Icon name from the CKW Elements icon set. */
  name: IconName;
}

function getAccessibilityProps(title: string | undefined): React.SVGProps<SVGSVGElement> {
  return title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
}

${functions}

export const iconComponents = {
${componentMap}
} satisfies Record<IconName, IconComponent>;

/** Renders a CKW Elements icon by name. */
export function Icon({ name, ...props }: IconByNameProps) {
  const IconComponent = iconComponents[name];

  return <IconComponent {...props} />;
}
`;

  mkdirSync(join(packageDir, 'src', 'react'), { recursive: true });
  writeFileSync(join(packageDir, 'src', 'index.tsx'), source);
  writeFileSync(join(packageDir, 'src', 'react', 'index.ts'), "export * from '../index.js';\n");
}

/**
 * Generates one exported React function for an icon.
 */
function toIconFunction(icon) {
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
${icon.paths}
    </svg>
  );
}`;
}
