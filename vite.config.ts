import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import DTS from 'vite-plugin-dts'

const FORMAT_TO_FILENAME = {
  cjs: 'index.cjs',
  es: 'index.mjs',
  umd: 'index.js',
}

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs', 'es', 'umd'],
      name: 'VueValidateCode',
      fileName: format =>
        FORMAT_TO_FILENAME[format as keyof typeof FORMAT_TO_FILENAME],
    },
    rollupOptions: {
      external: ['vue'],
      treeshake: 'safest',
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    DTS({
      // include: [],
      insertTypesEntry: true,
      rollupTypes: true,
      strictOutput: true,
    }),
    Vue(),
  ],
})
