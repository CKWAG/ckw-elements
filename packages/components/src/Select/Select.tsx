'use client';

import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import {
  IconCheck,
  IconChevronDown,
  IconInformation,
  IconWarningCircle,
} from '@ckwag/elements-icons';
import '../InputField/InputField.css';
import './Select.css';

export interface SelectOption {
  /** Value submitted with the form and passed to onValueChange. */
  value: string;
  /** Visible text of the option. */
  label: string;
  /** Option cannot be selected. */
  disabled?: boolean;
}

export interface SelectProps {
  /** Label text above the field. */
  label: string;
  /** Options shown in the list. */
  options: SelectOption[];
  /** Selected value (controlled). */
  value?: string;
  /** Initially selected value (uncontrolled). */
  defaultValue?: string;
  /** Called when the user picks an option. */
  onValueChange?: (value: string) => void;
  /** Text shown while nothing is selected. */
  placeholder?: string;
  /** Help text shown below the field. */
  description?: React.ReactNode;
  /** Error text shown below the field. A non-empty string triggers the error state. */
  errorText?: string;
  /** Shows "(optional)" next to the label. */
  optional?: boolean;
  /** Shows an info button next to the label. */
  showInfo?: boolean;
  /** Info button click handler. */
  onInfoClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Disables the whole field. */
  disabled?: boolean;
  /** Marks the field as required for form validation. */
  required?: boolean;
  /** Form field name; renders a hidden native select for form submission. */
  name?: string;
  /** Id of the trigger, wired to the label. Auto-generated when omitted. */
  id?: string;
  /** Opens the list initially (uncontrolled). */
  defaultOpen?: boolean;
  /** Controlled open state of the list. */
  open?: boolean;
  /** Called when the list opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Additional CSS class names on the root element. */
  className?: string;
}

/**
 * Select lets users pick one option from a list.
 *
 * Built on the Radix Select primitive for keyboard support, focus handling,
 * typeahead and screen reader semantics; styled with CKW semantic tokens and
 * sharing label, field, description and error styles with Input Field.
 */
export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    label,
    options,
    value,
    defaultValue,
    onValueChange,
    placeholder = 'Bitte wählen',
    description,
    errorText,
    optional = false,
    showInfo = false,
    onInfoClick,
    disabled = false,
    required,
    name,
    id,
    defaultOpen,
    open,
    onOpenChange,
    className,
  },
  ref,
) {
  const reactId = React.useId();
  const triggerId = id ?? `ckw-select-${reactId}`;
  const hasError = Boolean(errorText);
  const descriptionId = description ? `ckw-select-description-${reactId}` : undefined;
  const errorId = hasError ? `ckw-select-error-${reactId}` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  const rootClasses = [
    'ckw-input-field',
    'ckw-select',
    hasError && 'ckw-input-field--error',
    disabled && 'ckw-input-field--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      <div className="ckw-input-field__label-row">
        <label className="ckw-input-field__label" htmlFor={triggerId}>
          {label}
        </label>
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

      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        disabled={disabled}
        required={required}
        name={name}
      >
        <div className="ckw-input-field__outer">
          <SelectPrimitive.Trigger
            ref={ref}
            id={triggerId}
            className="ckw-input-field__inner ckw-select__trigger"
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
          >
            <span className="ckw-select__value">
              <SelectPrimitive.Value placeholder={placeholder} />
            </span>
            <SelectPrimitive.Icon className="ckw-select__chevron">
              <IconChevronDown size={20} aria-hidden="true" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
        </div>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="ckw-select__content"
            position="popper"
            side="bottom"
            align="start"
            sideOffset={8}
          >
            <SelectPrimitive.Viewport className="ckw-select__viewport">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="ckw-select__item"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="ckw-select__check">
                    <IconCheck size={20} aria-hidden="true" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {description && (
        <p className="ckw-input-field__description" id={descriptionId}>
          {description}
        </p>
      )}

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
});
