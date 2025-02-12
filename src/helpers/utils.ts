interface RandomNumberOptions {
  /**
   * whether include max value
   * should not include max value when random array index by length
   *
   * @default false
   */
  includeMax?: boolean
}

/**
 * @internal
 */
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

/**
 * @internal
 */
export function randomColor() {
  return `#${Math.random().toString(16).slice(2, 8)}`
}

/**
 * @internal
 */
export function loop(count: number, callback?: (index: number) => void) {
  for (let i = 0; i < count; i++) {
    callback?.(i)
  }
}

/**
 * @internal
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

/**
 * @internal
 */
export function isNull(value: unknown): value is null {
  return value === null
}

/**
 * @internal
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * @internal
 */
export function cleanUndefinedAndNull<T extends object>(obj: T): T {
  type ObjKey = keyof typeof obj

  Object.keys(obj).forEach(key => {
    const value = obj[key as ObjKey]
    if (isUndefined(value) || isNull(value)) {
      delete obj[key as ObjKey]
    }
  })

  return obj
}
