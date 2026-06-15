import React from "react";

/* PubliX Group — StatCard. Headline metric with label + optional trend.
   Numbers render in mono for tabular alignment. */

const CSS = `
.pxg-stat{
  background:var(--surface-card); border:1px solid var(--border-subtle);
  border-radius:var(--radius-lg); padding:var(--space-6); box-shadow:var(--shadow-sm);
  display:flex; flex-direction:column; gap:.35rem;
}
.pxg-stat__top{ display:flex; align-items:center; gap:.5rem; color:var(--text-muted); }
.pxg-stat__top .ph{ font-size:1.05rem; color:var(--navy-500); }
.pxg-stat__label{ font-family:var(--font-text); font-size:var(--fs-body-sm); font-weight:var(--fw-medium); color:var(--text-muted); }
.pxg-stat__value{ font-family:var(--font-mono); font-weight:600; font-size:32px; letter-spacing:-0.02em; color:var(--text-strong); line-height:1.05; }
.pxg-stat__foot{ display:flex; align-items:center; gap:.35rem; font-family:var(--font-text); font-size:var(--fs-caption); color:var(--text-muted); }
.pxg-stat__trend{ display:inline-flex; align-items:center; gap:.2rem; font-weight:var(--fw-semibold); }
.pxg-stat__trend--up{ color:var(--success-600); }
.pxg-stat__trend--down{ color:var(--danger-600); }
.pxg-stat--navy{ background:var(--surface-navy); border-color:var(--border-navy); }
.pxg-stat--navy .pxg-stat__value{ color:#fff; }
.pxg-stat--navy .pxg-stat__label,.pxg-stat--navy .pxg-stat__foot{ color:var(--navy-200); }
.pxg-stat--navy .pxg-stat__top .ph{ color:var(--navy-300); }
`;

let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-stat-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

export function StatCard({ label, value, icon, trend, trendDir = "up", footnote, navy = false, className = "", ...rest }) {
  useStyle();
  const cls = ["pxg-stat", navy ? "pxg-stat--navy" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <div className="pxg-stat__top">
        {icon ? <i className={`ph ${icon}`} aria-hidden="true" /> : null}
        <span className="pxg-stat__label">{label}</span>
      </div>
      <div className="pxg-stat__value">{value}</div>
      {(trend || footnote) ? (
        <div className="pxg-stat__foot">
          {trend ? (
            <span className={`pxg-stat__trend pxg-stat__trend--${trendDir}`}>
              <i className={`ph ${trendDir === "up" ? "ph-trend-up" : "ph-trend-down"}`} aria-hidden="true" />{trend}
            </span>
          ) : null}
          {footnote ? <span>{footnote}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
