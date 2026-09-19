import { test, expect } from "@playwright/test";
import { writeFileSync } from "node:fs";

test("Journey 5 - API-assisted FHIR patient setup", async ({ request, page }) => {
  const uniqueIdentifier = `HELIX-TEST-${Date.now()}`;

  const patient = {
    resourceType: "Patient",
    identifier: [
      {
        system: "https://genomebridge.example/helix-test",
        value: uniqueIdentifier,
      },
    ],
    name: [
      {
        use: "official",
        family: "HelixTest",
        given: ["Synthetic"],
      },
    ],
    birthDate: "1990-01-01",
  };

  const createResponse = await request.post(
    "https://hapi.fhir.org/baseR4/Patient",
    {
      data: patient,
      headers: {
        Accept: "application/fhir+json",
        "Content-Type": "application/fhir+json",
      },
    },
  );

  expect(createResponse.ok()).toBeTruthy();

  const createdPatient = await createResponse.json();
  const patientId = createdPatient.id;

  expect(patientId).toBeTruthy();

  writeFileSync(
    "playwright/reports/journey-5-fhir-evidence.json",
    JSON.stringify({ identifier: uniqueIdentifier, patientId, status: createResponse.status() }, null, 2),
  );

  await test.info().attach("fhir-created-patient", {
    body: JSON.stringify(
      {
        identifier: uniqueIdentifier,
        patientId,
        status: createResponse.status(),
      },
      null,
      2,
    ),
    contentType: "application/json",
  });

  await page.goto(`https://hapi.fhir.org/baseR4/Patient/${patientId}`);
  await expect(page.locator("body")).toContainText(patientId);
});
