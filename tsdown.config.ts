import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  clean: true,
  deps: {
    onlyBundle: ['@ntnyq/utils'],
  },
  dts: {
    vue: true,
  },
  entry: ['src/index.ts'],
  minify: 'dce-only',
  platform: 'neutral',
  plugins: [
    Vue({
      isProduction: true,
    }),
  ],
})
