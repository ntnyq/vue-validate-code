import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import DTS from 'vite-plugin-dts'

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs', 'es', 'umd'],
      name: 'VueValidateCode',
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      treeshake: 'safest',
      output: {
        exports: 'named',
        // preserveModules: true,
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
