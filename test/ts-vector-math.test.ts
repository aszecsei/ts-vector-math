import * as math from '../src/ts-vector-math'

describe('Library', () => {
  it('contains Vector2', () => {
    expect(new math.Vector2()).toBeInstanceOf(math.Vector2)
  })

  it('contains Vector2', () => {
    expect(new math.Vector3()).toBeInstanceOf(math.Vector3)
  })
})
