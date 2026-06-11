/**
 * Token Data for Storybook Foundation Pages
 *
 * Adapter that imports tokens.json from @ckwag/elements-tokens (the single source
 * of truth) and transforms the DTCG structure into typed arrays consumed by
 * React helper components and MDX pages.
 *
 * NEVER hardcode token values here — everything is derived from tokens.json.
 * When Figma tokens change and `pnpm tokens:sync` runs, this file auto-updates.
 */

import tokensJson from '@ckwag/elements-tokens/tokens.json';

// ============================================
// Types
// ============================================

export interface ColorToken {
  step: string;
  hex: string;
  cssVar: string;
}

export interface ColorGroup {
  name: string;
  colors: ColorToken[];
}

export interface SemanticColorToken {
  name: string;
  cssVar: string;
  reference: string;
}

export interface SemanticColorCategory {
  category: string;
  tokens: SemanticColorToken[];
}

export interface TypographyStyle {
  name: string;
  cssClass: string;
  desktop: { size: string; height: string; weight: number; weightName: string };
  mobile: { size: string; height: string; weight: number; weightName: string };
}

export interface TypographyCategory {
  category: string;
  description: string;
  tag?: string;
  responsive: boolean;
  styles: TypographyStyle[];
}

export interface SpacingToken {
  name: string;
  cssVar: string;
  value: string;
  rem: string;
}

export interface ShadowToken {
  name: string;
  cssVar: string;
  value: string;
}

export interface BorderRadiusToken {
  name: string;
  cssVar: string;
  value: string;
}

export interface BorderWeightToken {
  name: string;
  cssVar: string;
  value: string;
}

// ============================================
// Helpers
// ============================================

/** Font weight name → CSS numeric value */
const FONT_WEIGHT_MAP: Record<string, number> = {
  Book: 325,
  Medium: 500,
  Bold: 700,
};

function fontWeightToNumber(name: string): number {
  return FONT_WEIGHT_MAP[name] ?? 400;
}

/**
 * Convert a DTCG reference like "{primitive.color.grey.800}" to a human-readable
 * string like "Grey/800". Handles neutrals ("Neutrals/white").
 */
function refToHumanReadable(ref: string): string {
  // Remove braces: "primitive.color.grey.800"
  const inner = ref.replace(/^\{|\}$/g, '');
  // Split: ["primitive", "color", "grey", "800"]
  const parts = inner.split('.');
  // Skip "primitive" and "color" → ["grey", "800"]
  const relevant = parts.slice(2);
  if (relevant.length === 0) return ref;
  // Capitalize group name: "grey" → "Grey", "neutrals" → "Neutrals"
  const group = relevant[0].charAt(0).toUpperCase() + relevant[0].slice(1);
  const step = relevant.slice(1).join('/');
  return `${group}/${step}`;
}

/** Convert px string to rem string (base 16). */
function pxToRem(px: string): string {
  const num = parseInt(px, 10);
  if (isNaN(num)) return px;
  if (num === 0) return '0';
  return `${num / 16}rem`;
}

// ============================================
// Type-safe accessor for tokens.json
// ============================================

type TokenNode = { $value: string; $type: string } | { [key: string]: TokenNode };

function isLeaf(node: unknown): node is { $value: string; $type: string } {
  return typeof node === 'object' && node !== null && '$value' in node;
}

// ============================================
// Primitive Colors (8 groups, 79 + 2 neutrals)
// ============================================

/**
 * Desired display order for color groups (matches Figma docs).
 * Groups not in this list are appended alphabetically at the end.
 */
const COLOR_GROUP_ORDER = [
  'green',
  'grey',
  'khaki',
  'blue',
  'yellow',
  'orange',
  'violet',
  'neutrals',
];

function buildPrimitiveColors(): ColorGroup[] {
  const colorNode = tokensJson.primitive.color as Record<string, Record<string, TokenNode>>;
  const groups: ColorGroup[] = [];

  for (const groupName of COLOR_GROUP_ORDER) {
    const steps = colorNode[groupName];
    if (!steps) continue;

    const colors: ColorToken[] = [];
    for (const [step, token] of Object.entries(steps)) {
      if (isLeaf(token)) {
        colors.push({
          step,
          hex: token.$value,
          cssVar: `--color-${groupName}-${step}`,
        });
      }
    }
    groups.push({
      name: groupName.charAt(0).toUpperCase() + groupName.slice(1),
      colors,
    });
  }

  return groups;
}

export const primitiveColors: ColorGroup[] = buildPrimitiveColors();

// ============================================
// Semantic Colors (76 tokens, 7 categories)
// ============================================

