# CH-07 — Keyboard-Only Accessibility

## Risk Target

QR-014 — Accessibility

## Objective

Explore whether key patient-search and record-navigation workflows can be completed using keyboard interaction without relying on mouse input.

## Scope

- Keyboard-only navigation through the OpenMRS interface
- Moving focus between interactive controls
- Activating controls using keyboard input
- Patient search using keyboard interaction
- Opening a patient record using keyboard interaction
- Navigating within the patient record
- Observing focus visibility and movement
- Observing whether any tested workflow requires mouse interaction
- Basic keyboard accessibility observations only; no formal WCAG conformance claim

## Data

Synthetic test data only.

## Timebox

30 minutes.

## Technique

Exploratory accessibility testing using keyboard-only interaction.

The exploration focused on keyboard navigation, focus movement, activation of controls, and completion of representative patient-search and record-navigation tasks.

## Execution Notes

Keyboard-only interaction was used to navigate the tested OpenMRS workflow.

Focus was moved between available interactive controls using keyboard navigation, and controls were activated using keyboard input where supported.

The patient-search workflow was explored without relying on mouse interaction. A patient record was opened and basic record navigation was performed using keyboard interaction.

The exploration also considered whether focus remained understandable as the workflow progressed and whether any tested action appeared to require mouse input.

No formal accessibility conformance assessment was performed.

## Result

**Result: PASS for the tested workflow / Accessibility observation**

The tested patient-search and record-navigation workflow could be progressed using keyboard interaction.

No confirmed accessibility defect was established during this charter.

The observations should be retained as part of regression coverage for keyboard accessibility.

## Decision

No confirmed accessibility defect was established during this charter.

Further accessibility assurance should include formal automated accessibility checks and broader keyboard coverage in a controlled test environment.

## Evidence

Keyboard-navigation execution notes from the Phase 2 exploratory testing session.

## Limitations

This was exploratory keyboard-only testing rather than a formal WCAG accessibility audit.

Screen-reader behaviour, assistive-technology compatibility, colour contrast, and full WCAG success-criterion coverage were outside the scope of this charter.
