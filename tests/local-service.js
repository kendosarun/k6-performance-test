import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = 'http://0.0.0.0:8080/';
const PROFILE = __ENV.PROFILE || 'smoke';


function getOptions(profile) {
  switch (profile) {
    case "smoke":
      return {
        stages: [{ duration: "1m", target: 300 }, { duration: "30s", target: 0 }],
      };
    case "load":
      return {
        stages: [
          { duration: "2m", target: 500 },
          { duration: "2m", target: 700 },
          { duration: "2m", target: 0 },
        ],
      };
    case "stress":
      return {
        stages: [
          { duration: "2m", target: 1000 },
          { duration: "5m", target: 2500 },
          { duration: "2m", target: 0 },
        ],
      };
    case "spike":
      return {
        stages: [
          { duration: "30s", target: 100 },
          { duration: "30s", target: 1500 },
          { duration: "30s", target: 100 },
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
    http_req_duration: ["p(90)<400", "p(95)<500", "p(99)<1200"],
    http_req_waiting: ["p(95)<400"],
    http_req_failed: ["rate<0.01"],
    checks: ["rate>0.99"],
    iterations: ["rate>50"],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/product`);

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  sleep(1);
}
