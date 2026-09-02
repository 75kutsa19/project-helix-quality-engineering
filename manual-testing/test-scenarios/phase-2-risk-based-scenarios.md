# Phase 2 — Risk-Based Scenario Inventory

## Purpose

This scenario inventory provides risk-linked manual test coverage for the Project Helix Phase 2 exploratory testing activities.

All scenarios use synthetic test data only.

Each scenario links to a named Phase 1 Product Risk Register ID.

---

## CH-01 — Authentication & Session Control

### TS-001 — Valid Login
- **Risk ID:** QR-010
- **Scenario:** Verify that a user with valid credentials can authenticate successfully.
- **Expected:** The user is authenticated and granted access to the application.

### TS-002 — Invalid Login
- **Risk ID:** QR-010
- **Scenario:** Attempt authentication using invalid credentials.
- **Expected:** Authentication is rejected and access to protected functionality is not granted.

### TS-003 — Logout
- **Risk ID:** QR-010
- **Scenario:** Authenticate and then use the application logout function.
- **Expected:** The authenticated session ends and the user is returned to an unauthenticated state.

### TS-004 — Protected Access After Logout
- **Risk ID:** QR-010
- **Scenario:** After logout, attempt to access a previously protected patient resource.
- **Expected:** The application requires authentication before protected content can be accessed.

---

## CH-02 — Patient Search & Identification

### TS-005 — Complete Patient Name Search
- **Risk ID:** QR-001
- **Scenario:** Search for a patient using a complete synthetic patient name.
- **Expected:** The appropriate matching patient record is returned.

### TS-006 — Partial Patient Name Search
- **Risk ID:** QR-001
- **Scenario:** Search using only part of a patient's name.
- **Expected:** Matching patient records are returned and can be distinguished using available identity information.

### TS-007 — Exact Patient Identifier Search
- **Risk ID:** QR-001
- **Scenario:** Search using an exact patient identifier.
- **Expected:** The corresponding patient record is returned.

### TS-008 — Invalid Patient Identifier Search
- **Risk ID:** QR-001
- **Scenario:** Search using an invalid or non-matching patient identifier.
- **Expected:** No unrelated patient is returned and the user receives an appropriate no-match outcome.

### TS-009 — Multiple Matching Patients
- **Risk ID:** QR-001
- **Scenario:** Search using a common name that produces multiple patient matches.
- **Expected:** Multiple results are clearly presented with sufficient identity markers to support correct patient selection.

### TS-010 — Case Variation in Patient Search
- **Risk ID:** QR-001
- **Scenario:** Repeat a patient search using different combinations of upper- and lower-case characters.
- **Expected:** Search behaviour is consistent with the application's supported case-handling behaviour.

### TS-011 — Identity Marker Review
- **Risk ID:** QR-001
- **Scenario:** Review patient name, identifier, date of birth and other visible identity markers in search results.
- **Expected:** Identity information is visible and sufficient to support patient disambiguation.

### TS-012 — Broad Search Pagination
- **Risk ID:** QR-001
- **Scenario:** Perform a broad search that returns many patient records and navigate through available result pages.
- **Expected:** Results can be navigated consistently without unexpected loss, duplication or incorrect ordering of records.

---

## CH-03 — Patient Registration & Validation

### TS-013 — Valid Mandatory Patient Registration
- **Risk ID:** QR-003
- **Scenario:** Enter valid synthetic patient demographic information and complete registration.
- **Expected:** The patient record is created successfully.

### TS-014 — Missing Patient Name
- **Risk ID:** QR-003
- **Scenario:** Attempt registration without the required patient name information.
- **Expected:** The application prevents invalid submission and provides appropriate validation feedback.

### TS-015 — Missing Date of Birth
- **Risk ID:** QR-003
- **Scenario:** Attempt registration without a date of birth where the field is required.
- **Expected:** The application applies the expected validation rule.

### TS-016 — Missing Gender
- **Risk ID:** QR-003
- **Scenario:** Attempt registration without selecting the required gender information.
- **Expected:** The application prevents invalid submission and provides appropriate validation feedback.

### TS-017 — Future Date of Birth
- **Risk ID:** QR-011
- **Scenario:** Enter a date of birth later than the current date.
- **Expected:** The application rejects the future date and provides clear validation feedback.

