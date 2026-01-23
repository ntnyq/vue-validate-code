import type { Props } from '../helpers'

export type RendererType = 'canvas' | 'svg'

export type RenderSize = {
  height: number
  width: number
}

export type RendererElement = HTMLCanvasElement | SVGSVGElement

export type RenderContext = {
  config: Required<Props>
  resolvedChars: string
  size: RenderSize
  getColor: (colors?: string[]) => string
}

export interface Renderer {
  type: RendererType
  destroy: () => void
  mount: (element: RendererElement) => void
  resize: (size: RenderSize) => void
  update: () => string
}
