import React from "react";

/* PubliX Group — Select. Styled native <select> with a Phosphor caret. */

const CSS = `
.pxg-select-field{ display:flex; flex-direction:column; gap:.4rem; font-family:var(--font-text); }
.pxg-select-field__label{ font-size:var(--fs-body-sm); font-weight:var(--fw-medium); color:var(--text-strong); }
.pxg-select-wrap{ position:relative; display:flex; align-items:center; }
.pxg-select-wrap__caret{ position:absolute; right:.7rem; color:var(--slate-500); font-size:1.05rem; pointer-events:none; }
.pxg-select{
  width:100%; box-sizing:border-box; height:var(--control-h-md);
  font-family:var(--font-text); font-size:var(--fs-body); color:var(--text-body);
  background:#fff; border:1px solid var(--border-default); border-radius:var(--radius-sm);
  padding:0 2.2rem 0 .85rem; cursor:pointer;
  -webkit-appearance:none; appearance:none;
  transition:border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
}
.pxg-select:hover{ border-color:var(--slate-400); }
.pxg-select:focus{ outline:none; border-color:var(--azure-500); box-shadow:var(--ring); }
.pxg-select:disabled{ background:var(--slate-100); color:var(--text-subtle); cursor:not-allowed; }
.pxg-select--sm{ height:var(--control-h-sm); font-size:var(--fs-body-sm); }
.pxg-select--lg{ height:var(--control-h-lg); }
`;

let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-select-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

export function Select({
  label,
  options = [],
  size = "md",
  placeholder,
  id,
  className = "",
  children,
  ...rest
}) {
  useStyle();
  const autoId = React.useId ? React.useId() : undefined;
  const fieldId = id || autoId;
  const selCls = ["pxg-select", size !== "md" ? `pxg-select--${size}` : ""].filter(Boolean).join(" ");
  return (
    <div className={["pxg-select-field", className].filter(Boolean).join(" ")}>
      {label ? <label className="pxg-select-field__label" htmlFor={fieldId}>{label}</label> : null}
      <div className="pxg-select-wrap">
        <select id={fieldId} className={selCls} {...rest}>
          {placeholder ? <option value="" disabled>{placeholder}</option> : null}
          {children || options.map((o) => {
            const val = typeof o === "string" ? o : o.value;
            const lbl = typeof o === "string" ? o : o.label;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
        <i className="ph ph-caret-down pxg-select-wrap__caret" aria-hidden="true" />
      </div>
    </div>
  );
}
