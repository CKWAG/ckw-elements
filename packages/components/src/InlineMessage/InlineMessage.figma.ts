// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=696-614
// source=packages/components/src/InlineMessage/InlineMessage.tsx
// component=InlineMessage
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

const status = instance.getEnum('Status', {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
});
const showTitle = instance.getEnum('Show Title', { True: true });
const title = showTitle ? instance.getString('Title') : '';
const description = instance.getString('Description');
const showIcon = instance.getBoolean('Show Icon');
// Actions is a native Figma slot (default content: a Text Link); it renders its own snippet.
const showActions = instance.getBoolean('Show Actions');
const actions = showActions ? instance.getSlot('Actions') : undefined;

// Breakpoint is left out: the code default `auto` follows the viewport, the Figma
// Desktop/Mobile variants document both layouts.
const statusProp = status && status !== 'info' ? ` status="${status}"` : '';
const titleProp = title ? ` title="${title}"` : '';
const iconProp = showIcon ? '' : ' showIcon={false}';

export default {
  example: figma.code`<InlineMessage${statusProp}${titleProp}${iconProp}${
    showActions ? '\n  actions={\n    <>\n      ' : ''
  }${actions ?? ''}${showActions ? '\n    </>\n  }\n' : ''}>
  ${description}
</InlineMessage>`,
  imports: ["import { InlineMessage } from '@ckwag/elements';"],
  id: 'inline-message',
  metadata: {
    nestable: true,
  },
};
