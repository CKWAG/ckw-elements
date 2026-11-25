'use client';

import React from 'react';
import { IconInformation, IconWarningCircle } from '@ckwag/elements-icons';
import '../InputField/InputField.css';
import './ChoiceGroup.css';

/** State a group passes down to its Checkbox or Radio children. */
export interface ChoiceGroupState {
  /** The whole group is disabled. */
  disabled: boolean;
  /** The group has an error; children get `aria-invalid` and the error look. */
  invalid: boolean;
}

export const ChoiceGroupContext = React.createContext<ChoiceGroupState | null>(null);

export interface ChoiceGroupBaseProps {
  /** Group label, usually the question ("Wie wohnen Sie?"). */
  label: React.ReactNode;
  /** Help text below the label. */
  description?: React.ReactNode;
  /** Error text below the options. A non-empty string triggers the error state. */
  errorText?: string;
  /** Shows "(optional)" next to the label. */
  optional?: boolean;
  /** Shows an info button next to the label. */
  showInfo?: boolean;
  /** Info button click handler. */
  onInfoClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Disables every option in the group. */
  disabled?: boolean;
  /** Id of the group element. Auto-generated when omitted. */
  id?: string;
  /** Additional CSS class names on the root element. */
  className?: string;
}

interface ChoiceGroupProps extends ChoiceGroupBaseProps {
  role: 'group' | 'radiogroup';
  required?: boolean;
  children: React.ReactNode;
}

/**
 * Shared layout of Checkbox Group and Radio Group: label row, description, options and
 * error text, with the Input Field label, help and error styles. Not exported.
 */
export function ChoiceGroup({
  role,
  label,
  description,
  errorText,
  optional = false,
  showInfo = false,
  onInfoClick,
  disabled = false,
  required,
  id,
  className,
  children,
}: ChoiceGroupProps) {
  const reactId = React.useId();
  const groupId = id ?? `ckw-choice-group-${reactId}`;
  const labelId = `${groupId}-label`;
  const hasError = Boolean(errorText);
  const descriptionId = description ? `${groupId}-description` : undefined;
  const errorId = hasError ? `${groupId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  const state = React.useMemo<ChoiceGroupState>(
    () => ({ disabled, invalid: hasError }),
    [disabled, hasError],
  );
  const rootClasses = [
    'ckw-input-field',
    'ckw-choice-group',
    hasError && 'ckw-input-field--error',
    disabled && 'ckw-input-field--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      id={groupId}
      role={role}
      className={rootClasses}
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      aria-required={role === 'radiogroup' && required ? true : undefined}
      aria-disabled={disabled || undefined}
    >
      <div className="ckw-input-field__label-row">
        <span className="ckw-input-field__label" id={labelId}>
          {label}
        </span>
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

      {description && (
        <p className="ckw-input-field__description" id={descriptionId}>
          {description}
        </p>
      )}

      <div className="ckw-choice-group__options">
        <ChoiceGroupContext.Provider value={state}>{children}</ChoiceGroupContext.Provider>
      </div>

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
