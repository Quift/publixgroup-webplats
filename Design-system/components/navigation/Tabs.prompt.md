Underline tab bar with optional icons and count pills. Active tab uses azure.

```jsx
<Tabs
  defaultValue="open"
  onChange={setTab}
  items={[
    { id: "open", label: "Open", icon: "ph-tray", count: 18 },
    { id: "review", label: "In review", count: 4 },
    { id: "paid", label: "Paid" },
  ]}
/>
```

- controlled via `value` + `onChange`, or uncontrolled via `defaultValue`
- each item: `{ id, label, icon?, count? }`
