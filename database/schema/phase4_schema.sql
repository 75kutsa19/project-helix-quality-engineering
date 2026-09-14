-- Project HELIX Phase 4
-- PostgreSQL schema for synthetic healthcare data quality testing
-- Synthetic data only

CREATE SCHEMA IF NOT EXISTS helix;

-- Synthea source tables
CREATE TABLE IF NOT EXISTS helix.synthea_patients (
    id TEXT PRIMARY KEY,
    birthdate DATE,
    deathdate DATE,
    ssn TEXT,
    drivers TEXT,
    passport TEXT,
    prefix TEXT,
    first_name TEXT,
    middle_name TEXT,
    last_name TEXT,
    suffix TEXT,
    maiden_name TEXT,
    marital_status TEXT,
    race TEXT,
    ethnicity TEXT,
    gender TEXT,
    birthplace TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    county TEXT,
    fips INTEGER,
    zip_code TEXT,
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    healthcare_expenses NUMERIC(14,2),
    healthcare_coverage NUMERIC(14,2),
    income NUMERIC(14,2)
);

CREATE TABLE IF NOT EXISTS helix.synthea_organizations (
    id TEXT PRIMARY KEY,
    name TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    phone TEXT,
    revenue NUMERIC(14,2),
    utilization INTEGER,
    npi TEXT
);

CREATE TABLE IF NOT EXISTS helix.synthea_providers (
    id TEXT PRIMARY KEY,
    organization_id TEXT,
    name TEXT,
    gender TEXT,
    speciality TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    encounters INTEGER,
    procedures INTEGER,
    npi TEXT,
    CONSTRAINT fk_provider_organization
        FOREIGN KEY (organization_id)
        REFERENCES helix.synthea_organizations(id)
);

CREATE TABLE IF NOT EXISTS helix.synthea_encounters (
    id TEXT PRIMARY KEY,
    start_at TIMESTAMPTZ,
    stop_at TIMESTAMPTZ,
    patient_id TEXT,
    organization_id TEXT,
    provider_id TEXT,
    payer_id TEXT,
    encounter_class TEXT,
    code TEXT,
    description TEXT,
    base_encounter_cost NUMERIC(14,2),
    total_claim_cost NUMERIC(14,2),
    payer_coverage NUMERIC(14,2),
    reason_code TEXT,
    reason_description TEXT,
    CONSTRAINT fk_encounter_patient
        FOREIGN KEY (patient_id) REFERENCES helix.synthea_patients(id),
    CONSTRAINT fk_encounter_organization
        FOREIGN KEY (organization_id) REFERENCES helix.synthea_organizations(id),
    CONSTRAINT fk_encounter_provider
        FOREIGN KEY (provider_id) REFERENCES helix.synthea_providers(id)
);

CREATE TABLE IF NOT EXISTS helix.synthea_conditions (
    patient_id TEXT,
    encounter_id TEXT,
    start_date DATE,
    stop_date DATE,
    coding_system TEXT,
    code TEXT,
    description TEXT,
    CONSTRAINT fk_condition_patient
        FOREIGN KEY (patient_id) REFERENCES helix.synthea_patients(id),
    CONSTRAINT fk_condition_encounter
        FOREIGN KEY (encounter_id) REFERENCES helix.synthea_encounters(id)
);

CREATE TABLE IF NOT EXISTS helix.synthea_observations (
    patient_id TEXT,
    encounter_id TEXT,
    observed_at TIMESTAMPTZ,
    category TEXT,
    code TEXT,
    description TEXT,
    value TEXT,
    units TEXT,
    value_type TEXT,
    CONSTRAINT fk_observation_patient
        FOREIGN KEY (patient_id) REFERENCES helix.synthea_patients(id),
    CONSTRAINT fk_observation_encounter
        FOREIGN KEY (encounter_id) REFERENCES helix.synthea_encounters(id)
);

CREATE TABLE IF NOT EXISTS helix.synthea_procedures (
    patient_id TEXT,
    encounter_id TEXT,
    start_at TIMESTAMPTZ,
    stop_at TIMESTAMPTZ,
    coding_system TEXT,
    code TEXT,
    description TEXT,
    base_cost NUMERIC(14,2),
    reason_code TEXT,
    reason_description TEXT,
    CONSTRAINT fk_procedure_patient
        FOREIGN KEY (patient_id) REFERENCES helix.synthea_patients(id),
    CONSTRAINT fk_procedure_encounter
        FOREIGN KEY (encounter_id) REFERENCES helix.synthea_encounters(id)
);

