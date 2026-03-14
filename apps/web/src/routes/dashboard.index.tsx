import { createFileRoute } from "@tanstack/react-router"
import { MapSidebar } from "../components/map-sidebar"

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="relative h-screen overflow-hidden bg-background">
      {/* Map canvas — full viewport, replaced by ArcGIS later */}
      <div className="absolute inset-0">
        <MapCanvas />
      </div>

      {/* Left sidebar overlay */}
      <MapSidebar />

      {/* Stats bar — top-right overlay */}
      <div className="absolute right-4 top-4 z-10">
        <StatsBar />
      </div>
    </div>
  )
}

function MapCanvas() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />
      {/* Ambient radial glow — simulates map depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 45% 55%, oklch(0.17 0.035 220 / 0.6) 0%, transparent 65%)",
        }}
      />
      {/* Placeholder label */}
      <div className="absolute bottom-8 right-8 opacity-40">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Map canvas · ArcGIS
        </p>
      </div>
    </div>
  )
}

function StatsBar() {
  const stats: Array<{ label: string; value: string; critical?: boolean }> = [
    { label: "detections", value: "126" },
    { label: "critical", value: "19", critical: true },
    { label: "areas", value: "8" },
  ]

  return (
    <div className="flex items-center overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-xl">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center">
          {i > 0 && <div className="h-8 w-px bg-border" />}
          <div className="flex items-center gap-1.5 px-4 py-2">
            <span
              className={[
                "text-[13px] font-semibold tabular-nums",
                stat.critical ? "text-red-400" : "text-foreground",
              ].join(" ")}
            >
              {stat.value}
            </span>
            <span className="text-[11px] text-muted-foreground">{stat.label}</span>
          </div>
        </div>
      ))}
      <div className="h-8 w-px bg-border" />
      <div className="flex items-center gap-2 px-4 py-2">
        <span
          className="h-1.5 w-1.5 rounded-full bg-emerald-400"
          style={{ boxShadow: "0 0 6px oklch(0.74 0.2 150 / 0.8)" }}
        />
        <span className="text-[11px] font-medium text-emerald-400">Active</span>
      </div>
    </div>
  )
}
