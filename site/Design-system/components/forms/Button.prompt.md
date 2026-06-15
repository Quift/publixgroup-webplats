Brand button for PubliX Group — navy by default (marketing & primary CTAs), azure `accent` for in-app actions, plus `secondary`, `ghost` and `danger`.

```jsx
<Button variant="primary" iconRight="ph-arrow-right">Get in touch</Button>
<Button variant="accent" size="lg">Review application</Button>
<Button variant="secondary" iconLeft="ph-plus">New shift</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

- `variant`: `primary` (navy) · `accent` (azure) · `secondary` (outline) · `ghost` · `danger`
- `size`: `sm` · `md` · `lg`; `block` for full-width
- `iconLeft` / `iconRight` take Phosphor class names (load `@phosphor-icons/web`)
- `onNavy` adapts `secondary`/`ghost` for dark navy hero/footer sections
- Renders as `<a>` when `as="a"` — keep CTAs as links where appropriate
