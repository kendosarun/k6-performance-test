import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL;
const PROFILE = __ENV.PROFILE || "load";

if (!BASE_URL) {
  throw new Error("BASE_URL is required. Pass with -e BASE_URL=...");
}

function getOptions(profile) {
  switch (profile) {
    case "load":
      return {
        stages: [
          { duration: "2m", target: 50 },
          { duration: "5m", target: 50 },
          { duration: "2m", target: 0 },
        ],
      };
    case "stress":
      return {
        stages: [
          { duration: "2m", target: 100 },
          { duration: "5m", target: 200 },
          { duration: "2m", target: 0 },
        ],
      };
    case "spike":
      return {
        stages: [
          { duration: "30s", target: 20 },
          { duration: "10s", target: 700 },
          { duration: "1m", target: 20 },
          { duration: "30s", target: 0 },
        ],
      };
    case "endurance":
      return {
        stages: [{ duration: "30m", target: 60 }],
      };
    default:
      return { vus: 10, duration: "30s" };
  }
}

export const options = {
  ...getOptions(PROFILE),
  thresholds: {
    http_req_duration: ["p(95)<800"],
    http_req_failed: ["rate<0.02"],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}`);

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  sleep(1);
}
