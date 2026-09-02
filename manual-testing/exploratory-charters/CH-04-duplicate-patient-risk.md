# CH-04 — Duplicate Patient Risk

## Risk Target

- QR-002 — Duplicate Records

## Objective

Explore the risk of creating or identifying duplicate patient records where demographic information overlaps with an existing patient.

## Scope

- Search before patient creation
- Similar or overlapping patient demographics
- Exact and partial identity matching
- Identifier uniqueness
- Review of existing records before registration
- Behaviour when potentially duplicate information is encountered

## Data

Synthetic test data only.

No real patient information is used.

## Timebox

30 minutes

## Exploratory Approach

The charter focuses on the point at which a user may create or select a patient whose demographic information is similar to an existing record.

The exploration considers whether the system provides sufficient information to distinguish existing patients and whether duplicate creation is prevented or clearly flagged.

## Execution Notes

### E-024 — Search Before Create

An existing synthetic patient was searched before considering creation of another patient with overlapping demographic characteristics.

The existing patient record could be located through patient search.

**Result:** PASS / Expected Behaviour

### E-025 — Similar Patient Information

Patient search was explored using overlapping or similar demographic information.

Multiple matching patients could be returned where the search criteria were not sufficiently specific.

This reinforces the need for users to review available identity markers before selecting a patient.

**Result:** RISK OBSERVATION

### E-026 — Exact Identifier Search

An exact synthetic patient identifier was used to identify an existing patient record.

The corresponding patient could be located.

**Result:** PASS

### E-027 — Duplicate Creation Risk

The registration workflow was considered against the possibility of creating a patient whose demographic information overlaps with an existing record.

The available evidence did not establish a confirmed duplicate-record defect.

No confirmed duplicate patient was intentionally created.

**Result:** RISK REMAINS OPEN

## Decision

No confirmed duplicate-record defect was established during this charter.

QR-002 remains a significant quality risk because overlapping demographic information can make patient identification difficult and may contribute to duplicate records if appropriate controls are not applied.

The search-before-create behaviour and review of identity markers should remain part of regression coverage.

## Release Impact

Potential duplicate patient records could affect the integrity of patient information and may result in information being associated with the wrong record.

The risk should therefore remain visible for subsequent API and regression testing.

## Evidence

E-024, E-025, E-026 and E-027.
