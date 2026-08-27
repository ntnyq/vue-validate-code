import { inject } from 'vue'
import type { App, InjectionKey } from 'vue'
import type { Props } from './types'

const EMPTY_COLORS: readonly string[] = Object.freeze([])
const MAX_DECORATION_COUNT = 256
const MAX_FONT_COUNT = 64

export const DEFAULT_CONFIG = Object.freeze<Required<Props>>({
  chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  padding: 10,
  caseSensitive: true,
  colors: EMPTY_COLORS,
  bgColors: EMPTY_COLORS,
  fontCount: 6,
  fontFamily: 'SimHei',
  fontColors: EMPTY_COLORS,
  minFontSize: 20,
  maxFontSize: 30,
  minFontAngle: -30,
  maxFontAngle: 30,
  lineCount: 6,
  lineColors: EMPTY_COLORS,
  minLineWidth: 1,
  maxLineWidth: 2,
  dotCount: 6,
  dotColors: EMPTY_COLORS,
  minDotRadius: 1,
  maxDotRadius: 3,
  hasDots: true,
  hasLines: true,
  renderer: 'canvas',
  updateOnChange: true,
  updateOnClick: true,
})

export const GLOBAL_CONFIG_KEY: InjectionKey<Props> =
  Symbol('validateCodeConfig')

export const injectGlobalConfig = (app: App, config: Props = {}) => {
  app.provide(GLOBAL_CONFIG_KEY, config)
}

export const useGlobalConfig = () => {
  return inject(GLOBAL_CONFIG_KEY, {} as Props)
}

