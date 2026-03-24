import React from 'react';
import type { BorderRadiusToken, BorderWeightToken } from '../data/tokens';

interface BorderRadiusPreviewProps {
  token: BorderRadiusToken;
}

/**
 * Renders a box with the actual border-radius applied.
 * Uses .border-preview from docs.css.
 */
export function BorderRadiusPreview({ token }: BorderRadiusPreviewProps) {
  const isFull = token.name === 'full';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div
        className="border-preview"
        style={{
          width: isFull ? '120px' : undefined,
          borderRadius: `var(${token.cssVar})`,
          backgroundColor: 'var(--specs-100)',
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <div className="specs-title-xl" style={{ marginBottom: '2px' }}>
          {token.name}
        </div>
        <span className="token-badge-sm">{token.value}</span>
      </div>
    </div>
  );
}

interface BorderWeightPreviewProps {
  token: BorderWeightToken;
}

/**
 * Renders a box with the actual border-width applied.
 * Uses .border-preview from docs.css.
 */
export function BorderWeightPreview({ token }: BorderWeightPreviewProps) {
  const isNone = token.name === 'none';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div
        className="border-preview"
        style={{
          borderWidth: `var(${token.cssVar})`,
          borderStyle: isNone ? 'dashed' : 'solid',
          borderColor: isNone ? 'var(--specs-300)' : undefined,
          borderRadius: '8px',
          backgroundColor: 'var(--specs-white)',
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <div className="specs-title-xl" style={{ marginBottom: '2px' }}>
          {token.name}
        </div>
        <span className="token-badge-sm">{token.value}</span>
      </div>
    </div>
  );
}
