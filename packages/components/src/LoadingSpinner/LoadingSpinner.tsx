import React from 'react';

export interface LoadingSpinnerProps {
  /** Width and height of the spinner in pixels. */
  size?: number;
  /** Additional CSS class name. */
  className?: string;
}

let idCounter = 0;

/**
 * Animated loading spinner with orbiting dots in CKW brand green shades.
 *
 * Uses an inline SVG with SMIL animations — no external dependencies needed.
 * Each instance generates a unique filter ID to avoid SVG reference collisions.
 */
export function LoadingSpinner({ size = 20, className }: LoadingSpinnerProps) {
  const [filterId] = React.useState(() => `ckw-spinner-filter-${++idCounter}`);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      aria-hidden="true"
      role="presentation"
      style={{ display: 'block', shapeRendering: 'auto' }}
    >
      <defs>
        <filter
          id={filterId}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" />
          <feComponentTransfer result="cutoff">
            <feFuncA type="table" tableValues="0 0 0 0 0 0 1 1 1 1 1" />
          </feComponentTransfer>
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        <g transform="translate(50 50)">
          <g>
            <circle cx="20" cy="0" r="5" fill="#f2f5cc">
              <animate
                attributeName="r"
                keyTimes="0;0.5;1"
                values="3.6;8.4;3.6"
                dur="5.556s"
                repeatCount="indefinite"
                begin="-0.18s"
              />
            </circle>
            <animateTransform
              attributeName="transform"
              type="rotate"
              keyTimes="0;1"
              values="0;360"
              dur="5.556s"
              repeatCount="indefinite"
              begin="0s"
            />
          </g>
        </g>
        <g transform="translate(50 50)">
          <g>
            <circle cx="20" cy="0" r="5" fill="#e4ec9a">
              <animate
                attributeName="r"
                keyTimes="0;0.5;1"
                values="3.6;8.4;3.6"
                dur="2.778s"
                repeatCount="indefinite"
                begin="-0.144s"
              />
            </circle>
            <animateTransform
              attributeName="transform"
              type="rotate"
              keyTimes="0;1"
              values="0;360"
              dur="2.778s"
              repeatCount="indefinite"
              begin="-0.036s"
            />
          </g>
        </g>
        <g transform="translate(50 50)">
          <g>
            <circle cx="20" cy="0" r="5" fill="#d7e267">
              <animate
                attributeName="r"
                keyTimes="0;0.5;1"
                values="3.6;8.4;3.6"
                dur="1.852s"
                repeatCount="indefinite"
                begin="-0.108s"
              />
            </circle>
            <animateTransform
              attributeName="transform"
              type="rotate"
              keyTimes="0;1"
              values="0;360"
              dur="1.852s"
              repeatCount="indefinite"
              begin="-0.072s"
            />
          </g>
        </g>
        <g transform="translate(50 50)">
          <g>
            <circle cx="20" cy="0" r="5" fill="#c9d935">
              <animate
                attributeName="r"
                keyTimes="0;0.5;1"
                values="3.6;8.4;3.6"
                dur="1.389s"
                repeatCount="indefinite"
                begin="-0.072s"
              />
            </circle>
            <animateTransform
              attributeName="transform"
              type="rotate"
              keyTimes="0;1"
              values="0;360"
              dur="1.389s"
              repeatCount="indefinite"
              begin="-0.108s"
            />
          </g>
        </g>
        <g transform="translate(50 50)">
          <g>
            <circle cx="20" cy="0" r="5" fill="#bccf02">
              <animate
                attributeName="r"
                keyTimes="0;0.5;1"
                values="3.6;8.4;3.6"
                dur="1.111s"
                repeatCount="indefinite"
                begin="-0.036s"
              />
            </circle>
            <animateTransform
              attributeName="transform"
              type="rotate"
              keyTimes="0;1"
              values="0;360"
              dur="1.111s"
              repeatCount="indefinite"
              begin="-0.144s"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
