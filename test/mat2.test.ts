import Matrix2 from '../src/mat2'
import Vector2 from '../src/vec2'

describe('Matrix2', () => {
  let out: Matrix2
  let matA: Matrix2
  let matB: Matrix2
  let matC: Matrix2
  let identity: Matrix2
  let result: Matrix2

  beforeEach(() => {
    matA = new Matrix2([1, 2, 3, 4])
    matB = new Matrix2([5, 6, 7, 8])
    matC = new Matrix2([2, 6, 1, 3])
    out = new Matrix2()
    identity = new Matrix2().setIdentity()
  })

  describe('constructor', () => {
    beforeEach(() => {
      result = new Matrix2()
    })
    it('should return a Matrix2 initialized to a 2x2 identity matrix', () => {
      expect(result).toEqual(identity)
    })
  })

  describe('clone', () => {
    beforeEach(() => {
      result = matA.copy()
    })
    it('should return a Matrix2 initialized to the values in matA', () => {
      expect(result).toEqual(matA)
    })
  })

  describe('copy', () => {
    beforeEach(() => {
      result = matA.copy(out)
    })
    it('should place values into out', () => {
      expect(out).toEqual(matA)
    })
    it('should return out', () => {
      expect(result).toBe(out)
    })
  })

  describe('identity', () => {
    beforeEach(() => {
      result = Matrix2.identity
    })
    it('should return a Matrix2 initialized to a 2x2 identity matrix', () => {
      expect(result).toEqual(identity)
    })
  })

  describe('setIdentity', () => {
    beforeEach(() => {
      result = out.setIdentity()
    })
    it('should place values into out', () => {
      expect(result).toEqual(identity)
    })
    it('should return out', () => {
      expect(result).toBe(out)
    })
  })

  describe('transpose', () => {
    describe('with a separate output matrix', () => {
      beforeEach(() => {
        result = matA.transpose(out)
      })
      it('should place values into out', () => {
        expect(out).toEqual(new Matrix2([1, 3, 2, 4]))
      })
      it('should return out', () => {
        expect(result).toBe(out)
      })
      it('should not modify matA', () => {
        expect(matA).toEqual(new Matrix2([1, 2, 3, 4]))
      })
    })
    describe('without a separate output matrix', () => {
      beforeEach(() => {
        result = matA.transpose()
      })
      it('should place values into matA', () => {
        expect(matA).toEqual(new Matrix2([1, 3, 2, 4]))
      })
      it('should return matA', () => {
        expect(result).toBe(matA)
      })
    })
  })

  describe('invert', () => {
    describe('with a separate output matrix', () => {
      beforeEach(() => {
        result = matA.inverse(out)
      })
      it('should place values into out', () => {
        expect(out).toEqual(new Matrix2([-2, 1, 1.5, -0.5]))
      })
      it('should return out', () => {
        expect(result).toBe(out)
      })
      it('should not modify matA', () => {
        expect(matA).toEqual(new Matrix2([1, 2, 3, 4]))
      })
    })
    describe('without a separate output matrix', () => {
      beforeEach(() => {
        result = matA.inverse()
      })
      it('should place values into matA', () => {
        expect(matA).toEqual(new Matrix2([-2, 1, 1.5, -0.5]))
      })
      it('should return matA', () => {
        expect(result).toBe(matA)
      })
    })
    describe('a non-invertible matrix', () => {
      beforeEach(() => {
        result = matC.inverse()
      })
      it('should be undefined', () => {
        expect(result).toBeUndefined()
      })
    })
  })

  describe('adjoint', () => {
    describe('with a separate output matrix', () => {
      beforeEach(() => {
        result = matA.adjoint(out)
      })
      it('should place values into out', () => {
        expect(out).toEqual(new Matrix2([4, -2, -3, 1]))
      })
      it('should return out', () => {
        expect(result).toBe(out)
      })
      it('should not modify matA', () => {
        expect(matA).toEqual(new Matrix2([1, 2, 3, 4]))
      })
    })
    describe('without a separate output matrix', () => {
      beforeEach(() => {
        result = matA.adjoint()
      })
      it('should place values into matA', () => {
        expect(matA).toEqual(new Matrix2([4, -2, -3, 1]))
      })
      it('should return matA', () => {
        expect(result).toBe(matA)
      })
    })
  })

  describe('determinant', () => {
    let numResult
    beforeEach(() => {
      numResult = matA.determinant()
    })
    it('should return the determinant', () => {
      expect(numResult).toEqual(-2)
    })
  })

  describe('multiply', () => {
    it('should have an alias called "mul"', () => {
      expect(matA.mul).toEqual(matA.multiply)
    })
    describe('with a separate output matrix', () => {
      beforeEach(() => {
        result = matA.multiply(matB, out)
      })
      it('should place values into out', () => {
        expect(out).toEqual(new Matrix2([23, 34, 31, 46]))
      })
      it('should return out', () => {
        expect(result).toBe(out)
      })
      it('should not modify matA', () => {
        expect(matA).toEqual(new Matrix2([1, 2, 3, 4]))
      })
      it('should not modify matB', () => {
        expect(matB).toEqual(new Matrix2([5, 6, 7, 8]))
      })
    })
    describe('without a separate output matrix', () => {
      beforeEach(() => {
        result = matA.multiply(matB)
      })
      it('should place values into matA', () => {
        expect(matA).toEqual(new Matrix2([23, 34, 31, 46]))
      })
      it('should return matA', () => {
        expect(result).toBe(matA)
      })
      it('should not modify matB', () => {
        expect(matB).toEqual(new Matrix2([5, 6, 7, 8]))
      })
    })
  })

  describe('rotate', () => {
    describe('with a separate output matrix', () => {
      beforeEach(() => {
        result = matA.rotate(Math.PI * 0.5, out)
      })
      it('should place values into out', () => {
        expect(out).toEqual(new Matrix2([3, 4, -1, -2]))
      })
      it('should return out', () => {
        expect(result).toBe(out)
      })
      it('should not modify matA', () => {
        expect(matA).toEqual(new Matrix2([1, 2, 3, 4]))
      })
    })
    describe('without a separate output matrix', () => {
      beforeEach(() => {
        result = matA.rotate(Math.PI * 0.5)
      })
      it('should place values into matA', () => {
        expect(matA).toEqual(new Matrix2([3, 4, -1, -2]))
      })
      it('should return matA', () => {
        expect(result).toBe(matA)
      })
    })
  })

  describe('scale', () => {
    let vecA
    beforeEach(() => {
      vecA = new Vector2([2, 3])
    })
    describe('with a separate output matrix', () => {
      beforeEach(() => {
        result = matA.scale(vecA, out)
      })
      it('should place values into out', () => {
        expect(out).toEqual(new Matrix2([2, 4, 9, 12]))
      })
      it('should return out', () => {
        expect(result).toBe(out)
      })
      it('should not modify matA', () => {
        expect(matA).toEqual(new Matrix2([1, 2, 3, 4]))
      })
    })
    describe('without a separate output matrix', () => {
      beforeEach(() => {
        result = matA.scale(vecA)
      })
      it('should place values into matA', () => {
        expect(matA).toEqual(new Matrix2([2, 4, 9, 12]))
      })
      it('should return matA', () => {
        expect(result).toBe(matA)
      })
    })
  })

  describe('str', () => {
    let resultStr
    beforeEach(() => {
      resultStr = matA.toString()
    })
    it('should return a string representation of the matrix', () => {
      expect(resultStr).toEqual('mat2(1, 2, 3, 4)')
    })
  })

  describe('frob', () => {
    let numResult
    beforeEach(() => {
      numResult = matA.frobenius()
    })
    it('should return the Frobenius Norm of the matrix', () => {
      expect(numResult).toEqual(
        Math.sqrt(
          Math.pow(1, 2) + Math.pow(2, 2) + Math.pow(3, 2) + Math.pow(4, 2)
        )
      )
    })
  })

  describe('add', () => {
    describe('with a separate output matrix', () => {
      beforeEach(() => {
        result = matA.add(matB, out)
      })
      it('should place values into out', () => {
        expect(out).toEqual(new Matrix2([6, 8, 10, 12]))
      })
      it('should return out', () => {
        expect(result).toBe(out)
      })
      it('should not modify matA', () => {
        expect(matA).toEqual(new Matrix2([1, 2, 3, 4]))
      })
      it('should not modify matB', () => {
        expect(matB).toEqual(new Matrix2([5, 6, 7, 8]))
      })
    })

    describe('without a separate output matrix', () => {
      beforeEach(() => {
        result = matA.add(matB)
      })
      it('should place values into matA', () => {
        expect(matA).toEqual(new Matrix2([6, 8, 10, 12]))
      })
      it('should return matA', () => {
        expect(result).toBe(matA)
      })
      it('should not modify matB', () => {
        expect(matB).toEqual(new Matrix2([5, 6, 7, 8]))
      })
    })
  })

  describe('subtract', () => {
    it('should have an alias called "sub"', () => {
      expect(matA.sub).toEqual(matA.subtract)
    })

    describe('with a separate output matrix', () => {
      beforeEach(() => {
        result = matA.subtract(matB, out)
      })
      it('should place values into out', () => {
        expect(out).toEqual(new Matrix2([-4, -4, -4, -4]))
      })
      it('should return out', () => {
        expect(result).toBe(out)
      })
      it('should not modify matA', () => {
        expect(matA).toEqual(new Matrix2([1, 2, 3, 4]))
      })
      it('should not modify matB', () => {
        expect(matB).toEqual(new Matrix2([5, 6, 7, 8]))
      })
    })

    describe('without a separate output matrix', () => {
      beforeEach(() => {
        result = matA.sub(matB)
      })
      it('should place values into matA', () => {
        expect(matA).toEqual(new Matrix2([-4, -4, -4, -4]))
      })
      it('should return matA', () => {
        expect(result).toBe(matA)
      })
      it('should not modify matB', () => {
        expect(matB).toEqual(new Matrix2([5, 6, 7, 8]))
      })
    })
  })

  describe('init', () => {
    beforeEach(() => {
      result = out.init([1, 2, 3, 4])
    })
    it('should place values into out', () => {
      expect(out).toEqual(new Matrix2([1, 2, 3, 4]))
    })
    it('should return out', () => {
      expect(result).toBe(out)
    })
  })

  describe('multiplyScalar', () => {
    describe('with a separate output matrix', () => {
      beforeEach(() => {
        result = matA.multiplyScalar(2, out)
      })
      it('should place values into out', () => {
        expect(out).toEqual(new Matrix2([2, 4, 6, 8]))
      })
      it('should return out', () => {
        expect(result).toBe(out)
      })
      it('should not modify matA', () => {
        expect(matA).toEqual(new Matrix2([1, 2, 3, 4]))
      })
    })
    describe('without a separate output matrix', () => {
      beforeEach(() => {
        result = matA.multiplyScalar(2)
      })
      it('should place values into matA', () => {
        expect(matA).toEqual(new Matrix2([2, 4, 6, 8]))
      })
      it('should return matA', () => {
        expect(result).toBe(matA)
      })
    })
  })

  describe('exactEquals', () => {
    let matC
    let r0
    let r1
    beforeEach(() => {
      matA = new Matrix2([0, 1, 2, 3])
      matB = new Matrix2([0, 1, 2, 3])
      matC = new Matrix2([1, 2, 3, 4])
      r0 = matA.exactEquals(matB)
      r1 = matA.exactEquals(matC)
    })
    it('should return true for identical matrices', () => {
      expect(r0).toBeTruthy()
    })
    it('should return false for different matrices', () => {
      expect(r1).toBeFalsy()
    })
    it('should not modify matA', () => {
      expect(matA).toEqual(new Matrix2([0, 1, 2, 3]))
    })
    it('should not modify matB', () => {
      expect(matB).toEqual(new Matrix2([0, 1, 2, 3]))
    })
  })

  describe('equals', () => {
    let matC
    let matD
    let r0
    let r1
    let r2
    let r3
    beforeEach(() => {
      matA = new Matrix2([0, 1, 2, 3])
      matB = new Matrix2([0, 1, 2, 3])
      matC = new Matrix2([1, 2, 3, 4])
      matD = new Matrix2([1e-16, 1, 2, 3])
      r0 = matA.equals(matB)
      r1 = matA.equals(matC)
      r2 = matA.equals(matD)
      r3 = matA.equals(matC, 1)
    })
    it('should return true for identical matrices', () => {
      expect(r0).toBeTruthy()
    })
    it('should return false for different matrices', () => {
      expect(r1).toBeFalsy()
    })
    it('should return true for close but not identical matrices', () => {
      expect(r2).toBeTruthy()
    })
    it('should not modify matA', () => {
      expect(matA).toEqual(new Matrix2([0, 1, 2, 3]))
    })
    it('should not modify matB', () => {
      expect(matB).toEqual(new Matrix2([0, 1, 2, 3]))
    })
    it('should return true for close but not identical matrices using a given threshold', () => {
      expect(r3).toBeTruthy()
    })
  })

  describe('fromRotation', () => {
    let r0
    describe('with a separate output matrix', () => {
      beforeEach(() => {
        result = Matrix2.fromRotation(Math.PI * 0.5, out)
        r0 = result.equals(new Matrix2([0, 1, -1, 0]))
      })
      it('should place values into out', () => {
        expect(r0).toBeTruthy()
      })
      it('should return out', () => {
        expect(result).toBe(out)
      })
    })
    describe('without a separate output matrix', () => {
      beforeEach(() => {
        result = Matrix2.fromRotation(Math.PI * 0.5)
        r0 = result.equals(new Matrix2([0, 1, -1, 0]))
      })
      it('should place values into a new matrix', () => {
        expect(r0).toBeTruthy()
      })
    })
  })

  describe('fromScaling', () => {
    describe('with an output matrix', () => {
      beforeEach(() => {
        result = Matrix2.fromScaling(new Vector2([2, 3]), out)
      })
      it('should place values into out', () => {
        expect(out).toEqual(new Matrix2([2, 0, 0, 3]))
      })
      it('should return out', () => {
        expect(result).toBe(out)
      })
    })
    describe('without an output matrix', () => {
      beforeEach(() => {
        result = Matrix2.fromScaling(new Vector2([2, 3]))
      })
      it('should place values into a new matrix', () => {
        expect(result).toEqual(new Matrix2([2, 0, 0, 3]))
      })
    })
  })

  describe('all', () => {
    let resultArr
    beforeEach(() => {
      resultArr = matA.all()
    })
    it('should return all values from a matrix', () => {
      expect(resultArr).toEqual([1, 2, 3, 4])
    })
    it('should not modify matA', () => {
      expect(matA).toEqual(new Matrix2([1, 2, 3, 4]))
    })
  })

  describe('row', () => {
    let row0
    let row1
    beforeEach(() => {
      row0 = matA.row(0)
      row1 = matA.row(1)
    })
    it('should return the first row', () => {
      expect(row0).toEqual([1, 2])
    })
    it('should return the second row', () => {
      expect(row1).toEqual([3, 4])
    })
    it('should not modify matA', () => {
      expect(matA).toEqual(new Matrix2([1, 2, 3, 4]))
    })
  })

  describe('col', () => {
    let col0
    let col1
    beforeEach(() => {
      col0 = matA.col(0)
      col1 = matA.col(1)
    })
    it('should return the first column', () => {
      expect(col0).toEqual([1, 3])
    })
    it('should return the second column', () => {
      expect(col1).toEqual([2, 4])
    })
    it('should not modify matA', () => {
      expect(matA).toEqual(new Matrix2([1, 2, 3, 4]))
    })
  })
})
