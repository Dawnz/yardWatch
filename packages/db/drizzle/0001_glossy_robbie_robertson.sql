CREATE TABLE "incidents" (
	"id" text PRIMARY KEY NOT NULL,
	"dataset_name" text NOT NULL,
	"geometry" jsonb NOT NULL,
	"centroid_lng" double precision NOT NULL,
	"centroid_lat" double precision NOT NULL,
	"min_lng" double precision NOT NULL,
	"min_lat" double precision NOT NULL,
	"max_lng" double precision NOT NULL,
	"max_lat" double precision NOT NULL,
	"damage_pct_0m" double precision NOT NULL,
	"damage_pct_10m" double precision NOT NULL,
	"damage_pct_20m" double precision NOT NULL,
	"built_pct_0m" double precision NOT NULL,
	"unknown_pct" double precision NOT NULL,
	"damaged" boolean NOT NULL,
	"severity" text NOT NULL,
	"imported_at" timestamp with time zone DEFAULT now() NOT NULL
);
