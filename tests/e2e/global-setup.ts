import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;

  // You can add global setup here, such as:
  // - Database seeding
  // - Creating test users
  // - Setting up test data
  // - Authentication setup

  console.log("Running global setup...");

  // Example: Create a test user if needed
  // const browser = await chromium.launch();
  // const page = await browser.newPage();
  // await page.goto(`${baseURL}/api/setup-test-user`);
  // await browser.close();

  console.log("Global setup completed.");
}

export default globalSetup;
