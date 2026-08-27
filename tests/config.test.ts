import { describe, expect, it } from 'vitest'
import { DEFAULT_CONFIG, resolveConfig } from '../src/helpers/config'

describe('config', () => {
  it('keeps exported default collections immutable', () => {
    expect(Object.isFrozen(DEFAULT_CONFIG)).toBeTruthy()
    expect(Object.isFrozen(DEFAULT_CONFIG.bgColors)).toBeTruthy()
    expect(Object.isFrozen(DEFAULT_CONFIG.colors)).toBeTruthy()
    expect(Object.isFrozen(DEFAULT_CONFIG.dotColors)).toBeTruthy()
    expect(Object.isFrozen(DEFAULT_CONFIG.fontColors)).toBeTruthy()
    expect(Object.isFrozen(DEFAULT_CONFIG.lineColors)).toBeTruthy()
  })

  it('preserves primitive overrides and clones color collections', () => {
    const colors = ['#111111']
    const config = resolveConfig(
      {
        fontCount: 8,
        hasDots: true,
        renderer: 'canvas',
      },
      {
        colors,
        fontCount: 4,
        hasDots: false,
        renderer: 'svg',
      },
    )

    expect(config).toMatchObject({
      colors,
      fontCount: 4,
      hasDots: false,
      renderer: 'svg',
    })
    expect(config.colors).not.toBe(colors)
  })

  it('normalizes unsafe rendering counts', () => {
    const config = resolveConfig(
      {
        fontCount: 12,
      },
      {
        dotCount: -1,
        fontCount: Number.POSITIVE_INFINITY,
        lineCount: 10_000,
      },
    )

    expect(config.dotCount).toBe(0)
    expect(config.fontCount).toBe(12)
    expect(config.lineCount).toBe(256)
  })
})
