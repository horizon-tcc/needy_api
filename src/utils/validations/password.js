
/**
 * This function returns true if pass parameter be
 * between 8 and 16 characters, else if, returns false.
 * @param {string} pass
 * @returns {boolean}
 */
function isValidPass(pass) {
  const re = /^.{8,16}$/
  return re.test(pass)
}

module.exports = isValidPass