/**
 * Category grouping rules for semantic color tokens.
 * A token is assigned to the first category whose prefix matches.
 */
const SEMANTIC_CATEGORY_PREFIXES: [string, string][] = [
  ['text-', 'Text'],
  ['interactive-', 'Interactive'],
  ['background-', 'Background'],
  ['border-', 'Border'],
  ['status-', 'Status'],
  ['chart-', 'Chart'],
  ['decorative-', 'Decorative'],
];

function categorizeSemanticToken(name: string): string {
  for (const [prefix, category] of SEMANTIC_CATEGORY_PREFIXES) {
    if (name.startsWith(prefix)) return category;
  }
  return 'Other';
}

function buildSemanticColors(): SemanticColorCategory[] {
  const semNode = tokensJson.semantic.color as Record<string, { $value: string; $type: string }>;
  const categoryMap = new Map<string, SemanticColorToken[]>();

  // Ensure categories appear in defined order
  for (const [, category] of SEMANTIC_CATEGORY_PREFIXES) {
    categoryMap.set(category, []);
  }

  for (const [name, token] of Object.entries(semNode)) {
    if (!isLeaf(token)) continue;
    const category = categorizeSemanticToken(name);
    if (!categoryMap.has(category)) {
      categoryMap.set(category, []);
    }
    categoryMap.get(category)!.push({
      name,
      cssVar: `--${name}`,
      reference: refToHumanReadable(token.$value),
    });
  }

  const result: SemanticColorCategory[] = [];
  for (const [category, tokens] of categoryMap) {
    if (tokens.length > 0) {
      result.push({ category, tokens });
    }
  }
  return result;
}

export const semanticColors: SemanticColorCategory[] = buildSemanticColors();

// ============================================
// Typography Styles (28 styles, 8 categories)
// ============================================

/**
 * Typography category metadata. The order here defines the display order in Storybook.
 * `styleNames` lists which token keys belong to this category (in display order).
 */
const TYPOGRAPHY_CATEGORY_META: {
  category: string;
  description: string;
  tag?: string;
  responsive: boolean;
  styleNames: string[];
}[] = [
  {
    category: 'Display',
    description:
      'Display styles are website-exclusive and reserved for the most prominent page titles and hero headlines. Use once per page to create a strong brand moment.',
    tag: 'Website Exclusive',
    responsive: true,
    styleNames: ['display-l', 'display-s'],
  },
  {
    category: 'Heading',
    description:
      'Heading styles structure content within a page or module. Use them to create a clear hierarchy, break content into sections, and improve scanability across repeated patterns and components.',
    responsive: true,
    styleNames: ['heading-xl', 'heading-l', 'heading-m', 'heading-s'],
  },
  {
    category: 'Lead',
    description:
      'Lead text is used for introductory copy placed directly under a heading to provide context before body content.',
    responsive: true,
    styleNames: ['lead', 'lead-emphasized'],
  },
  {
    category: 'Body',
    description:
      'Used for primary reading text across UI and content. Stays the same size on desktop and mobile to ensure consistent readability.',
    responsive: false,
    styleNames: [
      'body-l',
      'body-l-emphasized',
      'body-m',
      'body-m-emphasized',
      'body-s',
      'body-s-emphasized',
    ],
  },
  {
    category: 'Caption',
    description:
      'Used for supporting information such as labels, metadata or footnotes. Not intended for main content or long passages of text.',
    responsive: false,
    styleNames: ['caption', 'caption-emphasized'],
  },
  {
    category: 'Label',
    description:
      'Used for interactive element labels such as buttons, form fields, and navigation items. Always set in Medium weight for clear visual distinction from body text.',
    responsive: false,
    styleNames: ['label-l', 'label-m', 'label-s'],
  },
  {
    category: 'Overline',
    description:
      'A small uppercase-style label used above headings or content sections to indicate category or context. Always set in Medium weight.',
    responsive: false,
    styleNames: ['overline'],
  },
  {
    category: 'Metric',
    description:
      'Used for numerical data displays such as KPIs, dashboards, and statistics. Available in Book (default) and Bold (emphasized) weights across five sizes.',
    responsive: false,
    styleNames: [
      'metric-xl',
      'metric-xl-emphasized',
      'metric-l',
      'metric-l-emphasized',
      'metric-m',
      'metric-m-emphasized',
      'metric-s',
      'metric-s-emphasized',
      'metric-xs',
      'metric-xs-emphasized',
    ],
  },
];

/**
 * Convert a token key like "heading-xl" to a display name like "Heading XL".
 */
