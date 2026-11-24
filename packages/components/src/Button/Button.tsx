import React from 'react';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner.js';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'large' | 'medium' | 'small';

export interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'ref'> {
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
  /**
   * Renders the button as a link (`<a href>`) with the same look, for actions that navigate.
   * Keeps native link behaviour (open in new tab, copy link, screen reader "link").
   */
  href?: string;
  /** Link target, only used together with `href`. */
  target?: React.HTMLAttributeAnchorTarget;
  /** Link rel, only used with `href`. Defaults to "noopener noreferrer" for target="_blank". */
  rel?: string;
}

/**
 * Primary UI component for user interaction.
 *
 * Supports three visual variants (Primary, Secondary, Tertiary), three sizes
 * (Large, Medium, Small), and optional leading/trailing icons. All styling
 * uses semantic design tokens — no hardcoded colors.
 */
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      children,
      variant = 'primary',
      size = 'large',
      disabled = false,
      fullWidth = false,
      leadingIcon,
      trailingIcon,
      loading = false,
      className,
      type = 'button',
      href,
      target,
      rel,
      'aria-busy': ariaBusy,
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || loading;
    const variantClass = `ckw-button--${variant}`;
    const sizeClass = `ckw-button--${size.toLowerCase()}`;
    const classes = [
      'ckw-button',
      variantClass,
      sizeClass,
      fullWidth ? 'ckw-button--full-width' : '',
      loading ? 'ckw-button--loading' : '',
      loading || leadingIcon ? 'ckw-button--has-leading-icon' : '',
      trailingIcon ? 'ckw-button--has-trailing-icon' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {loading ? (
          <span className="ckw-button__icon ckw-button__spinner" aria-hidden="true">
            <LoadingSpinner size={size === 'large' ? 24 : 20} />
          </span>
        ) : (
          leadingIcon && <span className="ckw-button__icon">{leadingIcon}</span>
        )}
        {children}
        {trailingIcon && <span className="ckw-button__icon">{trailingIcon}</span>}
      </>
    );

    if (href !== undefined) {
      const anchorProps = props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          {...anchorProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          href={isDisabled ? undefined : href}
          target={target}
          rel={target === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
          aria-disabled={isDisabled || undefined}
          aria-busy={loading ? true : ariaBusy}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        {...props}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        type={type}
        disabled={isDisabled}
        aria-busy={loading ? true : ariaBusy}
      >
        {content}
      </button>
    );
  },
);
