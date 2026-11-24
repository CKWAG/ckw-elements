// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=2391-394
// source=packages/components/src/KeyValueList/KeyValueList.tsx
// component=KeyValueList
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

const layout = instance.getEnum('Layout', {
  Inline: 'inline',
  Stacked: 'stacked',
});
// Rows live in the Items slot; each Key-Value Item renders its own template.
const items = instance.getSlot('Items');
const totalLayer = instance.getBoolean('Show Total') ? instance.findInstance('Total') : null;
const total =
  totalLayer && totalLayer.type === 'INSTANCE' ? totalLayer.executeTemplate().example : '';

// Default layout (inline) is left out to keep the snippet short.
const layoutProp = layout && layout !== 'inline' ? ` layout="${layout}"` : '';

export default {
  example: figma.code`<KeyValueList${layoutProp}>
  ${items}${total ? '\n  ' : ''}${total}
</KeyValueList>`,
  imports: ["import { KeyValueList } from '@ckwag/elements';"],
  id: 'key-value-list',
  metadata: {
    nestable: true,
  },
};
