/**
 * Loop a specified number of times and execute a callback function on each iteration.
 * @param count - The number of times to loop.
 * @param callback - The function to execute on each iteration.
 * @internal
 */
export function loop(count: number, callback?: (index: number) => void) {
  for (let i = 0; i < count; i++) {
    callback?.(i)
  }
}
