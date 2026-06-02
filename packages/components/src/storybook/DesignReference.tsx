import React from 'react';
import type { FigmaReference } from './figmaLinks';

interface DesignReferenceProps {
  reference: FigmaReference;
}

/**
 * Renders the Figma source-of-truth link for a documented component.
 */
export function DesignReference({ reference }: DesignReferenceProps) {
  const labelByScope = {
    'component-node': 'Open component in Figma',
    'foundation-node': 'Open foundation in Figma',
    'guide-node': 'Open guide in Figma',
  };
  const label = labelByScope[reference.scope];

  return (
    <div className="docs-design-reference">
      <div>
        <div className="docs-design-reference__eyebrow">Design source</div>
        <div className="docs-design-reference__title">{reference.componentName}</div>
        <div className="docs-design-reference__note">{reference.note}</div>
      </div>
      <div className="docs-design-reference__meta">
        <span className="token-badge-sm">Figma node {reference.nodeId}</span>
        <a
          className="docs-design-reference__link"
          href={reference.url}
          target="_blank"
          rel="noreferrer"
        >
          {label}
        </a>
      </div>
    </div>
  );
}
