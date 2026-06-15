Icon-only square button for toolbars, carousel arrows (the brand uses Phosphor `ph-caret-left`/`ph-caret-right`), and table actions.

```jsx
<IconButton icon="ph-caret-right" variant="outline" label="Next" />
<IconButton icon="ph-dots-three" label="More" />
<IconButton icon="ph-plus" variant="solid" label="Add" />
```

- `variant`: `plain` · `solid` (navy) · `outline`
- `size`: `sm` · `md` · `lg`; `onNavy` for dark sections
- Always provide `label` — it becomes `aria-label`
