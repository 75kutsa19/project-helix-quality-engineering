# Phase 2 — Defect Triage

## Purpose

This document records the triage outcome for material issues identified during Phase 2 exploratory testing.

Only issues supported by actual test evidence are classified as confirmed defects. Observations and environment-related issues are kept separate from confirmed product defects.

Synthetic test data only was used during testing.

---

## Confirmed Defect

### HELIX-4 — End Visit action returns HTTP 404 Not Found

**Jira:** HELIX-4

**Risk / Related Risk:** QR-010 — Session Control / workflow control

**Severity:** Major

**Priority:** High

**Status:** To Do

**Reproducibility:** Reproduced twice during the same test session

**Release Impact:** Material — the tested OpenMRS workflow does not successfully complete the End Visit action. This prevents the tested active visit from being closed through the expected UI workflow.

### Description

The OpenMRS End Visit workflow fails with an HTTP 404 response when an active patient visit is submitted for closure.

The tested workflow was:

1. Authenticate to OpenMRS.
2. Open a synthetic patient record.
3. Start a Facility Visit.
4. Select the Community Outreach location.
5. Save the visit.
6. Confirm that the visit is active.
7. Select End Visit.
8. Confirm the End Visit action.

The expected confirmation dialog was displayed. After submitting the End Visit action, the system navigated to:

`/openmrs/admin/visits/endVisit.form`

The server returned:

`HTTP Status 404 – Not Found`

The evidence screenshot captured the HTTP 404 response and the affected resource path.

### Preconditions

- Authenticated OpenMRS user.
- Synthetic patient record available.
- Patient has an active Facility Visit.

### Evidence

Actual browser evidence was captured during execution and attached to Jira HELIX-4.

The issue was reproduced twice during the same test session.

### Regression Coverage

Future regression testing should cover:

1. Create/open a synthetic patient.
2. Start a Facility Visit.
3. Verify that the visit becomes active.
4. Select End Visit.
5. Submit the End Visit action.
6. Verify that no HTTP 404 occurs.
7. Verify that the visit is successfully closed and is no longer shown as active.

### Triage Decision

**Confirmed product defect.**

The issue is reproducible and supported by actual browser evidence. No root cause is assumed from the observed HTTP response.

---

## Environment / Availability Issue

### E-006 — OpenMRS Public Demo Startup Failure

**Risk:** QR-017 — Public Environment Instability

**Classification:** Environment / availability issue — not a product defect

**Reproducibility:** Observed during Phase 2 execution

**Release Impact:** Blocks testing while the public environment is unavailable.

### Observation

The OpenMRS public demo displayed a startup failure message indicating that the server was not able to start.

The observed message included:

`The OpenMRS server is not able to start`

and:

`Should not be here because updates were run previously`

### Triage Decision

**Do not raise as a product defect against the application under test.**

The issue is classified as public test-environment instability and mapped to QR-017.

Testing should resume when the environment is available.

---

## Exploratory Observations Requiring Monitoring

The following observations were identified during Phase 2 testing but were not classified as confirmed product defects without sufficient reproducible evidence.

### Patient Search Pagination

A pagination behaviour was observed when navigating between result pages during a broad patient search.

The behaviour was not treated as a confirmed defect because the observed navigation did not provide sufficient reproducible evidence to establish a product defect.

**Classification:** Observation

**Defect Status:** Not raised

**Follow-up:** Revisit if the behaviour can be reproduced consistently.

---

### Patient Flag / Null Rendering

A patient display was observed containing unexpected `null` / HTML-style rendering in patient information.

This was recorded as an observation rather than a confirmed defect because the available evidence did not establish sufficient reproducibility and impact for defect classification.

**Classification:** Observation

**Defect Status:** Not raised

**Follow-up:** Revisit if consistently reproducible.

---

### Locale / Display Inconsistency

An inconsistency in displayed locale/date presentation was observed during exploratory testing.

No confirmed defect was raised because the available evidence did not establish sufficient reproducibility and expected behaviour for formal defect classification.

**Classification:** Observation

**Defect Status:** Not raised

**Follow-up:** Revisit if reproducible and confirmed against the expected locale behaviour.

---

## Phase 2 Triage Summary

| Issue | Classification | Severity | Priority | Reproducibility | Release Impact | Regression Coverage |
|---|---|---|---|---|---|---|
| HELIX-4 — End Visit HTTP 404 | Confirmed defect | Major | High | Reproduced twice | Material | End Visit workflow |
| E-006 — OpenMRS startup failure | Environment issue | N/A | N/A | Observed | Blocks testing | Environment availability |
| Patient search pagination | Observation | N/A | N/A | Insufficient evidence | Not established | Revisit if reproduced |
| Patient flag / null rendering | Observation | N/A | N/A | Insufficient evidence | Not established | Revisit if reproduced |
| Locale / display inconsistency | Observation | N/A | N/A | Insufficient evidence | Not established | Revisit if reproduced |

---

## Evidence and Reporting Principles

- Jira defects are raised only where the behaviour is reproducible and supported by actual evidence.
- HELIX-4 is the confirmed Phase 2 defect carried forward for subsequent testing.
- Environment instability is separated from product defects.
- Exploratory observations are not presented as confirmed defects without sufficient evidence.
- No patient or production data was used.
- Synthetic test data was used throughout Phase 2 testing.
