import type * as React from "react"

type ArcGISMapElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  basemap?: string
  center?: string
  zoom?: string | number
}

type ArcGISZoomElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  position?: string
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "arcgis-map": ArcGISMapElementProps
      "arcgis-zoom": ArcGISZoomElementProps
    }
  }
}

export {}
