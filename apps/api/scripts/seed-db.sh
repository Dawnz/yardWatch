#!/bin/bash
docker exec -i yardwatch-db psql -U yardwatch -d yardwatch -f /docker-entrypoint-initdb.d/seed.sql
echo "Database seeded"