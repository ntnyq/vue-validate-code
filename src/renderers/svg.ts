import { randomNumber } from '@ntnyq/utils'
import { loop } from '../helpers'
import type {
  RenderContext,
  Renderer,
  RendererElement,
  RenderSize,
} from '../types/renderer'

const SVG_NS = 'http://www.w3.org/2000/svg'

export function createSvgRenderer(getContext: () => RenderContext): Renderer {
  let element: SVGSVGElement | null = null

  function assertElement() {
    if (!element) {
      throw new Error('SVG renderer is not mounted')
    }
    return element
  }

  function clearContent() {
    const svg = assertElement()
    const elements = svg.querySelectorAll('[data-type]')

    elements.forEach(el => el.remove())
  }

  function drawBg() {
    const svg = assertElement()
    const { size, config, getColor } = getContext()
    const rect = document.createElementNS(SVG_NS, 'rect')

    rect.dataset.type = 'bg'
    rect.setAttribute('x', '0')
    rect.setAttribute('y', '0')
    rect.setAttribute('width', String(size.width))
    rect.setAttribute('height', String(size.height))
    rect.setAttribute('fill', getColor(config.bgColors))
    svg.insertBefore(rect, svg.firstChild)
  }

  function drawLines() {
    const svg = assertElement()
    const { size, config, getColor } = getContext()

    if (!config.hasLines) {
      return
    }

    loop(config.lineCount, () => {
      const line = document.createElementNS(SVG_NS, 'line')
      line.dataset.type = 'line'
      line.setAttribute('x1', String(randomNumber(0, size.width)))
      line.setAttribute('y1', String(randomNumber(0, size.height)))
      line.setAttribute('x2', String(randomNumber(0, size.width)))
      line.setAttribute('y2', String(randomNumber(0, size.height)))
      line.setAttribute(
        'stroke-width',
        String(randomNumber(config.minLineWidth, config.maxLineWidth)),
      )
      line.setAttribute('stroke', getColor(config.lineColors))

      svg.append(line)
    })
  }

  function drawDots() {
    const svg = assertElement()
    const { size, config, getColor } = getContext()

    if (!config.hasDots) {
      return
    }

    loop(config.dotCount, () => {
      const circle = document.createElementNS(SVG_NS, 'circle')
      circle.dataset.type = 'dot'
      circle.setAttribute('cx', String(randomNumber(0, size.width)))
      circle.setAttribute('cy', String(randomNumber(0, size.height)))
      circle.setAttribute(
        'r',
        String(randomNumber(config.minDotRadius, config.maxDotRadius)),
      )
      circle.setAttribute('fill', getColor(config.dotColors))

      svg.append(circle)
    })
  }

  function drawChars() {
    const svg = assertElement()
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
      const text = document.createElementNS(SVG_NS, 'text')

      text.dataset.type = 'char'
      text.setAttribute('x', String(x))
      text.setAttribute('y', String(y))
      text.setAttribute('font-size', String(fontSize))
      text.setAttribute('font-family', config.fontFamily)
      text.setAttribute('fill', getColor(config.fontColors))
      text.setAttribute('text-anchor', 'middle')
      text.setAttribute('dominant-baseline', 'middle')
      text.setAttribute('transform', `rotate(${deg} ${x} ${y})`)
      text.textContent = char

      svg.append(text)
      chars.push(char)
    })

    return chars.join('')
  }

  return {
    type: 'svg',
    mount(nextElement: RendererElement) {
      element = nextElement as SVGSVGElement
    },
    resize(size: RenderSize) {
      if (!element) {
        return
      }
      element.setAttribute('width', String(size.width))
      element.setAttribute('height', String(size.height))
    },
    update() {
      clearContent()
      drawBg()
      drawLines()
      drawDots()
      return drawChars()
    },
    destroy() {
      if (!element) {
        return
      }
      clearContent()
      element = null
    },
  }
}
