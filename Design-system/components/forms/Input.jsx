import React from "react";

/* PubliX Group — Input. Labelled text field with optional icon, hint & error. */

const CSS = `
.pxg-field{ display:flex; flex-direction:column; gap:.4rem; font-family:var(--font-text); }
.pxg-field__label{ font-size:var(--fs-body-sm); font-weight:var(--fw-medium); color:var(--text-strong); }
.pxg-field__req{ color:var(--danger-600); margin-left:2px; }
.pxg-field__wrap{ position:relative; display:flex; align-items:center; }
.pxg-field__icon{ position:absolute; left:.7rem; color:var(--slate-400); font-size:1.15rem; pointer-events:none; display:flex; }
.pxg-input{
  width:100%; box-sizing:border-box; height:var(--control-h-md);
  font-family:var(--font-text); font-size:var(--fs-body); color:var(--text-body);
  background:#fff; border:1px solid var(--border-default); border-radius:var(--radius-sm);
  padding:0 .85rem;
  transition:border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
}
.pxg-input::placeholder{ color:var(--text-subtle); }
.pxg-input:hover{ border-color:var(--slate-400); }
.pxg-input:focus{ outline:none; border-color:var(--azure-500); box-shadow:var(--ring); }
.pxg-input--with-icon{ padding-left:2.5rem; }
.pxg-input--sm{ height:var(--control-h-sm); font-size:var(--fs-body-sm); }
.pxg-input--lg{ height:var(--control-h-lg); }
.pxg-input:disabled{ background:var(--slate-100); color:var(--text-subtle); cursor:not-allowed; }
.pxg-field--error .pxg-input{ border-color:var(--danger-600); }
.pxg-field--error .pxg-input:focus{ box-shadow:0 0 0 3px var(--danger-100); }
.pxg-field__msg{ font-size:var(--fs-caption); color:var(--text-muted); }
.pxg-field--error .pxg-field__msg{ color:var(--danger-600); }
`;

let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-input-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

export function Input({
  label,
  hint,
  error,
  icon,
  size = "md",
  required = false,
  id,
  className = "",
  ...rest
}) {
  useStyle();
  const autoId = React.useId ? React.useId() : undefined;
  const fieldId = id || autoId;
  const msg = error || hint;
  const inputCls = [
    "pxg-input",
    icon ? "pxg-input--with-icon" : "",
    size !== "md" ? `pxg-input--${size}` : "",
  ].filter(Boolean).join(" ");
  return (
    <div className={["pxg-field", error ? "pxg-field--error" : "", className].filter(Boolean).join(" ")}>
      {label ? (
        <label className="pxg-field__label" htmlFor={fieldId}>
          {label}{required ? <span className="pxg-field__req">*</span> : null}
        </label>
      ) : null}
      <div className="pxg-field__wrap">
        {icon ? <span className="pxg-field__icon"><i className={`ph ${icon}`} aria-hidden="true" /></span> : null}
        <input id={fieldId} className={inputCls} aria-invalid={!!error} {...rest} />
      </div>
      {msg ? <span className="pxg-field__msg">{msg}</span> : null}
    </div>
  );
}
