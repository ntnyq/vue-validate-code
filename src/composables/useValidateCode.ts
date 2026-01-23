import { cleanObject, randomHexColor, randomNumber } from '@ntnyq/utils'
import { computed, ref, shallowRef, toValue, unref, watch } from 'vue'
import { DEFAULT_CONFIG, useGlobalConfig } from '../helpers'
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
  const validateCode = ref('')
  const renderElement = shallowRef<RendererElement>(undefined!)
  const canvasSize = shallowRef<RenderSize>({ width: 0, height: 0 })
  const currentRendererType = shallowRef<RendererType>('canvas')
  const renderer = shallowRef<Renderer | null>(null)

  const defaultConfig = {
    ...DEFAULT_CONFIG,
    ...useGlobalConfig(),
  }

  const config = computed<Required<Props>>(() => ({
    ...defaultConfig,
    ...cleanObject(toValue(options)),
  }))

  const resolvedChars = computed(() =>
    config.value.chars.length ? config.value.chars : DEFAULT_CONFIG.chars,
  )

  function getColor(colors: string[] = []) {
    if (colors.length) {
      return colors.length === 1
        ? colors[0]
        : colors[randomNumber(0, colors.length)]
    }

    const globalColors = config.value.colors

    if (globalColors.length) {
      return globalColors.length === 1
        ? globalColors[0]
        : globalColors[randomNumber(0, globalColors.length)]
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
    renderElement.value = undefined!
    renderer.value = null
    canvasSize.value = { width: 0, height: 0 }
  }

  function resize(size: RenderSize) {
    canvasSize.value = size
    renderer.value?.resize(size)
  }

  function render() {
    const mounted = ensureMountedRenderer()

    if (!mounted) {
      return
    }

    const { width, height } = (
      mounted.element.parentNode as HTMLElement
    ).getBoundingClientRect()

    resize({ width, height })
    update()
  }

  watch(config, newConfig => {
    if (!newConfig.updateOnChange) {
      return
    }
    render()
  })

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
