'use client';

import React from 'react';
import { IconCheck, IconWarningCircle } from '@ckwag/elements-icons';
import { ChoiceGroupContext } from '../ChoiceGroup/ChoiceGroup.js';
import '../InputField/InputField.css';
import './Checkbox.css';

export type CheckboxChecked = boolean | 'indeterminate';

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'checked' | 'defaultChecked' | 'size' | 'children'
> {
  /** Visible label next to the box. Clicking it toggles the checkbox. */
  label?: React.ReactNode;
  /** Help text below the label. */
  description?: React.ReactNode;
  /** Error text below the label. A non-empty string triggers the error state. */
  errorText?: string;
  /** Checked state (controlled). `'indeterminate'` shows a dash, e.g. for a "select all" parent. */
  checked?: CheckboxChecked;
  /** Initial checked state (uncontrolled). */
  defaultChecked?: CheckboxChecked;
  /** Called with the new checked state when the user toggles the checkbox. */
  onCheckedChange?: (checked: boolean) => void;
}

/** Dash for the indeterminate state, same geometry as Icon/minus in the CKW Elements icon set. */
function MinusMark() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="2.833" y="11.167" width="18.333" height="1.667" fill="currentColor" />
    </svg>
  );
}

/**
 * Checkbox turns one option on or off, or picks several options from a list.
 *
 * Renders a native `<input type="checkbox">` (keyboard, forms and screen readers work
 * natively) styled with CKW semantic tokens. Inside a CheckboxGroup it takes the group's
 * disabled and error state.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    description,
    errorText,
    checked,
    defaultChecked,
    onCheckedChange,
    onChange,
    disabled,
    id,
    className,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...rest
  },
  ref,
) {
  const group = React.useContext(ChoiceGroupContext);
  const reactId = React.useId();
  const inputId = id ?? `ckw-checkbox-${reactId}`;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const isDisabled = Boolean(disabled || group?.disabled);
  const hasOwnError = Boolean(errorText);
  const isInvalid = hasOwnError || Boolean(group?.invalid);
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = hasOwnError ? `${inputId}-error` : undefined;
  const describedBy =
    [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  const isControlled = checked !== undefined;
  const indeterminate = isControlled
    ? checked === 'indeterminate'
    : defaultChecked === 'indeterminate';

  // The indeterminate state only exists as a DOM property. For uncontrolled checkboxes it is
  // set once; the browser clears it on the first click, like any native checkbox.
  React.useEffect(() => {
    if (inputRef.current && (isControlled || indeterminate)) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, isControlled]);

  const setRefs = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // The browser clears `indeterminate` on click. A controlled parent owns that state, so
    // restore it here; if the parent changes it, the effect above applies the new value.
    if (isControlled) event.target.indeterminate = indeterminate;
    onChange?.(event);
    onCheckedChange?.(event.target.checked);
  };

  const rootClasses = [
    'ckw-checkbox',
    isInvalid && 'ckw-checkbox--error',
    isDisabled && 'ckw-checkbox--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      <span className="ckw-checkbox__control">
        <input
          {...rest}
          ref={setRefs}
          id={inputId}
          type="checkbox"
          className="ckw-checkbox__box"
          checked={isControlled ? checked === true : undefined}
          defaultChecked={isControlled ? undefined : defaultChecked === true}
          onChange={handleChange}
          disabled={isDisabled}
          aria-invalid={isInvalid ? true : ariaInvalid}
          aria-describedby={describedBy}
        />
        <span className="ckw-checkbox__mark ckw-checkbox__mark--check" aria-hidden="true">
          <IconCheck size={16} />
        </span>
        <span className="ckw-checkbox__mark ckw-checkbox__mark--minus" aria-hidden="true">
          <MinusMark />
        </span>
      </span>

      {(label || description || hasOwnError) && (
        <span className="ckw-checkbox__text">
          {label && (
            <label className="ckw-checkbox__label" htmlFor={inputId}>
              {label}
            </label>
          )}
          {description && (
            <span
              className="ckw-input-field__description ckw-checkbox__description"
              id={descriptionId}
            >
              {description}
            </span>
          )}
          {hasOwnError && (
            <span className="ckw-input-field__error ckw-checkbox__error" id={errorId}>
              <span className="ckw-input-field__error-icon">
                <IconWarningCircle size={16} />
              </span>
              <span className="ckw-input-field__error-text">{errorText}</span>
            </span>
          )}
        </span>
      )}
    </div>
  );
});
