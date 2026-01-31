#!/bin/bash
set -e

BASE_URL=$1
PROFILE=$2
DASHBOARD=$3   # true / false (optional)

if [ -z "$BASE_URL" ] || [ -z "$PROFILE" ]; then
  echo "Usage: ./run.sh <base_url> <profile> [dashboard]"
  echo "Example: ./run.sh https://quickpizza.grafana.com load true"
  exit 1
fi

mkdir -p reports

echo "BASE_URL=$BASE_URL PROFILE=$PROFILE DASHBOARD=$DASHBOARD"

docker compose run --rm --service-ports \
  k6 run performance.js \
  --summary-export=/reports/summary.json \
  --env BASE_URL=$BASE_URL \
  --env PROFILE=$PROFILE \
  --env K6_WEB_DASHBOARD=true \
  --env K6_WEB_DASHBOARD_PORT=5665
