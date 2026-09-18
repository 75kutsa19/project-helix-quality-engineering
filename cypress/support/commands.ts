import { generateUniquePatient } from "../../api-testing/test-data/phase4/patient-generator";
import { generateTestRunTag } from "../../api-testing/test-data/phase4/test-run-tag";

declare global {
  namespace Cypress {
    interface Chainable {
      loginAsAdmin(): Chainable<void>;
      generateSyntheticPatient(): Chainable<{
        resourceType: "Patient";
        identifier: string;
        firstName: string;
        lastName: string;
        birthDate: string;
        testRunTag: string;
      }>;
    }
  }
}

Cypress.Commands.add("loginAsAdmin", () => {
  cy.session("admin-session", () => {
    cy.visit("/openmrs/login.htm");
    cy.get("#username").should("be.visible").type("admin");
    cy.get("#password").should("be.visible").type("Admin123");
    cy.get("#loginButton").should("be.visible").click();
    cy.url().should("include", "/openmrs/");
  });
});

Cypress.Commands.add("generateSyntheticPatient", () => {
  const testRunTag = generateTestRunTag();
  const patient = generateUniquePatient(testRunTag);

  return cy.wrap(patient);
});
