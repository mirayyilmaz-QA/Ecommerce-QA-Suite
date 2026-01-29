import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  timeout: 60 * 1000,

  expect: {
    timeout: 10 * 1000
  },

  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: process.env.BASE_URL || 'https://magento2-demo.magebit.com/',

    screenshot: 'only-on-failure',
    trace: 'on-first-retry',

    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,

  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on-first-failure',
        trace: 'retain-on-failure',

        ...devices['Desktop Chrome'],
      }
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // }
  ],


  outputDir: 'test-results',

});
