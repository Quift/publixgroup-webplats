import React from "react";

/* PubliX Group — Checkbox. Custom square check with Phosphor tick. */

const CSS = `
.pxg-check{ display:inline-flex; align-items:flex-start; gap:.6rem; font-family:var(--font-text); cursor:pointer; user-select:none; }
.pxg-check input{ position:absolute; opacity:0; width:0; height:0; }
.pxg-check__box{
  flex-shrink:0; width:20px; height:20px; margin-top:1px;
  border:1.5px solid var(--border-strong); border-radius:var(--radius-xs); background:#fff;
  display:flex; align-items:center; justify-content:center; color:#fff;
  transition:background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
}
.pxg-check__box .ph{ font-size:14px; opacity:0; transform:scale(.6); transition:opacity var(--dur-fast), transform var(--dur-fast) var(--ease-out); }
.pxg-check input:checked + .pxg-check__box{ background:var(--azure-600); border-color:var(--azure-600); }
.pxg-check input:checked + .pxg-check__box .ph{ opacity:1; transform:scale(1); }
.pxg-check input:indeterminate + .pxg-check__box{ background:var(--azure-600); border-color:var(--azure-600); }
.pxg-check input:focus-visible + .pxg-check__box{ box-shadow:var(--ring); }
.pxg-check input:disabled ~ *{ opacity:.5; }
.pxg-check__text{ font-size:var(--fs-body-sm); color:var(--text-body); line-height:1.4; }
.pxg-check__text small{ display:block; color:var(--text-muted); font-size:var(--fs-caption); }
`;

let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-check-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

export function Checkbox({ label, description, className = "", ...rest }) {
  useStyle();
  return (
    <label className={["pxg-check", className].filter(Boolean).join(" ")}>
      <input type="checkbox" {...rest} />
      <span className="pxg-check__box"><i className="ph ph-check" aria-hidden="true" /></span>
      {(label || description) ? (
        <span className="pxg-check__text">{label}{description ? <small>{description}</small> : null}</span>
      ) : null}
    </label>
  );
}
