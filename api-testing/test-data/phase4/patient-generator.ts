export interface SyntheticPatient {
  resourceType: "Patient";
  identifier: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  testRunTag: string;
}

export function generateUniquePatient(testRunTag: string): SyntheticPatient {
  const timestamp = Date.now();
  const uniqueId = `HELIX-PATIENT-${testRunTag}-${timestamp}`;

  return {
    resourceType: "Patient",
    identifier: uniqueId,
    firstName: "Synthetic",
    lastName: "Patient",
    birthDate: "1990-01-01",
    testRunTag,
  };
}
