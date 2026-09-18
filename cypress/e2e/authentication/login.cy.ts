describe("Authentication - inherited suite baseline", () => {
  it("logs in as admin", () => {
    cy.visit("/openmrs/login.htm");
    cy.get("#username").should("be.visible").type("admin");
    cy.get("#password").should("be.visible").type("Admin123");
    cy.intercept("POST", "**/loginServlet").as("loginRequest");
    cy.get("#loginButton").should("be.visible").click();
    cy.wait("@loginRequest").its("response.statusCode").should("be.oneOf", [200, 302]);
    cy.url().should("include", "/openmrs/");
  });

  it("shows the login form", () => {
    cy.visit("/openmrs/login.htm");
    cy.get("#username").should("be.visible");
    cy.get("#password").should("be.visible");
    cy.get("#loginButton").should("be.visible");
  });

  it("rejects invalid credentials", () => {
    cy.visit("/openmrs/login.htm");
    cy.get("#username").type("invalid-user");
    cy.get("#password").type("wrong-password");
    cy.get("#loginButton").click();
    cy.get("body").should("contain.text", "Invalid");
  });

  it("keeps the login page accessible before authentication", () => {
    cy.visit("/openmrs/login.htm");
    cy.url().should("include", "/openmrs/login.htm");
  });
});
