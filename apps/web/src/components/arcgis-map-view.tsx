import { useEffect, useState } from "react"

const mapCenter = "-76.7936,18.0179"

export function ArcGISMapView() {
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    let active = true

    void Promise.all([
      import("@arcgis/map-components/components/arcgis-map/customElement"),
      import("@arcgis/map-components/components/arcgis-zoom/customElement"),
    ])
      .then(() => {
        if (active) {
          setLoadState("ready")
        }
      })
      .catch((error) => {
        console.error("Failed to load ArcGIS map components", error)

        if (active) {
          setLoadState("error")
        }
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#07111d]">
      <arcgis-map
        basemap="arcgis/imagery"
        center={mapCenter}
        zoom="11"
        className="block h-[420px] w-full md:h-[520px]"
      >
        <arcgis-zoom position="top-left" />
      </arcgis-map>

      {loadState !== "ready" ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#07111d]/75 px-6 text-center text-sm text-slate-200 backdrop-blur-sm">
          {loadState === "error"
            ? "ArcGIS failed to load. Check your network connection and try again."
            : "Loading ArcGIS map workspace..."}
        </div>
      ) : null}
    </div>
  )
}
