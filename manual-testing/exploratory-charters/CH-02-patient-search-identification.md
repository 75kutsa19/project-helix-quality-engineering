# CH-02 — Patient Search & Identification

## Risk Target

QR-001 — Patient Identification

## Objective

Explore patient search behaviour and identification accuracy, with particular attention to partial-name searches, multiple matching patients, exact identifier searches, case variation, and the information available to distinguish patients before opening a record.

## Scope

- Search by complete patient name
- Search by partial name
- Search using common names with multiple matches
- Search using an exact patient identifier
- Case-insensitive search behaviour
- Invalid or non-matching search terms
- Review of identity markers returned in search results
- Pagination when a broad search returns many records
- Selection of a patient from multiple matching results

## Data

Synthetic test data only.

No patient records were created or modified during this charter.

## Formal Technique

Equivalence-class exploration was applied to patient-name searches:

- Exact/complete name
- Partial name
- Common name producing multiple matches
- Non-matching search term
- Exact patient identifier

Identity markers such as patient name, identifier, date of birth, age and sex were compared where displayed.

## Timebox

30 minutes

## Execution Notes

### E-012 — Common Name Search

Searching for:

`Smith`

returned multiple matching patients, including:

- Mark Smith — 100004N
- Mary Smith — 10000F1

The search therefore demonstrated that a common name can produce more than one patient candidate.

### E-013 — Patient Identification From Multiple Results

Mark Smith was opened from the search results.

The displayed identity information was reviewed before continuing with the patient record.

No incorrect patient selection was established.

### E-014 — Partial Name Search

Searching for:

`John`

returned Joshua Johnson — 100008E.

This demonstrated partial-name matching rather than requiring the complete patient name.

### E-015 — Exact Identifier Search

Searching for:

`100008E`

returned Joshua Johnson.

The identifier matched the displayed patient record.

### E-016 — Case Variation

Case variation was explored during patient-name searching.

The search behaviour did not establish a confirmed defect from the evidence available.

### E-017 — Broad Identifier Search and Pagination

Searching for:

`10000`

returned a large result set of approximately 30 entries with pagination.

Pagination behaviour was explored across the available result pages.

An unexpected navigation behaviour was observed when using the Next control from page 3. This was retained as an observation rather than raised as a confirmed defect because the behaviour was not sufficiently established as reproducible defect evidence during this charter.

## Result

**PASS / Risk Observation**

The search function successfully returned patients for complete/partial names and exact identifiers.

However, QR-001 remains an important identification risk because common-name searches can return multiple patients. Users must distinguish the intended patient using available identity attributes before proceeding.

No confirmed wrong-patient selection defect was established.

## Decision

No confirmed patient-identification defect was established during this charter.

The multiple-match behaviour for common names should remain covered by regression scenarios requiring verification of patient identity attributes before record navigation.

The pagination observation should be retained for further investigation only if it can be reproduced consistently.

## Evidence

E-012, E-013, E-014, E-015, E-016 and E-017.
