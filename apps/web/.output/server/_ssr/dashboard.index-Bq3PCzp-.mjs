import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { B as Button$1 } from "../_libs/base-ui__react.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/base-ui__utils.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "border-border bg-input/30 hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button$1,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
const mapCenter = "-76.7936,18.0179";
function ArcGISMapView() {
  const [loadState, setLoadState] = reactExports.useState("loading");
  reactExports.useEffect(() => {
    let active = true;
    void Promise.all([
      import("../_libs/arcgis__map-components.mjs").then(function(n) {
        return n.c;
      }),
      import("../_libs/arcgis__map-components.mjs").then(function(n) {
        return n.a;
      })
    ]).then(() => {
      if (active) {
        setLoadState("ready");
      }
    }).catch((error) => {
      console.error("Failed to load ArcGIS map components", error);
      if (active) {
        setLoadState("error");
      }
    });
    return () => {
      active = false;
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-white/10 bg-[#07111d]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "arcgis-map",
      {
        basemap: "arcgis/imagery",
        center: mapCenter,
        zoom: "11",
        className: "block h-[420px] w-full md:h-[520px]",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("arcgis-zoom", { position: "top-left" })
      }
    ),
    loadState !== "ready" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-[#07111d]/75 px-6 text-center text-sm text-slate-200 backdrop-blur-sm", children: loadState === "error" ? "ArcGIS failed to load. Check your network connection and try again." : "Loading ArcGIS map workspace..." }) : null
  ] });
}
const incidents = [{
  id: "INC-1042",
  type: "Bridge Damage",
  severity: "High",
  confidence: "94%",
  location: "Kingston East Corridor",
  source: "YOLO v1",
  time: "2 min ago"
}, {
  id: "INC-1043",
  type: "Road Washout",
  severity: "Critical",
  confidence: "97%",
  location: "Portmore Coastal Road",
  source: "YOLO v1",
  time: "4 min ago"
}, {
  id: "INC-1044",
  type: "Roof Collapse",
  severity: "Medium",
  confidence: "88%",
  location: "Spanish Town District 3",
  source: "YOLO v1",
  time: "6 min ago"
}];
const summaryCards = [{
  label: "Total Detections",
  value: "126"
}, {
  label: "Critical Alerts",
  value: "19"
}, {
  label: "Areas Monitored",
  value: "8"
}, {
  label: "Model Status",
  value: "Active"
}];
function DashboardPage() {
  const selectedIncident = incidents[1];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80", children: "Live Operations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold tracking-tight", children: "Map-first incident command center" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300", children: "Monitor infrastructure damage indicators, keep the live map dominant, and triage the newest detections from one workspace." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-cyan-400 text-slate-950 hover:bg-cyan-300", children: "Refresh Feed" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: summaryCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(2,6,12,0.28)] backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300", children: card.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-semibold tracking-tight", children: card.value })
    ] }, card.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_380px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_18px_60px_rgba(2,6,12,0.28)] backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold tracking-tight", children: "Map Workspace" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300", children: "ArcGIS live view centered on Kingston, ready for future incident overlays." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200", children: "ArcGIS Online" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArcGISMapView, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(2,6,12,0.28)] backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold tracking-tight", children: "Live Incident Feed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-slate-400", children: "Latest" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: incidents.map((incident) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-slate-950/35 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: incident.type }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300", children: incident.location })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100", children: incident.severity })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-xs text-slate-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: incident.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: incident.time })
            ] })
          ] }, incident.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(2,6,12,0.28)] backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold tracking-tight", children: "Selected Issue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Issue ID", value: selectedIncident.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Infrastructure Type", value: "Road" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Damage Indicator", value: "Washout" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Confidence", value: selectedIncident.confidence }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Source", value: selectedIncident.source }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Location", value: selectedIncident.location })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Detail({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-white/10 pb-4 last:border-b-0 last:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 text-sm text-slate-100", children: value })
  ] });
}
export {
  DashboardPage as component
};
