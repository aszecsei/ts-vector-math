import Vector4 from '../src/vec4'

describe('Vector4', () => {
  it('is instantiable', () => {
    expect(new Vector4()).toBeInstanceOf(Vector4)
  })

  it('knows zero', () => {
    expect(Vector4.zero).toEqual(new Vector4([0, 0, 0, 0]))
  })

  it('knows one', () => {
    expect(Vector4.one).toEqual(new Vector4([1, 1, 1, 1]))
  })

  it('can be set through swizzle', () => {
    let v = new Vector4([1, 1, 1, 1])
    expect(v).toEqual(Vector4.one)
    v.x = 0
    expect(v).toEqual(new Vector4([0, 1, 1, 1]))
    v.xy = [1, 0]
    expect(v).toEqual(new Vector4([1, 0, 1, 1]))
    v.xyz = [0, 1, 0]
    expect(v).toEqual(new Vector4([0, 1, 0, 1]))
    v.xyzw = [1, 0, 1, 0]
    expect(v).toEqual(new Vector4([1, 0, 1, 0]))
    v.y = 1
    expect(v).toEqual(new Vector4([1, 1, 1, 0]))
    v.z = 0
    expect(v).toEqual(new Vector4([1, 1, 0, 0]))
    v.w = 1
    expect(v).toEqual(new Vector4([1, 1, 0, 1]))
  })

  it('can be retrieved through swizzle', () => {
    let v = new Vector4([0, 1, 2, 3])
    expect(v.x).toEqual(0)
    expect(v.y).toEqual(1)
    expect(v.z).toEqual(2)
    expect(v.w).toEqual(3)
    expect(v.xy).toEqual([0, 1])
    expect(v.xyz).toEqual([0, 1, 2])
    expect(v.xyzw).toEqual([0, 1, 2, 3])
  })

  it('can use rgba and xyzw', () => {
    let v = new Vector4([0, 1, 2, 3])
    expect(v.x).toEqual(v.r)
    expect(v.y).toEqual(v.g)
    expect(v.z).toEqual(v.b)
    expect(v.w).toEqual(v.a)
    expect(v.xy).toEqual(v.rg)
    expect(v.xyz).toEqual(v.rgb)
    expect(v.xyzw).toEqual(v.rgba)
    v = new Vector4([1, 1, 1, 1])
    expect(v).toEqual(Vector4.one)
    v.r = 0
    expect(v).toEqual(new Vector4([0, 1, 1, 1]))
    v.rg = [1, 0]
    expect(v).toEqual(new Vector4([1, 0, 1, 1]))
    v.rgb = [0, 1, 0]
    expect(v).toEqual(new Vector4([0, 1, 0, 1]))
    v.rgba = [1, 0, 1, 0]
    expect(v).toEqual(new Vector4([1, 0, 1, 0]))
    v.g = 1
    expect(v).toEqual(new Vector4([1, 1, 1, 0]))
    v.b = 0
    expect(v).toEqual(new Vector4([1, 1, 0, 0]))
    v.a = 1
    expect(v).toEqual(new Vector4([1, 1, 0, 1]))
  })

  it('lerps between two values', () => {
    let v1 = Vector4.zero
    Vector4.lerp(Vector4.zero, Vector4.one, 0.5, v1)
    expect(v1).toEqual(new Vector4([0.5, 0.5, 0.5, 0.5]))
    expect(Vector4.lerp(v1, Vector4.one, 0.5)).toEqual(
      new Vector4([0.75, 0.75, 0.75, 0.75])
    )
  })

  it('sums vectors', () => {
    let v1 = Vector4.one
    let v2 = Vector4.one
    let v3 = Vector4.zero
    expect(Vector4.sum(v1, v2)).toEqual(Vector4.one.scale(2))
    Vector4.sum(v1, v2, v3)
    expect(v3).toEqual(Vector4.one.scale(2))
    v3.reset()
    v1.add(v2, v3)
    expect(v3).toEqual(Vector4.one.scale(2))
    v1.add(v2)
    expect(v1).toEqual(Vector4.one.scale(2))
  })

  it('subtracts vectors', () => {
    let v1 = Vector4.one.scale(2)
    let v2 = Vector4.one
    let v3 = Vector4.zero
    expect(Vector4.difference(v1, v2)).toEqual(Vector4.one)
    Vector4.difference(v1, v2, v3)
    expect(v3).toEqual(Vector4.one)
    v3.reset()
    v1.subtract(v2, v3)
    expect(v3).toEqual(Vector4.one)
    v1.subtract(v2)
    expect(v1).toEqual(Vector4.one)
  })

  it('multiplies vectors', () => {
    let v1 = Vector4.one.scale(2)
    let v2 = Vector4.one
    let v3 = Vector4.zero
    expect(Vector4.product(v1, v2)).toEqual(Vector4.one.scale(2))
    Vector4.product(v1, v2, v3)
    expect(v3).toEqual(Vector4.one.scale(2))
    v3.reset()
    v1.multiply(v2, v3)
    expect(v3).toEqual(Vector4.one.scale(2))
    v1.multiply(v2)
    expect(v1).toEqual(Vector4.one.scale(2))
  })

  it('divides vectors', () => {
    let v1 = Vector4.one.scale(2)
    let v2 = v1.copy()
    let v3 = Vector4.zero
    expect(Vector4.quotient(v1, v2)).toEqual(Vector4.one)
    Vector4.quotient(v1, v2, v3)
    expect(v3).toEqual(Vector4.one)
    v3.reset()
    v1.divide(v2, v3)
    expect(v3).toEqual(Vector4.one)
    v1.divide(v2)
    expect(v1).toEqual(Vector4.one)
  })

  it('retrieves values', () => {
    let v = new Vector4([1, 2, 3, 4])
    expect(v.at(0)).toEqual(1)
    expect(v.at(1)).toEqual(2)
    expect(v.at(2)).toEqual(3)
    expect(v.at(3)).toEqual(4)
  })

  it('copies values', () => {
    let v = Vector4.one
    let v2 = v.copy()
    v.add(Vector4.one)
    expect(v2).toEqual(Vector4.one)
    expect(v).toEqual(new Vector4([2, 2, 2, 2]))
  })

  it('copies to another vector', () => {
    let v = Vector4.one
    let v2 = Vector4.zero
    v.copy(v2)
    expect(v2).toEqual(v)
  })

  it('negates vectors', () => {
    let v = Vector4.one
    let v2 = Vector4.zero
    v.negate(v2)
    expect(v2).toEqual(new Vector4([-1, -1, -1, -1]))
    expect(v).toEqual(Vector4.one)
    v.negate()
    expect(v).toEqual(new Vector4([-1, -1, -1, -1]))
  })

  it('determines vector equality', () => {
    let v = new Vector4([1, 1, 1, 1])
    let v2 = new Vector4([2, 1, 1])
    expect(v.equals(v2)).toBeFalsy()
    v2.xyzw = [1, 2, 1, 1]
    expect(v.equals(v2)).toBeFalsy()
    v2.xyzw = [1, 1, 2, 1]
    expect(v.equals(v2)).toBeFalsy()
    v2.xyzw = [1, 1, 1, 2]
    expect(v.equals(v2)).toBeFalsy()
    expect(v.equals(v2, 2)).toBeTruthy()
  })

  it('determines vector length', () => {
    let v = new Vector4([1, 2, 3, 4])
    expect(v.squaredLength()).toEqual(30)
    expect(v.length()).toEqual(Math.sqrt(30))
  })

  it('normalizes vectors', () => {
    let v = new Vector4([1, 2, 3, 4])
    let v2 = Vector4.zero
    v.normalize(v2)
    expect(v2.length()).toBeCloseTo(1)
    expect(v.length()).not.toBeCloseTo(1)
    v.normalize()
    expect(v.length()).toBeCloseTo(1)
    v.xyzw = [1, 0, 0, 0]
    v.normalize(v2)
    expect(v).toEqual(v2)
    v.reset()
    v.normalize()
    expect(v).toEqual(Vector4.zero)
  })

  it('scales to another vector', () => {
    let v = Vector4.one
    let v2 = Vector4.zero
    v.scale(2, v2)
    expect(v2).toEqual(new Vector4([2, 2, 2, 2]))
  })
})
