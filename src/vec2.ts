import { EPSILON } from './common'

export class Vector2 {
  public x: number
  public y: number
  get xy(): number[] {
    return [this.x, this.y]
  }
  set xy(values: number[]) {
    this.x = values[0]
    this.y = values[1]
  }
  constructor(values?: number[]) {
    if (values) {
      this.xy = values
    }
  }
  copy(dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2()
    dest.xy = this.xy
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
}
