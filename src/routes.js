const routes = require('express').Router()
const database = require('./database/database')

const LoginController = require('./controllers/LoginController')
const BancoSangueController = require('./controllers/BancoSangueController')

routes.get('/bancos', BancoSangueController.indexAll)
routes.get('/bancos/:id', BancoSangueController.index)

routes.post('/login', LoginController.validate)

module.exports = routes
