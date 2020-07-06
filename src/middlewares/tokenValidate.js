const Token = require('../utils/jwt-promise')

module.exports = async (req, res, next) => {

  // Gambiarra temporariamente permanente /^\/imagens\/\w+\.\w+$/
  const allowedRoutesWithoutToken = [
    '/login',
    '/imagens',
  ]

  if (
    allowedRoutesWithoutToken.find(route => route == req.path) ||
    /^\/imagens\/\w+\.\w+$/.test(req.path)
    ) return next()

  console.log(req.path)
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
    const id = await Token.legalize(token)
    req.body.idUsuario = id
    return next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      error: 'Token invalid'
    })
  }
}
