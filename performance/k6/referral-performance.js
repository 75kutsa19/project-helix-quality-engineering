import http from "k6/http";
import { check } from "k6";

const TARGET = __ENV.TARGET_URL || "http://127.0.0.1:3007";
const SCENARIO = __ENV.SCENARIO || "baseline";

if (
  !TARGET.startsWith("http://127.0.0.1:") &&
  !TARGET.startsWith("http://localhost:")
) {
  throw new Error(
    "SAFETY BLOCK: Phase 7 performance tests may run only against localhost."
  );
}

const scenarioConfig = {
  baseline: {
    vus: 1,
    duration: "10s",
  },
  expected: {
    vus: 5,
    duration: "15s",
  },
  stress: {
    vus: 20,
    duration: "10s",
  },
  recovery: {
    vus: 2,
    duration: "10s",
  },
};

if (!scenarioConfig[SCENARIO]) {
  throw new Error(`Unknown SCENARIO: ${SCENARIO}`);
}

export const options = {
  vus: scenarioConfig[SCENARIO].vus,
  duration: scenarioConfig[SCENARIO].duration,
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<250"],
  },
  summaryTrendStats: ["min", "med", "avg", "p(90)", "p(95)", "p(99)", "max"],
};

export default function () {
  const payload = JSON.stringify({
    patientId: `SYNTH-${__VU}-${__ITER}`,
    testRun: `phase7-${SCENARIO}`,
  });

  const response = http.post(`${TARGET}/referrals`, payload, {
    headers: {
      "Content-Type": "application/json",
      "X-Test-Run": `phase7-${SCENARIO}`,
    },
  });

  check(response, {
    "referral accepted with 201": (r) => r.status === 201,
  });
}
