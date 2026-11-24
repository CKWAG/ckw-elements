'use client';

import React from 'react';
import { ChoiceGroupContext } from '../ChoiceGroup/ChoiceGroup.js';
import '../InputField/InputField.css';
import './RadioGroup.css';

interface RadioProps {
  /** Shared name of all radios in the group (needed for native arrow-key navigation). */
  name: string;
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  checked: boolean;
  disabled?: boolean;
  required?: boolean;
  onSelect: (value: string) => void;
}

/**
 * One option of a RadioGroup: native `<input type="radio">` styled as a circle with a dot.
 * Internal, rendered by RadioGroup from its `options`.
 */
export function Radio({
  name,
  value,
  label,
  description,
  checked,
  disabled,
  required,
  onSelect,
}: RadioProps) {
  const group = React.useContext(ChoiceGroupContext);
  const reactId = React.useId();
  const inputId = `ckw-radio-${reactId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const isDisabled = Boolean(disabled || group?.disabled);
  const isInvalid = Boolean(group?.invalid);
  const rootClasses = [
    'ckw-radio',
    isInvalid && 'ckw-radio--error',
    isDisabled && 'ckw-radio--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      <span className="ckw-radio__control">
        <input
          id={inputId}
          type="radio"
          className="ckw-radio__circle"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onSelect(value)}
          disabled={isDisabled}
          required={required}
          aria-invalid={isInvalid || undefined}
          aria-describedby={descriptionId}
        />
        <span className="ckw-radio__dot" aria-hidden="true" />
      </span>
      <span className="ckw-radio__text">
        <label className="ckw-radio__label" htmlFor={inputId}>
          {label}
        </label>
        {description && (
          <span className="ckw-input-field__description ckw-radio__description" id={descriptionId}>
            {description}
          </span>
        )}
      </span>
    </div>
  );
}
