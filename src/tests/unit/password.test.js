const isValidPass = require('../../utils/validations/password')

describe('Testing password validation module', () => {
  it('should returns a true boolean for valid password', () => {

    const randomPasswords = [
      'abcd1234',
      '@bCdEfGh12345678',
      'aDefgt%4Rtoiuy/*s',
      ''
    ]

    expect(isValidPass(randomPasswords[0])).toBe(true)
    expect(isValidPass(randomPasswords[1])).toBe(true)
    expect(isValidPass(randomPasswords[2])).toBe(false)
    expect(isValidPass(randomPasswords[3])).toBe(false)
  })
})
