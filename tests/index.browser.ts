import { afterEach, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { ValidateCode } from '../src'

afterEach(() => vi.restoreAllMocks())

it('should render the configured validation code with svg', async () => {
  const screen = await render(ValidateCode, {
    props: {
      chars: 'A',
      fontCount: 6,
      hasDots: false,
      hasLines: false,
      renderer: 'svg',
    },
    attrs: {
      'data-testid': 'validate-code',
    },
  })

  expect(screen.getByTestId('validate-code')).toBeDefined()
  const element = screen.getByTestId('validate-code').element()

  expect(element.tagName).toBe('svg')
  expect(element.querySelectorAll('text[data-type="char"]')).toHaveLength(6)
  expect(element.textContent).toBe('AAAAAA')
})

it('keeps SVG glyphs inside the horizontal padding', async () => {
  const container = document.createElement('div')
  container.style.cssText = 'width: 240px; height: 80px'
  document.body.append(container)
  const screen = await render(ValidateCode, {
    container,
    props: {
      renderer: 'svg',
      chars: 'M',
      fontCount: 6,
      minFontSize: 40,
      maxFontSize: 40,
      minFontAngle: 0,
      maxFontAngle: 0,
      fontFamily: 'monospace',
      hasDots: false,
      hasLines: false,
    },
  })

  const characters = screen.container.querySelectorAll('text')
  expect(characters).toHaveLength(6)

  for (const character of characters) {
    const bounds = character.getBBox()
    expect(bounds.x).toBeGreaterThanOrEqual(10)
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(230)
  }
})

it.each(['transparent', 'rgba(255, 255, 255, 0.5)'])(
  'clears the previous canvas frame with background %s',
  async background => {
    const random = vi.spyOn(Math, 'random').mockReturnValue(0)
    const container = document.createElement('div')
    container.style.cssText = 'width: 100px; height: 50px'
    document.body.append(container)
    const screen = await render(ValidateCode, {
      container,
      props: {
        renderer: 'canvas',
        chars: 'A',
        fontCount: 1,
        minFontSize: 20,
        maxFontSize: 20,
        minFontAngle: 0,
        maxFontAngle: 0,
        fontFamily: 'monospace',
        bgColors: [background],
        fontColors: ['black'],
        hasDots: false,
        hasLines: false,
        updateOnClick: true,
        updateOnChange: true,
      },
      attrs: { 'data-testid': 'validate-code' },
    })
    // Measure the final container after the test renderer unwraps its mount node.
    await screen.rerender({ chars: 'AB' })
    const canvas = screen.container.querySelector('canvas')
    const context = canvas?.getContext('2d')
    if (!canvas || !context) {
      throw new Error('Expected a mounted canvas context')
    }
    expect(canvas.width).toBe(100)
    expect(canvas.height).toBe(50)

    random.mockReturnValue(0.99)
    await screen.getByTestId('validate-code').click()
    const updated = context.getImageData(0, 0, 100, 50).data

    // Changing props performs a full resize and produces a clean reference frame.
    await screen.rerender({ chars: 'B' })
    const clean = context.getImageData(0, 0, 100, 50).data

    expect(clean.some(value => value !== 0)).toBeTruthy()
    const differentChannels = updated.reduce(
      (count, value, index) => count + Number(value !== clean[index]),
      0,
    )
    expect(differentChannels).toBe(0)
  },
)
