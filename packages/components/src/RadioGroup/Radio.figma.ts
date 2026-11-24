// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=2391-3264
// source=packages/components/src/RadioGroup/RadioGroup.tsx
// component=RadioGroup
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

// A single Radio only exists inside a Radio Group: in code it is one entry of `options`.
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const description = instance.getBoolean('Show Description')
  ? instance.getString('Description')
  : '';
const disabled = instance.getEnum('State', { Disabled: true });
const value = label.toLowerCase().replace(/[^a-z0-9äöü]+/g, '-');

export default {
  example: figma.code`{ value: '${value}', label: '${label}'${
    description ? `, description: '${description}'` : ''
  }${disabled ? ', disabled: true' : ''} }`,
  imports: ["import type { RadioGroupOption } from '@ckwag/elements';"],
  id: 'radio',
  metadata: {
    nestable: true,
  },
};
