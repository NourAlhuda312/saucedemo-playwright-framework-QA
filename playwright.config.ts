import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const authFile = path.join(__dirname, '.auth', 'user.json');
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
reporter: [
  ['list'],
  ['html', { open: 'never' }],
],
outputDir: 'test-results/',

timeout: 30_000,

expect: {
  timeout: 5_000,
},
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
      screenshot: 'only-on-failure',
  video: 'retain-on-failure',

  actionTimeout: 10_000,
  navigationTimeout: 15_000,

  },

  /* Configure projects for major browsers */
projects: [
  {
    name: 'setup',
    testMatch: /.*\.setup\.ts/,
  },

  {
    name: 'chromium-login',
    testMatch: /.*login\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
    },
  },

  {
    name: 'firefox-login',
    testMatch: /.*login\.spec\.ts/,
    use: {
      ...devices['Desktop Firefox'],
    },
  },

  {
    name: 'chromium',
    testIgnore: /.*login\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
      storageState: authFile,
    },
    dependencies: ['setup'],
  },

  {
    name: 'firefox',
    testIgnore: /.*login\.spec\.ts/,
    use: {
      ...devices['Desktop Firefox'],
      storageState: authFile,
    },
    dependencies: ['setup'],
  },
],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
