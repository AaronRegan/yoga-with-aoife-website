import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'python3 -m http.server 4174',
    url: 'http://localhost:4174',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:4174',
  },
});
