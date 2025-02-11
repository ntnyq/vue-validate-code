import { fileURLToPath } from 'node:url'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueComponents from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'

export default defineConfig({
  optimizeDeps: {
    exclude: ['vitepress'],
  },
  plugins: [
    UnoCSS(),
    AutoImport({
      dts: fileURLToPath(new URL('./auto-imports.d.ts', import.meta.url)),
      imports: ['vue', '@vueuse/core'],
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
    }),
    VueComponents({
      dts: fileURLToPath(new URL('./components.d.ts', import.meta.url)),
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: [
        fileURLToPath(new URL('./.vitepress/components', import.meta.url)),
      ],
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
    }),
    groupIconVitePlugin(),
  ],
  resolve: {
    alias: [
      // {
      // find: /^.*\/VPSwitchAppearance\.vue$/,
      // replacement: fileURLToPath(new URL('./theme/components/VPSwitchAppearance/index.vue', import.meta.url)),
      // },
    ],
  },
  ssr: {
    noExternal: ['element-plus'],
  },
})
