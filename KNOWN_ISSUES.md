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

## Storybook dev logs "outdated JSX transform"

The repo compiles JSX with the classic runtime (`"jsx": "react"` in
`tsconfig.base.json`). In the Storybook dev server, Vite 8 transforms JSX with
Oxc, which adds `__self` and `__source` props to every `React.createElement`
call. React 19 sees these props and logs once per preview load:

```
Your app (or one of its dependencies) is using an outdated JSX transform.
```

The warning is harmless and only appears in development. The Storybook build
and the published packages are not affected. It goes away when the repo
switches to the automatic JSX runtime.
