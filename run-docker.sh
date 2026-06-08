#!/bin/bash
set -e

BASE_URL=$1
PROFILE=$2

mkdir -p reports

docker compose run --rm --service-ports \
  k6 run performance.js \
  --summary-export=/reports/summary.json \
  --env BASE_URL=$BASE_URL \
  --env PROFILE=$PROFILE \
  --env K6_WEB_DASHBOARD=true \
  --env K6_WEB_DASHBOARD_PORT=5665 \
  --env K6_WEB_DASHBOARD_PERIOD=5s
