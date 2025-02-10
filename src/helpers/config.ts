import { inject } from 'vue'
import type { App, InjectionKey } from 'vue'
import type { Props } from './types'

export const DEFAULT_CONFIG = Object.freeze<Required<Props>>({
  chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  padding: 10,
  colors: [],
  bgColors: [],
  fontCount: 6,
  fontFamily: 'SimHei',
  fontColors: [],
  minFontSize: 20,
  maxFontSize: 30,
  minFontAngle: -30,
  maxFontAngle: 30,
  lineCount: 6,
  lineColors: [],
  minLineWidth: 1,
  maxLineWidth: 2,
  dotCount: 6,
  dotColors: [],
  minDotRadius: 1,
  maxDotRadius: 3,
  hasDot: true,
  hasLine: true,
})

export const GLOBAL_CONFIG_KEY: InjectionKey<Props> =
  Symbol('validateCodeConfig')

export const injectGlobalConfig = (app: App, config: Props = {}) => {
  app.provide(GLOBAL_CONFIG_KEY, config)
}

export const useGlobalConfig = () => {
  return inject(GLOBAL_CONFIG_KEY, {} as Props)
}
