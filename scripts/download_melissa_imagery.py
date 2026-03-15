#!/usr/bin/env python3
"""
Download a small Sentinel-2 GeoTIFF for Westmoreland, Jamaica after Hurricane Melissa.

This script uses the Copernicus Data Space Sentinel Hub Process API to:
1. Query candidate Sentinel-2 L2A scenes for a small AOI.
2. Download a cropped GeoTIFF for the AOI.
3. Optionally convert the result into a Cloud Optimized GeoTIFF (COG) with GDAL.

Default presets are tuned for Hurricane Melissa in Jamaica:
- Landfall: 2025-10-28 near New Hope, southwestern Jamaica
- Pre-storm mosaic window: 2025-10-20 to 2025-10-23
- Post-storm mosaic window: 2025-11-04 to 2025-11-09
"""

from __future__ import annotations

import argparse
import json
import math
import os
import shutil
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any


TOKEN_URL = "https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token"
PROCESS_URL = "https://sh.dataspace.copernicus.eu/api/v1/process"
ODATA_URL = "https://catalogue.dataspace.copernicus.eu/odata/v1/Products"

# Approximate parish bounding box from OSM/Nominatim, enough for a small download target.
WESTMORELAND_BBOX = (-78.3689286, 18.0629779, -77.8756764, 18.3578369)
JAMAICA_BBOX = (-78.5, 17.6, -76.0, 18.5)

AOI_BBOXES = {
    "westmoreland": WESTMORELAND_BBOX,
    "jamaica": JAMAICA_BBOX,
}

PHASE_WINDOWS = {
    "pre": ("2025-10-20", "2025-10-23"),
    "post": ("2025-11-04", "2025-11-09"),
}


@dataclass(frozen=True)
class ProductSummary:
    name: str
    date: str
    cloud_cover: float | None
    size_mb: float


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Download a cropped Sentinel-2 GeoTIFF for Hurricane Melissa over Jamaica. "
            "Defaults target a small Westmoreland post-storm dataset."
        )
    )
    parser.add_argument(
        "--aoi",
        choices=sorted(AOI_BBOXES),
        default="westmoreland",
        help="Area of interest. Default: westmoreland",
    )
    parser.add_argument(
        "--phase",
        choices=sorted(PHASE_WINDOWS),
        default="post",
        help="Melissa imagery preset. Default: post",
    )
    parser.add_argument(
        "--from-date",
        help="Inclusive start date in YYYY-MM-DD. Overrides the preset window start.",
    )
    parser.add_argument(
        "--to-date",
        help="Inclusive end date in YYYY-MM-DD. Overrides the preset window end.",
    )
    parser.add_argument(
        "--date",
        help="Exact acquisition date in YYYY-MM-DD. If set, both --from-date and --to-date use this date.",
    )
    parser.add_argument(
        "--resolution",
        type=float,
        default=20.0,
        help="Output pixel size in meters. Default: 20 for a smaller quick-start dataset.",
    )
    parser.add_argument(
        "--cloud-cover",
        type=int,
        default=20,
        help="Maximum tile cloud cover percentage for the Sentinel Hub request. Default: 20",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("data/raw"),
        help="Output directory. Default: data/raw",
    )
    parser.add_argument(
        "--output-name",
        help="Optional output filename. Defaults to a generated Melissa-specific name.",
    )
    parser.add_argument(
        "--client-id",
        default=os.environ.get("CDSE_CLIENT_ID"),
        help="Copernicus Data Space OAuth client ID. Defaults to CDSE_CLIENT_ID.",
    )
    parser.add_argument(
        "--client-secret",
        default=os.environ.get("CDSE_CLIENT_SECRET"),
        help="Copernicus Data Space OAuth client secret. Defaults to CDSE_CLIENT_SECRET.",
    )
    parser.add_argument(
        "--no-cog",
        action="store_true",
        help="Skip COG conversion and keep the raw GeoTIFF response.",
    )
    parser.add_argument(
        "--list-products",
        action="store_true",
        help="List candidate Sentinel-2 L2A products for the AOI/date window and exit.",
    )
    return parser.parse_args()


def resolve_date_window(args: argparse.Namespace) -> tuple[str, str]:
    if args.date:
        return args.date, args.date
    default_from, default_to = PHASE_WINDOWS[args.phase]
    return args.from_date or default_from, args.to_date or default_to


