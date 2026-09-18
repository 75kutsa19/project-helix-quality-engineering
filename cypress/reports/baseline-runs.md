# Phase 5 Cypress Baseline Runs

## Environment
- Cypress: 16.0.0
- Browser: Electron 146 (headless)
- Target: https://o3.openmrs.org
- Suite: 16 tests across 4 specs

## Run 1
- Result: 0 passing, 16 failing
- Pass rate: 0%
- Primary failure: HTTP 403 Forbidden from public OpenMRS environment

## Run 2
- Result: 0 passing, 16 failing
- Pass rate: 0%
- Primary failure: HTTP 403 Forbidden from public OpenMRS environment

## Run 3
- Result: 0 passing, 16 failing
- Pass rate: 0%
- Primary failure: HTTP 403 Forbidden from public OpenMRS environment

## Baseline conclusion
All three baseline executions produced the same first-run result: 0/16 tests passed. The failures occurred at application navigation because the public OpenMRS environment returned HTTP 403 Forbidden. This is recorded as a public-environment access limitation and is distinguished from the inherited test-design instability patterns being addressed in Phase 5.
