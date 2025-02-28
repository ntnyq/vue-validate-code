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
  bgColors?: string[]
  caseSensitive?: boolean
  chars?: string
  colors?: string[]
  dotColors?: string[]
  dotCount?: number
  fontColors?: string[]
  fontCount?: number
  fontFamily?: string
  hasDots?: boolean
  hasLines?: boolean
  lineColors?: string[]
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
