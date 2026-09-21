# Phase 7 Performance Test Results

## Safety Boundary

All k6 performance testing in Phase 7 was executed only against the local mock endpoint:

http://127.0.0.1:3007

No k6 load or performance test was executed against HAPI FHIR, OpenMRS, or any other public/shared environment.

The k6 script contains a safety guard that permits only 127.0.0.1 or localhost targets. This prevents accidental load testing of shared infrastructure.

## Performance Scenarios

| Scenario | Load | Duration | Requests | p50 | p95 | p99 | Error Rate |
|---|---:|---:|---:|---:|---:|---:|---:|
| Baseline | 1 VU | 10s | 42,898 | 0 ms | 0.575 ms | 1.01 ms | 0.00% |
| Expected load | 5 VUs | 15s | 143,486 | 0 ms | 1.33 ms | 2.62 ms | 0.00% |
| Stress spike | 20 VUs | 10s | 92,990 | 1.55 ms | 4.80 ms | 10.46 ms | 0.00% |
| Recovery | 2 VUs | 10s | 71,670 | 0 ms | 1.00 ms | 1.50 ms | 0.00% |

## Thresholds

The performance script used these thresholds:

- HTTP request failure rate below 1%.
- HTTP request p95 duration below 250 ms.

All four scenarios passed both thresholds.

## Failure Injection Evidence

The local mock was also verified with controlled failure behaviour:

- HTTP 400: invalid referral payload.
- HTTP 401: unauthorized request.
- HTTP 500: simulated server failure.
- Timeout: simulated delayed response of approximately 5 seconds, measured at 5.0274029 seconds.

These failures were generated only by the local mock and did not affect any external service.

## Interpretation and Limitation

The baseline and expected-load results establish a repeatable local performance reference for the referral submission flow. Latency increased under the 20-VU stress spike and returned to a lower level during the recovery run without request failures.

These measurements are not production-performance measurements. The target is a lightweight local in-memory mock with no real network path, database, authentication service, FHIR server, or production infrastructure. The results are therefore useful for safe regression comparison and CI quality signals, but they must not be used to predict real GenomeBridge production latency or capacity.
