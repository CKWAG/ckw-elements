'use client';

import React from 'react';
import { ChoiceGroup } from '../ChoiceGroup/ChoiceGroup.js';
import type { ChoiceGroupBaseProps } from '../ChoiceGroup/ChoiceGroup.js';

export interface CheckboxGroupProps extends ChoiceGroupBaseProps {
  /** The Checkbox options of the group. */
  children: React.ReactNode;
}

/**
 * CheckboxGroup puts several Checkboxes under one question, with optional help text and one
 * error text for the whole group (`role="group"` labelled by the question). Its `disabled` and
 * `errorText` reach every Checkbox inside.
 */
export function CheckboxGroup({ children, ...props }: CheckboxGroupProps) {
  return (
    <ChoiceGroup role="group" {...props}>
      {children}
    </ChoiceGroup>
  );
}
