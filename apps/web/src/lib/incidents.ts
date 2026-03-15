import type {
  IncidentBounds,
  IncidentSeverity,
  IncidentSummary,
  IncidentsOverview,
} from "@workspace/api/router";

export type DashboardIncident = IncidentSummary;
export type DashboardOverview = IncidentsOverview;

export const SEVERITY_DOT: Record<IncidentSeverity, string> = {
  critical: "bg-red-500",
  high: "bg-orange-400",
  medium: "bg-yellow-400",
  low: "bg-emerald-400",
};

export const SEVERITY_BADGE: Record<IncidentSeverity, string> = {
  critical: "border-red-500/20 bg-red-500/10 text-red-400",
  high: "border-orange-400/20 bg-orange-400/10 text-orange-400",
  medium: "border-yellow-400/20 bg-yellow-400/10 text-yellow-400",
  low: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
};

export const SEVERITY_FILL: Record<IncidentSeverity, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#facc15",
  low: "#22c55e",
};

export function formatSeverity(severity: IncidentSeverity) {
  return severity.charAt(0).toUpperCase() + severity.slice(1);
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function formatCoordinate(value: number, positiveLabel: string, negativeLabel: string) {
  const direction = value >= 0 ? positiveLabel : negativeLabel;
  return `${Math.abs(value).toFixed(4)}° ${direction}`;
}

export function formatLngLat([lng, lat]: [number, number]) {
  return `${formatCoordinate(lat, "N", "S")} · ${formatCoordinate(lng, "E", "W")}`;
}

export function formatBounds(bounds: IncidentBounds) {
  return `${formatCoordinate(bounds[1], "N", "S")} to ${formatCoordinate(
    bounds[3],
    "N",
    "S",
  )} · ${formatCoordinate(bounds[0], "E", "W")} to ${formatCoordinate(
    bounds[2],
    "E",
    "W",
  )}`;
}
