import React from 'react';
import './Button.css';

export type ButtonType = 'Primary' | 'Secondary' | 'Tertiary';
export type ButtonSize = 'Large' | 'Medium' | 'Small';

export interface ButtonProps {
  /** The visible button label. */
  children: React.ReactNode;
  /** Visual style variant. */
  type?: ButtonType;
  /** Size of the button. */
  size?: ButtonSize;
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Stretch to fill the parent width. */
  fullWidth?: boolean;
  /** Icon rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: React.ReactNode;
  /** Click handler. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** HTML button type attribute. */
  htmlType?: 'button' | 'submit' | 'reset';
  /** Additional CSS class names. */
  className?: string;
}

/**
 * Primary UI component for user interaction.
 *
 * Supports three visual types (Primary, Secondary, Tertiary), three sizes
 * (Large, Medium, Small), and optional leading/trailing icons. All styling
 * uses semantic design tokens — no hardcoded colors.
 */
export function Button({
  children,
  type = 'Primary',
  size = 'Large',
  disabled = false,
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  onClick,
  htmlType = 'button',
  className,
}: ButtonProps) {
  const typeClass = `ckw-button--${type.toLowerCase()}`;
  const sizeClass = `ckw-button--${size.toLowerCase()}`;
  const classes = [
    'ckw-button',
    typeClass,
    sizeClass,
    fullWidth ? 'ckw-button--full-width' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} type={htmlType} disabled={disabled} onClick={onClick}>
      {leadingIcon && <span className="ckw-button__icon">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className="ckw-button__icon">{trailingIcon}</span>}
    </button>
  );
}
