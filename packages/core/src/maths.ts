/**
 * Clamp a value between a minimum and maximum value
 *
 * @param min Minimum value
 * @param input Value to clamp
 * @param max Maximum value
 * @returns Clamped value
 */
export function clamp(min: number, input: number, max: number) {
  return Math.max(min, Math.min(input, max))
}

/**
 * Truncate a floating-point number to a specified number of decimal places
 *
 * @param value Value to truncate
 * @param decimals Number of decimal places to truncate to
 * @returns Truncated value
 */
export function truncate(value: number, decimals = 0) {
  return parseFloat(value.toFixed(decimals))
}

/**
 *  Linearly interpolate between two values using an amount (0 <= t <= 1)
 *
 * @param x First value
 * @param y Second value
 * @param t Amount to interpolate (0 <= t <= 1)
 * @returns Interpolated value
 */
export function lerp(x: number, y: number, t: number) {
  return (1 - t) * x + t * y
}

/**
 * Damp a value over time using a damping factor
 * {@link http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/}
 *
 * @param x Initial value
 * @param y Target value
 * @param lambda Damping factor
 * @param dt Time elapsed since the last update
 * @returns Damped value
 */
export function damp(x: number, y: number, lambda: number, deltaTime: number) {
  return lerp(x, y, 1 - Math.exp(-lambda * deltaTime))
}

/**
 * Calculate the modulo of the dividend and divisor while keeping the result within the same sign as the divisor
 * {@link https://anguscroll.com/just/just-modulo}
 *
 * @param n Dividend
 * @param d Divisor
 * @returns Modulo
 */
export function modulo(n: number, d: number) {
  return ((n % d) + d) % d
}

/*
  These functions are from framer-motion https://github.com/framer/motion, modified a bit.

  Original: packages/framer-motion/src/easing/cubic-bezier.ts
  https://github.com/framer/motion/blob/main/packages/framer-motion/src/easing/cubic-bezier.ts
  
*/
// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const calcBezier = (t: number, a1: number, a2: number) =>
  (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) * t
const subdivisionPrecision = 0.0000001
const subdivisionMaxIterations = 12
function binarySubdivide(
  x: number,
  lowerBound: number,
  upperBound: number,
  mX1: number,
  mX2: number
) {
  let currentX
  let currentT
  let i = 0
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2.0
    currentX = calcBezier(currentT, mX1, mX2) - x
    if (currentX > 0.0) {
      upperBound = currentT
    } else {
      lowerBound = currentT
    }
  } while (
    Math.abs(currentX) > subdivisionPrecision &&
    ++i < subdivisionMaxIterations
  )
  return currentT
}
export function cubicBezier(input: number[]) {
  // If this is a linear gradient, return linear easing
  if (input[0] === input[1] && input[2] === input[3]) return noop
  const getTForX = (aX: number) => binarySubdivide(aX, 0, 1, input[0], input[2])
  // If animation is at start/end, return t without easing
  return (t: number) =>
    t === 0 || t === 1 ? t : calcBezier(getTForX(t), input[1], input[3])
}

export const noop = <T>(any: T): T => any
