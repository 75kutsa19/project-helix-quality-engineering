import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://o3.openmrs.org",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.ts",
    video: true,
    screenshotOnRunFailure: true,
  },
});