CREATE TABLE IF NOT EXISTS helix.synthea_medications (
    patient_id TEXT,
    payer_id TEXT,
    encounter_id TEXT,
    start_at TIMESTAMPTZ,
    stop_at TIMESTAMPTZ,
    code TEXT,
    description TEXT,
    base_cost NUMERIC(14,2),
    payer_coverage NUMERIC(14,2),
    dispenses INTEGER,
    total_cost NUMERIC(14,2),
    reason_code TEXT,
    reason_description TEXT,
    CONSTRAINT fk_medication_patient
        FOREIGN KEY (patient_id) REFERENCES helix.synthea_patients(id),
    CONSTRAINT fk_medication_encounter
        FOREIGN KEY (encounter_id) REFERENCES helix.synthea_encounters(id)
);

CREATE TABLE IF NOT EXISTS helix.synthea_allergies (
    patient_id TEXT,
    encounter_id TEXT,
    start_date DATE,
    stop_date DATE,
    code TEXT,
    coding_system TEXT,
    description TEXT,
    allergy_type TEXT,
    category TEXT,
    reaction1 TEXT,
    reaction_description1 TEXT,
    severity1 TEXT,
    reaction2 TEXT,
    reaction_description2 TEXT,
    severity2 TEXT,
    CONSTRAINT fk_allergy_patient
        FOREIGN KEY (patient_id) REFERENCES helix.synthea_patients(id),
    CONSTRAINT fk_allergy_encounter
        FOREIGN KEY (encounter_id) REFERENCES helix.synthea_encounters(id)
);

-- Phase 3 FHIR resources retained as JSONB evidence.
CREATE TABLE IF NOT EXISTS helix.fhir_resources (
    resource_type TEXT NOT NULL,
    resource_id TEXT NOT NULL,
    test_run_tag TEXT,
    resource JSONB NOT NULL,
    imported_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (resource_type, resource_id)
);

CREATE TABLE IF NOT EXISTS helix.fhir_service_requests (
    resource_type TEXT NOT NULL DEFAULT 'ServiceRequest',
    resource_id TEXT PRIMARY KEY,
    patient_reference TEXT,
    practitioner_reference TEXT,
    organization_reference TEXT,
    status TEXT,
    intent TEXT,
    raw_resource JSONB NOT NULL,
    CONSTRAINT fk_sr_resource
        FOREIGN KEY (resource_type, resource_id)
        REFERENCES helix.fhir_resources(resource_type, resource_id)
);

CREATE TABLE IF NOT EXISTS helix.fhir_specimens (
    resource_type TEXT NOT NULL DEFAULT 'Specimen',
    resource_id TEXT PRIMARY KEY,
    patient_reference TEXT,
    service_request_reference TEXT,
    status TEXT,
    raw_resource JSONB NOT NULL,
    CONSTRAINT fk_specimen_resource
        FOREIGN KEY (resource_type, resource_id)
        REFERENCES helix.fhir_resources(resource_type, resource_id)
);

CREATE TABLE IF NOT EXISTS helix.fhir_patients (
    resource_id TEXT PRIMARY KEY,
    family_name TEXT,
    given_name TEXT,
    gender TEXT,
    birth_date DATE,
    raw_resource JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS helix.fhir_practitioners (
    resource_id TEXT PRIMARY KEY,
    display_name TEXT,
    raw_resource JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS helix.fhir_organizations (
    resource_id TEXT PRIMARY KEY,
    name TEXT,
    raw_resource JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS helix.fhir_consents (
    resource_id TEXT PRIMARY KEY,
    patient_reference TEXT,
    practitioner_reference TEXT,
    status TEXT,
    raw_resource JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS helix.fhir_tasks (
    resource_id TEXT PRIMARY KEY,
    patient_reference TEXT,
    practitioner_reference TEXT,
    service_request_reference TEXT,
    status TEXT,
    raw_resource JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS helix.fhir_diagnostic_reports (
    resource_id TEXT PRIMARY KEY,
    patient_reference TEXT,
    practitioner_reference TEXT,
    service_request_reference TEXT,
    specimen_reference TEXT,
    status TEXT,
    raw_resource JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS helix.fhir_audit_events (
    resource_id TEXT PRIMARY KEY,
    patient_reference TEXT,
    practitioner_reference TEXT,
    organization_reference TEXT,
    diagnostic_report_reference TEXT,
    raw_resource JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_encounters_patient
    ON helix.synthea_encounters(patient_id);

CREATE INDEX IF NOT EXISTS idx_conditions_patient
    ON helix.synthea_conditions(patient_id);

CREATE INDEX IF NOT EXISTS idx_observations_patient
    ON helix.synthea_observations(patient_id);

CREATE INDEX IF NOT EXISTS idx_fhir_sr_patient
    ON helix.fhir_service_requests(patient_reference);

CREATE INDEX IF NOT EXISTS idx_fhir_specimen_patient
    ON helix.fhir_specimens(patient_reference);

CREATE INDEX IF NOT EXISTS idx_fhir_specimen_sr
    ON helix.fhir_specimens(service_request_reference);
