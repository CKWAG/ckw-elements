import React from 'react';
import type { ColorToken } from '../data/tokens';

interface ColorSwatchProps {
  token: ColorToken;
}

/**
 * Renders a single color swatch with the color square, step label, and hex value.
 * Uses .color-swatch and .color-swatch-label from docs.css.
 */
export function ColorSwatch({ token }: ColorSwatchProps) {
  const isLight = isLightColor(token.hex);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '80px' }}>
      <div
        className="color-swatch"
        style={{ backgroundColor: `var(${token.cssVar})` }}
        role="img"
        aria-label={`Color swatch: ${token.step} (${token.hex})`}
      >
        <span
          className="color-swatch-label"
          style={{ color: isLight ? 'var(--specs-700)' : 'var(--specs-white)' }}
        >
          {token.step}
        </span>
      </div>
      <span className="token-badge-sm">{token.hex}</span>
    </div>
  );
}

/**
 * Simple heuristic to determine if a hex color is "light" (needs dark text).
 * Uses perceived brightness formula.
 */
function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 160;
}
