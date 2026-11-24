// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=2390-329
// source=packages/components/src/Card/Card.tsx
// component=Card
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

// Interactive=True is a whole-card link; State (Hover/Focus) is interaction state only.
const interactive = instance.getEnum('Interactive', { True: true });
const padding = instance.getEnum('Padding', {
  Medium: 'medium',
  Large: 'large',
});
const showHeader = instance.getBoolean('Show Header');
const title = instance.getString('Title');
const description = instance.getBoolean('Show Description')
  ? instance.getString('Description')
  : '';
const showChevron = interactive ? instance.getBoolean('Show Chevron') : true;
const content = instance.getSlot('Content');

// Defaults (static, padding medium, chevron on) are left out to keep the snippet short.
const hrefProp = interactive ? ' href="/"' : '';
const paddingProp = padding && padding !== 'medium' ? ` padding="${padding}"` : '';
const chevronProp = showChevron ? '' : ' showChevron={false}';
const header = showHeader
  ? `
  <CardHeader>
    <CardTitle>${title}</CardTitle>${description ? `\n    <CardDescription>${description}</CardDescription>` : ''}
  </CardHeader>`
  : '';

export default {
  example: figma.code`<Card${hrefProp}${paddingProp}${chevronProp}>${header}
  <CardContent>
    ${content}
  </CardContent>
</Card>`,
  imports: [
    `import { Card, CardContent${showHeader ? ', CardHeader, CardTitle' : ''}${
      showHeader && description ? ', CardDescription' : ''
    } } from '@ckwag/elements';`,
  ],
  id: 'card',
  metadata: {
    nestable: true,
  },
};
