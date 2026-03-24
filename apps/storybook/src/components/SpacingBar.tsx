import React from 'react';
import type { SpacingToken } from '../data/tokens';

interface SpacingBarProps {
  token: SpacingToken;
}

/**
 * Renders a spacing token as a table row matching the Figma documentation layout.
 * Columns: Token Name (pill) | Rem | Pixel | Visual bar preview
 */
export function SpacingBar({ token }: SpacingBarProps) {
  const numericValue = parseInt(token.value, 10);

  return (
    <tr>
      {/* Token Name — gray pill */}
      <td style={{ verticalAlign: 'middle' }}>
        <span className="token-badge">{token.name}</span>
      </td>

      {/* Rem value */}
      <td className="cell-mono" style={{ verticalAlign: 'middle' }}>
        {token.rem}
      </td>

      {/* Pixel value */}
      <td style={{ verticalAlign: 'middle', fontWeight: 500 }}>
        {token.value}
      </td>

      {/* Visual bar */}
      <td style={{ verticalAlign: 'middle' }}>
        <div
          className="spacing-bar"
          style={{
            width: `${numericValue}px`,
            minWidth: numericValue === 0 ? '2px' : undefined,
            background: numericValue === 0 ? 'var(--specs-200)' : undefined,
            opacity: numericValue === 0 ? 0.5 : undefined,
          }}
        />
      </td>
    </tr>
  );
}
