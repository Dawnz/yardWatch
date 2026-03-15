import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { GeoJSONSource, LngLatBoundsLike, Map as MapboxMap, Popup } from "mapbox-gl";
import { MapSidebar } from "../components/map-sidebar";

import "mapbox-gl/dist/mapbox-gl.css";

import type { DashboardIncident, DashboardOverview } from "@/lib/incidents";
import { SEVERITY_FILL, formatPercent, formatSeverity } from "@/lib/incidents";
import { env } from "@/lib/env";
import { useTRPC } from "@/lib/trpc";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

const MELISSA_CENTER: [number, number] = [-78.1313, 18.3072];
const MAP_STYLE = "mapbox://styles/mapbox/satellite-streets-v12";
const MAP_DEBUG_PREFIX = "[YardWatchMap]";
const INCIDENTS_SOURCE_ID = "incidents";
const INCIDENTS_FILL_LAYER_ID = "incidents-fill";
const INCIDENTS_OUTLINE_LAYER_ID = "incidents-outline";
const INCIDENTS_SELECTED_LAYER_ID = "incidents-selected";
const DATASET_PADDING = { top: 48, right: 48, bottom: 48, left: 336 };
const INCIDENT_PADDING = { top: 72, right: 72, bottom: 72, left: 336 };

function maskToken(token: string) {
  if (!token) {
    return "missing";
  }

  if (token.length <= 12) {
    return `${token.slice(0, 4)}...`;
  }

  return `${token.slice(0, 6)}...${token.slice(-6)}`;
}

function toMapboxBounds(bounds: [number, number, number, number]): LngLatBoundsLike {
  return [
    [bounds[0], bounds[1]],
    [bounds[2], bounds[3]],
  ];
}

function DashboardPage() {
  const trpc = useTRPC();
  const overviewQuery = useQuery(trpc.incidents.overview.queryOptions());
  const overview = overviewQuery.data;
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [selectionSerial, setSelectionSerial] = useState(0);
  const [fitExtentSerial, setFitExtentSerial] = useState(0);

  useEffect(() => {
    if (!selectedIncidentId && overview?.incidents[0]) {
      setSelectedIncidentId(overview.incidents[0].id);
    }
  }, [overview, selectedIncidentId]);

  const selectedIncident =
    overview?.incidents.find((incident) => incident.id === selectedIncidentId) ??
    overview?.incidents[0] ??
    null;

  function handleSelectIncident(incidentId: string) {
    setSelectedIncidentId(incidentId);
    setSelectionSerial((current) => current + 1);
  }

  function handleFitDataset() {
    setFitExtentSerial((current) => current + 1);
  }

  return (
    <div className="relative h-screen overflow-hidden bg-background">
      <div className="absolute inset-0">
        <MapCanvas
          overview={overview}
          selectedIncident={selectedIncident}
          selectedIncidentId={selectedIncidentId}
          selectionSerial={selectionSerial}
          fitExtentSerial={fitExtentSerial}
          onSelectIncident={handleSelectIncident}
          isQueryPending={overviewQuery.isPending}
          queryErrorMessage={overviewQuery.error?.message}
        />
      </div>

      <MapSidebar
        overview={overview}
        selectedIncidentId={selectedIncidentId}
        onSelectIncident={handleSelectIncident}
        onFitDataset={handleFitDataset}
        isLoading={overviewQuery.isPending}
        isError={overviewQuery.isError}
        errorMessage={overviewQuery.error?.message}
      />

      <div className="absolute right-4 top-4 z-10">
        <StatsBar overview={overview} isLoading={overviewQuery.isPending} />
      </div>
    </div>
  );
}

interface MapCanvasProps {
  overview?: DashboardOverview;
  selectedIncident: DashboardIncident | null;
  selectedIncidentId: string | null;
  selectionSerial: number;
  fitExtentSerial: number;
  onSelectIncident: (incidentId: string) => void;
  isQueryPending: boolean;
  queryErrorMessage?: string;
}

