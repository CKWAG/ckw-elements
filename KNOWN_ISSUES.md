# Known issues

## Select options cannot have an empty value

`Select` is built on `@radix-ui/react-select` 2.4.1. Radix reserves the empty
string (`''`) to represent no selection and show the placeholder. An option
with an empty value is passed directly to Radix as a `Select.Item`, which
throws during rendering. Since `SelectOption.value` is typed as `string`, this
constraint is not currently enforced by TypeScript.

For example, this causes the `Select` to fail when it renders:

```tsx
<Select
  label="Country"
  placeholder="Choose a country"
  options={[
    { value: '', label: 'No country' },
    { value: 'ch', label: 'Switzerland' },
  ]}
/>
```

Use the placeholder for the unselected state, and give every actual option a
non-empty value. If source data uses an empty string for a real choice, map it
to a stable non-empty value before passing it to `Select`, then translate it
back at the application boundary.
