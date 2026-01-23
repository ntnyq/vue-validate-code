import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  minify: 'dce-only',
  platform: 'neutral',
  deps: {
    onlyBundle: ['@ntnyq/utils'],
  },
  dts: {
    vue: true,
  },
  plugins: [
    Vue({
      isProduction: true,
    }),
  ],
})
