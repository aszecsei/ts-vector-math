// Configuration Constants
import { ArrayType } from 'typedoc/dist/lib/models'

export const EPSILON = 0.00001
export const RANDOM = Math.random

const degree = Math.PI / 180

/**
 * Convert Degree to Radian
 * @param {number} a Angle in Degrees
 * @returns {number} Angle in Radians
 */
export function toRadian(a: number) {
  return a * degree
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance (an absolute tolerance is used for values less  than or equal to
 * 1.0, and a relative tolerance is used for larger values)
 * @param {number} a The first number to test
 * @param {number} b The second number to test
 * @param {number} tolerance The tolerance to test for
 * @returns {boolean} True if the numbers are approximately equal, false otherwise
 */
export function equals(a: number, b: number, tolerance = EPSILON): boolean {
  return Math.abs(a - b) <= tolerance * Math.max(1.0, Math.abs(a), Math.abs(b))
}

export { default as Vector2 } from './vec2'
export { default as Vector3 } from './vec3'
export { default as Vector4 } from './vec4'
export { default as Matrix2 } from './mat2'
