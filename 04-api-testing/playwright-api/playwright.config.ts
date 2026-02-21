import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://dummyjson.com'
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/
    },
    {
      name: 'ecom-api',
      dependencies: ['setup'],
      use: {
        storageState: '.auth/user.json'
      }
    }
  ]
});
