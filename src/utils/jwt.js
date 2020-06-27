const JWT = require('jsonwebtoken')
const jwtconf = require('../config/jwt.conf')

const generate = payload => (
  new Promise((resolve, reject) => {
    JWT.sign(payload, jwtconf.secret, {
        algorithm: jwtconf.algorithm,
        expiresIn: jwtconf.expiresIn
      },
      function (err, token) {
        if (err)
          reject(err)
        resolve(token)
      })
  })
)

const legalize = (token) => (
  new Promise((resolve, reject) => {
    if (!token)
      reject(false)

    JWT.verify(token, jwtconf.secret, function (err, decoded) {
      if (err)
        reject({
          error: err
        })

      resolve({
        idUsuario: decoded.idUsuario
      })
    })
  })
)

module.exports = {
  generate,
  legalize
}
