import React from "react";

/* PubliX Group — Badge. Status pill with optional dot. Semantic tones. */

const CSS = `
.pxg-badge{
  display:inline-flex; align-items:center; gap:.4em;
  font-family:var(--font-text); font-weight:var(--fw-semibold); font-size:var(--fs-caption);
  line-height:1; padding:.32em .65em; border-radius:var(--radius-pill); white-space:nowrap;
  border:1px solid transparent;
}
.pxg-badge--sm{ font-size:11px; padding:.28em .55em; }
.pxg-badge__dot{ width:6px; height:6px; border-radius:50%; background:currentColor; }
.pxg-badge--neutral{ background:var(--slate-100); color:var(--slate-700); }
.pxg-badge--info{ background:var(--status-info-bg); color:var(--status-info-fg); }
.pxg-badge--success{ background:var(--status-success-bg); color:var(--status-success-fg); }
.pxg-badge--warning{ background:var(--status-warning-bg); color:var(--status-warning-fg); }
.pxg-badge--danger{ background:var(--status-danger-bg); color:var(--status-danger-fg); }
.pxg-badge--brand{ background:var(--navy-100); color:var(--navy-700); }
.pxg-badge--solid{ background:var(--navy-800); color:#fff; }
`;

let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-badge-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

export function Badge({ children, tone = "neutral", dot = false, size = "md", icon, className = "", ...rest }) {
  useStyle();
  const cls = ["pxg-badge", `pxg-badge--${tone}`, size === "sm" ? "pxg-badge--sm" : "", className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {dot ? <span className="pxg-badge__dot" /> : null}
      {icon ? <i className={`ph ${icon}`} aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
