// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=2391-911
// source=packages/components/src/TextLink/TextLink.tsx
// component=TextLink
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label');
// Figma uses Title Case values, the code API uses lowercase.
const variant = instance.getEnum('Variant', {
  Standalone: 'standalone',
  Inline: 'inline',
});
const size = instance.getEnum('Size', {
  Large: 'large',
  Medium: 'medium',
  Small: 'small',
});
const showLeadingIcon = instance.getBoolean('Show Leading Icon');
const showTrailingIcon = instance.getBoolean('Show Trailing Icon');
const external = instance.getBoolean('External');

/** Returns the Code Connect snippet of a swapped icon, or a placeholder. */
function iconCode(propertyName: string, fallback: string) {
  const icon = instance.getInstanceSwap(propertyName);
  return icon && icon.type === 'INSTANCE' && icon.hasCodeConnect()
    ? icon.executeTemplate().example
    : fallback;
}

// Defaults (variant standalone, size large) are left out to keep the snippet short.
// Inline links take the paragraph font, so size is only written for standalone links.
const variantProp = variant === 'inline' ? ' variant="inline"' : '';
const sizeProp = variant !== 'inline' && size && size !== 'large' ? ` size="${size}"` : '';
const externalProp = external ? ' external' : '';

export default {
  example: figma.code`<TextLink href="#"${variantProp}${sizeProp}${externalProp}${
    showLeadingIcon
      ? figma.code` leadingIcon={${iconCode('Leading Icon', '<IconArrowLeft />')}}`
      : ''
  }${
    showTrailingIcon
      ? figma.code` trailingIcon={${iconCode('Trailing Icon', '<IconArrowRight />')}}`
      : ''
  }>${label}</TextLink>`,
  imports: ["import { TextLink } from '@ckwag/elements';"],
  id: 'text-link',
  metadata: {
    nestable: true,
  },
};
