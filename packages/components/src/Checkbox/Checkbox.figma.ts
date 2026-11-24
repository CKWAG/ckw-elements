// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=2391-3196
// source=packages/components/src/Checkbox/Checkbox.tsx
// component=Checkbox
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label');
const checked = instance.getEnum('Checked', {
  False: '',
  True: ' defaultChecked',
  Indeterminate: ' defaultChecked="indeterminate"',
});
const description = instance.getBoolean('Show Description')
  ? instance.getString('Description')
  : '';
const isError = instance.getEnum('State', { Error: true });
const disabled = instance.getEnum('State', { Disabled: true });
const errorText =
  isError && instance.getBoolean('Show Error') ? instance.getString('Error Text') : '';

// Defaults (unchecked, enabled, no help or error text) are left out to keep the snippet short.
export default {
  example: figma.code`<Checkbox label="${label}"${checked ?? ''}${
    description ? ` description="${description}"` : ''
  }${errorText ? ` errorText="${errorText}"` : ''}${disabled ? ' disabled' : ''} />`,
  imports: ["import { Checkbox } from '@ckwag/elements';"],
  id: 'checkbox',
  metadata: {
    nestable: true,
  },
};
