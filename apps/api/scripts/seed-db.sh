#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/../../.." && pwd)"

pnpm --dir "${ROOT_DIR}" drizzle-kit:migrate
pnpm --dir "${ROOT_DIR}" --filter @workspace/api run seed-users

echo "Database migrated and seeded"