### TS-018 — Date of Birth Boundary Values
- **Risk ID:** QR-011
- **Scenario:** Explore date-of-birth boundary values around valid and invalid limits.
- **Expected:** Boundary values are handled consistently according to the application's validation rules.

---

## CH-04 — Duplicate Patient Risk

### TS-019 — Search Before Creating Patient
- **Risk ID:** QR-002
- **Scenario:** Search for an existing patient using known identity information before attempting registration.
- **Expected:** Existing matching records can be identified before a new record is created.

### TS-020 — Overlapping Patient Demographics
- **Risk ID:** QR-002
- **Scenario:** Explore patient records with overlapping names and demographic information.
- **Expected:** The workflow provides sufficient information to distinguish existing records.

### TS-021 — Potential Duplicate Registration
- **Risk ID:** QR-002
- **Scenario:** Attempt to register synthetic demographic information that overlaps with an existing patient.
- **Expected:** Existing-record information or appropriate duplicate-prevention behaviour is presented where supported.

### TS-022 — Identifier Uniqueness
- **Risk ID:** QR-002
- **Scenario:** Explore whether an identifier already associated with a patient can be reused.
- **Expected:** Identifier uniqueness is enforced according to the application's rules.

---

## CH-05 — Demographic Editing & Persistence

### TS-023 — Edit Patient Name
- **Risk ID:** QR-003
- **Scenario:** Edit the name of an existing synthetic patient record.
- **Expected:** The updated name can be saved successfully.

### TS-024 — Save Demographic Changes
- **Risk ID:** QR-011
- **Scenario:** Modify supported patient demographic information and save the changes.
- **Expected:** Valid changes are accepted and saved.

### TS-025 — Verify Demographic Persistence
- **Risk ID:** QR-003
- **Scenario:** Save a demographic change, leave the record, and search for the patient again.
- **Expected:** The updated demographic information persists.

### TS-026 — Invalid Demographic Update
- **Risk ID:** QR-011
- **Scenario:** Attempt to save invalid demographic information.
- **Expected:** Invalid information is rejected with appropriate validation feedback.

---

## CH-06 — Patient Record Navigation

### TS-027 — Open Patient From Search
- **Risk ID:** QR-001
- **Scenario:** Search for a patient and open the intended record from the results.
- **Expected:** The selected patient record opens and identity information remains consistent.

### TS-028 — Navigate Patient Record
- **Risk ID:** QR-001
- **Scenario:** Navigate between available sections or views within a patient record.
- **Expected:** Navigation remains within the selected patient's record and displays the expected information.

---

## CH-07 — Keyboard-Only Accessibility

### TS-029 — Keyboard-Only Patient Workflow
- **Risk ID:** QR-014
- **Scenario:** Complete representative patient-search and record-navigation actions using keyboard interaction without mouse input.
- **Expected:** The tested workflow can be progressed using keyboard interaction.

---

## CH-08 — Cross-Browser Compatibility

### TS-030 — Core Workflow Across Browsers
- **Risk ID:** QR-015
- **Scenario:** Execute the same representative patient-search and patient-record workflow in two supported desktop browsers and compare the results.
- **Expected:** Core workflow behaviour, patient information and visible controls remain consistent across the tested browsers.

---

## Coverage Summary

| Charter | Risk ID(s) | Scenarios |
|---|---|---:|
| CH-01 Authentication & Session Control | QR-010 | 4 |
| CH-02 Patient Search & Identification | QR-001 | 8 |
| CH-03 Patient Registration & Validation | QR-003, QR-011 | 6 |
| CH-04 Duplicate Patient Risk | QR-002 | 4 |
| CH-05 Demographic Editing & Persistence | QR-003, QR-011 | 4 |
| CH-06 Patient Record Navigation | QR-001 | 2 |
| CH-07 Keyboard-Only Accessibility | QR-014 | 1 |
| CH-08 Cross-Browser Compatibility | QR-015 | 1 |
| **Total** | **Risk-linked** | **30** |

## Execution and Evidence Note

The scenarios define the Phase 2 risk-based coverage inventory.

Execution outcomes and observations are recorded in the corresponding exploratory charter notes and supporting evidence.

Where a behaviour was not confirmed as a defect, it is not represented as a confirmed defect in this inventory.
