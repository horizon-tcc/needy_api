const { getCoords } = require('../../utils/geocoding')

describe('Testing geocoding module', () => {
  it('should returns coordinates', async () => {
    const res = await getCoords('08676-000', 114)
    console.log(res)
    expect(res).toBe(!false)
  })
})
