import React from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import type { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
import { ThemeProvider } from '@mui/material/styles';
import { ckwTheme } from './theme';

export type SegmentedControlType = 'Default' | 'Fill';

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
  /** The value of the currently active segment. */
  activeValue: string;
  /** Called when the user selects a different segment. */
  onChange?: (value: string) => void;
  /** Layout type. Default = auto-width segments; Fill = equal-width stretch. */
  type?: SegmentedControlType;
  /** Additional CSS class names on the outer container. */
  className?: string;
  /** MUI sx prop for additional styling overrides. */
  sx?: ToggleButtonGroupProps['sx'];
}

/** CKW-themed MUI SegmentedControl built on ToggleButtonGroup with semantic token styling. */
export function SegmentedControl({
  segments,
  activeValue,
  onChange,
  type = 'Default',
  className,
  sx,
}: SegmentedControlProps) {
  const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null) {
      onChange?.(newValue);
    }
  };

  return (
    <ThemeProvider theme={ckwTheme}>
      <ToggleButtonGroup
        value={activeValue}
        exclusive
        onChange={handleChange}
        className={className}
        sx={{
          display: 'inline-flex',
          flexDirection: 'row',
          width: type === 'Fill' ? '100%' : undefined,
          padding: 'var(--spacing-2xs)',
          gap: 'var(--spacing-3xs)',
          borderRadius: '99999px',
          backgroundColor: 'var(--background-control)',
          border: '1px solid var(--border-soft)',
          '& .MuiToggleButtonGroup-grouped': {
            border: '1px solid transparent',
            borderRadius: '99999px !important',
            height: 'var(--spacing-2xl)',
            padding: 'var(--spacing-2xs) var(--spacing-m)',
            flex: type === 'Fill' ? 1 : undefined,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-2xs)',
            fontFamily: 'var(--font-family-brand), sans-serif',
            fontSize: 'var(--label-m-size)',
            lineHeight: 'var(--label-m-height)',
            fontWeight: 'var(--label-m-weight)',
            color: 'var(--text-secondary)',
            textTransform: 'none',
            backgroundColor: 'transparent',
            transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
            '&:hover': {
              backgroundColor: 'var(--background-hover)',
            },
            '&.Mui-selected': {
              backgroundColor: 'var(--background-active)',
              borderColor: 'var(--border-active)',
              color: 'var(--text-on-interactive-secondary)',
              '&:hover': {
                backgroundColor: 'var(--background-active)',
              },
            },
            '&.Mui-disabled': {
              opacity: 0.4,
              pointerEvents: 'none',
            },
          },
          ...sx,
        }}
      >
        {segments.map((segment) => (
          <ToggleButton key={segment.value} value={segment.value} disableRipple>
            {segment.icon && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  width: '24px',
                  height: '24px',
                  flexShrink: 0,
                }}
              >
                {segment.icon}
              </span>
            )}
            {segment.label && <span>{segment.label}</span>}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}
