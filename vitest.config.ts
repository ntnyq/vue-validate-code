import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    reporters: ['dot'],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      all: false,
      include: ['src/**/*.ts', 'src/**/*.vue'],
      reporter: ['lcov', 'text'],
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
})
