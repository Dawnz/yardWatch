import type { Feature, FeatureCollection, MultiPolygon } from "geojson";

export const INCIDENT_DATASET_NAME = "melissa_sample_001_building_damage";
export const INCIDENT_SOURCE_FILE = "melissa-damage.geojson";

export type IncidentSeverity = "critical" | "high" | "medium" | "low";
export type IncidentStatus = "damaged" | "undamaged";
export type IncidentBounds = [number, number, number, number];
export type IncidentCentroid = [number, number];

export interface MelissaDamageProperties {
  id: string;
  damage_pct_0m: number;
  damage_pct_10m: number;
  damage_pct_20m: number;
  built_pct_0m: number;
  damaged: number;
  unknown_pct: number;
}

export interface MelissaDamageCollection
  extends FeatureCollection<MultiPolygon, MelissaDamageProperties> {
  name?: string;
}

export type MelissaDamageFeature = Feature<MultiPolygon, MelissaDamageProperties>;

export interface IncidentSummary {
  id: string;
  label: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  damagePct0m: number;
  damagePct10m: number;
  damagePct20m: number;
  builtPct0m: number;
  unknownPct: number;
  centroid: IncidentCentroid;
  bbox: IncidentBounds;
}

export interface IncidentFeatureProperties extends IncidentSummary {
  datasetName: string;
}

export interface IncidentsOverview {
  dataset: {
    name: string;
    sourceFile: string;
    featureCount: number;
    bounds: IncidentBounds | null;
  };
  stats: {
    total: number;
    damaged: number;
    undamaged: number;
    bySeverity: Record<IncidentSeverity, number>;
    avgDamagePct0m: number;
  };
  incidents: IncidentSummary[];
  featureCollection: FeatureCollection<MultiPolygon, IncidentFeatureProperties>;
}

export function classifySeverity(damagePct0m: number): IncidentSeverity {
  if (damagePct0m >= 0.7) {
    return "critical";
  }

  if (damagePct0m >= 0.55) {
    return "high";
  }

  if (damagePct0m >= 0.4) {
    return "medium";
  }

  return "low";
}

export function severityRank(severity: IncidentSeverity) {
  switch (severity) {
    case "critical":
      return 0;
    case "high":
      return 1;
    case "medium":
      return 2;
    case "low":
      return 3;
  }
}

export function toIncidentStatus(damaged: boolean | number): IncidentStatus {
  return Number(damaged) === 1 ? "damaged" : "undamaged";
}

export function toIncidentLabel(status: IncidentStatus) {
  return status === "damaged" ? "Damaged building" : "Undamaged building";
}

export function calculateGeometryMetrics(geometry: MultiPolygon): {
  centroid: IncidentCentroid;
  bounds: IncidentBounds;
} {
  const outerRingPoints = geometry.coordinates.flatMap((polygon) => polygon[0] ?? []);

  if (!outerRingPoints.length) {
    return {
      centroid: [0, 0],
      bounds: [0, 0, 0, 0],
    };
  }

  let minLng = Number.POSITIVE_INFINITY;
  let minLat = Number.POSITIVE_INFINITY;
  let maxLng = Number.NEGATIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;
  let lngSum = 0;
  let latSum = 0;

  for (const [lng, lat] of outerRingPoints) {
    minLng = Math.min(minLng, lng);
    minLat = Math.min(minLat, lat);
    maxLng = Math.max(maxLng, lng);
    maxLat = Math.max(maxLat, lat);
    lngSum += lng;
    latSum += lat;
  }

  return {
    centroid: [lngSum / outerRingPoints.length, latSum / outerRingPoints.length],
    bounds: [minLng, minLat, maxLng, maxLat],
  };
}
