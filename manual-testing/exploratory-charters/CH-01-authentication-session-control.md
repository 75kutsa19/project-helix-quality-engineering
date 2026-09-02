# CH-01 — Authentication & Session Control

## Risk Target
QR-010 — Session Control

## Objective
Explore authentication, logout, protected-page access and session-state behaviour, with particular attention to whether authenticated access remains available after logout or through browser navigation.

## Scope
- Login with valid credentials
- Login rejection behaviour
- Logout behaviour
- Browser Back after logout
- Refresh after logout
- Direct access to a protected patient page after logout

## Data
Synthetic test data only.

## Timebox
30 minutes

## Test Approach
Exploratory session-state testing using authentication and session transition scenarios.

## Expected Behaviour
After logout, the user should no longer have an authenticated session. Protected resources should require authentication.

## Observations / Results

### E-007 — Authenticated State
Valid authentication was established successfully.

**Result:** PASS

### E-008 — Logout
Logout successfully returned the application to an unauthenticated state.

**Result:** PASS

### E-009 — Browser Back After Logout
Using the browser Back action after logout displayed the previously viewed authenticated page.

**Observation:** Previously rendered page content was temporarily visible through browser navigation. This was treated as an observation rather than a confirmed security defect because a subsequent refresh restored the unauthenticated state.

### E-010 — Refresh After Logout
Refreshing the page restored the unauthenticated state.

**Result:** PASS / Expected Behaviour

### E-011 — Direct Protected Resource Access
Attempting to access a protected patient resource directly after logout redirected to the login page and displayed:

"You must log in to continue."

**Result:** PASS / Expected Behaviour

## Decision
No confirmed authentication/session defect was established during this charter.

The Browser Back observation should be retained as a session-control observation and considered for regression coverage.

## Evidence
E-007, E-008, E-009, E-010 and E-011.

## Follow-up
Carry session-state coverage into future regression testing, particularly logout → Back → refresh → protected-resource access.
