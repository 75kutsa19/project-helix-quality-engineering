# CH-08 — Cross-Browser Compatibility

## Risk Target

QR-015 — Browser Compatibility

## Objective

Explore whether core OpenMRS patient workflows behave consistently across supported desktop browsers, with particular attention to authentication, patient search, patient selection, and patient-record display.

## Scope

- Login behaviour
- Patient search
- Patient identification and selection
- Patient dashboard display
- Basic patient-record navigation
- Comparison of tested behaviour across browsers
- Observation of layout, controls, navigation, and data-display differences
- Comparison between Chromium-based browsers used during exploratory testing

## Data

Synthetic test data only.

## Timebox

30 minutes.

## Technique

Exploratory cross-browser comparison.

The same representative patient workflow was executed in different desktop browsers and the observed behaviour, displayed patient information, navigation, and visible controls were compared.

## Execution Notes

The core patient workflow was tested in Chrome and Edge using the same synthetic patient-search scenario.

The workflow included login, navigation to patient search, searching for patient identifier `100004N`, opening the matching patient record, and reviewing the patient dashboard.

The displayed patient information and the behaviour of the tested workflow were compared between the browsers.

The same patient record was returned and displayed in both browsers.

No material difference in the tested workflow, patient information, navigation, or visible controls was observed.

## Result

**Result: PASS**

The tested workflow behaved consistently across Chrome and Edge.

The same synthetic patient record was returned and displayed in both browsers, with no confirmed browser-specific defect identified during this exploration.

## Decision

No confirmed cross-browser defect was established during this charter.

The tested workflow should be retained as part of regression coverage for browser compatibility.

Broader browser coverage should be included in future regression cycles where additional supported browsers or versions are available.

## Evidence

Cross-browser exploratory execution comparing Chrome and Edge using the same synthetic patient-search and patient-record workflow.

## Limitations

This was exploratory cross-browser testing rather than exhaustive compatibility testing.

Only the browsers and workflow available during the exploratory session were assessed.

Browser versions, operating-system combinations, mobile browsers, and unsupported-browser behaviour were outside the scope of this charter.
