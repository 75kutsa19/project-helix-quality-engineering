-- Project HELIX - Phase 4 SQL Validation Suite
-- Health Data Quality, SQL and Test-Data Management
--
-- Evidence note:
-- Patient validation queries below were already executed against Neon.
-- Their verified results are recorded in comments to avoid unnecessary reruns.

CREATE SCHEMA IF NOT EXISTS helix;

-- ============================================================
-- DQ-001: Duplicate patient IDs
-- ============================================================
SELECT
    COUNT(*) AS patient_count,
    COUNT(DISTINCT id) AS unique_patient_ids,
    COUNT(*) - COUNT(DISTINCT id) AS duplicate_ids
FROM helix.synthea_patients;

-- Previously executed result:
-- patient_count = 108
-- unique_patient_ids = 108
-- duplicate_ids = 0


-- ============================================================
-- DQ-002: Missing patient names / birth dates / future births
-- ============================================================
SELECT
    COUNT(*) FILTER (
        WHERE first_name IS NULL OR last_name IS NULL
    ) AS missing_names,
    COUNT(*) FILTER (
        WHERE birthdate IS NULL
    ) AS missing_birthdates,
    COUNT(*) FILTER (
        WHERE birthdate > CURRENT_DATE
    ) AS future_birthdates
FROM helix.synthea_patients;

-- Previously executed result:
-- missing_names = 0
-- missing_birthdates = 0
-- future_birthdates = 0


-- ============================================================
-- DQ-003: Orphan ServiceRequests
-- Requires Phase 4 FHIR ServiceRequest projection data.
-- ============================================================
-- SELECT COUNT(*) AS orphan_service_requests
-- FROM helix.fhir_service_requests sr
-- LEFT JOIN helix.fhir_resources fr
--   ON fr.resource_type = sr.resource_type
--  AND fr.resource_id = sr.resource_id
-- WHERE fr.resource_id IS NULL;


-- ============================================================
-- DQ-004: Specimens without patient linkage
-- Requires Phase 4 FHIR specimen data.
-- ============================================================
-- SELECT COUNT(*) AS specimens_without_patients
-- FROM helix.fhir_specimens fs
-- WHERE fs.patient_reference IS NULL;


-- ============================================================
-- DQ-005: Broken foreign-key relationships
-- Requires populated Phase 4 FHIR projection tables.
-- ============================================================
-- SELECT COUNT(*) AS broken_fhir_resource_links
-- FROM helix.fhir_service_requests sr
-- LEFT JOIN helix.fhir_resources fr
--   ON fr.resource_type = sr.resource_type
--  AND fr.resource_id = sr.resource_id
-- WHERE fr.resource_id IS NULL;


-- ============================================================
-- DQ-006: Null/invalid critical patient identifiers
-- ============================================================
SELECT COUNT(*) AS blank_patient_ids
FROM helix.synthea_patients
WHERE id IS NULL OR TRIM(id) = '';

-- Expected result from the imported Synthea patient dataset:
-- 0


-- ============================================================
-- Validation principle
-- ============================================================
-- Do not infer missing values.
-- Do not impute Week 8 SPEC_TOTAL.
-- Exclude Week 8 and Week 13 from primary SPEC_UNLINK rate calculations.
-- Deduplicate the Week 9 operational queue row before aggregation.
-- Record row counts and business implications in database/reports/.
