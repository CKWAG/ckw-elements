import React from 'react';
import type { ShadowToken } from '../data/tokens';

interface ShadowCardProps {
  token: ShadowToken;
}

/**
 * Renders a card with the actual box-shadow applied.
 * Uses .shadow-card from docs.css.
 */
export function ShadowCard({ token }: ShadowCardProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px' }}>
      {/* Shadow preview card */}
      <div
        className="shadow-card"
        style={{ boxShadow: `var(${token.cssVar})` }}
      />

      {/* Label */}
      <div style={{ textAlign: 'center' }}>
        <div className="specs-title-xl" style={{ marginBottom: '4px' }}>
          {token.name}
        </div>
        <span className="token-badge">{token.cssVar}</span>
      </div>
    </div>
  );
}