def build_output_name(args: argparse.Namespace, start_date: str, end_date: str) -> str:
    if args.output_name:
        return args.output_name
    resolution_label = int(args.resolution) if float(args.resolution).is_integer() else args.resolution
    if start_date == end_date:
        date_label = start_date
    else:
        date_label = f"{start_date}_to_{end_date}"
    return f"{args.aoi}_{args.phase}_melissa_{date_label}_{resolution_label}m.tif"


def encode_form(data: dict[str, str]) -> bytes:
    return urllib.parse.urlencode(data).encode("utf-8")


def http_json(url: str, *, method: str = "GET", headers: dict[str, str] | None = None, body: bytes | None = None) -> Any:
    request = urllib.request.Request(url, data=body, method=method)
    request.add_header("User-Agent", "yardwatch-melissa-imagery/1.0")
    for key, value in (headers or {}).items():
        request.add_header(key, value)
    with urllib.request.urlopen(request, timeout=120) as response:
        return json.loads(response.read().decode("utf-8"))


def fetch_access_token(client_id: str, client_secret: str) -> str:
    payload = encode_form(
        {
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
        }
    )
    response = http_json(
        TOKEN_URL,
        method="POST",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        body=payload,
    )
    return response["access_token"]


def get_bbox(name: str) -> tuple[float, float, float, float]:
    return AOI_BBOXES[name]


def bbox_to_polygon_wkt(bbox: tuple[float, float, float, float]) -> str:
    minx, miny, maxx, maxy = bbox
    return (
        f"POLYGON(({minx} {miny},{maxx} {miny},{maxx} {maxy},"
        f"{minx} {maxy},{minx} {miny}))"
    )


def extract_cloud_cover(attributes: list[dict[str, Any]]) -> float | None:
    for attribute in attributes:
        if attribute.get("Name") == "cloudCover":
            value = attribute.get("Value")
            if value is None:
                return None
            return float(value)
    return None


def fetch_candidate_products(
    bbox: tuple[float, float, float, float],
    start_date: str,
    end_date: str,
    *,
    limit: int = 12,
) -> list[ProductSummary]:
    polygon = bbox_to_polygon_wkt(bbox)
    filter_expression = (
        "Collection/Name eq 'SENTINEL-2' and "
        "OData.CSC.Intersects(area=geography'SRID=4326;"
        f"{polygon}') and "
        "Attributes/OData.CSC.StringAttribute/any("
        "att:att/Name eq 'productType' and "
        "att/OData.CSC.StringAttribute/Value eq 'S2MSI2A') and "
        f"ContentDate/Start gt {start_date}T00:00:00.000Z and "
        f"ContentDate/Start lt {end_date}T23:59:59.999Z"
    )
    query = urllib.parse.urlencode(
        {
            "$filter": filter_expression,
            "$orderby": "ContentDate/Start asc",
            "$top": str(limit),
            "$expand": "Attributes",
        }
    )
    payload = http_json(f"{ODATA_URL}?{query}")
    products: list[ProductSummary] = []
    for item in payload.get("value", []):
        products.append(
            ProductSummary(
                name=item["Name"],
                date=item["ContentDate"]["Start"],
                cloud_cover=extract_cloud_cover(item.get("Attributes", [])),
                size_mb=round(item["ContentLength"] / 1024 / 1024, 1),
            )
        )
    return products


def print_candidate_products(products: list[ProductSummary]) -> None:
    if not products:
        print("No Sentinel-2 L2A products found for the requested AOI/date window.")
        return
    print("Candidate products:")
    for product in products:
        cloud_label = "n/a" if product.cloud_cover is None else f"{product.cloud_cover:.2f}%"
        print(f"  - {product.date} | cloud={cloud_label:>7} | size={product.size_mb:>6.1f} MB | {product.name}")


def bbox_dimensions_pixels(bbox: tuple[float, float, float, float], resolution_m: float) -> tuple[int, int]:
    minx, miny, maxx, maxy = bbox
    mid_lat_rad = math.radians((miny + maxy) / 2.0)
    width_m = abs(maxx - minx) * 111_320.0 * math.cos(mid_lat_rad)
    height_m = abs(maxy - miny) * 110_574.0
    width_px = max(1, math.ceil(width_m / resolution_m))
    height_px = max(1, math.ceil(height_m / resolution_m))
    return width_px, height_px


def build_evalscript() -> str:
    return """
//VERSION=3
function setup() {
  return {
    input: [{
      bands: ["B02", "B03", "B04", "dataMask"],
      units: "REFLECTANCE"
    }],
    output: {
      bands: 3,
      sampleType: "UINT16",
      nodataValue: 0
    }
  };
}

function evaluatePixel(sample) {
  if (sample.dataMask === 0) {
    return [0, 0, 0];
  }

  return [
    Math.round(sample.B04 * 10000),
    Math.round(sample.B03 * 10000),
    Math.round(sample.B02 * 10000)
  ];
}
""".strip()


