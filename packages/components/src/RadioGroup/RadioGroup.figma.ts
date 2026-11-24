// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=2391-3578
// source=packages/components/src/RadioGroup/RadioGroup.tsx
// component=RadioGroup
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label');
const optional = instance.getBoolean('Show Optional');
const showInfo = instance.getBoolean('Show Info');
const description = instance.getBoolean('Show Description')
  ? instance.getString('Description')
  : '';
const errorText = instance.getEnum('State', { Error: true })
  ? instance.getString('Error Text')
  : '';
const disabled = instance.getEnum('State', { Disabled: true });

// The options are the nested Radio instances ("Option 1", "Option 2", …).
const toValue = (text: string) => text.toLowerCase().replace(/[^a-z0-9äöü]+/g, '-');
const radios = instance
  .findLayers((layer) => layer.type === 'INSTANCE' && layer.name.startsWith('Option'))
  .filter((layer) => layer.type === 'INSTANCE');
let selected = '';
const options = radios
  .map((radio) => {
    const text = radio.getString('Label');
    if (radio.getEnum('Checked', { True: true })) selected = toValue(text);
    return `\n    { value: '${toValue(text)}', label: '${text}' },`;
  })
  .join('');

export default {
  example: figma.code`<RadioGroup
  label="${label}"
  options={[${options}
  ]}${selected ? `\n  defaultValue="${selected}"` : ''}${
    description ? `\n  description="${description}"` : ''
  }${errorText ? `\n  errorText="${errorText}"` : ''}${optional ? '\n  optional' : ''}${
    showInfo ? '\n  showInfo' : ''
  }${disabled ? '\n  disabled' : ''}
/>`,
  imports: ["import { RadioGroup } from '@ckwag/elements';"],
  id: 'radio-group',
  metadata: {
    nestable: true,
  },
};
