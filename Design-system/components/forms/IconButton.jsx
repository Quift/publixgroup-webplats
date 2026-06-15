import React from "react";

/* PubliX Group — IconButton. Square, icon-only action. Uses Phosphor icons. */

const CSS = `
.pxg-iconbtn{
  --_s: var(--control-h-md);
  display:inline-flex; align-items:center; justify-content:center;
  width:var(--_s); height:var(--_s); padding:0;
  border-radius:var(--radius-md); border:1px solid transparent; cursor:pointer;
  color:var(--slate-600); background:transparent; box-sizing:border-box;
  transition:background var(--dur-fast) var(--ease-standard),
             color var(--dur-fast) var(--ease-standard),
             border-color var(--dur-fast) var(--ease-standard);
}
.pxg-iconbtn .ph{ font-size:1.25rem; }
.pxg-iconbtn:hover{ background:var(--slate-100); color:var(--navy-800); }
.pxg-iconbtn:focus-visible{ outline:none; box-shadow:var(--ring); }
.pxg-iconbtn[disabled]{ opacity:.4; pointer-events:none; }
.pxg-iconbtn--sm{ --_s:var(--control-h-sm); border-radius:var(--radius-sm); }
.pxg-iconbtn--sm .ph{ font-size:1.05rem; }
.pxg-iconbtn--lg{ --_s:var(--control-h-lg); }
.pxg-iconbtn--solid{ background:var(--navy-800); color:#fff; }
.pxg-iconbtn--solid:hover{ background:var(--navy-700); color:#fff; }
.pxg-iconbtn--outline{ border-color:var(--border-default); }
.pxg-iconbtn--outline:hover{ border-color:var(--slate-400); background:#fff; }
.pxg-iconbtn--on-navy{ color:var(--navy-200); }
.pxg-iconbtn--on-navy:hover{ background:rgba(255,255,255,.1); color:#fff; }
`;

let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-iconbtn-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

export function IconButton({
  icon,
  variant = "plain",
  size = "md",
  onNavy = false,
  label,
  className = "",
  ...rest
}) {
  useStyle();
  const cls = [
    "pxg-iconbtn",
    variant !== "plain" ? `pxg-iconbtn--${variant}` : "",
    size !== "md" ? `pxg-iconbtn--${size}` : "",
    onNavy ? "pxg-iconbtn--on-navy" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} aria-label={label} {...rest}>
      <i className={`ph ${icon}`} aria-hidden="true" />
    </button>
  );
}
