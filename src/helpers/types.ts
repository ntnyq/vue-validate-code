import type { RendererType } from '../types/renderer'

/**
 * The events of component `ValidateCode`
 *
 * @see {@link https://vue-validate-code.ntnyq.com/guide/#events}
 */
export type Emits = {
  /**
   * Triggered when validate method return `false`
   */
  fail: []

  /**
   * Triggered when the component rendered
   */
  ready: []

  /**
   * Triggered when validate method return `true`
   */
  success: []

  /**
   * Triggered after validate method is called
   */
  validate: [isValid: boolean]
}

/**
 * The config of the plugin and props of component `ValidateCode`
 *
 * @see {@link https://vue-validate-code.ntnyq.com/guide/#props}
 */
export type Props = {
  bgColors?: readonly string[]
  caseSensitive?: boolean
  chars?: string
  colors?: readonly string[]
  dotColors?: readonly string[]
  dotCount?: number
  fontColors?: readonly string[]
  fontCount?: number
  fontFamily?: string
  hasDots?: boolean
  hasLines?: boolean
  lineColors?: readonly string[]
  lineCount?: number
  maxDotRadius?: number
  maxFontAngle?: number
  maxFontSize?: number
  maxLineWidth?: number
  minDotRadius?: number
  minFontAngle?: number
  minFontSize?: number
  minLineWidth?: number

  /**
   * Canvas padding
   *
   * @default 10
   */
  padding?: number

  /**
   * Render engine type: 'canvas' or 'svg'
   *
   * @default 'canvas'
   */
  renderer?: RendererType

  /**
   * Update code when props change
   *
   * @default true
   */
  updateOnChange?: boolean

  /**
   * Update code when click
   *
   * @default true
   */
  updateOnClick?: boolean
}
