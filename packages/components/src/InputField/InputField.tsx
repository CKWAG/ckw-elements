import React from 'react';
import { IconInformation, IconWarningCircle } from '@ckw-elements/icons';
import './InputField.css';

export type InputFieldState = 'Default' | 'Hover' | 'Active' | 'Error' | 'Disabled';

export interface InputFieldProps {
  /** Label text above the input. */
  label?: string;
  /** Placeholder text shown when empty. */
  placeholder?: string;
  /** Current input value. */
  value?: string;
  /** Change handler. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Focus handler. */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /** Blur handler. */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Whether the field is disabled. */
  disabled?: boolean;
  /** Whether the field is optional (shows "(optional)" next to label). */
  optional?: boolean;
  /** Error text shown below the input. Pass a non-empty string to trigger the error state. */
  errorText?: string;
  /** Trailing icon inside the input. */
  icon?: React.ReactNode;
  /** Info icon next to the label. */
  showInfo?: boolean;
  /** Info icon click handler. */
  onInfoClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** HTML input type attribute. */
  type?: string;
  /** Additional CSS class names on the root element. */
  className?: string;
}

/**
 * Input Field component for text-based data entry.
 *
 * Supports Default, Hover, Active, Error, and Disabled states.
 * The component is a native `<input>` with semantic token styling.
 * Hover and Active states are handled via CSS pseudo-classes in real usage;
 * the explicit state prop is primarily for Storybook documentation.
 */
export function InputField({
  label = 'Label',
  placeholder = 'Placeholder',
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  optional = false,
  errorText,
  icon,
  showInfo = false,
  onInfoClick,
  type = 'text',
  className,
}: InputFieldProps) {
  const hasError = Boolean(errorText);
  const generatedErrorId = React.useId();
  const errorId = hasError ? `ckw-input-error-${generatedErrorId}` : undefined;
  const rootClasses = [
    'ckw-input-field',
    hasError && 'ckw-input-field--error',
    disabled && 'ckw-input-field--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      {/* Label row */}
      <div className="ckw-input-field__label-row">
        <span className="ckw-input-field__label">{label}</span>
        {optional && <span className="ckw-input-field__optional">(optional)</span>}
        {showInfo && (
          <button
            type="button"
            className="ckw-input-field__info-icon"
            onClick={onInfoClick}
            aria-label="More information"
          >
            <IconInformation size={18} />
          </button>
        )}
      </div>

      {/* Input wrapper — provides hover outline */}
      <div className="ckw-input-field__outer">
        <div className="ckw-input-field__inner">
          <input
            className="ckw-input-field__input"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={errorId}
          />
          {icon && <span className="ckw-input-field__icon">{icon}</span>}
        </div>
      </div>

      {/* Error row */}
      {hasError && (
        <div className="ckw-input-field__error" id={errorId}>
          <span className="ckw-input-field__error-icon">
            <IconWarningCircle size={16} />
          </span>
          <span className="ckw-input-field__error-text">{errorText}</span>
        </div>
      )}
    </div>
  );
}
