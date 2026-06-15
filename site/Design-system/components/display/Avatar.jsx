import React from "react";

/* PubliX Group — Avatar. Initials or image, with optional brand-mark fallback. */

const CSS = `
.pxg-avatar{
  display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;
  width:40px; height:40px; border-radius:var(--radius-pill); overflow:hidden;
  background:var(--navy-100); color:var(--navy-700);
  font-family:var(--font-display); font-weight:var(--fw-semibold); font-size:15px;
  letter-spacing:0; user-select:none;
}
.pxg-avatar img{ width:100%; height:100%; object-fit:cover; display:block; }
.pxg-avatar--xs{ width:24px; height:24px; font-size:10px; }
.pxg-avatar--sm{ width:32px; height:32px; font-size:12px; }
.pxg-avatar--lg{ width:56px; height:56px; font-size:20px; }
.pxg-avatar--xl{ width:72px; height:72px; font-size:26px; }
.pxg-avatar--square{ border-radius:var(--radius-md); }
.pxg-avatar--navy{ background:var(--navy-800); color:#fff; }
.pxg-avatar--azure{ background:var(--azure-100); color:var(--azure-700); }
`;

let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-avatar-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0] || "").join("").toUpperCase();
}

export function Avatar({ name, src, size = "md", shape = "round", tone = "default", className = "", ...rest }) {
  useStyle();
  const cls = [
    "pxg-avatar",
    size !== "md" ? `pxg-avatar--${size}` : "",
    shape === "square" ? "pxg-avatar--square" : "",
    tone !== "default" ? `pxg-avatar--${tone}` : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <span className={cls} title={name} {...rest}>
      {src ? <img src={src} alt={name || ""} /> : initials(name)}
    </span>
  );
}
