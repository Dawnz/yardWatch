# Hurricane Melissa Imagery

This repository includes a standalone Python helper for downloading a small Sentinel-2 GeoTIFF over Jamaica using the Copernicus Data Space Sentinel Hub Process API:

`/Users/pepperpotpoppins/nodejs/yardWatch/scripts/download_melissa_imagery.py`

The defaults are tuned for Hurricane Melissa in Jamaica:

- Landfall near New Hope, southwestern Jamaica: `2025-10-28`
- `--phase pre` window: `2025-10-20` to `2025-10-23`
- `--phase post` window: `2025-11-04` to `2025-11-09`
- Default AOI: `westmoreland`
- Default resolution: `20 m` for a smaller quick-start dataset

## Credentials

Create a Copernicus Data Space OAuth client in Sentinel Hub, then export:

```bash
export CDSE_CLIENT_ID='your-client-id'
export CDSE_CLIENT_SECRET='your-client-secret'
```

Official references:

- Token endpoint: `https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token`
- Process API endpoint: `https://sh.dataspace.copernicus.eu/api/v1/process`

## Examples

List candidate Sentinel-2 L2A products for Westmoreland after Melissa:

```bash
python3 scripts/download_melissa_imagery.py --list-products
```

Download the default small post-Melissa Westmoreland dataset:

```bash
python3 scripts/download_melissa_imagery.py
```

Download native-resolution RGB instead of the smaller 20 m quick-start dataset:

```bash
python3 scripts/download_melissa_imagery.py --resolution 10
```

Download an exact-date post-storm image instead of the default mosaic window:

```bash
python3 scripts/download_melissa_imagery.py --date 2025-11-07
```

List or download the broader Jamaica AOI:

```bash
python3 scripts/download_melissa_imagery.py --aoi jamaica --list-products
python3 scripts/download_melissa_imagery.py --aoi jamaica --phase post
```
