import * as common from '../src/common'

describe('Common', () => {
  it('should calculate degrees-to-radians', () => {
    let rad = common.toRadian(90)
    expect(rad).toBeCloseTo(Math.PI / 2)
  })

  it('should compare floats', () => {
    expect(common.equals(9.1, 9.2, 0.1)).toBeTruthy()
    expect(common.equals(9, 10)).toBeFalsy()
  })
})
