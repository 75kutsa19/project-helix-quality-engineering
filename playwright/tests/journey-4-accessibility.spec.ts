import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync } from "node:fs";
import { OpenMrsPage } from "../pages/openmrs.page";

type Finding = {
  page: string;
  url: string;
  violations: Array<{ id: string; impact: string | null; description: string }>;
};

async function scanPage(page: Page, pageName: string, evidenceFile: string): Promise<Finding> {
  const results = await new AxeBuilder({ page }).analyze();
  const finding: Finding = {
    page: pageName,
    url: page.url(),
    violations: results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
    })),
  };

  writeFileSync(evidenceFile, JSON.stringify(finding, null, 2));
  return finding;
}

test("Journey 4A - login page accessibility", async ({ page }) => {
  await page.goto("/openmrs/login.htm");
  const finding = await scanPage(page, "Login page", "playwright/reports/axe-login.json");
  expect(finding.page).toBe("Login page");
});

test("Journey 4B - authenticated dashboard accessibility", async ({ page }) => {
  const openMrs = new OpenMrsPage(page);
  await openMrs.loginAsAdmin();
  await page.goto("/openmrs/index.htm");
  const finding = await scanPage(page, "Authenticated dashboard", "playwright/reports/axe-dashboard.json");
  expect(finding.page).toBe("Authenticated dashboard");
});

test("Journey 4C - patient search accessibility", async ({ page }) => {
  const openMrs = new OpenMrsPage(page);
  await openMrs.loginAsAdmin();
  await page.goto("/openmrs/coreapps/findpatient/findPatient.page");
  const finding = await scanPage(page, "Patient search route", "playwright/reports/axe-patient-search.json");
  expect(finding.page).toBe("Patient search route");
});
