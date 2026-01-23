import { describe, expect, it } from 'vitest'
import { createRenderer } from '../src/renderers'
import type { Props } from '../src/helpers'

const baseConfig: Required<Props> = {
  chars: 'abc',
  padding: 10,
  caseSensitive: true,
  colors: [],
  bgColors: [],
  fontCount: 4,
  fontFamily: 'sans-serif',
  fontColors: [],
  minFontSize: 12,
  maxFontSize: 20,
  minFontAngle: -20,
  maxFontAngle: 20,
  lineCount: 2,
  lineColors: [],
  minLineWidth: 1,
  maxLineWidth: 2,
  dotCount: 2,
  dotColors: [],
  minDotRadius: 1,
  maxDotRadius: 2,
  hasDots: true,
  hasLines: true,
  renderer: 'canvas',
  updateOnChange: true,
  updateOnClick: true,
}

describe('renderer factory', () => {
  it('should create canvas renderer', () => {
    const renderer = createRenderer('canvas', () => ({
      config: baseConfig,
      size: { width: 100, height: 40 },
      resolvedChars: 'abc',
      getColor: () => '#000',
    }))

    expect(renderer.type).toBe('canvas')
  })

  it('should create svg renderer', () => {
    const renderer = createRenderer('svg', () => ({
      config: { ...baseConfig, renderer: 'svg' },
      size: { width: 100, height: 40 },
      resolvedChars: 'abc',
      getColor: () => '#000',
    }))

    expect(renderer.type).toBe('svg')
  })
})
