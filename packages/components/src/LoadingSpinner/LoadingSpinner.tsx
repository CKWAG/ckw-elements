import React from 'react';
import './LoadingSpinner.css';

export type LoadingSpinnerVariant = 'brand' | 'inline';

export interface LoadingSpinnerProps {
  /**
   * `brand` is the official CKW spinner (orbiting dots) for content and pages.
   * `inline` is a single rotating line in the current text colour for components such as Button.
   */
  variant?: LoadingSpinnerVariant;
  /** Width and height of the spinner in pixels. Defaults to 20 (brand) or 24 (inline). */
  size?: number;
  /** Additional CSS class name. */
  className?: string;
}

let idCounter = 0;

/**
 * Loading spinner in two variants.
 *
 * `brand` (default) shows orbiting dots in CKW brand green shades and must not be recoloured.
 * `inline` is a 120° line (1.67px stroke, round caps) in `currentColor` that rotates 360° in
 * 800 ms, linear, endless (2400 ms with `prefers-reduced-motion`). It matches the Inline
 * Spinner component in Figma.
 */
export function LoadingSpinner({ variant = 'brand', size, className }: LoadingSpinnerProps) {
  if (variant === 'inline') {
    return <InlineSpinner size={size ?? 24} className={className} />;
  }
  return <BrandSpinner size={size ?? 20} className={className} />;
}

interface SpinnerImplProps {
  size: number;
  className?: string;
}

/** Single rotating line in the current text colour. Path exported from the Figma component. */
function InlineSpinner({ size, className }: SpinnerImplProps) {
  const classes = ['ckw-loading-spinner--inline', className].filter(Boolean).join(' ');
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      role="presentation"
      style={{ display: 'block' }}
    >
      <path
        d="M12 2.00034C19.698 2.00034 24.5092 10.3337 20.6602 17.0003C20.43 17.3987 19.92 17.5351 19.5215 17.305C19.1231 17.0748 18.9867 16.5648 19.2168 16.1664C22.4241 10.6109 18.4149 3.66635 12 3.66635C11.5398 3.66635 11.167 3.29359 11.167 2.83334C11.167 2.3731 11.5398 2.00034 12 2.00034Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Official CKW spinner with orbiting dots. Each instance gets a unique filter ID. */
function BrandSpinner({ size, className }: SpinnerImplProps) {
  const [filterId] = React.useState(() => `ckw-spinner-filter-${++idCounter}`);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      viewBox="15 15 70 70"
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
