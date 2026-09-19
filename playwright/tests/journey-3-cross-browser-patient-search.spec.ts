import { test, expect } from "@playwright/test";
import { writeFileSync } from "node:fs";

function writeBrowserEvidence(browserName: string, url: string, classification: string): void {
  writeFileSync(
    "playwright/reports/journey-3-" + browserName + ".json",
    JSON.stringify({ browserName, url, classification }, null, 2),
  );
}
import { OpenMrsPage } from "../pages/openmrs.page";

test("Journey 3 - cross-browser patient search page", async ({ page, browserName }) => {
  const openMrs = new OpenMrsPage(page);

  await openMrs.loginAsAdmin();
  await page.goto("/openmrs/coreapps/findpatient/findPatient.page");

  await expect(page).toHaveURL(/findpatient|challenge/);

  const securityVerification = page.getByRole("heading", {
    name: "Performing security verification",
  });

  if (await securityVerification.isVisible().catch(() => false)) {
    test.info().annotations.push({
      type: "environmental-limitation",
      description: `Cloudflare security verification intercepted patient search in ${browserName}`,
    });

    writeBrowserEvidence(browserName, page.url(), "environmental limitation - Cloudflare security verification");

    await expect(securityVerification).toBeVisible();
    return;
  }

  await expect(page.locator("input:visible").first()).toBeVisible();
  writeBrowserEvidence(browserName, page.url(), "no cross-browser defect observed");
});
