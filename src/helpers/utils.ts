export function randomNumber(min: number, max = 0) {
  if (max === 0) {
    max = min
    min = 0
  }
  return Math.floor(Math.random() * (max - min)) + min
}

export function randomColor() {
  return `#${Math.random().toString(16).slice(2, 8)}`
}

export function loop(count: number, callback?: (index: number) => void) {
  for (let i = 0; i < count; i++) {
    callback?.(i)
  }
}
