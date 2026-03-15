import "dotenv/config";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  getConnectedDb,
  incidents,
  resolveConnectionString,
} from "@workspace/db";
import {
  INCIDENT_DATASET_NAME,
  classifySeverity,
  type MelissaDamageCollection,
  calculateGeometryMetrics,
  toIncidentStatus,
} from "../src/incidents";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const GEOJSON_PATH = path.resolve(
  SCRIPT_DIR,
  "../../web/public/melissa-damage.geojson",
);

async function seed() {
  const file = await fs.readFile(GEOJSON_PATH, "utf8");
  const collection = JSON.parse(file) as MelissaDamageCollection;
  const datasetName = collection.name ?? INCIDENT_DATASET_NAME;
  const connectionString = resolveConnectionString();
  const { db, client } = await getConnectedDb(connectionString);

  try {
    for (const feature of collection.features) {
      const metrics = calculateGeometryMetrics(feature.geometry);
      const status = toIncidentStatus(feature.properties.damaged);

      await db
        .insert(incidents)
        .values({
          id: feature.properties.id,
          datasetName,
          geometry: feature.geometry,
          centroidLng: metrics.centroid[0],
          centroidLat: metrics.centroid[1],
          minLng: metrics.bounds[0],
          minLat: metrics.bounds[1],
          maxLng: metrics.bounds[2],
          maxLat: metrics.bounds[3],
          damagePct0m: feature.properties.damage_pct_0m,
          damagePct10m: feature.properties.damage_pct_10m,
          damagePct20m: feature.properties.damage_pct_20m,
          builtPct0m: feature.properties.built_pct_0m,
          unknownPct: feature.properties.unknown_pct,
          damaged: status === "damaged",
          severity: classifySeverity(feature.properties.damage_pct_0m),
        })
        .onConflictDoUpdate({
          target: incidents.id,
          set: {
            datasetName,
            geometry: feature.geometry,
            centroidLng: metrics.centroid[0],
            centroidLat: metrics.centroid[1],
            minLng: metrics.bounds[0],
            minLat: metrics.bounds[1],
            maxLng: metrics.bounds[2],
            maxLat: metrics.bounds[3],
            damagePct0m: feature.properties.damage_pct_0m,
            damagePct10m: feature.properties.damage_pct_10m,
            damagePct20m: feature.properties.damage_pct_20m,
            builtPct0m: feature.properties.built_pct_0m,
            unknownPct: feature.properties.unknown_pct,
            damaged: status === "damaged",
            severity: classifySeverity(feature.properties.damage_pct_0m),
            importedAt: new Date(),
          },
        });
    }

    console.log(`Seeded ${collection.features.length} incidents from ${GEOJSON_PATH}`);
  } finally {
    await client.end();
  }
}

seed().catch((error) => {
  console.error("Failed to seed incidents", error);
  process.exitCode = 1;
});
