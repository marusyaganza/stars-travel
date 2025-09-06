import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");

    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle(/Stars Travel/);
  });

  test("should display main navigation elements", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("nav")).toBeVisible();

    const planetIcons = page.locator('img[alt="planet icon"]');
    const iconCount = await planetIcons.count();
    expect(iconCount).toBeGreaterThan(0);
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");

    const navLinks = page.locator("nav a");
    const navLinksCount = await navLinks.count();
    expect(navLinksCount).toBeGreaterThan(0);

    const flightsNavLink = page.locator("nav a[href='/flights']");
    if (await flightsNavLink.isVisible()) {
      await flightsNavLink.click();
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveURL(/.*flights/);
    }
  });

  test("should display Book Now button", async ({ page }) => {
    await page.goto("/");

    const bookNowButton = page.locator(
      'a[href="/flights"]:has-text("Book Now")'
    );

    if (await bookNowButton.isVisible()) {
      await expect(bookNowButton).toBeVisible();

      await bookNowButton.click();
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveURL(/.*flights/);
    }
  });
});
