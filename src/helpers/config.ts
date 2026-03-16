import { inject } from 'vue'
import type { App, InjectionKey } from 'vue'
import type { Props } from './types'

export const DEFAULT_CONFIG = Object.freeze<Required<Props>>({
  bgColors: [],
  caseSensitive: true,
  chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  colors: [],
  dotColors: [],
  dotCount: 6,
  fontColors: [],
  fontCount: 6,
  fontFamily: 'SimHei',
  hasDots: true,
  hasLines: true,
  lineColors: [],
  lineCount: 6,
  maxDotRadius: 3,
  maxFontAngle: 30,
  maxFontSize: 30,
  maxLineWidth: 2,
  minDotRadius: 1,
  minFontAngle: -30,
  minFontSize: 20,
  minLineWidth: 1,
  padding: 10,
  updateOnChange: true,
  updateOnClick: true,
})

export const GLOBAL_CONFIG_KEY: InjectionKey<Props> =
  Symbol('validateCodeConfig')

export const injectGlobalConfig = (app: App, config: Props = {}) => {
  app.provide(GLOBAL_CONFIG_KEY, config)
}

export const useGlobalConfig = () => inject(GLOBAL_CONFIG_KEY, {} as Props)
