import process from 'node:process'
import Vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [Vue()],
  test: {
    browser: {
      enabled: true,
      headless: process.env.CI === 'true',
      instances: [
        {
          browser: 'chromium',
        },
      ],
      provider: playwright(),
      screenshotDirectory: 'vitest-test-screenshots',
    },
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    include: ['**/*.browser.ts'],
  },
})
