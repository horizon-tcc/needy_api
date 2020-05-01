const routes = require('express').Router()
const database = require('./database/database')


// Middlewares

const tokenValidate = require('./middlewares/tokenValidate')
routes.use(tokenValidate)


// Controllers

const LoginController = require('./controllers/LoginController')
const BancoSangueController = require('./controllers/BancoSangueController')
const DoadoresController = require('./controllers/DoadoresController')

routes.post('/login', LoginController.validate)

routes.get('/bancos', BancoSangueController.indexAll)
routes.get('/bancos/:id', BancoSangueController.index)

routes.get('/doadores/:id', DoadoresController.index)


// API Services

const SendMailer = require('./services/sendmailer/SendMailer')

routes.post('/sendmail', SendMailer.sendmail)


module.exports = routes
