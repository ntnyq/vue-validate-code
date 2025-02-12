import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueComponents from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const resolve = (...args: string[]) => path.resolve(__dirname, ...args)

export default defineConfig({
  optimizeDeps: {
    exclude: ['vitepress'],
  },
  plugins: [
    UnoCSS(),
    AutoImport({
      dts: resolve('./auto-imports.d.ts'),
      imports: ['vue', '@vueuse/core'],
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
    }),
    VueComponents({
      dirs: [resolve('./.vitepress/components')],
      dts: resolve('./components.d.ts'),
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
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
