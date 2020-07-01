const jwt = require('../../utils/jwt-promise')

describe('Testing generations and validations of jwt tokens', () => {
  it('should returns a jwt token', async () => {
    const pattern = /^.+\..+\..+$/i;
    const token = await jwt.generate({ payload: 'test' })
    expect(token).not.toBeNull()
    expect(token).not.toBeUndefined()
    expect(token).not.toBeFalsy()
    expect(pattern.test(token)).toBe(true)
  })
})
