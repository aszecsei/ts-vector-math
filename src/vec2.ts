import { EPSILON } from './common'

export class Vector2 {
  static get zero(): Vector2 {
    return new Vector2([0, 0])
  }
  private _values = new Float32Array(2)
  get x(): number {
    return this._values[0]
  }
  get y(): number {
    return this._values[1]
  }
  get xy(): number[] {
    return [this._values[0], this._values[1]]
  }
  set x(value: number) {
    this._values[0] = value
  }
  set y(value: number) {
    this._values[1] = value
  }
  set xy(values: number[]) {
    this._values[0] = values[0]
    this._values[1] = values[1]
  }
  constructor(values?: number[]) {
    if (values) {
      this.xy = values
    }
  }
  // TODO: Cross-product
  static dot(vector: Vector2, vector2: Vector2): number {
    return vector.x * vector2.x + vector.y * vector2.y
  }
  static distance(vector: Vector2, vector2: Vector2): number {
    return Math.sqrt(this.squaredDistance(vector, vector2))
  }
  static squaredDistance(vector: Vector2, vector2: Vector2) {
    let x = vector2.x - vector.x
    let y = vector2.y - vector.y
    return x * x + y * y
  }
  static direction(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2()
    let x = vector.x - vector2.x
    let y = vector.y - vector2.y
    let length = Math.sqrt(x * x + y * y)
    if (length === 0) {
      dest.reset()
      return dest
    }
    length = 1.0 / length
    dest.x = x * length
    dest.y = y * length
    return dest
  }
  static lerp(a: Vector2, b: Vector2, t: number, dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2()
    dest.x = a.x + t * (b.x - a.x)
    dest.y = a.y + t * (b.y - a.y)
    return dest
  }
  static sum(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2()
    dest.x = vector.x + vector2.x
    dest.y = vector.y + vector2.y
    return dest
  }
  static difference(
    vector: Vector2,
    vector2: Vector2,
    dest?: Vector2
  ): Vector2 {
    if (!dest) dest = new Vector2()

    dest.x = vector.x - vector2.x
    dest.y = vector.y - vector2.y

    return dest
  }

  static product(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2()

    dest.x = vector.x * vector2.x
    dest.y = vector.y * vector2.y

    return dest
  }

  static quotient(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2()

    dest.x = vector.x / vector2.x
    dest.y = vector.y / vector2.y

    return dest
  }
  at(index: number): number {
    return this._values[index]
  }
  reset(): void {
    this.x = 0
    this.y = 0
  }
  copy(dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2()
    dest.xy = this.xy
    return dest
  }
  negate(dest?: Vector2): Vector2 {
    if (!dest) dest = this
    dest.x = -this.x
    dest.y = -this.y
    return dest
  }
  equals(other: Vector2, threshold = EPSILON): boolean {
    if (Math.abs(this.x - other.x) > threshold) {
      return false
    }
    if (Math.abs(this.y - other.y) > threshold) {
      return false
    }
    return true
  }
  length(): number {
    return Math.sqrt(this.squaredLength())
  }
  squaredLength(): number {
    let x = this.x
    let y = this.y
    return x * x + y * y
  }
  add(vector: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = this
    dest.x = this.x + vector.x
    dest.y = this.y + vector.y
    return dest
  }
  subtract(vector: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = this
    dest.x = this.x - vector.x
    dest.y = this.y - vector.y
    return dest
  }
  multiply(vector: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = this
    dest.x = this.x * vector.x
    dest.y = this.y * vector.y
    return dest
  }
  divide(vector: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = this
    dest.x = this.x / vector.x
    dest.y = this.y / vector.y
    return dest
  }
  scale(value: number, dest?: Vector2): Vector2 {
    if (!dest) dest = this
    dest.x = this.x * value
    dest.y = this.y * value
    return dest
  }
  normalize(dest?: Vector2): Vector2 {
    if (!dest) dest = this
    dest.xy = this.xy
    let length = dest.length()
    if (length === 1) {
      return dest
    }
    if (length === 0) {
      dest.reset()
      return dest
    }
    length = 1.0 / length
    dest.x *= length
    dest.y *= length
    return dest
  }
  // TODO: Multiply Matrix2
  // TODO: Multiply Matrix3
}
