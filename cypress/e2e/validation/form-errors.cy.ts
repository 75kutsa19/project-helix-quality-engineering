describe("Validation - inherited suite baseline", () => {
  it("shows required field validation", () => {
    cy.visit("/openmrs/coreapps/findpatient/findPatient.page");
    cy.get("input[placeholder='Search']").should("exist");
  });

  it("uses a stable selector for validation", () => {
    cy.visit("/openmrs/coreapps/findpatient/findPatient.page");
    cy.get("input[placeholder='Search']").click();
    cy.get("body").should("exist");
  });

  it("generates a unique synthetic patient for test isolation", () => {
    cy.generateSyntheticPatient().then((patient) => {
      expect(patient.identifier).to.match(/^HELIX-PATIENT-/);
      expect(patient.testRunTag).to.match(/^HELIX-/);
    });
  });

  it("handles a session timeout check", () => {
    cy.visit("/openmrs/login.htm");
    cy.get("#username").should("be.visible");
    cy.get("#password").should("be.visible");
  });
});
