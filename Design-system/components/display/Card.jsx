import React from "react";

/* PubliX Group — Card. Surface container with restrained border + soft shadow. */

const CSS = `
.pxg-card{
  background:var(--surface-card); border:1px solid var(--border-subtle);
  border-radius:var(--radius-lg); box-shadow:var(--shadow-sm);
  overflow:hidden; display:block; color:inherit; text-decoration:none;
}
.pxg-card--pad{ padding:var(--space-6); }
.pxg-card--flat{ box-shadow:none; }
.pxg-card--navy{ background:var(--surface-navy); border-color:var(--border-navy); color:#fff; }
.pxg-card--interactive{ cursor:pointer; transition:transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard); }
.pxg-card--interactive:hover{ transform:translateY(var(--lift-hover)); box-shadow:var(--shadow-lg); border-color:var(--border-default); }
.pxg-card__media{ display:block; width:100%; }
.pxg-card__media img{ display:block; width:100%; height:100%; object-fit:cover; }
`;

let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-card-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

export function Card({
  children,
  padded = true,
  interactive = false,
  flat = false,
  navy = false,
  as = "div",
  className = "",
  ...rest
}) {
  useStyle();
  const Tag = as;
  const cls = [
    "pxg-card",
    padded ? "pxg-card--pad" : "",
    interactive ? "pxg-card--interactive" : "",
    flat ? "pxg-card--flat" : "",
    navy ? "pxg-card--navy" : "",
    className,
  ].filter(Boolean).join(" ");
  return <Tag className={cls} {...rest}>{children}</Tag>;
}
