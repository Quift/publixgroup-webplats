Neutral chip for categories, filters and multi-select tokens.

```jsx
<Tag icon="ph-buildings">Municipalities</Tag>
<Tag selectable selected>Healthcare</Tag>
<Tag onRemove={() => removeFilter('paid')}>Grant paid</Tag>
```

- `selectable` + `selected` → filter pill (azure when active)
- `onRemove` shows a removable "×"; `icon` takes a Phosphor class
