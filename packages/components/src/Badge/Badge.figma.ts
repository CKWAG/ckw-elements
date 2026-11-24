// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=2330-190
// source=packages/components/src/Badge/Badge.tsx
// component=Badge
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label');
const status = instance.getEnum('Status', {
  Neutral: 'Neutral',
  Info: 'Info',
  Success: 'Success',
  Warning: 'Warning',
  Error: 'Error',
  Brand: 'Brand',
});
const size = instance.getEnum('Size', {
  Medium: 'Medium',
  Small: 'Small',
});
const showIcon = instance.getBoolean('Show Icon');

// Defaults (status Neutral, size Medium, no icon) are left out to keep the snippet short.
const statusProp = status && status !== 'Neutral' ? ` status="${status}"` : '';
const sizeProp = size && size !== 'Medium' ? ` size="${size}"` : '';
const iconProp = showIcon ? ' showIcon' : '';

export default {
  example: figma.code`<Badge${statusProp}${sizeProp}${iconProp}>${label}</Badge>`,
  imports: ["import { Badge } from '@ckwag/elements';"],
  id: 'badge',
  metadata: {
    nestable: true,
  },
};
