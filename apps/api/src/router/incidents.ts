import { desc, incidents, sql } from "@workspace/db";
import type { FeatureCollection, MultiPolygon } from "geojson";
import {
  INCIDENT_SOURCE_FILE,
  type IncidentFeatureProperties,
  type IncidentSeverity,
  type IncidentSummary,
  type IncidentsOverview,
  severityRank,
  toIncidentLabel,
  toIncidentStatus,
} from "../incidents";
import { publicProcedure, router } from "../trpc";

export const incidentsRouter = router({
  overview: publicProcedure.query(async ({ ctx }): Promise<IncidentsOverview> => {
    const severityOrder = sql<number>`
      case
        when ${incidents.severity} = 'critical' then 0
        when ${incidents.severity} = 'high' then 1
        when ${incidents.severity} = 'medium' then 2
        else 3
      end
    `;

    const rows = await ctx.db
      .select()
      .from(incidents)
      .orderBy(severityOrder, desc(incidents.damagePct0m));

    const stats = {
      total: rows.length,
      damaged: 0,
      undamaged: 0,
      bySeverity: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
      },
      avgDamagePct0m: 0,
    };

    let datasetName = "Melissa damage detections";
    let datasetBounds: [number, number, number, number] | null = null;
    let damagePct0mTotal = 0;

    const incidentsList: IncidentSummary[] = [];
    const features: FeatureCollection<MultiPolygon, IncidentFeatureProperties>["features"] = [];

    for (const row of rows) {
      const status = toIncidentStatus(row.damaged);
      const label = toIncidentLabel(status);
      const severity = row.severity as IncidentSeverity;

      stats.bySeverity[severity] += 1;
      stats[status] += 1;
      damagePct0mTotal += row.damagePct0m;
      datasetName = row.datasetName;

      const bbox: [number, number, number, number] = [
        row.minLng,
        row.minLat,
        row.maxLng,
        row.maxLat,
      ];

      if (!datasetBounds) {
        datasetBounds = [...bbox];
      } else {
        datasetBounds = [
          Math.min(datasetBounds[0], bbox[0]),
          Math.min(datasetBounds[1], bbox[1]),
          Math.max(datasetBounds[2], bbox[2]),
          Math.max(datasetBounds[3], bbox[3]),
        ];
      }

      const summary: IncidentSummary = {
        id: row.id,
        label,
        status,
        severity,
        damagePct0m: row.damagePct0m,
        damagePct10m: row.damagePct10m,
        damagePct20m: row.damagePct20m,
        builtPct0m: row.builtPct0m,
        unknownPct: row.unknownPct,
        centroid: [row.centroidLng, row.centroidLat] as [number, number],
        bbox,
      };

      incidentsList.push(summary);
      features.push({
        type: "Feature",
        id: summary.id,
        properties: {
          ...summary,
          datasetName,
        },
        geometry: row.geometry,
      });
    }

    stats.avgDamagePct0m = rows.length === 0 ? 0 : damagePct0mTotal / rows.length;

    const featureCollection: FeatureCollection<MultiPolygon, IncidentFeatureProperties> = {
      type: "FeatureCollection",
      features,
    };

    return {
      dataset: {
        name: datasetName,
        sourceFile: INCIDENT_SOURCE_FILE,
        featureCount: rows.length,
        bounds: datasetBounds,
      },
      stats,
      incidents: incidentsList.sort(
        (left, right) =>
          severityRank(left.severity) - severityRank(right.severity) ||
          right.damagePct0m - left.damagePct0m,
      ),
      featureCollection,
    };
  }),
});
