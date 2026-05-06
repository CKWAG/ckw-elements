/**
 * transform-tokens.mjs
 *
 * Transforms the raw Tokens Studio export (tokens-raw.json) into a clean
 * DTCG-format tokens.json for Style Dictionary consumption.
 *
 * Workflow:
 *   1. Figma -> Tokens Studio plugin -> Export as tokens-raw.json
 *   2. Run: node transform-tokens.mjs
 *   3. Outputs: tokens.json (DTCG format, committed to Git)
 *   4. Run: node build-tokens.mjs (Style Dictionary -> dist/)
 *
 * Mapping rules:
 *   - "Specification/Value"     -> SKIP (internal design specs)
 *   - "Primitive Colors/Value"  -> primitive.color.*
 *   - "Semantic Colors/Light Mode" -> semantic.color.*
 *   - "Typography/Desktop"      -> typography.desktop.* + primitive.font-family.brand
 *   - "Typography/Mobile"       -> typography.mobile.*
 *   - "Spacing/Value"           -> primitive.spacing.*
 *   - "Borders/Value"           -> primitive.border-radius.* + primitive.border-weight.*
 *   - "Shadows/Value"           -> primitive.shadow.*
 *   - "Gradients/Value"         -> primitive.gradient.*
 *
 * Type conversions:
 *   - number -> dimension (append "px") for spacing, borders, typography size/height
 *   - text in Typography Family group -> fontFamily
 *   - text in other Typography groups -> fontWeight (value stays as "Book"/"Medium")
 *   - boxShadow -> shadow (compose CSS box-shadow string, hex-alpha to rgba)
 *
 * Reference conversion:
 *   - Semantic values like "{Grey.800}" -> "{primitive.color.grey.800}"
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_FILE = join(__dirname, 'tokens-raw.json');
const OUTPUT_FILE = join(__dirname, 'tokens.json');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Known primitive color group names (used for reference resolution). */
const COLOR_GROUPS = ['Green', 'Grey', 'Khaki', 'Blue', 'Yellow', 'Orange', 'Violet', 'Neutrals'];

/**
 * Convert 8-digit hex color (#RRGGBBAA) to rgba() string.
 * Also handles 6-digit hex (#RRGGBB) by assuming full opacity.
 */
function hexToRgba(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);

  if (h.length === 8) {
    const a = parseInt(h.slice(6, 8), 16) / 255;
    // Round to reasonable precision, avoid trailing zeros
    const aRounded = Math.round(a * 100) / 100;
    return `rgba(${r}, ${g}, ${b}, ${aRounded})`;
  }

  return `rgba(${r}, ${g}, ${b}, 1)`;
}

/**
 * Compose a single shadow layer into a CSS box-shadow fragment.
 * Input: { color, type, x, y, blur, spread }
 * Output: "0px 2px 20px 0px rgba(0, 0, 0, 0.06)"
 */
function composeShadowLayer(layer) {
  const x = `${layer.x}px`;
  const y = `${layer.y}px`;
  const blur = `${layer.blur}px`;
  const spread = `${layer.spread}px`;
  const color = hexToRgba(layer.color);
  return `${x} ${y} ${blur} ${spread} ${color}`;
}

/**
 * Convert a boxShadow value (single object or array) to a CSS shadow string.
 */
function composeShadowValue(value) {
  if (Array.isArray(value)) {
    return value.map(composeShadowLayer).join(', ');
  }
  return composeShadowLayer(value);
}

/**
 * Convert a Tokens Studio semantic reference like "{Grey.800}" to a
 * DTCG-format reference like "{primitive.color.grey.800}".
 */
function convertReference(value) {
  if (typeof value !== 'string') return value;

  return value.replace(/\{([^}]+)\}/g, (_, ref) => {
    // ref is e.g. "Grey.800" or "Neutrals.white" or "Green.600"
    const parts = ref.split('.');
    if (parts.length === 2) {
      const [group, step] = parts;
      // Check if this references a known color group
      if (COLOR_GROUPS.includes(group)) {
        return `{primitive.color.${group.toLowerCase()}.${step.toLowerCase()}}`;
      }
    }
    // Return unchanged if not a known reference pattern
    return `{${ref}}`;
  });
}

/**
 * Parse a raw typography token name into { style, property }.
 *
 * Raw naming from Figma (via Tokens Studio) has inconsistencies:
 *   Weight tokens: "lead-weight", "lead-weight-emphasized", "caption-weight",
 *                  "caption-emphasized-weight", "heading-xl-weight"
 *   Size/height:   "lead-size", "lead-emphasized-size", "caption-size",
 *                  "caption-emphasized-size", "heading-xl-size"
 *
 * Target output format: { style: "lead", property: "weight" }
 *                       { style: "lead-emphasized", property: "weight" }
 *                       { style: "heading-xl", property: "size" }
 */
