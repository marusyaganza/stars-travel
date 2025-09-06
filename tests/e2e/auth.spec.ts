import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to sign in page", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    // Wait for authentication check to complete and sign-in button to be available
    const signInButton = page.getByTestId("header-signin-button");

    // Wait for the sign-in button to be visible (this ensures auth check is complete)
    await expect(signInButton).toBeVisible({ timeout: 10000 });

    // Wait for the button to be stable (not changing state)
    await signInButton.waitFor({ state: "visible" });

    // Ensure the button is enabled and ready for interaction
    await expect(signInButton).toBeEnabled();

    await Promise.all([page.waitForURL(/.*signin/), signInButton.click()]);
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/.*signin/);
  });

  test("should navigate to sign up page", async ({ page }) => {
    await page.goto("/signin");

    const signUpLink = page.locator('a[href="/signup"]');

    if (await signUpLink.isVisible()) {
      await signUpLink.click();
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveURL(/.*signup/);
    }
  });

  test("should display sign in form elements", async ({ page }) => {
    await page.goto("/signin");

    await expect(page.locator("form")).toBeVisible();

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test("should display sign up form elements", async ({ page }) => {
    await page.goto("/signup");

    await expect(page.locator("form")).toBeVisible();

    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });
});
