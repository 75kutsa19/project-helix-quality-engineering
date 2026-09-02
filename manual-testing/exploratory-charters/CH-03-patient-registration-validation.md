# CH-03 — Patient Registration & Validation

## Risk Targets

- QR-003 — Incomplete Demographics
- QR-011 — Form Validation Inconsistency

## Objective

Explore patient registration and demographic validation behaviour, with particular attention to mandatory fields, date-of-birth validation, boundary conditions, identifier validation, and whether validation messages clearly explain the required correction.

## Scope

- Valid patient registration path
- Mandatory demographic fields
- Missing or incomplete demographic information
- Date of birth validation
- Future date of birth
- Date-of-birth boundary conditions
- Identifier validation behaviour
- Validation messages
- Persistence of successfully registered patient information
- Behaviour following validation failure

## Data

Synthetic test data only.

No real patient information is used.

## Formal Technique — Date of Birth Boundary Value Analysis

DOB validation was explored using boundary-oriented values around the current date:

- Future date — invalid
- Current date — boundary
- Recent valid past date — valid
- Older valid date — valid
- Invalid date format/value — invalid where supported by the interface

The purpose was to determine whether the registration workflow rejects dates outside the permitted range and provides an understandable validation response.

## Timebox

30 minutes

## Execution Notes

### E-018 — Valid Registration Path

A synthetic patient registration path was explored using valid demographic information.

The workflow was able to proceed through the registration process when the required information was supplied.

**Result:** PASS

### E-019 — Date of Birth Boundary — Future Date

A future date of birth was entered during registration.

The system rejected the value and displayed:

`Cannot be a date in the future`

**Result:** PASS / Expected Behaviour

### E-020 — Date of Birth Valid Past Value

A valid historical date of birth was used during registration.

The date was accepted as a valid demographic value.

**Result:** PASS

### E-021 — Mandatory Demographic Fields

Mandatory demographic fields were explored by considering incomplete registration input.

The behaviour was reviewed for whether the workflow prevents incomplete demographic information from being accepted.

No confirmed product defect was established from the available evidence.

### E-022 — Identifier Validation

Identifier validation was explored using synthetic identifier values.

The OpenMRS registration workflow applied identifier validation and rejected values that did not satisfy the configured identifier rules.

Some invalid-input attempts produced validation messages including:

`Identifier cannot be null`

`Identifier Type cannot be null`

and a generic `typeMismatch` response.

These observations were retained for triage rather than treating every validation message as a confirmed defect.

### E-023 — Validation After Invalid Input

The registration workflow was observed after invalid input was supplied.

The system did not establish a confirmed defect in the tested path.

Further validation coverage should remain part of regression testing.

## Result

**PASS / RISK OBSERVATION**

The tested registration workflow accepted valid demographic information and rejected a future date of birth as expected.

Identifier validation was also observed.

Some validation responses were inconsistent or generic, particularly around invalid identifier input. This supports continued coverage of QR-011 but does not, from the available evidence alone, establish a confirmed defect.

## Decision

No confirmed registration defect was established from the available evidence.

QR-003 remains relevant because incomplete or boundary demographic data can affect patient identification and record quality.

QR-011 remains relevant because validation behaviour and messaging should be covered by regression scenarios.

The future-DOB rejection should be retained as an expected-behaviour regression scenario.

## Evidence

E-018, E-019, E-020, E-021, E-022 and E-023.
