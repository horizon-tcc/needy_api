const express = require('express')
const cors = require('cors')
const path = require('path')

if(!process.env.PRODUCTION)
  require('dotenv').config(path.resolve(__dirname, '..', '.env'))

const app = express()
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

app.use('/imagens',
 express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

app.listen(process.env.PORT || 4000)
