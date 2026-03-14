// src/components/map/MapView.tsx
import React, { useEffect, useRef } from "react"
import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet"
import L from "leaflet"
import "leaflet-draw"

const center: [number, number] = [18.4767, -77.8939] // Montego Bay

const MapView: React.FC = () => {
  const featureGroupRef = useRef<L.FeatureGroup>(null)

  useEffect(() => {
    if (!featureGroupRef.current) return
    const map = featureGroupRef.current._map
    if (!map) return

    // Initialize Leaflet Draw
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: featureGroupRef.current!,
      },
      draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
    })
    map.addControl(drawControl)

    // Event: polygon created
    map.on(L.Draw.Event.CREATED, function (e: any) {
      const layer = e.layer
      featureGroupRef.current?.addLayer(layer)

      // Get polygon coordinates
      const coords = layer.getLatLngs()[0].map((latlng: L.LatLng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      }))
      console.log("Selected Area Coordinates:", coords)

      // TODO: send coords to DamageReportPanel
    })
  }, [])

  // Example polygon (optional, initial)
  const examplePolygon: [number, number][] = [
    [18.48, -77.91],
    [18.48, -77.88],
    [18.46, -77.88],
    [18.46, -77.91],
  ]

  return (
    <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup ref={featureGroupRef}>
        <Polygon positions={examplePolygon} pathOptions={{ color: "red" }} />
      </FeatureGroup>
    </MapContainer>
  )
}

export default MapView