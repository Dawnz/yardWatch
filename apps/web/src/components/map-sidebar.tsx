import { useState } from "react"
import type { ReactNode } from "react"

type Severity = "Critical" | "High" | "Medium" | "Low"

interface Incident {
  id: string
  type: string
  severity: Severity
  confidence: string
  location: string
  source: string
  time: string
}

const INCIDENTS: Incident[] = [
  {
    id: "INC-1043",
    type: "Road Washout",
    severity: "Critical",
    confidence: "97%",
    location: "Portmore Coastal Road",
    source: "YOLO v1",
    time: "4 min ago",
  },
  {
    id: "INC-1042",
    type: "Bridge Damage",
    severity: "High",
    confidence: "94%",
    location: "Kingston East Corridor",
    source: "YOLO v1",
    time: "2 min ago",
  },
  {
    id: "INC-1044",
    type: "Roof Collapse",
    severity: "Medium",
    confidence: "88%",
    location: "Spanish Town District 3",
    source: "YOLO v1",
    time: "6 min ago",
  },
]

const SEVERITY_DOT: Record<Severity, string> = {
  Critical: "bg-red-500",
  High: "bg-orange-400",
  Medium: "bg-yellow-400",
  Low: "bg-emerald-400",
}

const SEVERITY_BADGE: Record<Severity, string> = {
  Critical: "text-red-400 bg-red-500/10 border-red-500/20",
  High: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Low: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
}

function SectionLabel({ label, trailing }: { label: string; trailing?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 pb-1.5 pt-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
        {label}
      </p>
      {trailing}
    </div>
  )
}

function Divider() {
  return <div className="mx-4 my-0.5 border-t border-sidebar-border" />
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={[
        "relative inline-flex h-[18px] w-8 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200",
        checked ? "bg-sidebar-primary" : "bg-input",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none absolute top-[2px] h-[14px] w-[14px] rounded-full bg-sidebar-foreground shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-transform duration-200",
          checked ? "translate-x-[16px]" : "translate-x-[2px]",
        ].join(" ")}
      />
    </button>
  )
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center justify-between px-4 py-[5px] transition-colors hover:bg-sidebar-accent">
      <span className="text-[12px] text-muted-foreground">{label}</span>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

