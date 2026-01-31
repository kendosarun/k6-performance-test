#!/bin/bash
set -e

BASE_URL=$1
PROFILE=$2

mkdir -p reports

docker compose run --rm \
  -e BASE_URL=$BASE_URL \
  -e PROFILE=$PROFILE \
  -e K6_WEB_DASHBOARD=true \
  -e K6_WEB_DASHBOARD_EXPORT=/reports/dashboard.html \
  k6 run performance.js \
  --summary-export=/reports/summary.json
