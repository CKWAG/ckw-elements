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
  /**
   * Shows the inline spinner in the leading slot and sets aria-busy. The button stays focusable
   * (aria-disabled instead of disabled) but ignores clicks, so users cannot submit twice.
   */
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
      'aria-disabled': ariaDisabled,
      onClick,
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
            <LoadingSpinner variant="inline" size={24} />
          </span>
        ) : (
          leadingIcon && <span className="ckw-button__icon">{leadingIcon}</span>
        )}
        {children}
        {trailingIcon && <span className="ckw-button__icon">{trailingIcon}</span>}
      </>
    );

    if (href !== undefined) {
      const { tabIndex, ...anchorProps } =
        props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      const anchorOnClick = onClick as unknown as
        React.MouseEventHandler<HTMLAnchorElement> | undefined;
      return (
        <a
          {...anchorProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          // Only `disabled` drops the href. While `loading` it stays, so setting
          // loading inside onClick does not cancel the navigation of that click.
          href={disabled ? undefined : href}
          role={disabled ? 'link' : undefined}
          tabIndex={isDisabled ? -1 : tabIndex}
          target={target}
          rel={target === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
          aria-disabled={isDisabled || ariaDisabled || anchorProps['aria-disabled']}
          aria-busy={loading ? true : ariaBusy}
          onClick={(event) => {
            // A link without href still dispatches clicks, a disabled button does not.
            if (isDisabled) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }
            anchorOnClick?.(event);
          }}
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
        disabled={disabled}
        aria-disabled={loading ? true : ariaDisabled}
        aria-busy={loading ? true : ariaBusy}
        onClick={(event) => {
          if (loading) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
      >
        {content}
      </button>
    );
  },
);
