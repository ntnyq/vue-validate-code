import process from 'node:process'
import Vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // @ts-expect-error vite v8 compatibility
  plugins: [Vue()],
  test: {
    environment: 'jsdom',
    include: ['**/*.browser.ts'],
    browser: {
      enabled: true,
      headless: process.env.CI === 'true',
      provider: playwright(),
      screenshotDirectory: 'vitest-test-screenshots',
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
})
