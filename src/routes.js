const routes = require('express').Router()
const path = require('path')

// Middlewares

const tokenValidate = require('./middlewares/tokenValidate')
routes.use(tokenValidate)

// Controllers

const LoginController = require('./controllers/LoginController')
const BancoSangueController = require('./controllers/BancoSangueController')
const DoadoresController = require('./controllers/DoadoresController')
const ResponsavelController = require('./controllers/ResponsavelController')
const ImagensController = require('./controllers/ImagensController')
const DoacaoController = require('./controllers/DoacaoController')

// Routes

routes.post('/login', LoginController.validate)

routes.get('/bancos', BancoSangueController.indexAll)
routes.get('/bancos/:id', BancoSangueController.index)

routes.get('/doacao/:idDoacao/:idDoador', DoacaoController.index)

routes.get('/doadores', DoadoresController.indexAll)
routes.get('/doadores/:id', DoadoresController.index)

routes.get('/responsavel/:id', ResponsavelController.index)

routes.post('/imagens', ImagensController.upload)

// API Services

const SendMailer = require('./services/sendmailer/SendMailer')

routes.post('/sendmail', SendMailer.sendmail)

module.exports = routes
