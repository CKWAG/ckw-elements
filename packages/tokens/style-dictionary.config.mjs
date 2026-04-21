/**
 * style-dictionary.config.mjs
 *
 * Style Dictionary v4 configuration for CKW Elements tokens.
 *
 * Reads tokens.json (DTCG format) and generates:
 *   dist/tokens.css  — CSS Custom Properties (all layers) + Typography Utility Classes
 *   dist/tokens.js   — JavaScript named exports (all tokens: primitives, semantics, typography)
 *
 * Token architecture (matches Figma Variables):
 *   - Layer 1: Primitive tokens — raw values, never change per theme
 *     - Colors:       --color-green-300, --color-grey-800, --color-neutrals-white
 *     - Spacing:      --spacing-xs, --spacing-2xl
 *     - Borders:      --border-radius-sm, --border-weight-md
 *     - Font family:  --font-family-brand
 *     - Shadows:      --shadow-sm, --shadow-md, --shadow-lg
 *     - Gradient:     --gradient-brand
 *   - Layer 2: Semantic color tokens — reference primitives via var()
 *     - --text-primary: var(--color-grey-800)
 *     - --interactive-primary: var(--color-green-600)
 *   - Typography: responsive tokens with Desktop (default) and Mobile overrides
 *     - --display-l-size, --heading-xl-height, --body-m-weight
 *   - Typography Utility Classes: .text-display-l, .text-heading-xl, etc.
 *
 * Components must NEVER use primitive color tokens directly — only semantic.
 */

import { usesReferences, getReferences } from 'style-dictionary/utils';

// ---------------------------------------------------------------------------
// Custom transform: generate clean CSS variable names from token paths
//
// tokens.json paths:
//   primitive.color.green.300   → "color-green-300"
//   primitive.spacing.xs        → "spacing-xs"
//   primitive.border-radius.sm  → "border-radius-sm"
//   primitive.font-family.brand → "font-family-brand"
//   primitive.shadow.sm         → "shadow-sm"
//   primitive.gradient.brand → "gradient-brand"
//   semantic.color.text-primary → "text-primary"
//   typography.desktop.heading-xl.size → "heading-xl-size"
// ---------------------------------------------------------------------------
const stripPrefixTransform = {
  type: 'name',
  transform: (token) => {
    const path = [...token.path];

    // Remove top-level layer prefix
    if (path[0] === 'primitive') {
      path.shift(); // remove 'primitive'
    } else if (path[0] === 'semantic') {
      path.shift(); // remove 'semantic'
      // Also remove 'color' since semantic names already include the category
      if (path[0] === 'color') {
        path.shift();
      }
    } else if (path[0] === 'typography') {
      path.shift(); // remove 'typography'
      path.shift(); // remove 'desktop' or 'mobile'
    }

    return path.join('-');
  },
};

// ---------------------------------------------------------------------------
// Custom value transform: convert font weight names to numeric values
//
// Gotham font weights:
//   "Book"   → "325"
//   "Medium" → "500"
//
// This transform runs on the resolved $value in the CSS output only.
// The tokens.json keeps human-readable names ("Book", "Medium").
// ---------------------------------------------------------------------------
const fontWeightTransform = {
  type: 'value',
  filter: (token) => token.$type === 'fontWeight',
  transform: (token) => {
    const map = {
      'Book': '325',
      'Medium': '500',
      'Bold': '700',
    };
    return map[token.$value] || token.$value;
  },
};

// ---------------------------------------------------------------------------
// Shared helper: categorize tokens from dictionary into named groups.
// Used by both CSS and JS format functions.
// ---------------------------------------------------------------------------
function categorizeTokens(allTokens) {
  const match = (layer, sub) => allTokens.filter(
    (t) => t.path[0] === layer && t.path[1] === sub,
  );
  return {
    primitiveColors: match('primitive', 'color'),
    primitiveSpacing: match('primitive', 'spacing'),
    primitiveBorderRadius: match('primitive', 'border-radius'),
    primitiveBorderWeight: match('primitive', 'border-weight'),
    primitiveShadow: match('primitive', 'shadow'),
    primitiveGradient: match('primitive', 'gradient'),
    primitiveFontFamily: match('primitive', 'font-family'),
    semanticColors: match('semantic', 'color'),
    typographyDesktop: match('typography', 'desktop'),
    typographyMobile: match('typography', 'mobile'),
  };
}

