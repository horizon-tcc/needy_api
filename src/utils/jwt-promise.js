const JWT = require('jsonwebtoken')

const generate = payload => (
  new Promise((resolve, reject) => {
    JWT.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: process.env.JWT_EXPIRES
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

    JWT.verify(token, 'miguelboiolinho', function (err, decoded) {
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
