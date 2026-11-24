// url=https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/CKW-Elements?node-id=828-433
// source=packages/components/src/Button/Button.tsx
// component=Button
/// <reference types="@figma/code-connect/figma-types" />
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label');
// Figma uses Title Case variant values, the code API uses lowercase.
const variant = instance.getEnum('Variant', {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
});
const size = instance.getEnum('Size', {
  Large: 'Large',
  Medium: 'Medium',
  Small: 'Small',
});
const disabled = instance.getEnum('State', { Disabled: true });
const loading = instance.getEnum('State', { Loading: true });
const showLeadingIcon = instance.getBoolean('Show Leading Icon');
const showTrailingIcon = instance.getBoolean('Show Trailing Icon');
const icon = instance.getInstanceSwap('Icon');
const iconCode =
  icon && icon.type === 'INSTANCE' && icon.hasCodeConnect()
    ? icon.executeTemplate().example
    : '<IconPlaceholder />';

// Defaults (variant primary, size Large) are left out to keep the snippet short.
const variantProp = variant && variant !== 'primary' ? ` variant="${variant}"` : '';
const sizeProp = size && size !== 'Large' ? ` size="${size}"` : '';
const disabledProp = disabled ? ' disabled' : '';
const loadingProp = loading ? ' loading' : '';

export default {
  example: figma.code`<Button${variantProp}${sizeProp}${disabledProp}${loadingProp}${
    showLeadingIcon ? figma.code` leadingIcon={${iconCode}}` : ''
  }${showTrailingIcon ? figma.code` trailingIcon={${iconCode}}` : ''}>${label}</Button>`,
  imports: ["import { Button } from '@ckwag/elements';"],
  id: 'button',
  metadata: {
    nestable: true,
  },
};
