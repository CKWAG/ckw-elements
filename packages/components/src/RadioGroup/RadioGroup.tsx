'use client';

import React from 'react';
import { ChoiceGroup } from '../ChoiceGroup/ChoiceGroup.js';
import type { ChoiceGroupBaseProps } from '../ChoiceGroup/ChoiceGroup.js';
import { Radio } from './Radio.js';

export interface RadioGroupOption {
  /** Value submitted with the form and passed to onValueChange. */
  value: string;
  /** Visible text of the option. */
  label: React.ReactNode;
  /** Help text below the option label. */
  description?: React.ReactNode;
  /** Option cannot be selected. */
  disabled?: boolean;
}

export interface RadioGroupProps extends ChoiceGroupBaseProps {
  /** Options shown as radios, top to bottom. */
  options: RadioGroupOption[];
  /** Selected value (controlled). */
  value?: string;
  /** Initially selected value (uncontrolled). */
  defaultValue?: string;
  /** Called with the value of the option the user picks. */
  onValueChange?: (value: string) => void;
  /** Form field name shared by all radios. Auto-generated when omitted. */
  name?: string;
  /** One option must be chosen for form validation. */
  required?: boolean;
}

/**
 * RadioGroup lets users pick exactly one option from a short list.
 *
 * Native `<input type="radio">` elements with one shared name inside `role="radiogroup"`,
 * labelled by the group label: Tab moves into the group, the arrow keys move and select,
 * like the WAI-ARIA radio group pattern. Label, help and error text match Input Field.
 */
export function RadioGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  required,
  ...groupProps
}: RadioGroupProps) {
  const reactId = React.useId();
  const groupName = name ?? `ckw-radio-group-${reactId}`;
  const [innerValue, setInnerValue] = React.useState(defaultValue);
  const selected = value !== undefined ? value : innerValue;

  const handleSelect = (next: string) => {
    if (value === undefined) setInnerValue(next);
    onValueChange?.(next);
  };

  return (
    <ChoiceGroup role="radiogroup" required={required} {...groupProps}>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={groupName}
          value={option.value}
          label={option.label}
          description={option.description}
          checked={selected === option.value}
          disabled={option.disabled}
          required={required}
          onSelect={handleSelect}
        />
      ))}
    </ChoiceGroup>
  );
}
