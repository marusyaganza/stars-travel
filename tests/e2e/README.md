# End-to-End Tests with Playwright

This directory contains end-to-end tests for the Up Next application using Playwright.

## Getting Started

### Prerequisites
- Node.js 20+ and Yarn installed
- Playwright browsers installed (`npx playwright install`)

### Running Tests

#### Run all e2e tests
```bash
yarn test:e2e
```

#### Run tests with UI mode (interactive)
```bash
yarn test:e2e:ui
```

### Test Structure

- `home.spec.ts` - Tests for the home page and navigation
- `auth.spec.ts` - Tests for authentication flows (sign in/sign up)
- `flights.spec.ts` - Tests for flights functionality
- `utils/test-helpers.ts` - Common test utility functions
- `global-setup.ts` - Global test setup (runs before all tests)

### Writing Tests

#### Basic Test Structure
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Up Next/);
  });
});
```

#### Using Test Helpers
```typescript
import { waitForPageLoad, expectElementVisible } from './utils/test-helpers';

test('should use helpers', async ({ page }) => {
  await page.goto('/');
  await waitForPageLoad(page);
  
  const element = await expectElementVisible(page, 'nav');
  // element will be null if not visible
});
```

### Test Configuration

The Playwright configuration is in `playwright.config.ts` at the project root. Key settings:

- **Browsers**: Chromium, Firefox, WebKit, and mobile viewports
- **Base URL**: `http://localhost:3000`
- **Web Server**: Automatically starts `yarn dev` before tests
- **Screenshots**: Taken on test failure
- **Videos**: Recorded on test failure
- **Traces**: Collected on first retry

### Best Practices

1. **Use descriptive test names** that explain what is being tested
2. **Wait for page load** using `waitForPageLoad()` helper
3. **Check element visibility** before interacting with elements
4. **Use data-testid attributes** in your components for reliable selectors
5. **Handle conditional elements** gracefully (check if visible before testing)
6. **Group related tests** using `test.describe()`
7. **Use beforeEach hooks** for common setup

### Debugging Tests

#### UI Mode
```bash
yarn test:e2e:ui
```
This provides an interactive interface to run and debug tests.

### Adding New Tests

1. Create a new `.spec.ts` file in the `tests/e2e/` directory
2. Import necessary Playwright functions and test helpers
3. Write tests using the established patterns
4. Add any new utility functions to `utils/test-helpers.ts` if needed

### CI/CD Integration

The tests are configured to run in CI environments:
- Retries are enabled only in CI
- Parallel execution is disabled in CI
- Screenshots and videos are always captured on failure
