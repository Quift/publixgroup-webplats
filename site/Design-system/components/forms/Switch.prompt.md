Toggle switch for binary on/off settings (azure when on).

```jsx
<Switch label="Auto-approve recurring grants" defaultChecked />
<Switch label="SMS reminders to staff" />
```

- forwards native props: `checked`, `defaultChecked`, `onChange`, `disabled`
- prefer Switch for instant settings; use Checkbox inside forms that are submitted
