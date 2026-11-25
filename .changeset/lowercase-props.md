---
'@ckwag/elements': minor
---

**Breaking:** prop values are now lowercase everywhere, and one prop and its type were renamed. Figma keeps Title Case, the Code Connect templates map between the two.

Migration:

- `Button`: `size="Large" | "Medium" | "Small"` becomes `size="large" | "medium" | "small"`.
- `InputField` (and `PasswordInput`): `InputFieldState` values `'Default' | 'Hover' | 'Active' | 'Error' | 'Disabled'` become `'default' | 'hover' | 'active' | 'error' | 'disabled'`.
- `SegmentedControl`: the prop `type` is now `variant`, the type `SegmentedControlType` is now `SegmentedControlVariant`, and its values `'Default' | 'Fill'` become `'default' | 'fill'`.
- `InlineMessage`: `status` values `'Info' | 'Success' | 'Error'` become `'info' | 'success' | 'error'`, and `breakpoint` values `'Auto' | 'Desktop' | 'Mobile'` become `'auto' | 'desktop' | 'mobile'`.

Search your code for the old values, for example `size="Large"`, `type="Fill"` or `status="Error"`, and replace them. TypeScript reports every spot.
