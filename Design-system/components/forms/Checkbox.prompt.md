Square checkbox with azure fill and a Phosphor tick.

```jsx
<Checkbox label="Notify case worker on decision" defaultChecked />
<Checkbox label="Include archived applications"
  description="Adds rounds closed before 2023" />
```

- forwards native props: `checked`, `defaultChecked`, `onChange`, `disabled`
- supports `indeterminate` via a ref on the underlying input
