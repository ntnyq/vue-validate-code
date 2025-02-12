import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
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
  }),
)
