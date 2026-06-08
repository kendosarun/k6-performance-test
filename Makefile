PROFILE ?= smoke

local-test:
	k6 run tests/local-service.js \
		--summary-export=reports/summary.json \
		--env PROFILE=$(PROFILE) \
		--env K6_WEB_DASHBOARD=true \
		--env K6_WEB_DASHBOARD_PORT=5665 \
		--env K6_WEB_DASHBOARD_PERIOD=5s \
		--env K6_WEB_DASHBOARD_OPEN=true