// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=110-481
// source=packages/components/src/InputField/InputField.tsx
// component=InputField
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label');
const placeholder = instance.getString('Placeholder');
const optional = instance.getBoolean('Show Optional');
const showInfo = instance.getBoolean('Show Info');
const showIcon = instance.getBoolean('Show Icon');
const prefix = instance.getBoolean('Show Prefix') ? instance.getString('Prefix') : '';
const suffix = instance.getBoolean('Show Suffix') ? instance.getString('Suffix') : '';
const isError = instance.getEnum('State', { Error: true });
const disabled = instance.getEnum('State', { Disabled: true });
const filled = instance.getEnum('Filled', { True: true });
const errorText =
  isError && instance.getBoolean('Show Error') ? instance.getString('Error Text') : '';
const value = filled ? instance.getString('Input') : '';
const icon = showIcon ? instance.getInstanceSwap('Icon') : undefined;
const iconCode =
  icon && icon.type === 'INSTANCE' && icon.hasCodeConnect()
    ? icon.executeTemplate().example
    : '<IconPlaceholder />';

export default {
  example: figma.code`<InputField label="${label}" placeholder="${placeholder}"${
    value ? ` defaultValue="${value}"` : ''
  }${prefix ? ` prefix="${prefix}"` : ''}${suffix ? ` suffix="${suffix}"` : ''}${optional ? ' optional' : ''}${showInfo ? ' showInfo' : ''}${
    errorText ? ` errorText="${errorText}"` : ''
  }${disabled ? ' disabled' : ''}${showIcon ? figma.code` icon={${iconCode}}` : ''} />`,
  imports: ["import { InputField } from '@ckwag/elements';"],
  id: 'input-field',
  metadata: {
    nestable: true,
  },
};
