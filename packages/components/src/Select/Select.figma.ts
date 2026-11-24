// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=1510-449
// source=packages/components/src/Select/Select.tsx
// component=Select
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label');
const filled = instance.getEnum('Filled', { True: true });
const item = filled ? instance.getString('Item') : '';
const placeholder = instance.getString('Placeholder');
const optional = instance.getBoolean('Show Optional');
const showInfo = instance.getBoolean('Show Info');
const description = instance.getBoolean('Show Description')
  ? instance.getString('Description')
  : '';
const isError = instance.getEnum('State', { Error: true });
const disabled = instance.getEnum('State', { Disabled: true });
const errorText =
  isError && instance.getBoolean('Show Error') ? instance.getString('Error Text') : '';
const value = item ? item.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';

export default {
  example: figma.code`<Select
  label="${label}"
  options={options}${value ? `\n  defaultValue="${value}"` : ''}${
    placeholder && placeholder !== 'Bitte wählen' ? `\n  placeholder="${placeholder}"` : ''
  }${description ? `\n  description="${description}"` : ''}${
    errorText ? `\n  errorText="${errorText}"` : ''
  }${optional ? '\n  optional' : ''}${showInfo ? '\n  showInfo' : ''}${disabled ? '\n  disabled' : ''}
/>`,
  imports: ["import { Select } from '@ckwag/elements';"],
  id: 'select',
  metadata: {
    nestable: true,
  },
};
