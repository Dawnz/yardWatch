import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
function DashboardLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-svh bg-[radial-gradient(circle_at_top,_rgba(38,88,145,0.28),_transparent_42%),linear-gradient(180deg,_#02060c_0%,_#08101b_100%)] text-slate-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-white/10 bg-slate-950/55 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80", children: "YardWatch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight", children: "Disaster Assessment Platform" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "inline-flex h-9 items-center justify-center rounded-4xl border border-cyan-400/30 bg-slate-950/40 px-3 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-900/70", children: "Operations" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  DashboardLayout as component
};
