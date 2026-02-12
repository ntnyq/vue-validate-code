import type { Plugin } from 'vue'
import { ValidateCode } from './components'
import { injectGlobalConfig } from './helpers'
import type { Props } from './helpers'

export const plugin: Plugin = {
  install(app, defaultConfig?: Props) {
    app.component('ValidateCode', ValidateCode)
    injectGlobalConfig(app, defaultConfig)
  },
}

export * from './helpers'

export { ValidateCode }

export default plugin
