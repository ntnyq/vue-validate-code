import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      reporters: ['dot'],
      coverage: {
        all: false,
        include: ['src/**/*.ts', 'src/**/*.vue'],
        reporter: ['lcov', 'text'],
      },
    },
  }),
)
