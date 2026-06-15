Styled native `<select>` with a Phosphor caret — keeps native keyboard/mobile behaviour.

```jsx
<Select label="Region" placeholder="Choose a region"
  options={["Stockholm", "Örebro", "Espoo", "Pori"]} />

<Select label="Status" options={[
  { value: "paid", label: "Grant paid" },
  { value: "review", label: "Pending review" },
]} />
```

- `options` accepts strings or `{value,label}`; or pass `<option>` children
- `size`: `sm` · `md` · `lg`
