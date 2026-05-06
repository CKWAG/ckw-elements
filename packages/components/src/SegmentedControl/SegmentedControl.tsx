import React from 'react';
import './SegmentedControl.css';

export type SegmentedControlType = 'Default' | 'Fill';
export type SegmentedControlContentMode = 'label' | 'icon-label' | 'icon-compact';

interface Segment {
  /** Unique value identifying this segment. */
  value: string;
  /** Visible label text. */
  label?: string;
  /** Optional icon (24×24 SVG recommended). */
  icon?: React.ReactNode;
}

interface SegmentedControlProps {
  /** Array of segments to render. Minimum 2. */
  segments: Segment[];
  /** The `value` of the currently active segment. */
  activeValue: string;
  /** Called when the user selects a different segment. */
  onChange?: (value: string) => void;
  /** Layout type. Default = auto-width segments; Fill = equal-width stretch. */
  type?: SegmentedControlType;
  /**
   * Content display mode:
   * - `label` — label only (default)
   * - `icon-label` — icon + label on all segments
   * - `icon-compact` — active shows icon + label, inactive show icon only;
   *   uses CSS grid `0fr → 1fr` for smooth label animation.
   */
  contentMode?: SegmentedControlContentMode;
  /** Additional CSS class names on the outer container. */
  className?: string;
}

// ---

/**
 * Segmented Control allows users to switch between related options,
 * views, or states within the same context.
 *
 * Features a sliding indicator that smoothly animates between segments.
 * Supports three content modes: label-only, icon + label, and icon-compact.
 * In icon-compact mode, each segment uses CSS grid with `0fr → 1fr` column
 * transitions to animate the label width — no hidden measurer needed.
 * The indicator is positioned via offsetLeft/offsetWidth in a useLayoutEffect.
 * Two layout types: Default (auto-width) and Fill (equal-width stretch).
 * All styling uses semantic design tokens.
 */
export function SegmentedControl({
  segments,
  activeValue,
  onChange,
  type = 'Default',
  contentMode = 'label',
  className,
}: SegmentedControlProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const segmentRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

  const [indicator, setIndicator] = React.useState<{
    left: number;
    width: number;
  } | null>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const isCompact = contentMode === 'icon-compact';

  // Stable key so effects don't re-fire on new array references.
  const segmentsKey = segments.map((s) => `${s.value}:${s.label ?? ''}`).join('|');

  // --- Indicator positioning (all modes) ---

  const updateIndicator = React.useCallback(() => {
    const container = containerRef.current;
    const activeEl = segmentRefs.current.get(activeValue);
    if (!container || !activeEl) {
      setIndicator(null);
      return;
    }
    const cRect = container.getBoundingClientRect();
    const aRect = activeEl.getBoundingClientRect();
    setIndicator({ left: aRect.left - cRect.left, width: aRect.width });
  }, [activeValue]);

  // Position on mount + when active changes
  React.useLayoutEffect(() => {
    updateIndicator();

    if (!hasAnimated) {
      requestAnimationFrame(() => setHasAnimated(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeValue, segmentsKey, type, contentMode, hasAnimated]);

  // For compact mode: the grid transition changes segment widths over 250ms.
  // We need to keep re-measuring the indicator during the transition so it
  // tracks the active segment's position as it expands/collapses.
  React.useEffect(() => {
    if (!isCompact || !hasAnimated) return;

    let frameId: number;
    const start = performance.now();
    const duration = 280; // slightly longer than 250ms transition to be safe

    const tick = () => {
      updateIndicator();
      if (performance.now() - start < duration) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isCompact, hasAnimated, activeValue, updateIndicator]);

  // --- Render ---

  const classes = [
    'ckw-segmented-control',
    isCompact ? 'ckw-segmented-control--compact' : '',
    type === 'Fill' ? 'ckw-segmented-control--fill' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="tablist" ref={containerRef}>
      {/* Sliding indicator */}
      {indicator && (
        <div
          className={[
            'ckw-segmented-control__indicator',
            hasAnimated ? 'ckw-segmented-control__indicator--animated' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            transform: `translateX(${indicator.left}px)`,
            width: `${indicator.width}px`,
          }}
        />
      )}

      {segments.map((segment) => {
        const isActive = segment.value === activeValue;
        const showIcon = contentMode === 'icon-label' || isCompact;
        const showLabel = contentMode === 'label' || contentMode === 'icon-label' || isCompact;

        const segmentClasses = [
          'ckw-segmented-control__segment',
          isActive ? 'ckw-segmented-control__segment--active' : '',
          isCompact ? 'ckw-segmented-control__segment--compact' : '',
        ]
          .filter(Boolean)
          .join(' ');

        const labelClasses = [
          'ckw-segmented-control__label',
          isCompact ? 'ckw-segmented-control__label--compact' : '',
          isCompact && !isActive ? 'ckw-segmented-control__label--faded' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={segment.value}
            ref={(el) => {
              if (el) {
                segmentRefs.current.set(segment.value, el);
              } else {
                segmentRefs.current.delete(segment.value);
              }
            }}
            className={segmentClasses}
            role="tab"
            aria-selected={isActive}
            aria-label={segment.label}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange?.(segment.value)}
          >
            {isCompact ? (
              /* Compact: inner wrapper so icon+label stay grouped for centering */
              <span className="ckw-segmented-control__compact-inner">
                {segment.icon && (
                  <span className="ckw-segmented-control__icon">{segment.icon}</span>
                )}
                {segment.label && <span className={labelClasses}>{segment.label}</span>}
              </span>
            ) : (
              <>
                {showIcon && segment.icon && (
                  <span className="ckw-segmented-control__icon">{segment.icon}</span>
                )}
                {showLabel && segment.label && (
                  <span className={labelClasses}>{segment.label}</span>
                )}
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
