import { randomHexColor, randomInteger } from '@ntnyq/utils'
import { computed, shallowRef, toValue, unref, watch } from 'vue'
import {
  DEFAULT_CONFIG,
  resolveConfig,
  useGlobalConfig,
} from '../helpers/config'
import { createRenderer } from '../renderers'
import type { MaybeRef, MaybeRefOrGetter } from 'vue'
import type { Props } from '../helpers'
import type {
  Renderer,
  RendererElement,
  RendererType,
  RenderSize,
} from '../types/renderer'

export type CanvasSize = RenderSize

export function useValidateCode(
  elementRef: MaybeRef<RendererElement | null>,
  options: MaybeRefOrGetter<Props> = {},
) {
  const validateCode = shallowRef('')
  const renderElement = shallowRef<RendererElement | null>(null)
  const canvasSize = shallowRef<RenderSize>({ width: 0, height: 0 })
  const currentRendererType = shallowRef<RendererType>('canvas')
  const renderer = shallowRef<Renderer | null>(null)

  const globalConfig = useGlobalConfig()

  const config = computed<Required<Props>>(() =>
    resolveConfig(globalConfig, toValue(options)),
  )

  const resolvedChars = computed(() =>
    config.value.chars.length ? config.value.chars : DEFAULT_CONFIG.chars,
  )

  function getColor(colors: readonly string[] = []) {
    if (colors.length) {
      return colors.length === 1
        ? colors[0]
        : colors[randomInteger(0, colors.length)]
    }

    const globalColors = config.value.colors

    if (globalColors.length) {
      return globalColors.length === 1
        ? globalColors[0]
        : globalColors[randomInteger(0, globalColors.length)]
    }

    return randomHexColor()
  }

  function ensureRenderer(type: RendererType) {
    if (!renderer.value || currentRendererType.value !== type) {
      renderer.value?.destroy()
      renderer.value = createRenderer(type, () => ({
        config: config.value,
        size: canvasSize.value,
        resolvedChars: resolvedChars.value,
        getColor,
      }))
      currentRendererType.value = type
    }
    return renderer.value
  }

  function ensureMountedRenderer() {
    const element = unref(elementRef)

    if (!element || !element.parentNode) {
      return null
    }

    const nextRenderer = ensureRenderer(config.value.renderer)

    if (renderElement.value !== element) {
      renderElement.value = element
      nextRenderer.mount(element)
    }

    return { element, renderer: nextRenderer }
  }

  function update() {
    const mounted = ensureMountedRenderer()
    if (!mounted) {
      return
    }
    validateCode.value = mounted.renderer.update()
  }

  function validate(input: string) {
    return config.value.caseSensitive
      ? input === validateCode.value
      : input.toLowerCase() === validateCode.value.toLowerCase()
  }

  function destroy() {
    renderer.value?.destroy()

    validateCode.value = ''
    renderElement.value = null
    renderer.value = null
    canvasSize.value = { width: 0, height: 0 }
  }

  function normalizeSize(size: RenderSize): RenderSize {
    return {
      height: Number.isFinite(size.height) ? Math.max(0, size.height) : 0,
      width: Number.isFinite(size.width) ? Math.max(0, size.width) : 0,
    }
  }

  function renderAtSize(nextRenderer: Renderer, size: RenderSize) {
    const normalizedSize = normalizeSize(size)

    canvasSize.value = normalizedSize
    nextRenderer.resize(normalizedSize)
    validateCode.value = nextRenderer.update()
  }

  function resize(size: RenderSize) {
    const mounted = ensureMountedRenderer()
    if (!mounted) {
      return
    }
    renderAtSize(mounted.renderer, size)
  }

  function render() {
    const mounted = ensureMountedRenderer()

    if (!mounted) {
      return
    }

    const { width, height } = (
      mounted.element.parentNode as HTMLElement
    ).getBoundingClientRect()

    renderAtSize(mounted.renderer, { width, height })
  }

  watch(
    config,
    (newConfig, oldConfig) => {
      if (
        !newConfig.updateOnChange
        && newConfig.renderer === oldConfig.renderer
      ) {
        return
      }
      render()
    },
    {
      flush: 'post',
    },
  )

  return {
    config,
    canvasSize,
    renderElement,
    validateCode,

    render,
    destroy,
    resize,
    update,
    validate,
  }
}
