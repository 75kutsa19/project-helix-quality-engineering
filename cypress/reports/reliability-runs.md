# Phase 5 Cypress Reliability Evidence

## Environment
- Cypress: 16.0.0
- Browser: Electron 146 (headless)
- Node: 22.19.0
- Target: https://o3.openmrs.org
- Suite: 16 tests across 4 specs

## Baseline Runs

### Run 1
- Result: 0 passing, 16 failing
- Pass rate: 0%
- Primary failure: HTTP 403 Forbidden from the public OpenMRS environment.

### Run 2
- Result: 0 passing, 16 failing
- Pass rate: 0%
- Primary failure: HTTP 403 Forbidden from the public OpenMRS environment.

### Run 3
- Result: 0 passing, 16 failing
- Pass rate: 0%
- Primary failure: HTTP 403 Forbidden from the public OpenMRS environment.

## Post-Fix Runs

### Run 1
- Result: 1 passing, 15 failing
- Pass rate: 6.25%
- The synthetic patient isolation test passed.
- Application-facing tests were blocked by HTTP 403 responses from the public OpenMRS environment.

### Run 2
- Result: 1 passing, 15 failing
- Pass rate: 6.25%
- The synthetic patient isolation test passed.
- Application-facing tests were blocked by HTTP 403 responses from the public OpenMRS environment.

### Run 3
- Result: 1 passing, 15 failing
- Pass rate: 6.25%
- The synthetic patient isolation test passed.
- Application-facing tests were blocked by HTTP 403 responses from the public OpenMRS environment.

## Reliability Interpretation

The three baseline executions were consistently blocked at 0/16 passing by the public environment's HTTP 403 response.

After the Cypress test-design changes, the same three-run pattern produced 1/16 passing on each run. The passing test demonstrates that the Cypress support layer and synthetic patient generation command can execute independently of the blocked application environment.

The remaining failures should not be interpreted as evidence that the test-design fixes failed. The failures occurred primarily during application navigation or session setup because the public OpenMRS environment returned HTTP 403 Forbidden.

## Test Design Problems Addressed

1. Hardcoded wait
   - The inherited login flow used a fixed wait.
   - The login test now uses cy.intercept() and waits for the login request instead of relying on a fixed delay.

2. Fragile selectors
   - The validation flow was changed to use a semantic placeholder selector rather than a brittle positional CSS selector.

3. Shared or order-dependent state
   - Navigation tests establish their own login and search state rather than depending on another test having run first.
   - cy.session() is used by loginAsAdmin() to manage authentication state.

4. Fixed patient/demo-data dependency
   - The suite documents the inherited fixed "Smith" search dependency.
   - generateSyntheticPatient() was added using the Phase 4 HELIX synthetic-data naming convention.
   - Live creation and search of the generated patient could not be validated because the public OpenMRS environment returned HTTP 403 before those application steps could execute.

## Environment vs Test Design

The inherited instability patterns are test-design concerns that were addressed in the Cypress implementation.

The HTTP 403 responses are a separate public-environment access limitation. They occurred at cy.visit() and during cy.session() setup before the affected application assertions could run.

This distinction is important when interpreting the reliability measurements: the post-fix execution results contain environment-blocked tests and should not be presented as a direct measurement of application-level regression reliability.

## Evidence

- Cypress suite: cypress/e2e/
- Custom commands: cypress/support/commands.ts
- Cypress configuration: cypress.config.ts
- Baseline evidence: cypress/reports/baseline-runs.md
