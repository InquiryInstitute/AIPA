import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout: 60000,
  use: {
    trace: 'on-first-retry',
    baseURL: process.env.LAB_BASE_URL || 'http://localhost:3000',
  },
  webServer: {
    command: 'npx serve -l 3000 fixtures',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