/**
 * Resolve a semantic token's original value to a var(--name) reference.
 * Falls back to the resolved $value if no reference is found.
 */
function resolveSemanticRef(token, unfilteredTokens) {
  const origValue = token.original.$value;
  if (origValue && typeof origValue === 'string' && usesReferences(origValue)) {
    const refs = getReferences(origValue, unfilteredTokens);
    if (refs.length > 0) {
      return `var(--${refs[0].name})`;
    }
  }
  return token.$value;
}

// ---------------------------------------------------------------------------
// Custom format: ckw/tokens-css
//
// Generates a single CSS file with structured blocks:
//   1.  :root { primitive colors }
//   2.  :root { primitive spacing }
//   3.  :root { primitive border-radius }
//   4.  :root { primitive border-weight }
//   5.  :root { primitive shadows }
//   6.  :root { primitive gradient }
//   7.  :root { primitive font-family }
//   8.  :root { semantic colors — as var() references }
//   9.  :root { typography — desktop (default) }
//   10. @media (max-width: 767px) { typography — mobile overrides }
//   11. [data-theme="dark"] { } — prepared for future dark mode
//   12. Typography utility classes (.text-display-l, .text-heading-xl, etc.)
// ---------------------------------------------------------------------------
function formatTokensCSS({ dictionary }) {
  const header = [
    '/**',
    ' * CKW Elements Design Tokens',
    ' * Generated by Style Dictionary — DO NOT EDIT MANUALLY',
    ' * Source: tokens.json (from Figma Variables via Tokens Studio)',
    ' */',
    '',
  ].join('\n');

  const {
    primitiveColors, primitiveSpacing, primitiveBorderRadius,
    primitiveBorderWeight, primitiveShadow, primitiveGradient,
    primitiveFontFamily, semanticColors, typographyDesktop, typographyMobile,
  } = categorizeTokens(dictionary.allTokens);

  const formatValue = (token) => resolveSemanticRef(token, dictionary.unfilteredTokens);

  let css = header;

  // --- Primitive Colors ---
  css += '/* ============================================\n';
  css += '   Layer 1 — Primitive Tokens\n';
  css += '   ============================================ */\n\n';
  css += '/* Colors */\n';
  css += ':root {\n';
  let currentGroup = '';
  for (const t of primitiveColors) {
    const group = t.path[2]; // e.g. 'green', 'grey'
    if (group !== currentGroup) {
      if (currentGroup) css += '\n';
      css += `  /* ${group} */\n`;
      currentGroup = group;
    }
    css += `  --${t.name}: ${t.$value};\n`;
  }
  css += '}\n\n';

  // --- Primitive Spacing ---
  css += '/* Spacing */\n';
  css += ':root {\n';
  for (const t of primitiveSpacing) {
    css += `  --${t.name}: ${t.$value};\n`;
  }
  css += '}\n\n';

  // --- Primitive Borders ---
  css += '/* Border Radius */\n';
  css += ':root {\n';
  for (const t of primitiveBorderRadius) {
    css += `  --${t.name}: ${t.$value};\n`;
  }
  css += '}\n\n';

  css += '/* Border Weight */\n';
  css += ':root {\n';
  for (const t of primitiveBorderWeight) {
    css += `  --${t.name}: ${t.$value};\n`;
  }
  css += '}\n\n';

  // --- Primitive Shadows ---
  if (primitiveShadow.length > 0) {
    css += '/* Shadows */\n';
    css += ':root {\n';
    for (const t of primitiveShadow) {
      css += `  --${t.name}: ${t.$value};\n`;
    }
    css += '}\n\n';
  }

  // --- Primitive Gradient ---
  if (primitiveGradient.length > 0) {
    css += '/* Gradient */\n';
    css += ':root {\n';
    for (const t of primitiveGradient) {
      css += `  --${t.name}: ${t.$value};\n`;
    }
    css += '}\n\n';
  }

  // --- Primitive Font Family ---
  css += '/* Font Family */\n';
  css += ':root {\n';
  for (const t of primitiveFontFamily) {
    css += `  --${t.name}: ${t.$value};\n`;
  }
  css += '}\n\n';

  // --- Semantic Colors ---
  css += '/* ============================================\n';
  css += '   Layer 2 — Semantic Color Tokens (Light)\n';
  css += '   ============================================ */\n\n';
  css += ':root {\n';
  for (const t of semanticColors) {
    css += `  --${t.name}: ${formatValue(t)};\n`;
  }
  css += '}\n\n';

  // --- Typography Desktop (default) ---
  css += '/* ============================================\n';
  css += '   Typography — Desktop (default)\n';
  css += '   ============================================ */\n\n';
  css += ':root {\n';
  for (const t of typographyDesktop) {
    css += `  --${t.name}: ${t.$value};\n`;
  }
  css += '}\n\n';

  // --- Typography Mobile (responsive override) ---
  // Only output tokens that differ from desktop
  const desktopMap = new Map();
  for (const t of typographyDesktop) {
    desktopMap.set(t.name, t.$value);
  }
  const mobileOverrides = typographyMobile.filter(
    (t) => desktopMap.get(t.name) !== t.$value,
  );

  if (mobileOverrides.length > 0) {
    css += '/* ============================================\n';
    css += '   Typography — Mobile (overrides)\n';
    css += '   ============================================ */\n\n';
    css += '@media (max-width: 767px) {\n';
    css += '  :root {\n';
    for (const t of mobileOverrides) {
      css += `    --${t.name}: ${t.$value};\n`;
    }
    css += '  }\n';
    css += '}\n\n';
  }

  // --- Dark Mode (prepared) ---
  css += '/* ============================================\n';
  css += '   Dark Mode — Prepared, not yet active\n';
  css += '   When Dark Mode is designed in Figma, semantic\n';
  css += '   color overrides will be generated here.\n';
  css += '   ============================================ */\n\n';
  css += '[data-theme="dark"] {\n';
  css += '  /* No dark mode tokens yet */\n';
  css += '}\n\n';

  // --- Typography Utility Classes ---
  // Generate .text-{style} classes that combine font-family, font-size,
  // line-height, and font-weight using var() references.
  // These automatically adapt to mobile because the vars change via @media.
  css += '/* ============================================\n';
  css += '   Typography — Utility Classes\n';
  css += '   ============================================ */\n\n';

  // Collect unique typography style names from desktop tokens
  const styleNames = new Set();
  for (const t of typographyDesktop) {
    // path: ['typography', 'desktop', '{style}', '{property}']
    const style = t.path[2];
    styleNames.add(style);
  }

  for (const style of styleNames) {
    css += `.text-${style} {\n`;
    css += `  font-family: var(--font-family-brand);\n`;
    css += `  font-size: var(--${style}-size);\n`;
    css += `  line-height: var(--${style}-height);\n`;
    css += `  font-weight: var(--${style}-weight);\n`;
    css += '}\n\n';
  }

  return css;
}

