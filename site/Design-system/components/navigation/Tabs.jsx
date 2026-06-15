import React from "react";

/* PubliX Group — Tabs. Underline tabs, controlled or uncontrolled. */

const CSS = `
.pxg-tabs{ font-family:var(--font-text); }
.pxg-tabs__list{ display:flex; gap:1.5rem; border-bottom:1px solid var(--border-default); }
.pxg-tab{
  appearance:none; background:none; border:0; cursor:pointer;
  font-family:var(--font-text); font-size:var(--fs-body-sm); font-weight:var(--fw-medium);
  color:var(--text-muted); padding:0 0 .7rem; position:relative; display:inline-flex; align-items:center; gap:.45rem;
  transition:color var(--dur-fast) var(--ease-standard);
}
.pxg-tab .ph{ font-size:1.1em; }
.pxg-tab:hover{ color:var(--text-strong); }
.pxg-tab__bar{ position:absolute; left:0; right:0; bottom:-1px; height:2px; background:var(--azure-600); border-radius:2px 2px 0 0; transform:scaleX(0); transition:transform var(--dur-base) var(--ease-out); }
.pxg-tab--active{ color:var(--navy-800); font-weight:var(--fw-semibold); }
.pxg-tab--active .pxg-tab__bar{ transform:scaleX(1); }
.pxg-tab__count{ font-family:var(--font-mono); font-size:11px; color:var(--text-subtle); background:var(--slate-100); border-radius:var(--radius-pill); padding:1px 7px; }
.pxg-tab--active .pxg-tab__count{ background:var(--azure-100); color:var(--azure-700); }
.pxg-tabs:focus-within .pxg-tab:focus-visible{ outline:none; }
.pxg-tab:focus-visible .pxg-tab__label{ box-shadow:var(--ring); border-radius:3px; }
`;

let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-tabs-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

export function Tabs({ items = [], value, defaultValue, onChange, className = "" }) {
  useStyle();
  const isControlled = value !== undefined;
  const first = items[0] && (items[0].id ?? items[0].value ?? items[0].label);
  const [internal, setInternal] = React.useState(defaultValue ?? first);
  const active = isControlled ? value : internal;
  const select = (id) => { if (!isControlled) setInternal(id); onChange && onChange(id); };
  return (
    <div className={["pxg-tabs", className].filter(Boolean).join(" ")}>
      <div className="pxg-tabs__list" role="tablist">
        {items.map((it) => {
          const id = it.id ?? it.value ?? it.label;
          const isActive = id === active;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              className={["pxg-tab", isActive ? "pxg-tab--active" : ""].filter(Boolean).join(" ")}
              onClick={() => select(id)}
            >
              {it.icon ? <i className={`ph ${it.icon}`} aria-hidden="true" /> : null}
              <span className="pxg-tab__label">{it.label}</span>
              {it.count != null ? <span className="pxg-tab__count">{it.count}</span> : null}
              <span className="pxg-tab__bar" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
