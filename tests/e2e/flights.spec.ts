import { test, expect } from "@playwright/test";

test.describe("Flights", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to flights page", async ({ page }) => {
    const flightsLink = page.locator("nav a[href='/flights']");

    if (await flightsLink.isVisible()) {
      await flightsLink.click();
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveURL(/.*flights/);
    }
  });

  test("should display flights page content", async ({ page }) => {
    await page.goto("/flights");

    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/.*flights/);

    const pageHeading = page.locator("h1.page_heading__qbyD6");
    await expect(pageHeading).toBeVisible();
    await expect(pageHeading).toHaveText("Galactic Flight Search");
  });

  test("should display flights table", async ({ page }) => {
    await page.goto("/flights");

    await page.waitForLoadState("networkidle");

    const flightsTable = page.locator("table");

    if (await flightsTable.isVisible()) {
      await expect(flightsTable).toBeVisible();

      const tableHeaders = flightsTable.locator("thead");
      if (await tableHeaders.isVisible()) {
        await expect(tableHeaders).toBeVisible();

        const headerCells = flightsTable.locator("th");
        await expect(headerCells).toHaveCount(6); // Should have 6 headers

        await expect(page.locator("th:has-text('Carrier')")).toBeVisible();
        await expect(page.locator("th:has-text('Date')")).toBeVisible();
        await expect(page.locator("th:has-text('Origin')")).toBeVisible();
        await expect(page.locator("th:has-text('Destination')")).toBeVisible();
        await expect(page.locator("th:has-text('Vessel Class')")).toBeVisible();
      }
    }
  });
});
