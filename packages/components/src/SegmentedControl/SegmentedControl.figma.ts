// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=931-29325
// source=packages/components/src/SegmentedControl/SegmentedControl.tsx
// component=SegmentedControl
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

const variant = instance.getEnum('Variant', { Default: 'default', Fill: 'fill' });

const segments = instance
  .findLayers((node) => node.type === 'INSTANCE' && node.name.startsWith('Segment'))
  .filter((node) => node.type === 'INSTANCE');

let activeValue = '';
const items = segments.map((segment, index) => {
  const label = segment.getString('Label');
  const value = label ? label.toLowerCase().replace(/\s+/g, '-') : `segment-${index + 1}`;
  if (segment.getEnum('State', { Active: true })) activeValue = value;
  return `{ value: '${value}', label: '${label}' }`;
});

export default {
  example: figma.code`<SegmentedControl${variant === 'fill' ? ' variant="fill"' : ''}
  segments={[${items.join(', ')}]}
  activeValue="${activeValue}"
  onChange={setActiveValue}
/>`,
  imports: ["import { SegmentedControl } from '@ckwag/elements';"],
  id: 'segmented-control',
  metadata: {
    nestable: true,
  },
};
