describe("Patient Search - inherited suite baseline", () => {
  it("searches for a fixed demo patient", () => {
    cy.visit("/openmrs/index.htm");
    cy.intercept("GET", "**/ws/rest/v1/patient*").as("patientSearch");
    cy.get("input").first().type("Smith");
    cy.wait("@patientSearch");
    cy.get("input").first().type("{enter}");
    cy.contains("Smith").should("exist");
  });

  it("opens the patient search page", () => {
    cy.visit("/openmrs/coreapps/findpatient/findPatient.page");
    cy.get("input").should("exist");
  });

  it("filters search results", () => {
    cy.visit("/openmrs/coreapps/findpatient/findPatient.page");
    cy.intercept("GET", "**/ws/rest/v1/patient*").as("patientFilter");
    cy.get("input").first().type("Smith");
    cy.wait("@patientFilter");
    cy.get("body").should("contain.text", "Smith");
  });

  it("shows the search area after login", () => {
    cy.loginAsAdmin();
    cy.visit("/openmrs/coreapps/findpatient/findPatient.page");
    cy.get("body").should("contain.text", "Find Patient");
  });
});
