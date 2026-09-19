import { test, expect } from "@playwright/test";
import { OpenMrsPage } from "../pages/openmrs.page";

test("Journey 2 - authenticated dashboard navigation", async ({ page }) => {
  const openMrs = new OpenMrsPage(page);

  await openMrs.loginAsAdmin();
  await page.goto("/openmrs/index.htm");

  await expect(page).toHaveURL(/\/openmrs\//);
  await expect(page.locator("body")).not.toContainText("Not logged in");
});
