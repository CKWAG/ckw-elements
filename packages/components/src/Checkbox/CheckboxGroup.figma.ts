// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=2391-3683
// source=packages/components/src/Checkbox/CheckboxGroup.tsx
// component=CheckboxGroup
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

// The options are the nested Checkbox instances ("Option 1", "Option 2", …).
const options = instance
  .findLayers((layer) => layer.type === 'INSTANCE' && layer.name.startsWith('Option'))
  .filter((layer) => layer.type === 'INSTANCE');
const children = options
  .map((option) => {
    const checked = option.getEnum('Checked', {
      False: '',
      True: ' defaultChecked',
      Indeterminate: ' defaultChecked="indeterminate"',
    });
    const optionDescription = option.getBoolean('Show Description')
      ? option.getString('Description')
      : '';
    const optionError =
      option.getEnum('State', { Error: true }) && option.getBoolean('Show Error')
        ? option.getString('Error Text')
        : '';
    const optionDisabled = option.getEnum('State', { Disabled: true });
    return `\n  <Checkbox label="${option.getString('Label')}"${checked ?? ''}${
      optionDescription ? ` description="${optionDescription}"` : ''
    }${optionError ? ` errorText="${optionError}"` : ''}${optionDisabled ? ' disabled' : ''} />`;
  })
  .join('');

export default {
  example: figma.code`<CheckboxGroup label="${label}"${
    description ? ` description="${description}"` : ''
  }${errorText ? ` errorText="${errorText}"` : ''}${optional ? ' optional' : ''}${
    showInfo ? ' showInfo' : ''
  }${disabled ? ' disabled' : ''}>${children}
</CheckboxGroup>`,
  imports: ["import { Checkbox, CheckboxGroup } from '@ckwag/elements';"],
  id: 'checkbox-group',
  metadata: {
    nestable: true,
  },
};
