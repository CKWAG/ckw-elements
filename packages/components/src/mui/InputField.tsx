import React from 'react';
import MuiTextField from '@mui/material/TextField';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { ThemeProvider } from '@mui/material/styles';
import { ckwTheme } from './theme';

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
  /** MUI sx prop for additional styling overrides. */
  sx?: MuiTextFieldProps['sx'];
}

/** CKW-themed MUI TextField with semantic token styling. */
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
  sx,
}: InputFieldProps) {
  const hasError = Boolean(errorText);

  const labelContent = (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-2xs)',
        paddingLeft: 'var(--spacing-2xs)',
        paddingRight: 'var(--spacing-2xs)',
        fontFamily: 'var(--font-family-brand), sans-serif',
        fontSize: 'var(--label-s-size)',
        lineHeight: 'var(--label-s-height)',
        fontWeight: 'var(--label-s-weight)',
        color: disabled ? 'var(--text-tertiary)' : 'var(--text-primary)',
      }}
    >
      {label}
      {optional && (
        <span
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'var(--caption-size)',
            lineHeight: 'var(--caption-height)',
            fontWeight: 'var(--caption-weight)',
          }}
        >
          (optional)
        </span>
      )}
      {showInfo && (
        <button
          type="button"
          onClick={onInfoClick}
          aria-label="More information"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <InfoIcon />
        </button>
      )}
    </span>
  );

  return (
    <ThemeProvider theme={ckwTheme}>
      <div
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-xs)',
        }}
      >
        {labelContent}
        <MuiTextField
          variant="outlined"
          fullWidth
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          error={hasError}
          helperText={
            hasError ? (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2xs)',
                  width: '100%',
                  color: 'var(--status-error-text)',
                }}
              >
                <WarningIcon />
                {errorText}
              </span>
            ) : undefined
          }
          slotProps={{
            input: {
              endAdornment: icon ? (
                <InputAdornment position="end">
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: disabled ? 'var(--text-tertiary)' : 'var(--text-primary)',
                    }}
                  >
                    {icon}
                  </span>
                </InputAdornment>
              ) : undefined,
            },
            formHelperText: {
              component: 'div',
            },
          }}
          sx={Array.isArray(sx) ? sx : sx ? [sx] : undefined}
        />
      </div>
    </ThemeProvider>
  );
}