function ChevronLeft() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M7.5 2.5L4.5 6L7.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M4.5 2.5L7.5 6L4.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MapSidebar() {
  const [expanded, setExpanded] = useState(true)
  const [selectedId, setSelectedId] = useState("INC-1043")

  // Map controls
  const [basemap, setBasemap] = useState("Imagery")
  const [zoom, setZoom] = useState(11)

  // Layers
  const [layers, setLayers] = useState({
    incidentMarkers: true,
    infrastructureDamage: true,
    floodZones: false,
    roadNetwork: false,
    communityBoundaries: true,
    damageHotspots: true,
  })

  // Display
  const [display, setDisplay] = useState({
    clusterIncidents: true,
    heatMapView: false,
    confidenceScores: true,
  })
  const [labelDensity, setLabelDensity] = useState(1)

  // Filter
  const [filterSeverity, setFilterSeverity] = useState("All")
  const [filterTime, setFilterTime] = useState("24h")
  const [filterType, setFilterType] = useState("All")

  const toggleLayer = (key: keyof typeof layers) =>
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }))

  const toggleDisplay = (key: keyof typeof display) =>
    setDisplay((prev) => ({ ...prev, [key]: !prev[key] }))

  const selectedIncident = INCIDENTS.find((i) => i.id === selectedId) ?? INCIDENTS[0]
  const activeLayerCount = Object.values(layers).filter(Boolean).length

  return (
    <div
      className={[
        "absolute left-0 top-0 z-10 flex h-full flex-col",
        "border-r border-sidebar-border",
        "bg-sidebar/95 backdrop-blur-xl",
        "transition-all duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        expanded ? "w-[280px]" : "w-10",
      ].join(" ")}
    >
      {/* ── HEADER ─────────────────────────────── */}
      <div className="flex flex-shrink-0 items-center border-b border-sidebar-border px-3 py-3">
        {expanded ? (
          <>
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-sidebar-primary">
                <span className="text-[9px] font-bold tracking-tight text-sidebar-primary-foreground">
                  YW
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold tracking-tight text-sidebar-foreground">
                  YardWatch
                </p>
                <p className="truncate text-[9px] text-muted-foreground">Disaster Assessment</p>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span className="whitespace-nowrap text-[9px] font-medium text-emerald-400">
                  YOLO v1
                </span>
              </span>
              <button
                onClick={() => setExpanded(false)}
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft />
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => setExpanded(true)}
            className="mx-auto flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            aria-label="Expand sidebar"
          >
            <ChevronRight />
          </button>
        )}
      </div>

      {/* ── SCROLLABLE BODY ────────────────────── */}
      {expanded && (
        <div className="flex-1 overflow-y-auto pb-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-sidebar-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">

          {/* MAP CONTROLS */}
          <SectionLabel label="Map Controls" />

          <div className="px-4 pb-2">
            <p className="mb-1.5 text-[10px] text-muted-foreground/60">Basemap</p>
            <div className="grid grid-cols-2 gap-1">
              {["Imagery", "Streets", "Topo", "Navigation"].map((bm) => (
                <label
                  key={bm}
                  className={[
                    "flex cursor-pointer items-center gap-1.5 rounded-md border px-2 py-1.5 text-[11px] transition-colors",
                    basemap === bm
                      ? "border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground"
                      : "border-transparent text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="basemap"
                    value={bm}
                    checked={basemap === bm}
                    onChange={() => setBasemap(bm)}
                    className="sr-only"
                  />
                  <span
                    className={[
                      "h-2 w-2 flex-shrink-0 rounded-full border transition-colors",
                      basemap === bm
                        ? "border-sidebar-primary bg-sidebar-primary"
                        : "border-muted-foreground/30 bg-transparent",
                    ].join(" ")}
                  />
                  {bm}
                </label>
              ))}
            </div>
          </div>

          <div className="px-4 pb-3">
            <p className="mb-1.5 text-[10px] text-muted-foreground/60">Zoom</p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setZoom((z) => Math.max(1, z - 1))}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-input text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                −
              </button>
              <span className="w-8 text-center text-[12px] tabular-nums text-muted-foreground">
                {zoom}
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(22, z + 1))}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-input text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                +
              </button>
              <button className="ml-1 flex h-6 whitespace-nowrap items-center rounded-md border border-border bg-input px-2 text-[10px] text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                ⊞ Fit extent
              </button>
            </div>
          </div>

          <Divider />

          {/* LAYERS */}
          <SectionLabel
            label="Layers"
            trailing={
              <span className="text-[10px] text-muted-foreground/40">
                {activeLayerCount}/{Object.keys(layers).length}
              </span>
            }
          />

          <ToggleRow
            label="Incident Markers"
            checked={layers.incidentMarkers}
            onChange={() => toggleLayer("incidentMarkers")}
          />
          <ToggleRow
            label="Infrastructure Damage"
            checked={layers.infrastructureDamage}
            onChange={() => toggleLayer("infrastructureDamage")}
          />
          <ToggleRow
            label="Damage Hotspots"
            checked={layers.damageHotspots}
            onChange={() => toggleLayer("damageHotspots")}
          />
          <ToggleRow
            label="Flood Zones"
            checked={layers.floodZones}
            onChange={() => toggleLayer("floodZones")}
          />
          <ToggleRow
            label="Road Network"
            checked={layers.roadNetwork}
            onChange={() => toggleLayer("roadNetwork")}
          />
          <ToggleRow
            label="Community Boundaries"
            checked={layers.communityBoundaries}
            onChange={() => toggleLayer("communityBoundaries")}
          />

          <Divider />

          {/* DISPLAY */}
          <SectionLabel label="Display" />

          <ToggleRow
            label="Cluster incidents"
            checked={display.clusterIncidents}
            onChange={() => toggleDisplay("clusterIncidents")}
          />
          <ToggleRow
            label="Heat map view"
            checked={display.heatMapView}
            onChange={() => toggleDisplay("heatMapView")}
          />
          <ToggleRow
            label="Confidence scores"
            checked={display.confidenceScores}
            onChange={() => toggleDisplay("confidenceScores")}
          />

          <div className="px-4 py-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[12px] text-muted-foreground">Label density</span>
              <span className="font-mono text-[10px] text-muted-foreground/60">
                {["Low", "Med", "High"][labelDensity]}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={2}
              step={1}
              value={labelDensity}
              onChange={(e) => setLabelDensity(Number(e.target.value))}
              className="h-1 w-full cursor-pointer rounded-full accent-[var(--color-sidebar-primary)]"
            />
            <div className="mt-1 flex justify-between text-[9px] text-muted-foreground/40">
              <span>Low</span>
              <span>Med</span>
              <span>High</span>
            </div>
          </div>

          <Divider />

          {/* FILTER */}
          <SectionLabel label="Filter" />

          <div className="space-y-2 px-4 pb-3">
            {[
              {
                label: "Severity",
                value: filterSeverity,
                onChange: setFilterSeverity,
                options: ["All", "Critical", "High", "Medium", "Low"],
              },
              {
                label: "Time range",
                value: filterTime,
                onChange: setFilterTime,
                options: ["1h", "6h", "24h", "7d", "All"],
              },
              {
                label: "Type",
                value: filterType,
                onChange: setFilterType,
                options: ["All", "Road", "Bridge", "Building", "Utility"],
              },
            ].map(({ label, value, onChange, options }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[12px] text-muted-foreground">{label}</span>
                <select
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="h-6 cursor-pointer rounded-md border border-border bg-input px-2 text-[11px] text-muted-foreground outline-none focus:ring-1 focus:ring-sidebar-ring"
                >
                  {options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <Divider />

          {/* LIVE INCIDENTS */}
          <SectionLabel
            label={`Live Incidents (${INCIDENTS.length})`}
            trailing={
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/40">
                Latest
              </span>
            }
          />

          <div className="space-y-px px-3 pb-2">
            {INCIDENTS.map((incident) => {
              const isSelected = incident.id === selectedId
              return (
                <button
                  key={incident.id}
                  onClick={() => setSelectedId(incident.id)}
                  className={[
                    "w-full rounded-lg px-3 py-2.5 text-left transition-all",
                    isSelected
                      ? "border border-sidebar-border bg-sidebar-accent"
                      : "border border-transparent hover:bg-sidebar-accent",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={[
                          "mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                          SEVERITY_DOT[incident.severity],
                        ].join(" ")}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-medium text-sidebar-foreground">
                          {incident.type}
                        </p>
                        <p className="truncate text-[10px] text-muted-foreground">
                          {incident.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span
                        className={[
                          "inline-block rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
                          SEVERITY_BADGE[incident.severity],
                        ].join(" ")}
                      >
                        {incident.severity}
                      </span>
                      <p className="mt-0.5 font-mono text-[9px] text-muted-foreground/60">
                        {incident.confidence}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-muted-foreground/50">
                      {incident.id}
                    </span>
                    <span className="text-[9px] text-muted-foreground/50">{incident.time}</span>
                  </div>
                </button>
              )
            })}
          </div>

          <Divider />

          {/* SELECTED INCIDENT */}
          <SectionLabel label={`Selected · ${selectedIncident.id}`} />

          <div className="mx-3 mb-3 overflow-hidden rounded-xl border border-border bg-muted">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "h-1.5 w-1.5 rounded-full",
                    SEVERITY_DOT[selectedIncident.severity],
                  ].join(" ")}
                />
                <span className="text-[12px] font-medium text-sidebar-foreground">
                  {selectedIncident.type}
                </span>
              </div>
              <span
                className={[
                  "inline-flex items-center rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
                  SEVERITY_BADGE[selectedIncident.severity],
                ].join(" ")}
              >
                {selectedIncident.severity}
              </span>
            </div>

            <div className="divide-y divide-border">
              {[
                { label: "Infrastructure", value: "Road" },
                { label: "Damage type", value: selectedIncident.type.split(" ").pop() ?? "" },
                { label: "Confidence", value: selectedIncident.confidence },
                { label: "Source", value: selectedIncident.source },
                { label: "Location", value: selectedIncident.location },
                { label: "Detected", value: selectedIncident.time },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-3 py-1.5">
                  <span className="text-[10px] text-muted-foreground">{label}</span>
                  <span className="max-w-[130px] truncate text-right text-[11px] text-sidebar-foreground">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ─────────────────────────────── */}
      {expanded && (
        <div className="flex-shrink-0 border-t border-sidebar-border px-4 py-2">
          <p className="font-mono text-[9px] text-muted-foreground/40">
            18.0179° N, 76.7936° W · Zoom {zoom}
          </p>
        </div>
      )}
    </div>
  )
}
