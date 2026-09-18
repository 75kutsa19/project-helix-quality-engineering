describe("Record Navigation - inherited suite baseline", () => {
  it("establishes its own patient navigation state", () => {
    cy.loginAsAdmin();
    cy.visit("/openmrs/coreapps/findpatient/findPatient.page");
    cy.get("input").first().type("Smith");
    cy.intercept("GET", "**/ws/rest/v1/patient/**").as("patientRecord");
    cy.contains("Smith").click();
    cy.wait("@patientRecord");
    cy.url().should("include", "patient");
  });

  it("navigates to the dashboard after establishing its own session", () => {
    cy.loginAsAdmin();
    cy.visit("/openmrs/index.htm");
    cy.url().should("include", "/openmrs/");
  });

  it("opens a patient record from an independently created search state", () => {
    cy.loginAsAdmin();
    cy.visit("/openmrs/coreapps/findpatient/findPatient.page");
    cy.get("input").first().type("Smith");
    cy.contains("Smith").click();
    cy.get("body").should("contain.text", "Patient");
  });

  it("returns to the patient search page from a fresh session", () => {
    cy.loginAsAdmin();
    cy.visit("/openmrs/coreapps/findpatient/findPatient.page");
    cy.get("body").should("contain.text", "Find Patient");
  });
});
