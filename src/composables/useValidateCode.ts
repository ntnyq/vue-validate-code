import { cleanObject, randomHexColor, randomNumber } from '@ntnyq/utils'
import { computed, ref, shallowRef, toValue, unref, watch } from 'vue'
import { DEFAULT_CONFIG, loop, useGlobalConfig } from '../helpers'
import type { MaybeRef, MaybeRefOrGetter } from 'vue'
import type { Props } from '../helpers'

export interface CanvasSize {
  width: number
  height: number
}

export function useValidateCode(
  canvasRef: MaybeRef<HTMLCanvasElement | null>,
  options: MaybeRefOrGetter<Props> = {},
) {
  const validateCode = ref('')

  const canvasEl = shallowRef<HTMLCanvasElement>(undefined!)
  const context = shallowRef<CanvasRenderingContext2D>(undefined!)
  const canvasSize = shallowRef<CanvasSize>({ width: 0, height: 0 })

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

  function drawBg() {
    const ctx = context.value

    ctx.textBaseline = 'middle'
    ctx.fillStyle = getColor(config.value.bgColors)
    ctx.fillRect(0, 0, canvasSize.value.width, canvasSize.value.height)
  }

  function drawLines() {
    const ctx = context.value

    if (!config.value.hasLines) {
      return
    }

    loop(config.value.lineCount, () => {
      ctx.strokeStyle = getColor(config.value.lineColors)
      ctx.beginPath()
      ctx.lineWidth = randomNumber(
        config.value.minLineWidth,
        config.value.maxLineWidth,
      )
      ctx.moveTo(
        randomNumber(0, canvasSize.value.width),
        randomNumber(0, canvasSize.value.height),
      )
      ctx.lineTo(
        randomNumber(0, canvasSize.value.width),
        randomNumber(0, canvasSize.value.height),
      )
      ctx.stroke()
    })
  }

  function drawDots() {
    const ctx = context.value

    if (!config.value.hasDots) {
      return
    }

    loop(config.value.dotCount, () => {
      ctx.fillStyle = getColor(config.value.dotColors)
      ctx.beginPath()
      ctx.arc(
        randomNumber(0, canvasSize.value.width),
        randomNumber(0, canvasSize.value.height),
        randomNumber(config.value.minDotRadius, config.value.maxDotRadius),
        0,
        Math.PI * 2,
      )
      ctx.fill()
    })
  }

  function drawChars() {
    const ctx = context.value
    const chars: string[] = []

    loop(config.value.fontCount, idx => {
      const char = resolvedChars.value[randomNumber(resolvedChars.value.length)]
      const fontSize = randomNumber(
        config.value.minFontSize,
        config.value.maxFontSize,
      )
      const columnWidth =
        (canvasSize.value.width - config.value.padding * 2)
        / config.value.fontCount
      const x =
        columnWidth * idx + config.value.padding + (columnWidth - fontSize) / 2
      const y =
        randomNumber(
          canvasSize.value.height - config.value.padding * 2 - fontSize,
        )
        + config.value.padding
        + fontSize / 2
      const deg = randomNumber(
        config.value.minFontAngle,
        config.value.maxFontAngle,
      )

      ctx.fillStyle = getColor(config.value.fontColors)
      ctx.font = `${fontSize}px ${config.value.fontFamily}`
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(char, 0, 0)
      ctx.restore()

      chars.push(char)
    })

    validateCode.value = chars.join('')
  }

  function update() {
    drawBg()
    drawLines()
    drawDots()
    drawChars()
  }

  function validate(input: string) {
    return config.value.caseSensitive
      ? input === validateCode.value
      : input.toLowerCase() === validateCode.value.toLowerCase()
  }

  function destroy() {
    context.value.clearRect(
      0,
      0,
      canvasSize.value.width,
      canvasSize.value.height,
    )
    validateCode.value = ''
    canvasEl.value = undefined!
    context.value = undefined!
    canvasSize.value = { width: 0, height: 0 }
  }

  function resize(size: CanvasSize) {
    canvasEl.value.width = size.width
    canvasEl.value.height = size.height
    canvasSize.value = size
  }

  function render() {
    if (!unref(canvasRef)) return

    const el: HTMLCanvasElement = unref(canvasRef)!
    const { width, height } = (
      el.parentNode as HTMLElement
    ).getBoundingClientRect()

    context.value = el.getContext('2d') as CanvasRenderingContext2D
    canvasEl.value = el

    resize({ width, height })
    update()
  }

  watch(config, newConfig => {
    if (newConfig.autoUpdate) {
      update()
    }
  })

  return {
    validateCode,
    canvasEl,
    canvasSize,

    render,
    destroy,
    resize,
    update,
    validate,
  }
}
