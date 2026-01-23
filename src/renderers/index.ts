import { createCanvasRenderer } from './canvas'
import { createSvgRenderer } from './svg'
import type { RenderContext, Renderer, RendererType } from '../types/renderer'

export function createRenderer(
  type: RendererType,
  getContext: () => RenderContext,
): Renderer {
  if (type === 'svg') {
    return createSvgRenderer(getContext)
  }
  return createCanvasRenderer(getContext)
}
