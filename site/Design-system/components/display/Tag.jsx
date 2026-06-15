import React from "react";

/* PubliX Group — Tag. Neutral chip, optionally removable / selectable. */

const CSS = `
.pxg-tag{
  display:inline-flex; align-items:center; gap:.4em;
  font-family:var(--font-text); font-weight:var(--fw-medium); font-size:var(--fs-caption);
  line-height:1; padding:.4em .7em; border-radius:var(--radius-sm);
  background:var(--slate-100); color:var(--slate-700); border:1px solid transparent;
}
.pxg-tag--selectable{ cursor:pointer; transition:background var(--dur-fast), border-color var(--dur-fast), color var(--dur-fast); }
.pxg-tag--selectable:hover{ background:var(--slate-150); }
.pxg-tag--selected{ background:var(--azure-100); color:var(--azure-700); border-color:var(--azure-300); }
.pxg-tag__x{ display:inline-flex; cursor:pointer; opacity:.6; font-size:1.1em; }
.pxg-tag__x:hover{ opacity:1; }
.pxg-tag .ph{ font-size:1.05em; }
`;

let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-tag-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

export function Tag({ children, icon, selectable = false, selected = false, onRemove, className = "", ...rest }) {
  useStyle();
  const cls = [
    "pxg-tag",
    selectable ? "pxg-tag--selectable" : "",
    selected ? "pxg-tag--selected" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {icon ? <i className={`ph ${icon}`} aria-hidden="true" /> : null}
      {children}
      {onRemove ? (
        <span className="pxg-tag__x" onClick={(e) => { e.stopPropagation(); onRemove(e); }} aria-label="Remove">
          <i className="ph ph-x" aria-hidden="true" />
        </span>
      ) : null}
    </span>
  );
}