function MapCanvas({
  overview,
  selectedIncident,
  selectedIncidentId,
  selectionSerial,
  fitExtentSerial,
  onSelectIncident,
  isQueryPending,
  queryErrorMessage,
}: MapCanvasProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const mapboxModuleRef = useRef<typeof import("mapbox-gl").default | null>(null);
  const popupRef = useRef<Popup | null>(null);
  const hasLayerHandlersRef = useRef(false);
  const hasFittedDatasetRef = useRef(false);
  const onSelectIncidentRef = useRef(onSelectIncident);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  onSelectIncidentRef.current = onSelectIncident;

  useEffect(() => {
    let cancelled = false;
    let loadTimeoutId: number | undefined;
    let resizeTimeoutId: number | undefined;
    let resizeObserver: ResizeObserver | undefined;

    async function initializeMap() {
      if (!mapContainerRef.current || mapRef.current) {
        return;
      }

      try {
        console.info(MAP_DEBUG_PREFIX, "Starting map initialization", {
          center: MELISSA_CENTER,
          style: MAP_STYLE,
          token: maskToken(env.VITE_MAP_BOX_API_KEY),
        });

        const { default: mapboxgl } = await import("mapbox-gl");

        if (cancelled || !mapContainerRef.current) {
          return;
        }

        mapboxgl.accessToken = env.VITE_MAP_BOX_API_KEY;
        mapboxModuleRef.current = mapboxgl;

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: MAP_STYLE,
          center: MELISSA_CENTER,
          zoom: 15,
          bearing: 0,
          pitch: 0,
          attributionControl: false,
        });

        mapRef.current = map;
        map.addControl(
          new mapboxgl.NavigationControl({ visualizePitch: true }),
          "top-right",
        );
        map.addControl(new mapboxgl.ScaleControl({ unit: "metric" }), "bottom-right");

        resizeObserver = new ResizeObserver(() => {
          if (!cancelled) {
            map.resize();
          }
        });
        resizeObserver.observe(mapContainerRef.current);

        requestAnimationFrame(() => {
          if (!cancelled) {
            map.resize();
          }
        });

        resizeTimeoutId = window.setTimeout(() => {
          if (!cancelled) {
            map.resize();
          }
        }, 250);

        loadTimeoutId = window.setTimeout(() => {
          console.warn(MAP_DEBUG_PREFIX, "Map still waiting for load event", {
            isStyleLoaded: map.isStyleLoaded(),
            center: map.getCenter().toArray(),
            zoom: map.getZoom(),
          });
        }, 8000);

        map.once("load", () => {
          if (cancelled) {
            return;
          }

          if (loadTimeoutId) {
            window.clearTimeout(loadTimeoutId);
          }

          setStatus("ready");
          setErrorMessage(null);
        });

        map.on("error", (event) => {
          if (cancelled) {
            return;
          }

          if (loadTimeoutId) {
            window.clearTimeout(loadTimeoutId);
          }

          setStatus("error");
          setErrorMessage(
            event.error?.message ?? "Mapbox could not load the requested style.",
          );
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Mapbox failed to initialize.",
        );
      }
    }

    void initializeMap();

    return () => {
      cancelled = true;
      if (loadTimeoutId) {
        window.clearTimeout(loadTimeoutId);
      }
      if (resizeTimeoutId) {
        window.clearTimeout(resizeTimeoutId);
      }
      resizeObserver?.disconnect();
      popupRef.current?.remove();
      popupRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
      hasLayerHandlersRef.current = false;
      hasFittedDatasetRef.current = false;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || status !== "ready" || !overview) {
      return;
    }

    const source = map.getSource(INCIDENTS_SOURCE_ID) as GeoJSONSource | undefined;

    if (!source) {
      map.addSource(INCIDENTS_SOURCE_ID, {
        type: "geojson",
        data: overview.featureCollection,
        promoteId: "id",
      });

      map.addLayer({
        id: INCIDENTS_FILL_LAYER_ID,
        type: "fill",
        source: INCIDENTS_SOURCE_ID,
        paint: {
          "fill-color": [
            "match",
            ["get", "severity"],
            "critical",
            SEVERITY_FILL.critical,
            "high",
            SEVERITY_FILL.high,
            "medium",
            SEVERITY_FILL.medium,
            SEVERITY_FILL.low,
          ],
          "fill-opacity": 0.45,
        },
      });

      map.addLayer({
        id: INCIDENTS_OUTLINE_LAYER_ID,
        type: "line",
        source: INCIDENTS_SOURCE_ID,
        paint: {
          "line-color": "#0f172a",
          "line-width": 1.25,
          "line-opacity": 0.95,
        },
      });

      map.addLayer({
        id: INCIDENTS_SELECTED_LAYER_ID,
        type: "line",
        source: INCIDENTS_SOURCE_ID,
        filter: ["==", ["get", "id"], ""],
        paint: {
          "line-color": "#ffffff",
          "line-width": 3,
          "line-opacity": 1,
        },
      });
    } else {
      source.setData(overview.featureCollection);
    }

    if (!hasLayerHandlersRef.current) {
      map.on("click", INCIDENTS_FILL_LAYER_ID, (event) => {
        const clickedId = event.features?.[0]?.properties?.id;
        if (typeof clickedId === "string") {
          onSelectIncidentRef.current(clickedId);
        }
      });

      map.on("mouseenter", INCIDENTS_FILL_LAYER_ID, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", INCIDENTS_FILL_LAYER_ID, () => {
        map.getCanvas().style.cursor = "";
      });

      hasLayerHandlersRef.current = true;
    }

    if (!hasFittedDatasetRef.current && overview.dataset.bounds) {
      map.fitBounds(toMapboxBounds(overview.dataset.bounds), {
        padding: DATASET_PADDING,
        duration: 0,
      });
      hasFittedDatasetRef.current = true;
    }
  }, [overview, status]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer(INCIDENTS_SELECTED_LAYER_ID)) {
      return;
    }

    map.setFilter(INCIDENTS_SELECTED_LAYER_ID, [
      "==",
      ["get", "id"],
      selectedIncidentId ?? "",
    ]);
  }, [selectedIncidentId, status]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !overview?.dataset.bounds || fitExtentSerial === 0) {
      return;
    }

    map.fitBounds(toMapboxBounds(overview.dataset.bounds), {
      padding: DATASET_PADDING,
      duration: 900,
    });
  }, [fitExtentSerial, overview]);

  useEffect(() => {
    const map = mapRef.current;
    const mapboxgl = mapboxModuleRef.current;
    if (!map || !mapboxgl || !selectedIncident || selectionSerial === 0) {
      return;
    }

    popupRef.current?.remove();
    popupRef.current = new mapboxgl.Popup({
      offset: 18,
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(selectedIncident.centroid)
      .setHTML(
        `<strong>${selectedIncident.label}</strong><br />${formatSeverity(
          selectedIncident.severity,
        )} · ${formatPercent(selectedIncident.damagePct0m)}`,
      )
      .addTo(map);

    map.fitBounds(toMapboxBounds(selectedIncident.bbox), {
      padding: INCIDENT_PADDING,
      duration: 900,
      maxZoom: 18,
    });
  }, [selectedIncident, selectionSerial]);

  const overlayMessage =
    status === "error"
      ? errorMessage
      : queryErrorMessage
        ? "The incidents API returned an error."
        : status === "loading"
          ? "Initializing the Mapbox canvas."
          : isQueryPending
            ? "Loading Melissa detections and polygon overlays."
            : !overview?.incidents.length
              ? "No incidents available yet. Seed the Melissa dataset to draw polygons."
              : null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div
        ref={mapContainerRef}
        className="absolute inset-0 h-full w-full"
        style={{ width: "100%", height: "100%" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 45% 55%, oklch(0.17 0.035 220 / 0.52) 0%, transparent 68%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

      {overlayMessage ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-sm rounded-2xl border border-border bg-card/85 px-4 py-3 backdrop-blur-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {status === "error" || queryErrorMessage ? "Map Error" : "Mapbox"}
            </p>
            <p className="mt-2 text-sm text-foreground">
              {overlayMessage}
            </p>
          </div>
        </div>
      ) : null}

      <div className="absolute bottom-8 right-8 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-md">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/75">
          Melissa polygon overlay
        </p>
      </div>
    </div>
  );
}

function StatsBar({
  overview,
  isLoading,
}: {
  overview?: DashboardOverview;
  isLoading: boolean;
}) {
  const stats = overview
    ? [
        { label: "detections", value: overview.stats.total.toString() },
        { label: "damaged", value: overview.stats.damaged.toString() },
        {
          label: "critical",
          value: overview.stats.bySeverity.critical.toString(),
          critical: true,
        },
      ]
    : [
        { label: "detections", value: "--" },
        { label: "damaged", value: "--" },
        { label: "critical", value: "--", critical: true },
      ];

  return (
    <div className="flex items-center overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-xl">
      {stats.map((stat, index) => (
        <div key={stat.label} className="flex items-center">
          {index > 0 ? <div className="h-8 w-px bg-border" /> : null}
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
          className={[
            "h-1.5 w-1.5 rounded-full",
            isLoading ? "bg-yellow-400" : "bg-emerald-400",
          ].join(" ")}
        />
        <span
          className={[
            "text-[11px] font-medium",
            isLoading ? "text-yellow-400" : "text-emerald-400",
          ].join(" ")}
        >
          {isLoading ? "Loading" : "Active"}
        </span>
      </div>
    </div>
  );
}
