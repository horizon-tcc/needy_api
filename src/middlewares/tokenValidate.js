const Token = require('../utils/jwt-promise')
const database = require('../database/database')

module.exports = async (req, res, next) => {

// Gambiarra temporariamente permanente
  const allowedRoutesWithoutToken = [
    '/login',
  ]

  if (
    allowedRoutesWithoutToken.find(route => route == req.path) ||
    /^\/imagens\/.+$/.test(req.path)
  ) return next()
//

  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).json({
      error: 'No token provided'
    })

  const parts = authHeader.split(' ')

  if (!parts.length == 2)
    return res.status(401).json({
      error: 'Token error'
    })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({
      error: 'Token malformatted'
    })


  try {
    const { idUsuario } = await Token.legalize(token)
    req.idUsuario = idUsuario
    const { idDoador } = await database('tbDoador')
      .where('tbDoador.idUsuario', idUsuario)
      .select('idDoador')
      .first()
    req.idDoador = idDoador
    return next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      error: 'Token invalid'
    })
  }
}
