# CH-06 — Patient Record Navigation

## Risk Target

- QR-001 — Patient Identification
- QR-010 — Session Control

## Objective

Explore navigation between patient search results, patient records and related record views, with attention to correct patient context, return navigation and session state.

## Scope

- Search for a synthetic patient
- Open a patient record from search results
- Navigate within the patient record
- Return to patient search
- Re-search for the patient
- Confirm that the correct patient context is maintained
- Observe navigation behaviour after authentication and logout

## Data

Synthetic test data only.

No real patient information is used.

## Timebox

30 minutes

## Exploratory Approach

The charter focuses on whether users can move between patient search and patient records without losing the intended patient context.

Particular attention is given to the risk of selecting or displaying the wrong patient when moving between search results and individual records.

## Execution Notes

### Patient Search to Record

A synthetic patient was located using patient search and the corresponding patient record was opened from the search results.

The expected patient record was displayed.

**Result:** PASS

### Navigation Within Patient Record

The patient record was explored through the available record navigation options.

The tested navigation path remained within the selected patient's record context.

**Result:** PASS

### Return to Search

Navigation back towards patient search was explored and the patient could subsequently be searched for again.

The expected synthetic patient remained identifiable through search.

**Result:** PASS

### Patient Context

The patient identity information displayed during navigation was reviewed to ensure that the selected record remained consistent.

No confirmed wrong-patient navigation defect was established during the tested path.

**Result:** PASS

### Session Navigation Observation

Session-related browser navigation was also considered as part of the broader navigation risk.

The logout and protected-resource behaviour explored under CH-01 should remain part of regression coverage.

## Decision

No confirmed patient-record navigation defect was established during this charter.

The tested search-to-record-to-search path maintained the expected patient context.

Because incorrect patient selection or loss of session state could have significant consequences in a clinical environment, the navigation path should remain part of regression coverage.

## Release Impact

Incorrect patient context during navigation could contribute to patient-identification errors.

Reliable navigation and preservation of patient context are therefore important to clinical record integrity.

## Regression Coverage

- Search for a synthetic patient
- Open the intended patient record
- Navigate through the record
- Return to patient search
- Re-search for the patient
- Confirm that the correct patient remains identifiable
- Verify session behaviour when navigating after logout

## Evidence

Browser observations and screenshots captured during the Project Helix Phase 2 exploratory testing session.