function tokenKeyToDisplayName(key: string): string {
  return key
    .split('-')
    .map((part) => {
      // Size suffixes: uppercase
      if (/^(xs|s|m|l|xl)$/i.test(part)) return part.toUpperCase();
      // Regular words: capitalize
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');
}

function buildTypographyCategories(): TypographyCategory[] {
  const desktopNode = tokensJson.typography.desktop as Record<
    string,
    Record<string, { $value: string; $type: string }>
  >;
  const mobileNode = tokensJson.typography.mobile as Record<
    string,
    Record<string, { $value: string; $type: string }>
  >;

  return TYPOGRAPHY_CATEGORY_META.map((meta) => {
    const styles: TypographyStyle[] = meta.styleNames.map((key) => {
      const dt = desktopNode[key];
      const mt = mobileNode[key];

      const desktopWeightName = dt?.weight?.$value ?? 'Book';
      const mobileWeightName = mt?.weight?.$value ?? 'Book';

      return {
        name: tokenKeyToDisplayName(key),
        cssClass: `ckw-text-${key}`,
        desktop: {
          size: dt?.size?.$value ?? '16px',
          height: dt?.height?.$value ?? '24px',
          weight: fontWeightToNumber(desktopWeightName),
          weightName: desktopWeightName,
        },
        mobile: {
          size: mt?.size?.$value ?? '16px',
          height: mt?.height?.$value ?? '24px',
          weight: fontWeightToNumber(mobileWeightName),
          weightName: mobileWeightName,
        },
      };
    });

    return {
      category: meta.category,
      description: meta.description,
      tag: meta.tag,
      responsive: meta.responsive,
      styles,
    };
  });
}

export const typographyCategories: TypographyCategory[] = buildTypographyCategories();

// ============================================
// Spacing Tokens (15)
// ============================================

/**
 * Desired display order for spacing tokens (smallest → largest).
 */
const SPACING_ORDER = [
  'none',
  '3xs',
  '2xs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
];

function buildSpacingTokens(): SpacingToken[] {
  const spacingNode = tokensJson.primitive.spacing as Record<
    string,
    { $value: string; $type: string }
  >;

  return SPACING_ORDER.filter((name) => spacingNode[name] !== undefined).map((name) => {
    const token = spacingNode[name];
    return {
      name,
      cssVar: `--spacing-${name}`,
      value: token.$value,
      rem: pxToRem(token.$value),
    };
  });
}

export const spacingTokens: SpacingToken[] = buildSpacingTokens();

// ============================================
// Shadow Tokens (5)
// ============================================

const SHADOW_ORDER = ['xs', 's', 'm', 'l', 'xl'];

function buildShadowTokens(): ShadowToken[] {
  const shadowNode = tokensJson.primitive.shadow as Record<
    string,
    { $value: string; $type: string }
  >;

  return SHADOW_ORDER.filter((name) => shadowNode[name] !== undefined).map((name) => ({
    name,
    cssVar: `--shadow-${name}`,
    value: shadowNode[name].$value,
  }));
}

export const shadowTokens: ShadowToken[] = buildShadowTokens();

// ============================================
// Border Radius Tokens (7)
// ============================================

const BORDER_RADIUS_ORDER = ['none', 'xs', 's', 'm', 'l', 'xl', 'full'];

function buildBorderRadiusTokens(): BorderRadiusToken[] {
  const brNode = tokensJson.primitive['border-radius'] as Record<
    string,
    { $value: string; $type: string }
  >;

  return BORDER_RADIUS_ORDER.filter((name) => brNode[name] !== undefined).map((name) => ({
    name,
    cssVar: `--border-radius-${name}`,
    value: brNode[name].$value,
  }));
}

export const borderRadiusTokens: BorderRadiusToken[] = buildBorderRadiusTokens();

// ============================================
// Border Weight Tokens (4)
// ============================================

const BORDER_WEIGHT_ORDER = ['none', 's', 'm', 'l'];

function buildBorderWeightTokens(): BorderWeightToken[] {
  const bwNode = tokensJson.primitive['border-weight'] as Record<
    string,
    { $value: string; $type: string }
  >;

  return BORDER_WEIGHT_ORDER.filter((name) => bwNode[name] !== undefined).map((name) => ({
    name,
    cssVar: `--border-weight-${name}`,
    value: bwNode[name].$value,
  }));
}

export const borderWeightTokens: BorderWeightToken[] = buildBorderWeightTokens();

// ============================================
// Gradient Token (1)
// ============================================

export const gradientToken = {
  name: 'brand',
  cssVar: '--gradient-brand',
  value: (tokensJson.primitive.gradient as Record<string, { $value: string; $type: string }>).brand
    .$value,
};
