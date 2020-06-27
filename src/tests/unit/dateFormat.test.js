const { dateFormat } = require('../../utils/dateFormat')

describe('Testing a date formatter function', () => {
  it('should returns a string with date in little-endian format', () => {
    const pattern = /^[0-3]\d\/[0-1][1-9]\/[1-9]\d{3}$/
    const dateFormatted = dateFormat(new Date())
    expect(pattern.test(dateFormatted)).toBe(true)
  })
})
