import { expect, type Page } from "@playwright/test";

export class OpenMrsPage {
  constructor(private readonly page: Page) {}

  async loginAsAdmin(): Promise<void> {
    await this.page.goto("/openmrs/login.htm");
    await this.page.locator("#username").fill("admin");
    await this.page.locator("#password").fill("Admin123");
    await this.page.getByRole("button", { name: "Log In" }).click();
    await expect(this.page).toHaveURL(/\/openmrs\//);
  }

  async openPatientSearch(): Promise<void> {
    await this.page.goto("/openmrs/coreapps/findpatient/findPatient.page");
    await expect(this.page.locator("input").first()).toBeVisible();
  }

  async searchForPatient(searchTerm: string): Promise<void> {
    const searchInput = this.page.locator("input").first();
    await searchInput.fill(searchTerm);
  }
}