def build_process_request(
    bbox: tuple[float, float, float, float],
    start_date: str,
    end_date: str,
    resolution_m: float,
    max_cloud_cover: int,
) -> dict[str, Any]:
    width_px, height_px = bbox_dimensions_pixels(bbox, resolution_m)
    return {
        "input": {
            "bounds": {
                "bbox": list(bbox),
                "properties": {
                    "crs": "http://www.opengis.net/def/crs/EPSG/0/4326",
                },
            },
            "data": [
                {
                    "type": "sentinel-2-l2a",
                    "dataFilter": {
                        "timeRange": {
                            "from": f"{start_date}T00:00:00Z",
                            "to": f"{end_date}T23:59:59Z",
                        },
                        "mosaickingOrder": "leastCC",
                        "maxCloudCoverage": max_cloud_cover,
                    },
                }
            ],
        },
        "output": {
            "width": width_px,
            "height": height_px,
            "responses": [
                {
                    "identifier": "default",
                    "format": {
                        "type": "image/tiff",
                    },
                }
            ],
        },
        "evalscript": build_evalscript(),
    }


def download_geotiff(
    access_token: str,
    request_payload: dict[str, Any],
    output_path: Path,
) -> None:
    body = json.dumps(request_payload).encode("utf-8")
    request = urllib.request.Request(
        PROCESS_URL,
        data=body,
        method="POST",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
            "Accept": "image/tiff",
            "User-Agent": "yardwatch-melissa-imagery/1.0",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=300) as response:
            output_path.write_bytes(response.read())
    except urllib.error.HTTPError as error:
        details = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Process API request failed with HTTP {error.code}: {details}") from error


def convert_to_cog(source_path: Path, destination_path: Path) -> Path:
    gdal_translate = shutil.which("gdal_translate")
    if not gdal_translate:
        print("GDAL not found, keeping the raw GeoTIFF instead of converting to a COG.")
        return source_path

    command = [
        gdal_translate,
        "-of",
        "COG",
        "-co",
        "COMPRESS=LZW",
        "-co",
        "BIGTIFF=IF_SAFER",
        "-co",
        "NUM_THREADS=ALL_CPUS",
        str(source_path),
        str(destination_path),
    ]
    subprocess.run(command, check=True)
    source_path.unlink()
    return destination_path


def require_credentials(client_id: str | None, client_secret: str | None) -> tuple[str, str]:
    if client_id and client_secret:
        return client_id, client_secret
    raise SystemExit(
        "Missing Copernicus credentials. Set CDSE_CLIENT_ID and CDSE_CLIENT_SECRET, "
        "or pass --client-id and --client-secret."
    )


def main() -> int:
    args = parse_args()
    start_date, end_date = resolve_date_window(args)
    bbox = get_bbox(args.aoi)
    output_name = build_output_name(args, start_date, end_date)
    args.output_dir.mkdir(parents=True, exist_ok=True)
    output_path = args.output_dir / output_name

    print(f"AOI: {args.aoi}")
    print(f"BBox: {bbox}")
    print(f"Phase: {args.phase}")
    print(f"Date window: {start_date} -> {end_date}")
    print(f"Resolution: {args.resolution} m")
    print(f"Output: {output_path}")

    products = fetch_candidate_products(bbox, start_date, end_date)
    print_candidate_products(products)

    if args.list_products:
        return 0

    client_id, client_secret = require_credentials(args.client_id, args.client_secret)
    print("Requesting access token...")
    access_token = fetch_access_token(client_id, client_secret)

    request_payload = build_process_request(
        bbox,
        start_date,
        end_date,
        args.resolution,
        args.cloud_cover,
    )
    width_px = request_payload["output"]["width"]
    height_px = request_payload["output"]["height"]
    print(f"Downloading {width_px} x {height_px} GeoTIFF from Sentinel Hub Process API...")

    raw_output_path = output_path if args.no_cog else output_path.with_name(output_path.stem + "_raw.tif")
    download_geotiff(access_token, request_payload, raw_output_path)
    final_path = raw_output_path

    if not args.no_cog:
        try:
            final_path = convert_to_cog(raw_output_path, output_path)
        except subprocess.CalledProcessError as error:
            raise SystemExit(f"COG conversion failed: {error}") from error

    print(f"Saved imagery to {final_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
