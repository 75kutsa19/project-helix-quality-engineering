# Phase 5 - Decision Explanation
## Cypress Regression Engineering

### 1. Reliability Measurement

I measured the inherited Cypress suite across three baseline executions before applying the stability changes.

Baseline results:

- Run 1: 0/16 passing (0%)
- Run 2: 0/16 passing (0%)
- Run 3: 0/16 passing (0%)

The public OpenMRS environment returned HTTP 403 Forbidden during these executions, preventing the application-facing tests from reaching their assertions.

After implementing the Cypress stability changes, I repeated the full 16-test suite three times without further code changes.

Post-fix results:

- Run 1: 1/16 passing (6.25%)
- Run 2: 1/16 passing (6.25%)
- Run 3: 1/16 passing (6.25%)

The same synthetic patient isolation test passed in all three post-fix runs. The remaining application-facing tests were blocked by HTTP 403 responses from the public OpenMRS environment.

I therefore distinguish the measured execution result from application-level reliability. The repeated 403 response is an environment access limitation rather than evidence that the test-design changes themselves introduced instability.

### 2. Instability Problems Identified and Fixed

The inherited handover identified hardcoded waits, fragile selectors, shared state, order-dependent tests, and fixed patient/demo-data dependencies.

#### Hardcoded waits

The inherited login pattern used a fixed delay after clicking the login button.

I replaced the fixed wait with request-based synchronization using cy.intercept(). The test now aliases the login POST request and waits for that request to complete before checking the resulting URL.

This removes dependence on an arbitrary time delay and makes the test synchronization event-driven.

#### Fragile selectors

The inherited approach could rely on brittle positional selectors such as nth-child selectors.

I changed the validation tests to use a semantic placeholder selector:

input[placeholder='Search']

This makes the selector dependent on the intended field rather than its position in the page structure.

#### Shared and order-dependent state

The inherited suite could depend on state established by another test.

I changed the navigation tests so that they establish their own login and search state. The loginAsAdmin() custom command uses cy.session() to manage authentication state for tests that require a logged-in user.

This makes the tests independently executable rather than dependent on test ordering.

### 3. cy.intercept() Example

The login test uses:

cy.intercept("POST", "**/loginServlet").as("loginRequest");

After the login button is clicked, the test waits for:

cy.wait("@loginRequest")

and checks the response status.

This validates that the login request has completed before the test evaluates the authenticated state. It replaces the inherited fixed-delay synchronization approach.

Additional cy.intercept() usage was added to the patient-search tests to synchronize patient-search requests.

Because the public OpenMRS environment returned HTTP 403 at page navigation, these application requests could not be exercised against the live public environment during the reliability runs. The implementation is present in the Cypress suite, but live interception could not be validated while the environment was blocking access.

### 4. Custom Cypress Commands

#### loginAsAdmin()

I created loginAsAdmin() to provide a reusable authenticated session for tests that require an administrator account.

The command uses cy.session() so authentication setup does not need to be repeated through the UI for every test.

#### generateSyntheticPatient()

I created generateSyntheticPatient() to produce unique synthetic patient data for test isolation.

The command reuses the Phase 4 patient-generation utility and its HELIX naming convention. Generated identifiers use the HELIX-PATIENT prefix and a unique test-run value.

The command successfully executed during the reliability runs, providing independent evidence that the synthetic test-data utility works even when the public OpenMRS application is unavailable.

### 5. Fixed Patient / Demo-Data Dependency

The inherited suite contained a fixed "Smith" patient search dependency.

I did not replace this with fabricated evidence of a live patient record. Instead, I introduced generateSyntheticPatient() using the established Phase 4 synthetic-data convention.

Live creation and search of the generated patient could not be validated because the public OpenMRS environment returned HTTP 403 before those application steps could execute.

This limitation is recorded separately from the test-design improvements.

### 6. Framework Allocation Matrix

| Test / Test Area | Framework | Rationale |
|---|---|---|
| Login form and authentication regression | Cypress | Suitable for focused UI regression and direct browser interaction. |
| Validation field and error-state checks | Cypress | Suitable for stable, component-level UI behaviour in the application's primary browser workflow. |
| Cross-browser patient search | Playwright | Useful where the same workflow needs validation across multiple browser engines. |
| Cross-browser session and record navigation | Playwright | Suitable for validating navigation and session behaviour across Chromium, Firefox and WebKit. |
| API-assisted synthetic patient setup | Playwright | Suitable when browser tests need API-assisted data preparation and reusable test fixtures. |

The allocation is based on test characteristics rather than treating one framework as universally preferable.

### 7. Test Design Failures vs Environment Instability

I distinguish two categories of failure.

Test-design concerns included the inherited hardcoded waits, fragile selectors, shared state, order dependence, and fixed test-data dependency. I addressed the hardcoded wait, fragile selector, and shared/order-dependent state through event-driven synchronization, stable selectors, and independent test setup with reusable authentication. I mitigated the fixed patient dependency by adding synthetic-data generation, but live creation and search of the generated patient could not be validated because the public OpenMRS environment returned HTTP 403.

The HTTP 403 responses are a separate public-environment access problem. They occurred during cy.visit() and cy.session() setup before most application assertions could execute.

This distinction prevents public-environment access failures from being incorrectly classified as Cypress test-design failures.

### 8. Repository Evidence

Cypress suite:

cypress/e2e/

Custom commands:

cypress/support/commands.ts

Cypress configuration:

cypress.config.ts

Reliability evidence:

cypress/reports/reliability-runs.md

Baseline evidence:

cypress/reports/baseline-runs.md

The Phase 5 implementation is on the branch:

feature/phase-5-cypress-regression

Phase 5 pull request: https://github.com/75kutsa19/project-helix-quality-engineering/pull/3

### 9. Conclusion

The Phase 5 work established a reusable Cypress regression structure with 16 tests across authentication, patient search, navigation and validation.

I measured the suite before and after the stability changes using three executions at each stage. The repeated public-environment HTTP 403 response was recorded separately from the inherited test-design problems.

The main stability improvements were event-driven network synchronization, stable selectors, independent test state, reusable authentication, and synthetic test-data generation.
