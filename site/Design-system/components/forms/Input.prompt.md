Labelled text field with optional leading Phosphor icon, hint and error state.

```jsx
<Input label="Organisation" placeholder="Search municipalities…" icon="ph-magnifying-glass" />
<Input label="Org. number" required hint="10 digits, e.g. 559485-5487" />
<Input label="Email" error="Enter a valid email address" defaultValue="hej@" />
```

- `icon` is a Phosphor class; `size`: `sm` · `md` · `lg`
- pass `error` to flip to the danger style; `hint` shows neutral helper text
- forwards all native `<input>` props (`type`, `value`, `onChange`, …)
