# Project Helix - Phase 1 Decision Explanation

## Project

**GenomeBridge Clinical Systems Ltd**

## Phase

**Phase 1 - Quality Discovery**

## Purpose

This document records the quality-engineering decisions, evidence, risks and testing priorities established during Phase 1.

## Evidence Trail

### Synthetic FHIR resources

- Patient: `Patient/137588836`
- ServiceRequest: `ServiceRequest/137593735`
- Specimen: `Specimen/137593737`

### Jira Quality Risks

- `HELIX-1` - Specimen-to-ServiceRequest linkage
- `HELIX-2` - Wrong patient selection from search results
- `HELIX-3` - Cypress automation reliability

## Priority Quality Risks

### HELIX-1 - Specimen-to-ServiceRequest linkage

**Risk score:** 25  
**RAG:** HIGH

The synthetic Patient, ServiceRequest and Specimen were successfully created through the HAPI FHIR API. The ServiceRequest and Specimen reference the synthetic Patient. The retrieved resources did not visibly demonstrate a direct ServiceRequest-to-Specimen association, so this requires further investigation before being classified as a confirmed defect.

### HELIX-2 - Wrong patient selection from search results

**Risk score:** 20  
**RAG:** HIGH

Exploratory testing identified multiple patient records when searching by the surname "Smith". This demonstrates a patient-identification risk where name-only searching could result in selection of the wrong patient.

### HELIX-3 - Cypress automation reliability

**Risk score:** 20  
**RAG:** HIGH

The project handover identifies intermittent CI failures and several potential test-design weaknesses. Automation reliability therefore requires investigation before the suite is treated as dependable release evidence.

## Testing Position

The evidence supports a risk-based testing approach. The identified risks will determine the depth and type of testing required across the subsequent phases, including exploratory testing, FHIR API testing, database validation, Cypress reliability analysis and Playwright automation.

## Decision

The identified high-priority risks should remain visible throughout the programme and should be used to determine testing depth, evidence requirements and release-readiness decisions.

The complete Phase 1 risk register, system context, test strategy, test-layer decisions and requirements traceability will provide the supporting evidence for these decisions.
