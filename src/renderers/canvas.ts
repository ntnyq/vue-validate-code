import { randomNumber } from '@ntnyq/utils'
import { loop } from '../helpers'
import type {
  RenderContext,
  Renderer,
  RendererElement,
  RenderSize,
} from '../types/renderer'

export function createCanvasRenderer(
  getContext: () => RenderContext,
): Renderer {
  let element: HTMLCanvasElement | null = null
  let canvasContext: CanvasRenderingContext2D | null = null

  function assertContext() {
    if (!canvasContext) {
      throw new Error('Canvas renderer is not mounted')
    }
    return canvasContext
  }

  function drawBg() {
    const ctx = assertContext()
    const { size, config, getColor } = getContext()

    ctx.textBaseline = 'middle'
    ctx.fillStyle = getColor(config.bgColors)
    ctx.fillRect(0, 0, size.width, size.height)
  }

  function drawLines() {
    const ctx = assertContext()
    const { size, config, getColor } = getContext()

    if (!config.hasLines) {
      return
    }

    loop(config.lineCount, () => {
      ctx.strokeStyle = getColor(config.lineColors)
      ctx.beginPath()
      ctx.lineWidth = randomNumber(config.minLineWidth, config.maxLineWidth)
      ctx.moveTo(randomNumber(0, size.width), randomNumber(0, size.height))
      ctx.lineTo(randomNumber(0, size.width), randomNumber(0, size.height))
      ctx.stroke()
    })
  }

  function drawDots() {
    const ctx = assertContext()
    const { size, config, getColor } = getContext()

    if (!config.hasDots) {
      return
    }

    loop(config.dotCount, () => {
      ctx.fillStyle = getColor(config.dotColors)
      ctx.beginPath()
      ctx.arc(
        randomNumber(0, size.width),
        randomNumber(0, size.height),
        randomNumber(config.minDotRadius, config.maxDotRadius),
        0,
        Math.PI * 2,
      )
      ctx.fill()
    })
  }

  function drawChars() {
    const ctx = assertContext()
    const { size, config, getColor, resolvedChars } = getContext()
    const chars: string[] = []

    loop(config.fontCount, idx => {
      const char = resolvedChars[randomNumber(resolvedChars.length)]
      const fontSize = randomNumber(config.minFontSize, config.maxFontSize)
      const columnWidth = (size.width - config.padding * 2) / config.fontCount
      const x =
        columnWidth * idx + config.padding + (columnWidth - fontSize) / 2
      const y =
        randomNumber(size.height - config.padding * 2 - fontSize)
        + config.padding
        + fontSize / 2
      const deg = randomNumber(config.minFontAngle, config.maxFontAngle)

      ctx.fillStyle = getColor(config.fontColors)
      ctx.font = `${fontSize}px ${config.fontFamily}`
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(char, 0, 0)
      ctx.restore()

      chars.push(char)
    })

    return chars.join('')
  }

  return {
    type: 'canvas',
    mount(nextElement: RendererElement) {
      element = nextElement as HTMLCanvasElement
      canvasContext = element.getContext('2d')
    },
    resize(size: RenderSize) {
      if (!element) {
        return
      }
      element.width = size.width
      element.height = size.height
    },
    update() {
      drawBg()
      drawLines()
      drawDots()
      return drawChars()
    },
    destroy() {
      const { size } = getContext()
      canvasContext?.clearRect(0, 0, size.width, size.height)
      element = null
      canvasContext = null
    },
  }
}
