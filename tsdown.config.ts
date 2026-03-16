import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  clean: true,
  dts: {
    vue: true,
  },
  entry: ['src/index.ts'],
  inlineOnly: ['@ntnyq/utils'],
  minify: 'dce-only',
  platform: 'neutral',
  plugins: [
    Vue({
      isProduction: true,
    }),
  ],
})
