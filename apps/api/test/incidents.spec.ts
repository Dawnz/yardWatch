import { describe, expect, it } from "vitest";
import {
  calculateGeometryMetrics,
  classifySeverity,
  toIncidentLabel,
  toIncidentStatus,
} from "../src/incidents";

describe("incident helpers", () => {
  it("classifies severity using the configured thresholds", () => {
    expect(classifySeverity(0.72)).toBe("critical");
    expect(classifySeverity(0.56)).toBe("high");
    expect(classifySeverity(0.41)).toBe("medium");
    expect(classifySeverity(0.39)).toBe("low");
  });

  it("derives status and label from the source damaged flag", () => {
    expect(toIncidentStatus(1)).toBe("damaged");
    expect(toIncidentStatus(0)).toBe("undamaged");
    expect(toIncidentLabel("damaged")).toBe("Damaged building");
    expect(toIncidentLabel("undamaged")).toBe("Undamaged building");
  });

  it("calculates bounds and centroid for multipolygon geometry", () => {
    const metrics = calculateGeometryMetrics({
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [-78.136179, 18.3115463],
            [-78.1360655, 18.3116109],
            [-78.1361549, 18.3117541],
            [-78.1362684, 18.3116895],
            [-78.136179, 18.3115463],
          ],
        ],
      ],
    });

    expect(metrics.bounds).toEqual([
      -78.1362684,
      18.3115463,
      -78.1360655,
      18.3117541,
    ]);
    expect(metrics.centroid[0]).toBeCloseTo(-78.13616936, 8);
    expect(metrics.centroid[1]).toBeCloseTo(18.31162942, 8);
  });
});
