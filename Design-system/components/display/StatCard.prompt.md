Headline metric tile for dashboards and impact sections (figure set in mono).

```jsx
<StatCard label="Annual savings" value="€7.0M" icon="ph-coins"
  trend="+18%" footnote="Ostrobothnia, 2024" />
<StatCard label="Portfolio companies" value="5" icon="ph-buildings" />
<StatCard navy label="Open shifts filled" value="92%" trend="+4 pts" />
```

- `value` is rendered in mono for tabular alignment
- `trend` + `trendDir` (`up`/`down`) colour the delta green/red
- `navy` for dark dashboard headers
