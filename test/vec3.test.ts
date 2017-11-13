import Vector3 from '../src/vec3'
import { EPSILON } from '../src/common'

describe('Vector3', () => {
  it('is instantiable', () => {
    expect(new Vector3()).toBeInstanceOf(Vector3)
  })

  it('knows zero', () => {
    expect(Vector3.zero).toEqual(new Vector3([0, 0, 0]))
  })

  it('knows one', () => {
    expect(Vector3.one).toEqual(new Vector3([1, 1, 1]))
  })

  it('has orthogonal directions', () => {
    let dot1 = Vector3.dot(Vector3.up, Vector3.right)
    let dot2 = Vector3.dot(Vector3.up, Vector3.forward)
    let dot3 = Vector3.dot(Vector3.right, Vector3.forward)
    expect(dot1).toEqual(0)
    expect(dot2).toEqual(0)
    expect(dot3).toEqual(0)
  })

  it('knows down is opposite of up', () => {
    expect(Vector3.down.equals(Vector3.up.negate())).toBeTruthy()
  })

  it('knows left is opposite of right', () => {
    expect(Vector3.left.equals(Vector3.right.negate())).toBeTruthy()
  })

  it('knows backwards is opposite of forwards', () => {
    expect(Vector3.backward.equals(Vector3.forward.negate()))
  })

  it('can be set through swizzle', () => {
    let v = new Vector3([1, 1, 1])
    expect(v).toEqual(Vector3.one)
    v.x = 0
    expect(v).toEqual(new Vector3([0, 1, 1]))
    v.xy = [1, 0]
    expect(v).toEqual(new Vector3([1, 0, 1]))
    v.xyz = [0, 1, 0]
    expect(v).toEqual(new Vector3([0, 1, 0]))
  })

  it('can be retrieved through swizzle', () => {
    let v = new Vector3([0, 1, 2])
    expect(v.x).toEqual(0)
    expect(v.y).toEqual(1)
    expect(v.z).toEqual(2)
    expect(v.xy).toEqual([0, 1])
    expect(v.xyz).toEqual([0, 1, 2])
  })

  it('calculates cross-products', () => {
    let v1 = new Vector3([1, 2, 3])
    let v2 = new Vector3([3, 2, 1])
    let v3 = Vector3.one
    expect(Vector3.cross(v1, v2)).toEqual(new Vector3([-4, 8, -4]))
    expect(v3).toEqual(Vector3.one)
    Vector3.cross(v1, v2, v3)
    expect(v3).toEqual(new Vector3([-4, 8, -4]))
  })

  it('calculates squared length', () => {
    let v1 = new Vector3([1, 2, 3])
    expect(v1.squaredLength()).toEqual(Vector3.dot(v1, v1))
  })

  it('calculates distance', () => {
    let v1 = new Vector3([1, 3, 2])
    let v2 = new Vector3([4, 3, 6])
    let v3 = Vector3.difference(v2, v1)
    expect(Vector3.distance(v1, v2)).toEqual(v3.length())
  })

  it('calculates direction', () => {
    let v1 = new Vector3([1, 0, 0])
    let v2 = new Vector3([0, 1, 1])
    let diff = Vector3.difference(v2, v1)
    let dir = Vector3.direction(v2, v1)
    expect(Math.abs(1 - dir.squaredLength())).toBeLessThan(EPSILON)
    expect(dir.scale(diff.length()).equals(diff)).toBeTruthy()
    Vector3.direction(v1, v1, v2)
    expect(v2).toEqual(Vector3.zero)
  })

  it('lerps between two values', () => {
    let v1 = Vector3.zero
    Vector3.lerp(Vector3.zero, Vector3.one, 0.5, v1)
    expect(v1).toEqual(new Vector3([0.5, 0.5, 0.5]))
    expect(Vector3.lerp(v1, Vector3.one, 0.5)).toEqual(
      new Vector3([0.75, 0.75, 0.75])
    )
  })

  it('sums vectors', () => {
    let v1 = Vector3.one
    let v2 = Vector3.forward
    let v3 = Vector3.zero
    expect(Vector3.sum(v1, v2, v3)).toEqual(new Vector3([1, 1, 2]))
    v2.add(v3, v1)
    expect(v1).toEqual(new Vector3([1, 1, 3]))
    let s = Vector3.sum(v1, v2)
    expect(s).toEqual(new Vector3([1, 1, 4]))
    s.add(new Vector3([1, 2, 3]))
    expect(s).toEqual(new Vector3([2, 3, 7]))
  })

  it('multiplies vectors', () => {
    let v1 = new Vector3([1, 2, 3])
    let v2 = Vector3.zero
    expect(Vector3.product(v1, v1, v2)).toEqual(new Vector3([1, 4, 9]))
    expect(v2).toEqual(new Vector3([1, 4, 9]))
    expect(Vector3.product(v2, v1)).toEqual(new Vector3([1, 8, 27]))
    expect(v2).toEqual(new Vector3([1, 4, 9]))
    expect(v1.multiply(v1, v2)).toEqual(new Vector3([1, 4, 9]))
    expect(v2).toEqual(new Vector3([1, 4, 9]))
    v1.multiply(v1)
    expect(v1).toEqual(new Vector3([1, 4, 9]))
  })

  it('retrieves values', () => {
    let v = new Vector3([1, 2, 3])
    expect(v.at(0)).toEqual(1)
    expect(v.at(1)).toEqual(2)
    expect(v.at(2)).toEqual(3)
  })

  it('resets values', () => {
    let v = Vector3.one
    v.reset()
    expect(v).toEqual(Vector3.zero)
  })

  it('copies values', () => {
    let v = Vector3.one
    let v2 = v.copy()
    v.add(Vector3.one)
    expect(v2).toEqual(Vector3.one)
    expect(v).toEqual(new Vector3([2, 2, 2]))
  })

  it('subtracts vectors', () => {
    let v1 = new Vector3([5, 6, 7])
    let v2 = v1.copy()
    Vector3.difference(v1, Vector3.one, v2)
    expect(v2).toEqual(new Vector3([4, 5, 6]))
    expect(Vector3.difference(v2, Vector3.one)).toEqual(new Vector3([3, 4, 5]))
    v1.subtract(Vector3.one, v2)
    expect(v2).toEqual(new Vector3([4, 5, 6]))
    v2.subtract(Vector3.one)
    expect(v2).toEqual(new Vector3([3, 4, 5]))
  })

  it('divides vectors', () => {
    const two = Vector3.one.scale(2)
    let v = Vector3.one.scale(8)
    let v2 = v.copy()
    Vector3.quotient(v, two, v2)
    expect(v2).toEqual(new Vector3([4, 4, 4]))
    expect(Vector3.quotient(v2, two)).toEqual(new Vector3([2, 2, 2]))
    v.divide(two, v2)
    expect(v2).toEqual(new Vector3([4, 4, 4]))
    v2.divide(two)
    expect(v2).toEqual(new Vector3([2, 2, 2]))
  })

  it('scales vectors', () => {
    let v = Vector3.one
    let v2 = Vector3.zero
    v.scale(2)
    expect(v).toEqual(new Vector3([2, 2, 2]))
    v.scale(0.5, v2)
    expect(v).toEqual(new Vector3([2, 2, 2]))
    expect(v2).toEqual(Vector3.one)
  })

  it('normalizes vectors', () => {
    let v1 = new Vector3([2, 0, 0])
    let v2 = Vector3.zero
    expect(v1.normalize()).toEqual(new Vector3([1, 0, 0]))
    v1.xy = [1, 1]
    v1.normalize(v2)
    expect(v1).toEqual(new Vector3([1, 1, 0]))
    expect(v2).toEqual(new Vector3([1.0 / Math.sqrt(2), 1.0 / Math.sqrt(2), 0]))
    v1.xy = [0, 1]
    v1.normalize(v2)
    expect(v1).toEqual(v2)
    v1 = Vector3.zero
    expect(v1.length()).toEqual(0)
    v1.normalize(v2)
    expect(v1).toEqual(v2)
  })

  it('copies to another vector', () => {
    let v = Vector3.one
    let v2 = Vector3.zero
    v.copy(v2)
    expect(v2).toEqual(v)
  })

  it('negates to a destination', () => {
    let v = Vector3.one
    let v2 = Vector3.zero
    v.negate(v2)
    expect(v2).toEqual(new Vector3([-1, -1, -1]))
    expect(v).toEqual(Vector3.one)
  })

  it('determines vector equality', () => {
    let v = new Vector3([1, 1, 1])
    let v2 = new Vector3([2, 1, 1])
    expect(v.equals(v2)).toBeFalsy()
    v2.xyz = [1, 2, 1]
    expect(v.equals(v2)).toBeFalsy()
    v2.xyz = [1, 1, 2]
    expect(v.equals(v2)).toBeFalsy()
    expect(v.equals(v2, 2)).toBeTruthy()
  })
})
