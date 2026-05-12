import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './tests/results',
  fullyParallel: true,
  timeout: 60_000,
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  use: {
    baseURL: 'http://localhost:6006',
    headless: true,
    viewport: { width: 400, height: 300 },
    screenshot: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: {
    command: 'pnpm --filter @ckw-elements/storybook run dev --ci',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
