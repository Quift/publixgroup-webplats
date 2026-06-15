import React from "react";

/* PubliX Group — Switch (toggle). */

const CSS = `
.pxg-switch{ display:inline-flex; align-items:center; gap:.65rem; font-family:var(--font-text); cursor:pointer; user-select:none; }
.pxg-switch input{ position:absolute; opacity:0; width:0; height:0; }
.pxg-switch__track{
  position:relative; flex-shrink:0; width:40px; height:23px; border-radius:var(--radius-pill);
  background:var(--slate-300); transition:background var(--dur-base) var(--ease-standard);
}
.pxg-switch__thumb{
  position:absolute; top:2.5px; left:2.5px; width:18px; height:18px; border-radius:50%;
  background:#fff; box-shadow:var(--shadow-sm);
  transition:transform var(--dur-base) var(--ease-out);
}
.pxg-switch input:checked + .pxg-switch__track{ background:var(--azure-600); }
.pxg-switch input:checked + .pxg-switch__track .pxg-switch__thumb{ transform:translateX(17px); }
.pxg-switch input:focus-visible + .pxg-switch__track{ box-shadow:var(--ring); }
.pxg-switch input:disabled ~ *{ opacity:.5; }
.pxg-switch__label{ font-size:var(--fs-body-sm); color:var(--text-body); }
`;

let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-switch-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

export function Switch({ label, className = "", ...rest }) {
  useStyle();
  return (
    <label className={["pxg-switch", className].filter(Boolean).join(" ")}>
      <input type="checkbox" role="switch" {...rest} />
      <span className="pxg-switch__track"><span className="pxg-switch__thumb" /></span>
      {label ? <span className="pxg-switch__label">{label}</span> : null}
    </label>
  );
}
