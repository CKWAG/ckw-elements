// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=2391-284
// source=packages/components/src/KeyValueList/KeyValueList.tsx
// component=KeyValueItem
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

// Layout is set on the KeyValueList in code, so the item only maps label, value and total.
const label = instance.getString('Label');
const isBadge = instance.getEnum('Value Type', { Badge: true });
const total = instance.getEnum('Total', { True: true });
const badge = isBadge ? instance.findInstance('Badge') : null;
const value =
  badge && badge.type === 'INSTANCE'
    ? badge.executeTemplate().example
    : instance.getString('Value');

const totalProp = total ? ' total' : '';

export default {
  example: figma.code`<KeyValueItem label="${label}"${totalProp}>${value}</KeyValueItem>`,
  imports: ["import { KeyValueItem } from '@ckwag/elements';"],
  id: 'key-value-item',
  metadata: {
    nestable: true,
  },
};
