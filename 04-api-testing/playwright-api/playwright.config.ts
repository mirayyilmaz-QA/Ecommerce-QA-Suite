// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://fakestoreapi.com', // environment variable!
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on-first-failure',
        trace: 'retain-on-failure',


      }
    }
  ]


});
