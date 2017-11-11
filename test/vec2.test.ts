import { Vector2 } from '../src/vec2'

describe('Vector2', () => {
  it('is instantiable', () => {
    expect(new Vector2()).toBeInstanceOf(Vector2)
  })

  it('can be set through swizzle', () => {
    let v1 = new Vector2()
    v1.xy = [1, 2]
    let v2 = new Vector2()
    v2.x = 1
    v2.y = 2
    expect(v1).toEqual(v2)
  })

  it('can be retrieved through swizzle', () => {
    let v1 = new Vector2()
    v1.xy = [1, 2]
    expect(v1.xy).toEqual([1, 2])
  })

  it('detects non-equality', () => {
    expect(new Vector2([1, 2])).not.toEqual(new Vector2([1, 1]))
    expect(new Vector2([1, 2])).not.toEqual(new Vector2([2, 2]))
  })

  it('copies values', () => {
    let v1 = new Vector2([1, 1])
    let v2 = v1.copy()
    v2.xy = [2, 2]
    expect(v1).not.toEqual(v2)
  })

  it('copies values to a provided destination', () => {
    let v1 = new Vector2([1, 1])
    let v2 = new Vector2([1, 2])
    let v3 = v1.copy(v2)
    expect(v2).toEqual(v2)
    expect(v1).toEqual(v2)
    expect(v1).toEqual(v3)
    v3.y = 3
    expect(v2).toEqual(v3)
    expect(v1).not.toEqual(v2)
    expect(v1).not.toEqual(v3)
  })

  it('tests equality', () => {
    let v1 = new Vector2([1, 1])
    let v2 = new Vector2([1, 2])
    expect(v1.equals(v2)).toBeFalsy()
    v2.xy = [2, 1]
    expect(v1.equals(v2)).toBeFalsy()
    v2.xy = [1, 1]
    expect(v1.equals(v2)).toBeTruthy()
  })

  it('tests equality for a given threshold', () => {
    let v1 = new Vector2([1, 1])
    let v2 = new Vector2([2, 2])
    expect(v1.equals(v2)).toBeFalsy()
    expect(v1.equals(v2, 2)).toBeTruthy()
  })

  it('calculates dot products', () => {
    let v1 = new Vector2([1, 1])
    let v2 = new Vector2([2, 3])
    expect(Vector2.dot(v1, v2)).toEqual(5)
  })

  it('calculates distances', () => {
    let v1 = new Vector2([1, 1])
    let v2 = new Vector2([3, 1])
    expect(Vector2.distance(v1, v2)).toEqual(2)
    expect(Vector2.squaredDistance(v1, v2)).toEqual(4)
  })

  it('calculates direction', () => {
    let v1 = new Vector2([0, 0])
    let v2 = new Vector2([5, 0])
    expect(Vector2.direction(v2, v1).equals(new Vector2([1, 0]))).toBeTruthy()
    let v3 = new Vector2([2, 0])
    Vector2.direction(v2, v1, v3)
    expect(v3.equals(new Vector2([1, 0]))).toBeTruthy()
    expect(Vector2.direction(v1, v1)).toEqual(Vector2.zero)
  })

  it('lerps', () => {
    let v1 = Vector2.zero
    let v2 = new Vector2([2, 0])
    expect(Vector2.lerp(v1, v2, 0.5)).toEqual(new Vector2([1, 0]))
    v2.xy = [0, 2]
    expect(Vector2.lerp(v1, v2, 0.5)).toEqual(new Vector2([0, 1]))
    v2.xy = [4, 4]
    let v3 = Vector2.zero
    Vector2.lerp(v1, v2, 0.5, v3)
    expect(v3).toEqual(new Vector2([2, 2]))
  })

  it('finds the sum', () => {
    let v1 = new Vector2([1, 2])
    let v2 = new Vector2([2, 4])
    let v3 = Vector2.zero
    expect(Vector2.sum(v1, v2)).toEqual(new Vector2([3, 6]))
    v1.xy = [-1, -1]
    Vector2.sum(v1, v2, v3)
    expect(v3).toEqual(new Vector2([1, 3]))
  })

  it('finds the difference', () => {
    let v1 = new Vector2([2, 4])
    let v2 = new Vector2([1, 1])
    let v3 = Vector2.zero
    expect(Vector2.difference(v1, v2)).toEqual(new Vector2([1, 3]))
    v2.xy = [-1, -1]
    Vector2.difference(v1, v2, v3)
    expect(v3).toEqual(new Vector2([3, 5]))
  })

  it('finds the product', () => {
    let v1 = new Vector2([2, 5])
    let v2 = new Vector2([2, 1])
    let v3 = Vector2.zero
    expect(Vector2.product(v1, v2)).toEqual(new Vector2([4, 5]))
    v2.xy = [-1, -1]
    Vector2.product(v1, v2, v3)
    expect(v3).toEqual(new Vector2([-2, -5]))
  })

  it('finds the quotient', () => {
    let v1 = new Vector2([4, 3])
    let v2 = new Vector2([2, 3])
    let v3 = Vector2.zero
    expect(Vector2.quotient(v1, v2)).toEqual(new Vector2([2, 1]))
    v2.xy = [-1, -1]
    Vector2.quotient(v1, v2, v3)
    expect(v3).toEqual(new Vector2([-4, -3]))
  })

  it('retrieves values', () => {
    let v = new Vector2([1, 2])
    expect(v.at(0)).toEqual(1)
    expect(v.at(1)).toEqual(2)
  })

  it('negates', () => {
    let v = new Vector2([1, 1])
    let v2 = Vector2.zero
    expect(v.negate()).toEqual(new Vector2([-1, -1]))
    expect(v.negate(v2)).toEqual(new Vector2([1, 1]))
    expect(v).toEqual(new Vector2([-1, -1]))
  })

  it('calculates length', () => {
    let v = new Vector2([3, 4])
    expect(v.length()).toEqual(5)
  })

  it('calculates squared lengths', () => {
    let v = new Vector2([1, 1])
    expect(v.squaredLength()).toEqual(2)
  })

  it('adds', () => {
    let v1 = new Vector2([1, 2])
    let v2 = new Vector2([2, -1])
    let v3 = Vector2.zero
    expect(v1.add(v2)).toEqual(new Vector2([3, 1]))
    v1.add(v2, v3)
    expect(v1).toEqual(new Vector2([3, 1]))
    expect(v3).toEqual(new Vector2([5, 0]))
  })

  it('subtracts', () => {
    let v1 = new Vector2([2, 2])
    let v2 = new Vector2([1, -1])
    let v3 = Vector2.zero
    expect(v1.subtract(v2)).toEqual(new Vector2([1, 3]))
    v1.subtract(v2, v3)
    expect(v1).toEqual(new Vector2([1, 3]))
    expect(v3).toEqual(new Vector2([0, 4]))
  })

  it('multiplies', () => {
    let v1 = new Vector2([1, 2])
    let v2 = new Vector2([2, -1])
    let v3 = Vector2.zero
    expect(v1.multiply(v2)).toEqual(new Vector2([2, -2]))
    v1.multiply(v2, v3)
    expect(v1).toEqual(new Vector2([2, -2]))
    expect(v3).toEqual(new Vector2([4, 2]))
  })

  it('divides', () => {
    let v1 = new Vector2([4, 9])
    let v2 = new Vector2([2, 3])
    let v3 = Vector2.zero
    expect(v1.divide(v2)).toEqual(new Vector2([2, 3]))
    v1.divide(v2, v3)
    expect(v1).toEqual(new Vector2([2, 3]))
    expect(v3).toEqual(new Vector2([1, 1]))
  })

  it('scales', () => {
    let v1 = new Vector2([1, 2])
    let v2 = Vector2.zero
    expect(v1.scale(2)).toEqual(new Vector2([2, 4]))
    v1.scale(2, v2)
    expect(v1).toEqual(new Vector2([2, 4]))
    expect(v2).toEqual(new Vector2([4, 8]))
  })

  it('normalizes', () => {
    let v1 = new Vector2([2, 0])
    let v2 = Vector2.zero
    expect(v1.normalize()).toEqual(new Vector2([1, 0]))
    v1.xy = [1, 1]
    v1.normalize(v2)
    expect(v1).toEqual(new Vector2([1, 1]))
    expect(v2).toEqual(new Vector2([1.0 / Math.sqrt(2), 1.0 / Math.sqrt(2)]))
    v1.xy = [0, 1]
    v1.normalize(v2)
    expect(v1).toEqual(v2)
    v1 = Vector2.zero
    expect(v1.length()).toEqual(0)
    v1.normalize(v2)
    expect(v1).toEqual(v2)
  })
})
