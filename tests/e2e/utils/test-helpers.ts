import { Page, expect } from "@playwright/test";

/**
 * Helper function to wait for page to be fully loaded
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForLoadState("domcontentloaded");
}

/**
 * Helper function to check if element exists and is visible
 */
export async function expectElementVisible(page: Page, selector: string) {
  const element = page.locator(selector);
  if (await element.isVisible()) {
    await expect(element).toBeVisible();
    return element;
  }
  return null;
}

/**
 * Helper function to fill form fields safely
 */
export async function fillFormField(
  page: Page,
  selector: string,
  value: string
) {
  const field = page.locator(selector);
  if (await field.isVisible()) {
    await field.fill(value);
    return true;
  }
  return false;
}

/**
 * Helper function to click element safely
 */
export async function clickElement(page: Page, selector: string) {
  const element = page.locator(selector);
  if (await element.isVisible()) {
    await element.click();
    return true;
  }
  return false;
}

/**
 * Helper function to navigate to a page
 */
export async function navigateTo(page: Page, path: string) {
  await page.goto(path);
  await waitForPageLoad(page);
}

/**
 * Helper function to check if user is authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  // Look for common authenticated user indicators
  const authIndicators = [
    'a[href*="profile"]',
    'a[href*="logout"]',
    'button:has-text("Sign Out")',
    '[data-testid="user-menu"]',
  ];

  for (const indicator of authIndicators) {
    if (await page.locator(indicator).isVisible()) {
      return true;
    }
  }

  return false;
}

/**
 * Helper function to wait for toast notifications
 */
export async function waitForToast(page: Page, timeout = 5000) {
  try {
    await page.waitForSelector(
      '[role="alert"], .toast, [data-testid="toast"]',
      { timeout }
    );
    return true;
  } catch {
    return false;
  }
}
