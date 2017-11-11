import { Vector2 } from '../src/ts-vector-math'

/**
 * Dummy test
 */
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

  it('tests equality correctly', () => {
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
})
