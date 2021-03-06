function dateFormat(date) {
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  if (day.toString().length == 1)
    day = '0' + day
  if (month.toString().length == 1)
    month = '0' + month

  const dateFormatted = day +
    '/' + month +
    '/' + year

  return dateFormatted.toString()
}

module.exports = {
  dateFormat
}
