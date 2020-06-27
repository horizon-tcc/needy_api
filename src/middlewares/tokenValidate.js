const Token = require('../utils/jwt')

module.exports = async (req, res, next) => {

  if (req.path == '/login')
    return next();

  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).json({
      error: 'No token provided'
    })

  const parts = authHeader.split(' ')

  if (!parts.length === 2)
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
    return res.status(401).json({
      error: 'Token invalid'
    })
  }
}