function parseTypographyName(name) {
  const properties = ['size', 'height', 'weight'];

  // Strategy: find which property suffix the name ends with (for size/height)
  // or contains as a segment (for weight, which can appear mid-name)

  // First, check for -size or -height suffix (these are always at the end)
  for (const prop of ['size', 'height']) {
    if (name.endsWith(`-${prop}`)) {
      const style = name.slice(0, -(prop.length + 1)); // strip "-size" or "-height"
      return { style, property: prop };
    }
  }

  // Weight tokens have special naming:
  //   "lead-weight"              -> style=lead, property=weight
  //   "lead-weight-emphasized"   -> style=lead-emphasized, property=weight
  //   "caption-weight"           -> style=caption, property=weight
  //   "caption-emphasized-weight"-> style=caption-emphasized, property=weight
  //   "heading-xl-weight"        -> style=heading-xl, property=weight
  //   "body-l-weight"            -> style=body-l, property=weight
  //   "body-l-emphasized-weight" -> style=body-l-emphasized, property=weight
  //   "display-l-weight"         -> style=display-l, property=weight

  // Handle weight: find "-weight" in the name
  const weightIdx = name.indexOf('-weight');
  if (weightIdx !== -1) {
    const beforeWeight = name.slice(0, weightIdx);
    const afterWeight = name.slice(weightIdx + '-weight'.length);

    if (afterWeight === '') {
      // "lead-weight", "caption-weight", "heading-xl-weight", etc.
      return { style: beforeWeight, property: 'weight' };
    }
    if (afterWeight === '-emphasized') {
      // "lead-weight-emphasized" -> style=lead-emphasized
      return { style: `${beforeWeight}-emphasized`, property: 'weight' };
    }
  }

  // Fallback: should not happen with our known token set
  console.warn(`  Warning: Could not parse typography name: "${name}"`);
  return { style: name, property: 'unknown' };
}

/**
 * Set a deeply nested value on an object using a dot-separated path.
 */
const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function setNested(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (DANGEROUS_KEYS.has(parts[i])) return;
    if (!(parts[i] in current)) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  const lastKey = parts[parts.length - 1];
  if (DANGEROUS_KEYS.has(lastKey)) return;
  current[lastKey] = value;
}

// ---------------------------------------------------------------------------
// Main transform
// ---------------------------------------------------------------------------

