import React from "react";

/* PubliX Group — Button
   Self-contained: injects its own CSS (scoped to .pxg-btn) once, reads brand
   tokens from styles.css. Icons are Phosphor class names (e.g. "ph-arrow-right").
*/

const CSS = `
.pxg-btn{
  --_h: var(--control-h-md);
  display:inline-flex; align-items:center; justify-content:center; gap:.55em;
  height:var(--_h); padding:0 1.15rem;
  font-family:var(--font-text); font-weight:var(--fw-semibold); font-size:var(--fs-body-sm);
  line-height:1; letter-spacing:0; white-space:nowrap;
  border-radius:var(--radius-md); border:1px solid transparent; cursor:pointer;
  text-decoration:none; box-sizing:border-box; user-select:none;
  transition:background var(--dur-fast) var(--ease-standard),
             border-color var(--dur-fast) var(--ease-standard),
             color var(--dur-fast) var(--ease-standard),
             transform var(--dur-fast) var(--ease-standard),
             box-shadow var(--dur-fast) var(--ease-standard);
}
.pxg-btn:active{ transform:translateY(1px); }
.pxg-btn:focus-visible{ outline:none; box-shadow:var(--ring); }
.pxg-btn[disabled],.pxg-btn[aria-disabled="true"]{ opacity:.45; pointer-events:none; }
.pxg-btn .ph{ font-size:1.15em; }

.pxg-btn--sm{ --_h:var(--control-h-sm); padding:0 .85rem; font-size:var(--fs-caption); border-radius:var(--radius-sm); }
.pxg-btn--lg{ --_h:var(--control-h-lg); padding:0 1.5rem; font-size:var(--fs-body); }
.pxg-btn--block{ display:flex; width:100%; }

.pxg-btn--primary{ background:var(--navy-800); color:#fff; }
.pxg-btn--primary:hover{ background:var(--navy-700); }
.pxg-btn--accent{ background:var(--azure-600); color:#fff; }
.pxg-btn--accent:hover{ background:var(--azure-700); }
.pxg-btn--secondary{ background:#fff; color:var(--navy-800); border-color:var(--border-strong); }
.pxg-btn--secondary:hover{ background:var(--slate-50); border-color:var(--slate-400); }
.pxg-btn--ghost{ background:transparent; color:var(--navy-700); }
.pxg-btn--ghost:hover{ background:var(--navy-50); }
.pxg-btn--danger{ background:var(--danger-600); color:#fff; }
.pxg-btn--danger:hover{ background:#b23a31; }

/* on navy surfaces */
.pxg-btn--on-navy.pxg-btn--secondary{ background:transparent; color:#fff; border-color:var(--border-navy); }
.pxg-btn--on-navy.pxg-btn--secondary:hover{ background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.4); }
.pxg-btn--on-navy.pxg-btn--ghost{ color:var(--navy-200); }
.pxg-btn--on-navy.pxg-btn--ghost:hover{ background:rgba(255,255,255,.08); }
`;

let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-btn-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  block = false,
  onNavy = false,
  as = "button",
  className = "",
  ...rest
}) {
  useStyle();
  const Tag = as;
  const cls = [
    "pxg-btn",
    `pxg-btn--${variant}`,
    size !== "md" ? `pxg-btn--${size}` : "",
    block ? "pxg-btn--block" : "",
    onNavy ? "pxg-btn--on-navy" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <Tag className={cls} {...rest}>
      {iconLeft ? <i className={`ph ${iconLeft}`} aria-hidden="true" /> : null}
      {children ? <span>{children}</span> : null}
      {iconRight ? <i className={`ph ${iconRight}`} aria-hidden="true" /> : null}
    </Tag>
  );
}