// ---------------------------------------------------------------------------
// Custom format: ckw/tokens-js
//
// Generates a JavaScript module with:
//   - Named exports for each primitive token (camelCase)
//   - Default export as object with kebab-case keys
// ---------------------------------------------------------------------------
function formatTokensJS({ dictionary }) {
  const {
    primitiveColors, primitiveSpacing, primitiveBorderRadius,
    primitiveBorderWeight, primitiveShadow, primitiveGradient,
    primitiveFontFamily, semanticColors, typographyDesktop, typographyMobile,
  } = categorizeTokens(dictionary.allTokens);

  const formatSemanticValue = (token) => resolveSemanticRef(token, dictionary.unfilteredTokens);

  let js = '/**\n * CKW Elements Design Tokens\n * Generated by Style Dictionary — DO NOT EDIT MANUALLY\n */\n\n';

  const toCamel = (name) => name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

  // Helper: safely quote a value for JS output (handles quotes in values)
  const jsVal = (v) => JSON.stringify(v);

  // --- Primitive Colors ---
  js += '// Primitive Colors\n';
  for (const t of primitiveColors) {
    js += `export const ${toCamel(t.name)} = ${jsVal(t.$value)};\n`;
  }

  // --- Primitive Spacing ---
  js += '\n// Spacing\n';
  for (const t of primitiveSpacing) {
    js += `export const ${toCamel(t.name)} = ${jsVal(t.$value)};\n`;
  }

  // --- Primitive Border Radius ---
  js += '\n// Border Radius\n';
  for (const t of primitiveBorderRadius) {
    js += `export const ${toCamel(t.name)} = ${jsVal(t.$value)};\n`;
  }

  // --- Primitive Border Weight ---
  js += '\n// Border Weight\n';
  for (const t of primitiveBorderWeight) {
    js += `export const ${toCamel(t.name)} = ${jsVal(t.$value)};\n`;
  }

  // --- Primitive Shadows ---
  if (primitiveShadow.length > 0) {
    js += '\n// Shadows\n';
    for (const t of primitiveShadow) {
      js += `export const ${toCamel(t.name)} = ${jsVal(t.$value)};\n`;
    }
  }

  // --- Primitive Gradient ---
  if (primitiveGradient.length > 0) {
    js += '\n// Gradient\n';
    for (const t of primitiveGradient) {
      js += `export const ${toCamel(t.name)} = ${jsVal(t.$value)};\n`;
    }
  }

  // --- Primitive Font Family ---
  if (primitiveFontFamily.length > 0) {
    js += '\n// Font Family\n';
    for (const t of primitiveFontFamily) {
      js += `export const ${toCamel(t.name)} = ${jsVal(t.$value)};\n`;
    }
  }

  // --- Semantic Colors ---
  js += '\n// Semantic Colors\n';
  for (const t of semanticColors) {
    js += `export const ${toCamel(t.name)} = ${jsVal(formatSemanticValue(t))};\n`;
  }

  // --- Typography Desktop ---
  js += '\n// Typography — Desktop\n';
  for (const t of typographyDesktop) {
    js += `export const ${toCamel('desktop-' + t.name)} = ${jsVal(t.$value)};\n`;
  }

  // --- Typography Mobile ---
  js += '\n// Typography — Mobile\n';
  for (const t of typographyMobile) {
    js += `export const ${toCamel('mobile-' + t.name)} = ${jsVal(t.$value)};\n`;
  }

  // --- Default export: flat object with all tokens ---
  js += '\nexport default {\n';

  // Primitives
  const allPrimitives = [
    ...primitiveColors,
    ...primitiveSpacing,
    ...primitiveBorderRadius,
    ...primitiveBorderWeight,
    ...primitiveShadow,
    ...primitiveGradient,
    ...primitiveFontFamily,
  ];
  for (const t of allPrimitives) {
    js += `  ${jsVal(t.name)}: ${jsVal(t.$value)},\n`;
  }

  // Semantics
  for (const t of semanticColors) {
    js += `  ${jsVal(t.name)}: ${jsVal(formatSemanticValue(t))},\n`;
  }

  // Typography Desktop
  for (const t of typographyDesktop) {
    js += `  ${jsVal('desktop-' + t.name)}: ${jsVal(t.$value)},\n`;
  }

  // Typography Mobile
  for (const t of typographyMobile) {
    js += `  ${jsVal('mobile-' + t.name)}: ${jsVal(t.$value)},\n`;
  }

  js += '};\n';

  return js;
}

// ---------------------------------------------------------------------------
// Style Dictionary configuration
// ---------------------------------------------------------------------------
export default {
  source: ['tokens.json'],
  hooks: {
    transforms: {
      'name/ckw-strip-prefix': stripPrefixTransform,
      'value/ckw-font-weight': fontWeightTransform,
    },
    formats: {
      'ckw/tokens-css': formatTokensCSS,
      'ckw/tokens-js': formatTokensJS,
    },
  },
  log: {
    verbosity: 'default',
  },
  platforms: {
    css: {
      transforms: ['name/ckw-strip-prefix', 'value/ckw-font-weight'],
      buildPath: 'dist/',
      files: [
        { destination: 'tokens.css', format: 'ckw/tokens-css' },
        { destination: 'tokens.js', format: 'ckw/tokens-js' },
      ],
    },
  },
};
