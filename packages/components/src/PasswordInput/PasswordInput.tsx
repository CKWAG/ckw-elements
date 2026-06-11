'use client';

import React from 'react';
import { IconViewOff, IconViewOn } from '@ckwag/elements-icons';
import { InputField } from '../InputField/InputField';
import type { InputFieldProps } from '../InputField/InputField';
import './PasswordInput.css';

export interface PasswordInputProps extends Omit<InputFieldProps, 'type' | 'icon'> {
  /** Controlled visibility state. When true, the password is shown as plain text. */
  visible?: boolean;
  /** Initial visibility state for uncontrolled usage. */
  defaultVisible?: boolean;
  /** Called whenever the visibility toggle requests a state change. */
  onVisibilityChange?: (visible: boolean) => void;
  /** Additional native button props for the visibility toggle. */
  visibilityToggleButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * Password Input component for secure password entry with a visibility toggle.
 *
 * Composes InputField so labels, errors, disabled state, native input props,
 * generated ids, and semantic token styling stay consistent with text inputs.
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      visible,
      defaultVisible = false,
      onVisibilityChange,
      visibilityToggleButtonProps,
      disabled = false,
      className,
      ...inputFieldProps
    },
    ref,
  ) {
    const [uncontrolledVisible, setUncontrolledVisible] = React.useState(defaultVisible);
    const isControlled = visible !== undefined;
    const isVisible = visible ?? uncontrolledVisible;
    const {
      className: toggleButtonClassName,
      'aria-label': toggleAriaLabel = 'Toggle password visibility',
      onClick: onToggleClick,
      onMouseDown: onToggleMouseDown,
      onPointerDown: onTogglePointerDown,
      ...toggleButtonProps
    } = visibilityToggleButtonProps ?? {};
    const rootClasses = ['ckw-password-input', className ?? ''].filter(Boolean).join(' ');
    const toggleClasses = ['ckw-password-input__toggle', toggleButtonClassName ?? '']
      .filter(Boolean)
      .join(' ');

    const handleVisibilityToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
      const nextVisible = !isVisible;

      if (!isControlled) {
        setUncontrolledVisible(nextVisible);
      }

      onVisibilityChange?.(nextVisible);
      onToggleClick?.(event);
    };

    const handleTogglePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onTogglePointerDown?.(event);
    };

    const handleToggleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onToggleMouseDown?.(event);
    };

    const visibilityIcon = isVisible ? (
      <IconViewOff size={20} aria-hidden="true" />
    ) : (
      <IconViewOn size={20} aria-hidden="true" />
    );

    return (
      <InputField
        {...inputFieldProps}
        ref={ref}
        className={rootClasses}
        disabled={disabled}
        type={isVisible ? 'text' : 'password'}
        icon={
          <button
            {...toggleButtonProps}
            className={toggleClasses}
            type="button"
            disabled={disabled}
            aria-label={toggleAriaLabel}
            aria-pressed={isVisible}
            onClick={handleVisibilityToggle}
            onPointerDown={handleTogglePointerDown}
            onMouseDown={handleToggleMouseDown}
          >
            <span className="ckw-password-input__toggle-icon" aria-hidden="true">
              {visibilityIcon}
            </span>
          </button>
        }
      />
    );
  },
);
