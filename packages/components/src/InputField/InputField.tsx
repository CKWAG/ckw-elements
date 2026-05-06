import React from 'react';
import './InputField.css';

export type InputFieldState = 'Default' | 'Hover' | 'Active' | 'Error' | 'Disabled';

interface InputFieldProps {
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
 * Warning circle icon for error messages (16×16).
 * @internal
 */
function WarningIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1.333A6.667 6.667 0 1 0 8 14.667 6.667 6.667 0 0 0 8 1.333ZM7.333 5.333a.667.667 0 0 1 1.334 0v2.334a.667.667 0 0 1-1.334 0V5.333ZM8 10a.667.667 0 1 0 0 1.333A.667.667 0 0 0 8 10Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Info circle icon (18×18).
 * @internal
 */
function InfoIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66667 12C3.66667 7.39762 7.39762 3.66667 12 3.66667C16.6023 3.66667 20.3333 7.39762 20.3333 12C20.3333 16.6023 16.6023 20.3333 12 20.3333C7.39762 20.3333 3.66667 16.6023 3.66667 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12.8333 6.16667V7.83333H11.1667V6.16667H12.8333ZM11.1667 11.1667H9.5V9.5H12.8333V15.3333H14.5V17H9.5V15.3333H11.1667V11.1667Z"
        fill="currentColor"
      />
    </svg>
  );
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
  const errorId = hasError ? `ckw-input-error-${React.useId()}` : undefined;
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
            <InfoIcon />
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
            <WarningIcon />
          </span>
          <span className="ckw-input-field__error-text">{errorText}</span>
        </div>
      )}
    </div>
  );
}
