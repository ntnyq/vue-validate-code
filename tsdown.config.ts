import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  platform: 'neutral',
  dts: {
    vue: true,
  },
  plugins: [
    Vue({
      isProduction: true,
    }),
  ],
})
