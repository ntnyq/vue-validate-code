import path from 'node:path'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueComponents from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'

const resolve = (...args: string[]): string =>
  path.resolve(import.meta.dirname, ...args)

export default defineConfig(({ command }) => {
  const isProduction = command === 'build'
  return {
    optimizeDeps: {
      exclude: ['vitepress'],
    },
    plugins: [
      UnoCSS({
        inspector: false,
      }),

      AutoImport({
        dts: resolve('./auto-imports.d.ts'),
        imports: ['vue', '@vueuse/core'],
        dtsMode: isProduction ? 'overwrite' : 'append',
        resolvers: [
          ElementPlusResolver({
            importStyle: false,
          }),
        ],
      }),

      VueComponents({
        dirs: [resolve('./.vitepress/components')],
        dts: resolve('./components.d.ts'),
        syncMode: isProduction ? 'overwrite' : 'append',
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
  }
})