function transform() {
  if (!existsSync(RAW_FILE)) {
    console.error('  Error: tokens-raw.json not found.');
    console.error('  Export from Tokens Studio and save as tokens-raw.json first.\n');
    process.exit(1);
  }

  let raw;
  try {
    raw = JSON.parse(readFileSync(RAW_FILE, 'utf-8'));
  } catch (err) {
    console.error(`  Error: Failed to parse tokens-raw.json: ${err.message}`);
    process.exit(1);
  }
  const output = {};

  // Track counts for summary
  const counts = {
    'primitive.color': 0,
    'primitive.spacing': 0,
    'primitive.border-radius': 0,
    'primitive.border-weight': 0,
    'primitive.font-family': 0,
    'primitive.shadow': 0,
    'primitive.gradient': 0,
    'semantic.color': 0,
    'typography.desktop': 0,
    'typography.mobile': 0,
    skipped: 0,
  };

  // -------------------------------------------------------------------------
  // 1. Primitive Colors: "Primitive Colors/Value" -> primitive.color.*
  // -------------------------------------------------------------------------
  const primitiveColors = raw['Primitive Colors/Value'];
  if (primitiveColors) {
    for (const [groupName, steps] of Object.entries(primitiveColors)) {
      const groupKey = groupName.toLowerCase(); // "Green" -> "green"
      for (const [step, token] of Object.entries(steps)) {
        if (!token.$value && token.$value !== 0) continue;
        const stepKey = step.toLowerCase();
        setNested(output, `primitive.color.${groupKey}.${stepKey}`, {
          $value: token.$value,
          $type: 'color',
        });
        counts['primitive.color']++;
      }
    }
  }

  // -------------------------------------------------------------------------
  // 2. Semantic Colors: "Semantic Colors/Light Mode" -> semantic.color.*
  // -------------------------------------------------------------------------
  const semanticColors = raw['Semantic Colors/Light Mode'];
  if (semanticColors) {
    for (const [_groupName, tokens] of Object.entries(semanticColors)) {
      for (const [name, token] of Object.entries(tokens)) {
        if (!token.$value && token.$value !== 0) continue;
        const value = convertReference(token.$value);
        setNested(output, `semantic.color.${name}`, {
          $value: value,
          $type: 'color',
        });
        counts['semantic.color']++;
      }
    }
  }

  // -------------------------------------------------------------------------
  // 3. Typography: "Typography/Desktop" and "Typography/Mobile"
  //    - Family group -> primitive.font-family.brand (from Desktop only)
  //    - Utility group -> SKIP
  //    - All other groups -> typography.{desktop|mobile}.{style}.{property}
  // -------------------------------------------------------------------------
  for (const [setKey, mode] of [
    ['Typography/Desktop', 'desktop'],
    ['Typography/Mobile', 'mobile'],
  ]) {
    const typoSet = raw[setKey];
    if (!typoSet) continue;

    for (const [groupName, tokens] of Object.entries(typoSet)) {
      // Skip Utility group entirely
      if (groupName === 'Utility') {
        if (mode === 'desktop') {
          counts['skipped'] += Object.keys(tokens).length;
        }
        continue;
      }

      // Family group -> primitive.font-family.brand (only from Desktop to avoid duplicates)
      if (groupName === 'Family') {
        if (mode === 'desktop') {
          for (const [name, token] of Object.entries(tokens)) {
            setNested(output, `primitive.font-family.${name.toLowerCase()}`, {
              $value: token.$value,
              $type: 'fontFamily',
            });
            counts['primitive.font-family']++;
          }
        }
        continue;
      }

      // Regular typography groups (Display, Heading, Lead, Body, Caption)
      for (const [name, token] of Object.entries(tokens)) {
        if (!token.$value && token.$value !== 0) continue;

        const { style, property } = parseTypographyName(name);

        let value;
        let type;

        if (property === 'weight') {
          // Weight tokens: text type -> fontWeight, value stays as "Book"/"Medium"
          value = token.$value;
          type = 'fontWeight';
        } else {
          // Size/height tokens: number type -> dimension with "px" suffix
          value = `${token.$value}px`;
          type = 'dimension';
        }

        setNested(output, `typography.${mode}.${style}.${property}`, {
          $value: value,
          $type: type,
        });
        counts[`typography.${mode}`]++;
      }
    }
  }

  // -------------------------------------------------------------------------
  // 4. Spacing: "Spacing/Value" -> primitive.spacing.*
  // -------------------------------------------------------------------------
  const spacing = raw['Spacing/Value'];
  if (spacing) {
    for (const [name, token] of Object.entries(spacing)) {
      if (!token.$value && token.$value !== 0) continue;
      setNested(output, `primitive.spacing.${name}`, {
        $value: `${token.$value}px`,
        $type: 'dimension',
      });
      counts['primitive.spacing']++;
    }
  }

  // -------------------------------------------------------------------------
  // 5. Borders: "Borders/Value" -> primitive.border-radius.* + primitive.border-weight.*
  // -------------------------------------------------------------------------
  const borders = raw['Borders/Value'];
  if (borders) {
    // Radius group
    if (borders.Radius) {
      for (const [name, token] of Object.entries(borders.Radius)) {
        if (!token.$value && token.$value !== 0) continue;
        setNested(output, `primitive.border-radius.${name}`, {
          $value: `${token.$value}px`,
          $type: 'dimension',
        });
        counts['primitive.border-radius']++;
      }
    }
    // Weight group
    if (borders.Weight) {
      for (const [name, token] of Object.entries(borders.Weight)) {
        if (!token.$value && token.$value !== 0) continue;
        setNested(output, `primitive.border-weight.${name}`, {
          $value: `${token.$value}px`,
          $type: 'dimension',
        });
        counts['primitive.border-weight']++;
      }
    }
  }

  // -------------------------------------------------------------------------
  // 6. Shadows: "Shadows/Value" or top-level entries in "Specification/Value"
  //    Tokens named "shadow-*" with $type "boxShadow" -> primitive.shadow.*
  // -------------------------------------------------------------------------
  const shadows = raw['Shadows/Value'];
  if (shadows) {
    for (const [name, token] of Object.entries(shadows)) {
      if (!token.$value && token.$value !== 0) continue;
      const key = name.replace(/^shadow-/, '');
      setNested(output, `primitive.shadow.${key}`, {
        $value: composeShadowValue(token.$value),
        $type: 'shadow',
      });
      counts['primitive.shadow']++;
    }
  }

  // Also check Specification/Value for shadow tokens (Tokens Studio may nest them there)
  const specValue = raw['Specification/Value'];
  if (specValue) {
    for (const [name, token] of Object.entries(specValue)) {
      if (!token || typeof token !== 'object' || !('$value' in token)) continue;
      if (token.$type === 'boxShadow' && name.startsWith('shadow-')) {
        const key = name.replace(/^shadow-/, '');
        setNested(output, `primitive.shadow.${key}`, {
          $value: composeShadowValue(token.$value),
          $type: 'shadow',
        });
        counts['primitive.shadow']++;
      }
    }
  }

  // -------------------------------------------------------------------------
  // 7. Gradients: "Gradients/Value" or "Brand" in "Specification/Value"
  //    Gradient values are linear-gradient() strings with $type "color"
  // -------------------------------------------------------------------------
  const gradients = raw['Gradients/Value'];
  if (gradients) {
    for (const [name, token] of Object.entries(gradients)) {
      if (!token.$value && token.$value !== 0) continue;
      const key = name.toLowerCase();
      setNested(output, `primitive.gradient.${key}`, {
        $value: token.$value,
        $type: 'color',
      });
      counts['primitive.gradient']++;
    }
  }

  // Also check Specification/Value for gradient token (named "Brand" with linear-gradient value)
  if (specValue) {
    for (const [name, token] of Object.entries(specValue)) {
      if (!token || typeof token !== 'object' || !('$value' in token)) continue;
      if (typeof token.$value === 'string' && token.$value.includes('linear-gradient')) {
        const key = name.toLowerCase();
        setNested(output, `primitive.gradient.${key}`, {
          $value: token.$value,
          $type: 'color',
        });
        counts['primitive.gradient']++;
      }
    }
  }

  // -------------------------------------------------------------------------
  // Write output
  // -------------------------------------------------------------------------

  // Check if existing tokens.json exists for diff
  let diff = null;
  if (existsSync(OUTPUT_FILE)) {
    try {
      const existing = JSON.parse(readFileSync(OUTPUT_FILE, 'utf-8'));
      diff = getSimpleDiff(existing, output);
    } catch (err) {
      console.warn(`  Warning: could not read existing ${OUTPUT_FILE} for diff: ${err.message}`);
    }
  }

  writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n');

  // Print summary
  console.log('\n  transform-tokens: tokens-raw.json -> tokens.json\n');
  console.log('  Token counts:');
  let total = 0;
  for (const [category, count] of Object.entries(counts)) {
    if (category === 'skipped') continue;
    if (count > 0) {
      console.log(`    ${category}: ${count}`);
      total += count;
    }
  }
  console.log(`    ─────────────────`);
  console.log(`    Total: ${total} tokens`);
  if (counts['skipped'] > 0) {
    console.log(`    Skipped: ${counts['skipped']} (Specification, Utility)`);
  }
  console.log();

  // Print diff if available
  if (diff) {
    if (diff.added.length === 0 && diff.changed.length === 0 && diff.removed.length === 0) {
      console.log('  No changes to tokens.json.\n');
    } else {
      const changeCount = diff.added.length + diff.changed.length + diff.removed.length;
      console.log(`  ${changeCount} change(s) vs previous tokens.json:\n`);
      for (const key of diff.added) {
        console.log(`    + ${key} (new)`);
      }
      for (const { key, oldVal, newVal } of diff.changed) {
        console.log(`    ~ ${key}: ${oldVal} -> ${newVal}`);
      }
      for (const key of diff.removed) {
        console.log(`    - ${key} (removed)`);
      }
      console.log();
    }
  }
}

// ---------------------------------------------------------------------------
// Simple diff helper
// ---------------------------------------------------------------------------
function flattenForDiff(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !('$value' in value)) {
      Object.assign(result, flattenForDiff(value, path));
    } else if (value && typeof value === 'object' && '$value' in value) {
      result[path] = String(value.$value);
    }
  }
  return result;
}

function getSimpleDiff(oldTokens, newTokens) {
  const oldFlat = flattenForDiff(oldTokens);
  const newFlat = flattenForDiff(newTokens);
  const added = [];
  const changed = [];
  const removed = [];

  for (const key of Object.keys(newFlat)) {
    if (!(key in oldFlat)) {
      added.push(key);
    } else if (oldFlat[key] !== newFlat[key]) {
      changed.push({ key, oldVal: oldFlat[key], newVal: newFlat[key] });
    }
  }
  for (const key of Object.keys(oldFlat)) {
    if (!(key in newFlat)) {
      removed.push(key);
    }
  }

  return { added, changed, removed };
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
transform();
