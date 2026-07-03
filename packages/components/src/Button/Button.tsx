import React from 'react';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner.js';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'Large' | 'Medium' | 'Small';

export interface ButtonProps extends React.ComponentProps<'button'> {
  /** The visible button label. */
  children: React.ReactNode;
  /** Visual style variant. */
  variant?: ButtonVariant;
  /** Size of the button. */
  size?: ButtonSize;
  /** Stretch to fill the parent width. */
  fullWidth?: boolean;
  /** Icon rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: React.ReactNode;
  /** Shows a spinner in the leading slot, sets aria-busy, and disables interaction. */
  loading?: boolean;
}

/**
 * Primary UI component for user interaction.
 *
 * Supports three visual variants (Primary, Secondary, Tertiary), three sizes
 * (Large, Medium, Small), and optional leading/trailing icons. All styling
 * uses semantic design tokens — no hardcoded colors.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = 'primary',
    size = 'Large',
    disabled = false,
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    loading = false,
    className,
    type = 'button',
    'aria-busy': ariaBusy,
    ...props
  },
  ref,
) {
  const variantClass = `ckw-button--${variant}`;
  const sizeClass = `ckw-button--${size.toLowerCase()}`;
  const classes = [
    'ckw-button',
    variantClass,
    sizeClass,
    fullWidth ? 'ckw-button--full-width' : '',
    loading ? 'ckw-button--loading' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...props}
      ref={ref}
      className={classes}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading ? true : ariaBusy}
    >
      {loading ? (
        <span className="ckw-button__icon ckw-button__spinner" aria-hidden="true">
          <LoadingSpinner size={20} />
        </span>
      ) : (
        leadingIcon && <span className="ckw-button__icon">{leadingIcon}</span>
      )}
      {children}
      {trailingIcon && <span className="ckw-button__icon">{trailingIcon}</span>}
    </button>
  );
});
