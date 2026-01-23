import './app.css'
import '@shikijs/vitepress-twoslash/style.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/index.css'
import 'uno.css'
import 'virtual:group-icons.css'
import TwoSlash from '@shikijs/vitepress-twoslash/client'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import CustomLayout from './CustomLayout.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  Layout: () => h(CustomLayout),
  enhanceApp({ app }) {
    app.provide(ID_INJECTION_KEY, {
      prefix: 1024,
      current: 0,
    })
    app.provide(ZINDEX_INJECTION_KEY, {
      current: 0,
    })
    app.use(TwoSlash)
  },
} satisfies Theme