interface ResolveNumberOptions {
  integer?: boolean
  max?: number
  min?: number
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function resolveBoolean(
  localValue: boolean | undefined,
  globalValue: boolean | undefined,
  fallback: boolean,
) {
  if (typeof localValue === 'boolean') {
    return localValue
  }
  if (typeof globalValue === 'boolean') {
    return globalValue
  }
  return fallback
}

function resolveColors(
  localValue: readonly string[] | undefined,
  globalValue: readonly string[] | undefined,
  fallback: readonly string[],
) {
  const colors = Array.isArray(localValue)
    ? localValue
    : Array.isArray(globalValue)
      ? globalValue
      : fallback

  return colors.filter(color => typeof color === 'string')
}

function resolveNumber(
  localValue: number | undefined,
  globalValue: number | undefined,
  fallback: number,
  options: ResolveNumberOptions = {},
) {
  const value = isFiniteNumber(localValue)
    ? localValue
    : isFiniteNumber(globalValue)
      ? globalValue
      : fallback
  const normalizedValue = options.integer ? Math.trunc(value) : value

  return Math.min(
    options.max ?? Number.POSITIVE_INFINITY,
    Math.max(options.min ?? Number.NEGATIVE_INFINITY, normalizedValue),
  )
}

function resolveRenderer(
  localValue: Props['renderer'],
  globalValue: Props['renderer'],
) {
  if (localValue === 'canvas' || localValue === 'svg') {
    return localValue
  }
  if (globalValue === 'canvas' || globalValue === 'svg') {
    return globalValue
  }
  return DEFAULT_CONFIG.renderer
}

function resolveString(
  localValue: string | undefined,
  globalValue: string | undefined,
  fallback: string,
) {
  if (typeof localValue === 'string') {
    return localValue
  }
  if (typeof globalValue === 'string') {
    return globalValue
  }
  return fallback
}

/**
 * @internal
 */
export function resolveConfig(
  globalConfig: Props = {},
  localConfig: Props = {},
): Required<Props> {
  return {
    bgColors: resolveColors(
      localConfig.bgColors,
      globalConfig.bgColors,
      DEFAULT_CONFIG.bgColors,
    ),
    caseSensitive: resolveBoolean(
      localConfig.caseSensitive,
      globalConfig.caseSensitive,
      DEFAULT_CONFIG.caseSensitive,
    ),
    chars: resolveString(
      localConfig.chars,
      globalConfig.chars,
      DEFAULT_CONFIG.chars,
    ),
    colors: resolveColors(
      localConfig.colors,
      globalConfig.colors,
      DEFAULT_CONFIG.colors,
    ),
    dotColors: resolveColors(
      localConfig.dotColors,
      globalConfig.dotColors,
      DEFAULT_CONFIG.dotColors,
    ),
    dotCount: resolveNumber(
      localConfig.dotCount,
      globalConfig.dotCount,
      DEFAULT_CONFIG.dotCount,
      { integer: true, min: 0, max: MAX_DECORATION_COUNT },
    ),
    fontColors: resolveColors(
      localConfig.fontColors,
      globalConfig.fontColors,
      DEFAULT_CONFIG.fontColors,
    ),
    fontCount: resolveNumber(
      localConfig.fontCount,
      globalConfig.fontCount,
      DEFAULT_CONFIG.fontCount,
      { integer: true, min: 1, max: MAX_FONT_COUNT },
    ),
    fontFamily: resolveString(
      localConfig.fontFamily,
      globalConfig.fontFamily,
      DEFAULT_CONFIG.fontFamily,
    ),
    hasDots: resolveBoolean(
      localConfig.hasDots,
      globalConfig.hasDots,
      DEFAULT_CONFIG.hasDots,
    ),
    hasLines: resolveBoolean(
      localConfig.hasLines,
      globalConfig.hasLines,
      DEFAULT_CONFIG.hasLines,
    ),
    lineColors: resolveColors(
      localConfig.lineColors,
      globalConfig.lineColors,
      DEFAULT_CONFIG.lineColors,
    ),
    lineCount: resolveNumber(
      localConfig.lineCount,
      globalConfig.lineCount,
      DEFAULT_CONFIG.lineCount,
      { integer: true, min: 0, max: MAX_DECORATION_COUNT },
    ),
    maxDotRadius: resolveNumber(
      localConfig.maxDotRadius,
      globalConfig.maxDotRadius,
      DEFAULT_CONFIG.maxDotRadius,
      { min: 0 },
    ),
    maxFontAngle: resolveNumber(
      localConfig.maxFontAngle,
      globalConfig.maxFontAngle,
      DEFAULT_CONFIG.maxFontAngle,
    ),
    maxFontSize: resolveNumber(
      localConfig.maxFontSize,
      globalConfig.maxFontSize,
      DEFAULT_CONFIG.maxFontSize,
      { min: 1 },
    ),
    maxLineWidth: resolveNumber(
      localConfig.maxLineWidth,
      globalConfig.maxLineWidth,
      DEFAULT_CONFIG.maxLineWidth,
      { min: 0 },
    ),
    minDotRadius: resolveNumber(
      localConfig.minDotRadius,
      globalConfig.minDotRadius,
      DEFAULT_CONFIG.minDotRadius,
      { min: 0 },
    ),
    minFontAngle: resolveNumber(
      localConfig.minFontAngle,
      globalConfig.minFontAngle,
      DEFAULT_CONFIG.minFontAngle,
    ),
    minFontSize: resolveNumber(
      localConfig.minFontSize,
      globalConfig.minFontSize,
      DEFAULT_CONFIG.minFontSize,
      { min: 1 },
    ),
    minLineWidth: resolveNumber(
      localConfig.minLineWidth,
      globalConfig.minLineWidth,
      DEFAULT_CONFIG.minLineWidth,
      { min: 0 },
    ),
    padding: resolveNumber(
      localConfig.padding,
      globalConfig.padding,
      DEFAULT_CONFIG.padding,
      { min: 0 },
    ),
    renderer: resolveRenderer(localConfig.renderer, globalConfig.renderer),
    updateOnChange: resolveBoolean(
      localConfig.updateOnChange,
      globalConfig.updateOnChange,
      DEFAULT_CONFIG.updateOnChange,
    ),
    updateOnClick: resolveBoolean(
      localConfig.updateOnClick,
      globalConfig.updateOnClick,
      DEFAULT_CONFIG.updateOnClick,
    ),
  }
}
