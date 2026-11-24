// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=2338-182
// source=packages/components/src/PasswordInput/PasswordInput.tsx
// component=PasswordInput
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

// Visibility is runtime state in code; a visible password in Figma maps to defaultVisible.
const visible = instance.getEnum('Visible', { True: true });
const field = instance.findInstance('Input Field');
const hasField = field.type === 'INSTANCE';

const label = hasField ? field.getString('Label') : 'Passwort';
const placeholder = hasField ? field.getString('Placeholder') : '';
const optional = hasField && field.getBoolean('Show Optional');
const showInfo = hasField && field.getBoolean('Show Info');
const isError = hasField && field.getEnum('State', { Error: true });
const disabled = hasField && field.getEnum('State', { Disabled: true });
const errorText =
  isError && hasField && field.getBoolean('Show Error') ? field.getString('Error Text') : '';

export default {
  example: figma.code`<PasswordInput label="${label}"${
    placeholder ? ` placeholder="${placeholder}"` : ''
  }${optional ? ' optional' : ''}${showInfo ? ' showInfo' : ''}${
    errorText ? ` errorText="${errorText}"` : ''
  }${disabled ? ' disabled' : ''}${visible ? ' defaultVisible' : ''} />`,
  imports: ["import { PasswordInput } from '@ckwag/elements';"],
  id: 'password-input',
  metadata: {
    nestable: true,
  },
};
