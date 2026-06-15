/* @ds-bundle: {"format":3,"namespace":"PubliXGroupDesignSystem_c7bc72","components":[{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"StatCard","sourcePath":"components/display/StatCard.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/display/Avatar.jsx":"ef7d91f70f9b","components/display/Badge.jsx":"41c70846f8eb","components/display/Card.jsx":"55f9322da955","components/display/StatCard.jsx":"53434ceac5ea","components/display/Tag.jsx":"f91559c070be","components/forms/Button.jsx":"7c90bdb161ba","components/forms/Checkbox.jsx":"50363a65907d","components/forms/IconButton.jsx":"4407ba2b7e25","components/forms/Input.jsx":"f7b292385a02","components/forms/Select.jsx":"96b799aa570d","components/forms/Switch.jsx":"de9b863c2b65","components/navigation/Tabs.jsx":"382118e154a1","ui_kits/publix-web/CompaniesSection.jsx":"12c7e91df603","ui_kits/publix-web/MissionSection.jsx":"85e7ca2e12f7","ui_kits/publix-web/NewsSection.jsx":"fe9a45c91f10","ui_kits/publix-web/WebCTA.jsx":"2e7f8d6e4674","ui_kits/publix-web/WebHero.jsx":"8fd189197cca","ui_kits/publix-web/WebNav.jsx":"e70df7d8025b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PubliXGroupDesignSystem_c7bc72 = window.PubliXGroupDesignSystem_c7bc72 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  return name.trim().split(/\s+/).slice(0, 2).map(p => p[0] || "").join("").toUpperCase();
}
function Avatar({
  name,
  src,
  size = "md",
  shape = "round",
  tone = "default",
  className = "",
  ...rest
}) {
  useStyle();
  const cls = ["pxg-avatar", size !== "md" ? `pxg-avatar--${size}` : "", shape === "square" ? "pxg-avatar--square" : "", tone !== "default" ? `pxg-avatar--${tone}` : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    title: name
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || ""
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Badge({
  children,
  tone = "neutral",
  dot = false,
  size = "md",
  icon,
  className = "",
  ...rest
}) {
  useStyle();
  const cls = ["pxg-badge", `pxg-badge--${tone}`, size === "sm" ? "pxg-badge--sm" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "pxg-badge__dot"
  }) : null, icon ? /*#__PURE__*/React.createElement("i", {
    className: `ph ${icon}`,
    "aria-hidden": "true"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Card({
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
  const cls = ["pxg-card", padded ? "pxg-card--pad" : "", interactive ? "pxg-card--interactive" : "", flat ? "pxg-card--flat" : "", navy ? "pxg-card--navy" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function StatCard({
  label,
  value,
  icon,
  trend,
  trendDir = "up",
  footnote,
  navy = false,
  className = "",
  ...rest
}) {
  useStyle();
  const cls = ["pxg-stat", navy ? "pxg-stat--navy" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "pxg-stat__top"
  }, icon ? /*#__PURE__*/React.createElement("i", {
    className: `ph ${icon}`,
    "aria-hidden": "true"
  }) : null, /*#__PURE__*/React.createElement("span", {
    className: "pxg-stat__label"
  }, label)), /*#__PURE__*/React.createElement("div", {
    className: "pxg-stat__value"
  }, value), trend || footnote ? /*#__PURE__*/React.createElement("div", {
    className: "pxg-stat__foot"
  }, trend ? /*#__PURE__*/React.createElement("span", {
    className: `pxg-stat__trend pxg-stat__trend--${trendDir}`
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${trendDir === "up" ? "ph-trend-up" : "ph-trend-down"}`,
    "aria-hidden": "true"
  }), trend) : null, footnote ? /*#__PURE__*/React.createElement("span", null, footnote) : null) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* PubliX Group — Tag. Neutral chip, optionally removable / selectable. */

const CSS = `
.pxg-tag{
  display:inline-flex; align-items:center; gap:.4em;
  font-family:var(--font-text); font-weight:var(--fw-medium); font-size:var(--fs-caption);
  line-height:1; padding:.4em .7em; border-radius:var(--radius-sm);
  background:var(--slate-100); color:var(--slate-700); border:1px solid transparent;
}
.pxg-tag--selectable{ cursor:pointer; transition:background var(--dur-fast), border-color var(--dur-fast), color var(--dur-fast); }
.pxg-tag--selectable:hover{ background:var(--slate-150); }
.pxg-tag--selected{ background:var(--azure-100); color:var(--azure-700); border-color:var(--azure-300); }
.pxg-tag__x{ display:inline-flex; cursor:pointer; opacity:.6; font-size:1.1em; }
.pxg-tag__x:hover{ opacity:1; }
.pxg-tag .ph{ font-size:1.05em; }
`;
let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-tag-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}
function Tag({
  children,
  icon,
  selectable = false,
  selected = false,
  onRemove,
  className = "",
  ...rest
}) {
  useStyle();
  const cls = ["pxg-tag", selectable ? "pxg-tag--selectable" : "", selected ? "pxg-tag--selected" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), icon ? /*#__PURE__*/React.createElement("i", {
    className: `ph ${icon}`,
    "aria-hidden": "true"
  }) : null, children, onRemove ? /*#__PURE__*/React.createElement("span", {
    className: "pxg-tag__x",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    "aria-label": "Remove"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-x",
    "aria-hidden": "true"
  })) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
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
  const cls = ["pxg-btn", `pxg-btn--${variant}`, size !== "md" ? `pxg-btn--${size}` : "", block ? "pxg-btn--block" : "", onNavy ? "pxg-btn--on-navy" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), iconLeft ? /*#__PURE__*/React.createElement("i", {
    className: `ph ${iconLeft}`,
    "aria-hidden": "true"
  }) : null, children ? /*#__PURE__*/React.createElement("span", null, children) : null, iconRight ? /*#__PURE__*/React.createElement("i", {
    className: `ph ${iconRight}`,
    "aria-hidden": "true"
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Checkbox({
  label,
  description,
  className = "",
  ...rest
}) {
  useStyle();
  return /*#__PURE__*/React.createElement("label", {
    className: ["pxg-check", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "pxg-check__box"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-check",
    "aria-hidden": "true"
  })), label || description ? /*#__PURE__*/React.createElement("span", {
    className: "pxg-check__text"
  }, label, description ? /*#__PURE__*/React.createElement("small", null, description) : null) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function IconButton({
  icon,
  variant = "plain",
  size = "md",
  onNavy = false,
  label,
  className = "",
  ...rest
}) {
  useStyle();
  const cls = ["pxg-iconbtn", variant !== "plain" ? `pxg-iconbtn--${variant}` : "", size !== "md" ? `pxg-iconbtn--${size}` : "", onNavy ? "pxg-iconbtn--on-navy" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-label": label
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: `ph ${icon}`,
    "aria-hidden": "true"
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Input({
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
  const inputCls = ["pxg-input", icon ? "pxg-input--with-icon" : "", size !== "md" ? `pxg-input--${size}` : ""].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: ["pxg-field", error ? "pxg-field--error" : "", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "pxg-field__label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "pxg-field__req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "pxg-field__wrap"
  }, icon ? /*#__PURE__*/React.createElement("span", {
    className: "pxg-field__icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${icon}`,
    "aria-hidden": "true"
  })) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: inputCls,
    "aria-invalid": !!error
  }, rest))), msg ? /*#__PURE__*/React.createElement("span", {
    className: "pxg-field__msg"
  }, msg) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Select({
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
  return /*#__PURE__*/React.createElement("div", {
    className: ["pxg-select-field", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "pxg-select-field__label",
    htmlFor: fieldId
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: "pxg-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: selCls
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder) : null, children || options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lbl = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lbl);
  })), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-caret-down pxg-select-wrap__caret",
    "aria-hidden": "true"
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Switch({
  label,
  className = "",
  ...rest
}) {
  useStyle();
  return /*#__PURE__*/React.createElement("label", {
    className: ["pxg-switch", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "pxg-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pxg-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: "pxg-switch__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/* PubliX Group — Tabs. Underline tabs, controlled or uncontrolled. */

const CSS = `
.pxg-tabs{ font-family:var(--font-text); }
.pxg-tabs__list{ display:flex; gap:1.5rem; border-bottom:1px solid var(--border-default); }
.pxg-tab{
  appearance:none; background:none; border:0; cursor:pointer;
  font-family:var(--font-text); font-size:var(--fs-body-sm); font-weight:var(--fw-medium);
  color:var(--text-muted); padding:0 0 .7rem; position:relative; display:inline-flex; align-items:center; gap:.45rem;
  transition:color var(--dur-fast) var(--ease-standard);
}
.pxg-tab .ph{ font-size:1.1em; }
.pxg-tab:hover{ color:var(--text-strong); }
.pxg-tab__bar{ position:absolute; left:0; right:0; bottom:-1px; height:2px; background:var(--azure-600); border-radius:2px 2px 0 0; transform:scaleX(0); transition:transform var(--dur-base) var(--ease-out); }
.pxg-tab--active{ color:var(--navy-800); font-weight:var(--fw-semibold); }
.pxg-tab--active .pxg-tab__bar{ transform:scaleX(1); }
.pxg-tab__count{ font-family:var(--font-mono); font-size:11px; color:var(--text-subtle); background:var(--slate-100); border-radius:var(--radius-pill); padding:1px 7px; }
.pxg-tab--active .pxg-tab__count{ background:var(--azure-100); color:var(--azure-700); }
.pxg-tabs:focus-within .pxg-tab:focus-visible{ outline:none; }
.pxg-tab:focus-visible .pxg-tab__label{ box-shadow:var(--ring); border-radius:3px; }
`;
let injected = false;
function useStyle() {
  if (!injected && typeof document !== "undefined") {
    const s = document.createElement("style");
    s.id = "pxg-tabs-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  className = ""
}) {
  useStyle();
  const isControlled = value !== undefined;
  const first = items[0] && (items[0].id ?? items[0].value ?? items[0].label);
  const [internal, setInternal] = React.useState(defaultValue ?? first);
  const active = isControlled ? value : internal;
  const select = id => {
    if (!isControlled) setInternal(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: ["pxg-tabs", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "pxg-tabs__list",
    role: "tablist"
  }, items.map(it => {
    const id = it.id ?? it.value ?? it.label;
    const isActive = id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      role: "tab",
      "aria-selected": isActive,
      className: ["pxg-tab", isActive ? "pxg-tab--active" : ""].filter(Boolean).join(" "),
      onClick: () => select(id)
    }, it.icon ? /*#__PURE__*/React.createElement("i", {
      className: `ph ${it.icon}`,
      "aria-hidden": "true"
    }) : null, /*#__PURE__*/React.createElement("span", {
      className: "pxg-tab__label"
    }, it.label), it.count != null ? /*#__PURE__*/React.createElement("span", {
      className: "pxg-tab__count"
    }, it.count) : null, /*#__PURE__*/React.createElement("span", {
      className: "pxg-tab__bar"
    }));
  })));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/publix-web/CompaniesSection.jsx
try { (() => {
/* PubliX Group — "Our companies" interactive carousel. */
const {
  Badge: CoBadge,
  IconButton: CoIconBtn,
  Avatar: CoAvatar,
  Button: CoButton
} = window.PubliXGroupDesignSystem_c7bc72;
const COMPANIES = [{
  id: "tidvis",
  name: "Tidvis",
  category: "Social care",
  tone: "brand",
  logo: "../../assets/portfolio/tidvis.jpg",
  person: "Mattias Lind",
  role: "Founder & CEO",
  location: "Åskloster, Sweden",
  url: "tidvis.se",
  desc: "A leading software platform for the Swedish personal-care sector — scheduling, reporting, communication and payroll in one secure system."
}, {
  id: "digiplant",
  name: "digiPlant",
  category: "Associations / NGOs",
  tone: "info",
  logo: "../../assets/portfolio/digiplant.png",
  person: "Alexander Törnqvist",
  role: "Co-Founder & CEO",
  location: "Örebro, Sweden",
  url: "digiplant.se",
  desc: "SBS Manager — a complete application-management system for grants and sponsorships from foundations, funds and grant providers."
}, {
  id: "aspicore",
  name: "Aspicore",
  category: "Associations / NGOs",
  tone: "info",
  logo: "../../assets/portfolio/aspicore.png",
  person: "Juha Tanner",
  role: "Co-Founder & CEO",
  location: "Espoo, Finland",
  url: "aspicore.com",
  desc: "Apuraha4 automates the full grant lifecycle — applications, decisions, payments, reporting — saving time and improving transparency."
}, {
  id: "koivu",
  name: "Koivu Solutions",
  category: "Healthcare",
  tone: "success",
  logo: "../../assets/portfolio/sotender.png",
  person: "Janne Salmi",
  role: "Co-Founder & CEO",
  location: "Pori, Finland",
  url: "sotender.io",
  desc: "Sotender — an easy-to-use mobile app connecting healthcare workers with open shifts, with measurable impact for providers and staff."
}, {
  id: "embrace",
  name: "Embrace Safety",
  category: "Municipalities",
  tone: "warning",
  logo: "../../assets/portfolio/embrace.png",
  person: "Johan Rydberg",
  role: "CEO & Head of Sales",
  location: "Örebro, Sweden",
  url: "embrace-safety.se",
  desc: "EMBRACE — a powerful, easy-to-use platform for municipalities and police authorities in daily crime-prevention and safety work."
}];
function CompaniesSection() {
  const [i, setI] = React.useState(0);
  const c = COMPANIES[i];
  const go = d => setI(p => (p + d + COMPANIES.length) % COMPANIES.length);
  return /*#__PURE__*/React.createElement("section", {
    className: "web-companies",
    id: "companies"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-companies__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "web-eyebrow web-eyebrow--azure"
  }, "Our companies"), /*#__PURE__*/React.createElement("h2", {
    className: "web-h2"
  }, "Founder-led, mission-driven")), /*#__PURE__*/React.createElement("div", {
    className: "web-companies__nav"
  }, /*#__PURE__*/React.createElement(CoIconBtn, {
    icon: "ph-caret-left",
    variant: "outline",
    label: "Previous",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(CoIconBtn, {
    icon: "ph-caret-right",
    variant: "outline",
    label: "Next",
    onClick: () => go(1)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "web-co-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-co-card__media"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-co-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: c.logo,
    alt: c.name
  })), /*#__PURE__*/React.createElement(CoBadge, {
    tone: c.tone
  }, c.category)), /*#__PURE__*/React.createElement("div", {
    className: "web-co-card__body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "web-co-card__name"
  }, c.name), /*#__PURE__*/React.createElement("p", {
    className: "web-co-card__desc"
  }, c.desc), /*#__PURE__*/React.createElement("div", {
    className: "web-co-card__foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-co-person"
  }, /*#__PURE__*/React.createElement(CoAvatar, {
    name: c.person,
    tone: "navy"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "web-co-person__name"
  }, c.person), /*#__PURE__*/React.createElement("div", {
    className: "web-co-person__role"
  }, c.role, " \xB7 ", c.location))), /*#__PURE__*/React.createElement(CoButton, {
    as: "a",
    href: "#",
    variant: "secondary",
    iconRight: "ph-arrow-up-right",
    onClick: e => e.preventDefault()
  }, c.url)))), /*#__PURE__*/React.createElement("div", {
    className: "web-co-dots"
  }, COMPANIES.map((co, idx) => /*#__PURE__*/React.createElement("button", {
    key: co.id,
    "aria-label": co.name,
    className: "web-co-dot" + (idx === i ? " web-co-dot--active" : ""),
    onClick: () => setI(idx)
  }, co.name)))));
}
window.CompaniesSection = CompaniesSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/publix-web/CompaniesSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/publix-web/MissionSection.jsx
try { (() => {
/* PubliX Group — mission section + impact stats strip. */
const {
  Button: MissionBtn,
  StatCard: PXStatCard
} = window.PubliXGroupDesignSystem_c7bc72;
function MissionSection({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "web-mission",
    id: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-mission__grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "web-eyebrow web-eyebrow--azure"
  }, "How we work"), /*#__PURE__*/React.createElement("h2", {
    className: "web-h2"
  }, "Public services deserve better digital tools")), /*#__PURE__*/React.createElement("div", {
    className: "web-mission__body"
  }, /*#__PURE__*/React.createElement("p", null, "Public services in the Northern European market are under-digitized and often inefficient. PubliX Group exists to change that \u2014 we believe the future of public services lies in agile, digital innovation, developed by people who care deeply about their area of expertise."), /*#__PURE__*/React.createElement("p", null, "Rather than acting as a holding company, we function as an ", /*#__PURE__*/React.createElement("strong", null, "accelerator"), " \u2014 helping our companies scale faster through shared resources, joint knowledge, and operational support."), /*#__PURE__*/React.createElement(MissionBtn, {
    variant: "ghost",
    iconRight: "ph-arrow-right",
    onClick: () => onNav("companies")
  }, "Meet the companies"))), /*#__PURE__*/React.createElement("div", {
    className: "web-stats"
  }, /*#__PURE__*/React.createElement(PXStatCard, {
    label: "Portfolio companies",
    value: "5",
    icon: "ph-buildings",
    footnote: "Sweden & Finland"
  }), /*#__PURE__*/React.createElement(PXStatCard, {
    label: "Initial capital",
    value: "SEK 300M+",
    icon: "ph-vault",
    footnote: "+ 500M\u20131bn to invest"
  }), /*#__PURE__*/React.createElement(PXStatCard, {
    label: "Annual savings",
    value: "\u20AC7.0M",
    icon: "ph-coins",
    footnote: "Ostrobothnia, via Sotender"
  }), /*#__PURE__*/React.createElement(PXStatCard, {
    label: "Founded",
    value: "2024",
    icon: "ph-flag-banner",
    footnote: "HQ Kungsgatan 37, Stockholm"
  }))));
}
window.MissionSection = MissionSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/publix-web/MissionSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/publix-web/NewsSection.jsx
try { (() => {
/* PubliX Group — News teaser. */
const {
  Badge: NewsBadge,
  Button: NewsBtn
} = window.PubliXGroupDesignSystem_c7bc72;
const ARTICLES = [{
  tag: "Leadership",
  date: "Mar 2026",
  title: "PubliX Group appoints Alexander Hübel as CEO",
  excerpt: "The group builds and develops vertical SaaS companies serving the Nordic public sector, and is backed by Aspira Partners."
}, {
  tag: "Acquisition",
  date: "Aug 2025",
  title: "PubliX Group partners with digiPlant",
  excerpt: "Our second partnership brings SBS Manager — the leading application-management system for foundations — into the group."
}, {
  tag: "Acquisition",
  date: "2025",
  title: "Embrace Safety joins the portfolio",
  excerpt: "EMBRACE strengthens our portfolio of vertical, mission-driven SaaS serving the public sector in the Nordics."
}];
function NewsSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "web-news",
    id: "news"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-companies__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "web-eyebrow web-eyebrow--azure"
  }, "News"), /*#__PURE__*/React.createElement("h2", {
    className: "web-h2"
  }, "From the group")), /*#__PURE__*/React.createElement(NewsBtn, {
    variant: "ghost",
    iconRight: "ph-arrow-right"
  }, "View all news")), /*#__PURE__*/React.createElement("div", {
    className: "web-news__grid"
  }, ARTICLES.map((a, idx) => /*#__PURE__*/React.createElement("a", {
    key: idx,
    className: "web-article",
    href: "#",
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-article__top"
  }, /*#__PURE__*/React.createElement(NewsBadge, {
    tone: "neutral"
  }, a.tag), /*#__PURE__*/React.createElement("span", {
    className: "web-article__date"
  }, a.date)), /*#__PURE__*/React.createElement("h3", {
    className: "web-article__title"
  }, a.title), /*#__PURE__*/React.createElement("p", {
    className: "web-article__excerpt"
  }, a.excerpt), /*#__PURE__*/React.createElement("span", {
    className: "web-article__more"
  }, "Read full story ", /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrow-right"
  })))))));
}
window.NewsSection = NewsSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/publix-web/NewsSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/publix-web/WebCTA.jsx
try { (() => {
/* PubliX Group — CTA + footer (navy, dot-skyline pattern). */
const {
  Button: CtaBtn
} = window.PubliXGroupDesignSystem_c7bc72;
function WebCTA({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "web-cta",
    id: "contact"
  }, /*#__PURE__*/React.createElement("img", {
    className: "web-cta__pattern",
    src: "../../assets/patterns/dot-skyline.svg",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "web-section web-cta__inner"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "web-cta__title"
  }, "Let's talk about the future of public services"), /*#__PURE__*/React.createElement("p", {
    className: "web-cta__sub"
  }, "Whether you're building digital solutions for the public sector or just curious about how we work \u2014 we'd love to hear from you."), /*#__PURE__*/React.createElement(CtaBtn, {
    variant: "accent",
    size: "lg",
    iconRight: "ph-arrow-right"
  }, "Get in touch")));
}
function WebFooter({
  onNav
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "web-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-section web-footer__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-footer__brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/publix-logo-white.svg",
    alt: "PubliX Group"
  }), /*#__PURE__*/React.createElement("p", null, "Uniting founder-led SaaS companies to modernize public services across Northern Europe."), /*#__PURE__*/React.createElement("span", {
    className: "web-footer__org"
  }, "Org. 559485-5487")), /*#__PURE__*/React.createElement("div", {
    className: "web-footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "About us"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("companies");
    }
  }, "Our companies"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("news");
    }
  }, "News"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("contact");
    }
  }, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Career")), /*#__PURE__*/React.createElement("div", {
    className: "web-footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Stockholm office"), /*#__PURE__*/React.createElement("span", null, "Kungsgatan 37, 8tr"), /*#__PURE__*/React.createElement("span", null, "111 56 Stockholm, Sweden"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Privacy policy"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Cookie policy"))), /*#__PURE__*/React.createElement("div", {
    className: "web-footer__base"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 PubliX Group AB"), /*#__PURE__*/React.createElement("span", null, "Backed by Aspira Partners")));
}
window.WebCTA = WebCTA;
window.WebFooter = WebFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/publix-web/WebCTA.jsx", error: String((e && e.message) || e) }); }

// ui_kits/publix-web/WebHero.jsx
try { (() => {
/* PubliX Group — marketing hero. */
const {
  Button: HeroButton
} = window.PubliXGroupDesignSystem_c7bc72;
function WebHero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "web-hero",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-hero__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-hero__copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "web-eyebrow"
  }, "A Nordic GovTech group"), /*#__PURE__*/React.createElement("h1", {
    className: "web-hero__title"
  }, "Building better public services through digital innovation"), /*#__PURE__*/React.createElement("p", {
    className: "web-hero__sub"
  }, "Modernizing essential services, alongside purpose-driven entrepreneurs."), /*#__PURE__*/React.createElement("div", {
    className: "web-hero__actions"
  }, /*#__PURE__*/React.createElement(HeroButton, {
    variant: "primary",
    size: "lg",
    iconRight: "ph-arrow-right",
    onClick: () => onNav("about")
  }, "How we work"), /*#__PURE__*/React.createElement(HeroButton, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNav("companies")
  }, "Our companies"))), /*#__PURE__*/React.createElement("div", {
    className: "web-hero__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/hero-eye.jpg",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "web-hero__media-wash"
  }), /*#__PURE__*/React.createElement("div", {
    className: "web-hero__badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "web-hero__badge-k"
  }, "Backed by"), /*#__PURE__*/React.createElement("span", {
    className: "web-hero__badge-v"
  }, "Aspira Partners")))));
}
window.WebHero = WebHero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/publix-web/WebHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/publix-web/WebNav.jsx
try { (() => {
/* PubliX Group — marketing site nav. Uses DS Button. */
const {
  Button: PXButton
} = window.PubliXGroupDesignSystem_c7bc72;
function WebNav({
  onNav
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const root = document.querySelector(".pxweb");
    const el = root || window;
    const onScroll = () => {
      const y = root ? root.scrollTop : window.scrollY;
      setScrolled(y > 12);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const links = [{
    id: "about",
    label: "About us"
  }, {
    id: "companies",
    label: "Our companies"
  }, {
    id: "news",
    label: "News"
  }, {
    id: "contact",
    label: "Contact"
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "web-nav" + (scrolled ? " web-nav--scrolled" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-nav__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "web-nav__logo",
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("top");
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/publix-logo.svg",
    alt: "PubliX Group"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "web-nav__links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: "#" + l.id,
    onClick: e => {
      e.preventDefault();
      onNav(l.id);
    }
  }, l.label)), /*#__PURE__*/React.createElement("a", {
    className: "web-nav__career",
    href: "#",
    onClick: e => e.preventDefault()
  }, "Career")), /*#__PURE__*/React.createElement(PXButton, {
    variant: "primary",
    size: "sm",
    iconRight: "ph-arrow-right",
    onClick: () => onNav("contact")
  }, "Get in touch")));
}
window.WebNav = WebNav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/publix-web/WebNav.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
