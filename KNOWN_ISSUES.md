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

## TypeScript 7 has no compiler API

The workspace uses TypeScript 7 (the native `tsc`). Its `typescript` package
does not export the classic JavaScript compiler API (`createProgram`,
`findConfigFile` and so on); a new API is planned for TypeScript 7.1.

Storybook's optional `typescript` peer resolves to the same TypeScript 7. This
is fine for the default `react-docgen` engine, which builds the props tables
and controls without TypeScript. Storybook features that load the compiler API
do not work with TypeScript 7:

- `typescript.reactDocgen: 'react-docgen-typescript'`
- the experimental `componentsManifest`, `experimentalReactComponentMeta` and
  `experimentalDocgenServer` features

Before enabling one of them, give Storybook TypeScript 6 through the official
compatibility package by adding this to `apps/storybook/package.json`:

```json
{
  "devDependencies": {
    "typescript": "npm:@typescript/typescript6@^6.0.2"
  }
}
```

The root `tsc` stays on TypeScript 7. Figma Code Connect (`pnpm figma:parse`)
is not affected because it ships its own TypeScript 6.
