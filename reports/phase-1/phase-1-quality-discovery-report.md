# Project Helix - Phase 1 Quality Discovery Report

## Purpose and Scope

Phase 1 established the quality-engineering position for the Project Helix clinical genomics simulation. The objective was to understand the system context, review available evidence, identify significant quality risks and establish a risk-based testing approach for subsequent phases. All test data used within the exercise is synthetic.

## Evidence and Findings

Initial evidence included synthetic FHIR resources created and retrieved through the HAPI FHIR API: Patient/137588836, ServiceRequest/137593735 and Specimen/137593737. The ServiceRequest and Specimen reference the synthetic Patient; however, the retrieved resources did not visibly demonstrate a direct ServiceRequest-to-Specimen association. This was therefore recorded as a risk requiring further investigation rather than prematurely classified as a confirmed defect.

Exploratory testing identified a patient-identification risk. Searching OpenMRS using the surname "Smith" returned multiple patient records, including Mark Smith (100004N) and Mary Smith (10000F1). This demonstrated that name-only searching could create a risk of selecting the wrong patient unless sufficient distinguishing information is presented.

A further risk concerns the reliability of the existing Cypress regression suite. The project handover identifies intermittent CI failures and potential test-design weaknesses including hard-coded waits, shared login state, order-dependent tests, fixed demo data and fragile selectors. These issues could result in false failures or false confidence in regression results.

## Risk Assessment and Testing Priorities

Three high-priority quality risks were recorded in Jira: HELIX-1, specimen-to-ServiceRequest linkage, scored 25/25; HELIX-2, wrong patient selection, scored 20/25; and HELIX-3, Cypress automation reliability, scored 20/25. All three were classified as HIGH.

The risks will determine testing depth across subsequent phases. Planned investigation includes FHIR API validation, exploratory testing, SQL/database validation, Cypress reliability analysis and Playwright automation.

## Quality Decision

Phase 1 concludes that a risk-based testing strategy is appropriate. The identified risks should remain visible throughout the programme and should influence test coverage, evidence requirements and release-readiness decisions. Particular attention should be given to specimen linkage, patient identification and automation reliability before these areas are relied upon as evidence for the planned release decision.
