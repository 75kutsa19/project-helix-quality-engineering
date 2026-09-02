# CH-05 — Demographic Editing & Persistence

## Risk Target

- QR-003 — Incomplete Demographics
- QR-011 — Form Validation Inconsistency

## Objective

Explore demographic editing behaviour and confirm that valid changes are saved correctly, remain persistent after leaving the patient record, and can be retrieved through patient search.

## Scope

- Open an existing synthetic patient record
- Edit patient demographic information
- Save valid changes
- Verify that changes persist
- Re-search for the patient after editing
- Review validation behaviour for demographic fields
- Consider boundary-value behaviour for date of birth
- Observe whether validation messages are clear and consistent

## Data

Synthetic test data only.

No real patient information is used.

## Timebox

30 minutes

## Exploratory Approach

The charter focuses on the integrity of demographic information after an authorised edit.

Testing considers both successful updates and validation behaviour. Particular attention is given to whether information displayed immediately after saving remains consistent when the patient is subsequently searched for and reopened.

## Execution Notes

### Existing Patient Demographic Edit

A synthetic patient record was opened and demographic information was edited.

The patient name was changed from:

`TestPatient002`

to:

`TestPatient002 EditTest`

The updated record was saved successfully.

The patient was subsequently searched for again and the updated name was returned in the search results.

**Result:** PASS

### Persistence After Re-search

The edited patient was located again using patient search after the demographic update.

The updated demographic information was retained rather than reverting to the previous value.

**Result:** PASS

### Validation Exploration

Demographic validation behaviour was explored during registration and editing activities.

Validation responses were observed for invalid demographic input, including date-of-birth boundary conditions.

A future date of birth was rejected with the message:

`Cannot be a date in the future`

This demonstrates server-side/business validation for the tested date-of-birth condition.

**Result:** PASS for the tested validation condition

### Validation Consistency Observation

Some registration and identifier-validation attempts produced generic or inconsistent validation responses, including messages such as `typeMismatch` and identifier-related validation messages.

These observations were not treated as a confirmed demographic defect because the tested flows did not establish a reproducible defect specifically within demographic editing.

**Result:** OBSERVATION

## Decision

The tested valid demographic edit persisted successfully after saving and subsequent patient search.

No confirmed demographic-edit persistence defect was established.

The tested future-date-of-birth validation behaved as expected.

Validation consistency remains an area for continued regression coverage because generic validation responses were observed elsewhere in the registration workflow.

## Release Impact

Incorrect or non-persistent demographic information could affect patient identification and the integrity of clinical records.

Reliable persistence and clear validation should therefore remain part of regression coverage.

## Regression Coverage

- Edit a synthetic patient's demographic information
- Save the changes
- Leave the patient record
- Search for the patient again
- Confirm that the updated information persists
- Attempt invalid date-of-birth values
- Confirm that invalid values are rejected with clear validation feedback

## Evidence

Observed during the Project Helix Phase 2 exploratory testing session.

Supporting browser evidence is retained separately where captured.
