// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router"
import MapView from "../components/map/MapView"
import DamageReportPanel from "../components/reports/DamageReportPanel"
// main.tsx or index.tsx
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"

export const Route = createFileRoute("/")({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="flex flex-1 h-full">
      {/* Map area */}
      <div className="flex-1 relative">
        <MapView />
        {/* Damage report panel overlays map on the right */}
        <DamageReportPanel />
      </div>
    </div>
  )
}