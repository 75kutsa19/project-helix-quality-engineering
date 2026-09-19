import { test, expect } from "@playwright/test";
import { OpenMrsPage } from "../pages/openmrs.page";

test("Journey 1 - authenticated patient search", async ({ page }) => {
  const openMrs = new OpenMrsPage(page);

  await openMrs.loginAsAdmin();
  await openMrs.openPatientSearch();
  await openMrs.searchForPatient("Smith");

  await expect(page.locator("body")).toContainText("Smith");
});
