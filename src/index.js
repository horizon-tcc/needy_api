const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const routes = require('./routes')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

app.listen(process.env.PORT || 4000)
