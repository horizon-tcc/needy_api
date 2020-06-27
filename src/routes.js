const routes = require('express').Router()
const database = require('./database/database')
const multer = require('multer')
const multerconf = require('./config/multer')
const path = require('path')

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

routes.post('/upload', multer(multerconf).single('image'), (req, res) => {
  // TODO: transformar o retorno da rota /upload em retorno imediato
  return res.json(req.body)
})


routes.get('/download', (req, res) => {
  const file = path.join(__dirname, `../tmp/uploads/${req.body.filename}`)
  res.download(file)
})

// API Services

const SendMailer = require('./services/sendmailer/SendMailer')

routes.post('/sendmail', SendMailer.sendmail)


module.exports = routes
