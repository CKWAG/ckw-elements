import React from 'react';
import type { TypographyStyle } from '../data/tokens';

interface TypographySampleProps {
  style: TypographyStyle;
  responsive: boolean;
}

/**
 * Renders a typography style as a table row matching the Figma documentation layout.
 * Column 1: Token name in a gray pill (token-badge)
 * Column 2: Live rendered sample at Desktop size (uses CSS Utility Class from pipeline)
 * Column 3: Live rendered sample at Mobile size (only for responsive styles,
 *           forces mobile values via CSS custom property overrides)
 *
 * Meta text below each sample ("Gotham, Medium, 36px, 130%") is derived from
 * tokens.json data through the tokens adapter.
 */
export function TypographySample({ style, responsive }: TypographySampleProps) {
  const tokenPrefix = style.cssClass.replace('text-', '');
  const desktopLineHeightPercent = computeLineHeightPercent(style.desktop.size, style.desktop.height);
  const mobileLineHeightPercent = computeLineHeightPercent(style.mobile.size, style.mobile.height);

  return (
    <tr>
      {/* Token Name — gray pill */}
      <td style={{ verticalAlign: 'middle' }}>
        <span className="token-badge">{tokenPrefix}</span>
      </td>

      {/* Desktop sample — uses CSS Utility Class from pipeline */}
      <td style={{ verticalAlign: 'middle' }}>
        <div className={`type-sample ${style.cssClass}`}>
          {style.name}
        </div>
        <div className="type-sample-meta">
          Gotham, {style.desktop.weightName}, {style.desktop.size}, {desktopLineHeightPercent}
        </div>
      </td>

      {/* Mobile sample — forces mobile values via CSS custom property overrides */}
      {responsive ? (
        <td style={{ verticalAlign: 'middle' }}>
          <div
            className={`type-sample ${style.cssClass}`}
            style={{
              [`--${tokenPrefix}-size` as string]: style.mobile.size,
              [`--${tokenPrefix}-height` as string]: style.mobile.height,
              [`--${tokenPrefix}-weight` as string]: style.mobile.weight,
            }}
          >
            {style.name}
          </div>
          <div className="type-sample-meta">
            Gotham, {style.mobile.weightName}, {style.mobile.size}, {mobileLineHeightPercent}
          </div>
        </td>
      ) : (
        <td />
      )}
    </tr>
  );
}

/**
 * Compute line-height as percentage string (e.g. "130%").
 * Both size and height are expected as "Npx" strings.
 */
function computeLineHeightPercent(size: string, height: string): string {
  const s = parseInt(size, 10);
  const h = parseInt(height, 10);
  if (s === 0) return '100%';
  return Math.round((h / s) * 100) + '%';
}
