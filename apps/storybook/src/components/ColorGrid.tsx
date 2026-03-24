import React from 'react';
import type { ColorGroup } from '../data/tokens';
import { ColorSwatch } from './ColorSwatch';

interface ColorGridProps {
  group: ColorGroup;
}

/**
 * Renders a flex grid of ColorSwatches for a single color group (e.g. "Green").
 * Includes a group title above the swatches.
 */
export function ColorGrid({ group }: ColorGridProps) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div className="specs-title-xl" style={{ marginBottom: '12px' }}>
        {group.name}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {group.colors.map((color) => (
          <ColorSwatch key={color.cssVar} token={color} />
        ))}
      </div>
    </div>
  );
}
