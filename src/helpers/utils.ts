interface RandomNumberOptions {
  /**
   * whether include max value
   * should not include max value when random array index by length
   *
   * @default false
   */
  includeMax?: boolean
}

export function randomNumber(
  min: number,
  max = 0,
  options: RandomNumberOptions = {},
) {
  if (max === 0) {
    max = min
    min = 0
  }
  if (min > max) {
    ;[min, max] = [max, min]
  }
  return (
    Math.floor(Math.random() * (max - min + (options.includeMax ? 1 : 0))) + min
  )
}

export function randomColor() {
  return `#${Math.random().toString(16).slice(2, 8)}`
}

export function loop(count: number, callback?: (index: number) => void) {
  for (let i = 0; i < count; i++) {
    callback?.(i)
  }
}
