/**
 * Generates the Code Connect batch file for all icons.
 *
 * Reads the icon metadata (name, componentName, figmaNodeId) from the built
 * icons package and writes packages/icons/code-connect/icons.figma.batch.json,
 * which maps every Figma icon component to its React component.
 *
 * Usage: pnpm figma:icons (run after building @ckwag/elements-icons)
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { iconMetadata } from '../packages/icons/dist/index.js';

const fileUrl = 'https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements';
const outFile = fileURLToPath(
  new URL('../packages/icons/code-connect/icons.figma.batch.json', import.meta.url),
);

// Icons that exist in the package but no longer as a component in Figma (Code Connect would fail).
// IconPlus: the Figma icon was removed; Icon/add is the plus icon in Figma.
const notInFigma = new Set(['plus']);

const components = iconMetadata
  .filter((icon) => !notInFigma.has(icon.name))
  .map((icon) => ({
    url: `${fileUrl}?node-id=${icon.figmaNodeId.replace(':', '-')}`,
    name: icon.componentName,
    id: `icon-${icon.name}`,
    importPath: '@ckwag/elements-icons',
    source: 'packages/icons/src/index.tsx',
    component: icon.componentName,
  }));

writeFileSync(
  outFile,
  `${JSON.stringify({ templateFile: './icons.figma.batch.ts', components }, null, 2)}\n`,
);
console.log(`Wrote ${components.length} icon mappings to ${outFile}`);
